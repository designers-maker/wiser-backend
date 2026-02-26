const axios = require('axios');

exports.handler = async (event, context) => {
  // Enable CORS
  const headers = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'GET, POST, PUT, PATCH, DELETE, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type, Authorization, Accept',
    'Content-Type': 'application/json',
  };
  
  // Handle preflight requests
  if (event.httpMethod === 'OPTIONS') {
    return {
      statusCode: 200,
      headers,
      body: '',
    };
  }
  
  // Extract the path and method
  const { path, httpMethod, body } = event;
  
  // Extract the API path (everything after /api/)
  const apiUrl = path.replace(/^\/api/, '');
  
  // Target backend URL
  const targetUrl = `https://wiser-backend-66lo.onrender.com${apiUrl}`;
  
  try {
    let response;
    
    if (httpMethod === 'POST' || httpMethod === 'PUT' || httpMethod === 'PATCH') {
      // Forward the request to the backend
      response = await axios({
        method: httpMethod.toLowerCase(),
        url: targetUrl,
        data: body ? JSON.parse(body) : {},
        headers: {
          'Content-Type': 'application/json',
          ...event.headers
        },
        timeout: 10000 // 10 second timeout
      });
    } else if (httpMethod === 'GET') {
      // Forward GET request to the backend
      response = await axios.get(targetUrl, {
        headers: {
          ...event.headers
        },
        timeout: 10000 // 10 second timeout
      });
    } else {
      return {
        statusCode: 405,
        body: JSON.stringify({ error: 'Method not allowed' }),
        headers
      };
    }
    
    return {
      statusCode: response.status,
      body: JSON.stringify(response.data),
      headers
    };
  } catch (error) {
    console.error('Webhook error:', error.message);
    console.error('Error details:', error.response?.data || error.code);
    
    // Return error response
    return {
      statusCode: error.response?.status || 500,
      body: JSON.stringify({
        error: 'Proxy error',
        message: error.message,
        details: error.response?.data || error.code || 'Failed to reach backend',
        targetUrl: targetUrl
      }),
      headers
    };
  }
};