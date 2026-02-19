// Test script to verify backend connectivity
// Run this in browser console on your deployed site

async function testBackendConnection() {
  console.log('Testing backend connection...');
  
  try {
    // Test the admin login endpoint
    const response = await fetch('https://wiser-backend-66lo.onrender.com/api/admin/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email: 'test@example.com',
        password: 'test123'
      })
    });
    
    console.log('Backend response status:', response.status);
    
    if (response.status === 401) {
      console.log('✅ Backend is accessible and responding (401 is expected for wrong credentials)');
      console.log('✅ Admin login endpoint is working');
    } else if (response.status === 200) {
      console.log('✅ Backend is accessible and responding');
    } else {
      console.log('⚠️ Backend responded with status:', response.status);
    }
    
    // Test dashboard endpoint (requires authentication)
    try {
      const dashboardResponse = await fetch('https://wiser-backend-66lo.onrender.com/api/admin/dashboard');
      console.log('Dashboard endpoint status:', dashboardResponse.status);
    } catch (dashboardError) {
      console.log('Dashboard test (expected to fail without auth):', dashboardError.message);
    }
    
  } catch (error) {
    console.error('❌ Backend connection failed:', error);
    console.error('Common solutions:');
    console.error('1. Check if your backend is deployed and running on Render');
    console.error('2. Verify the backend URL is correct');
    console.error('3. Check Render logs for any errors');
    console.error('4. Ensure your backend has CORS configured properly');
  }
}

// Run the test
testBackendConnection();