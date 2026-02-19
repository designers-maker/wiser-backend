// ADMIN DASHBOARD DEBUG SCRIPT
// Run this in your browser console on your deployed Netlify site

async function debugAdminLogin() {
  console.log('=== ADMIN DASHBOARD DEBUG ===');
  
  // 1. Check if environment variables are loaded
  console.log('1. Environment Variables:');
  console.log('REACT_APP_BACKEND_URL:', process.env.REACT_APP_BACKEND_URL);
  console.log('VITE_BACKEND_URL:', import.meta.env.VITE_BACKEND_URL);
  
  // 2. Check current API configuration
  const API_CONFIG = await import('./src/config/api.js').then(m => m.default);
  console.log('2. API Configuration:');
  console.log('API Base URL:', API_CONFIG.BASE_URL);
  console.log('Admin Login Endpoint:', API_CONFIG.ENDPOINTS.ADMIN_LOGIN);
  
  // 3. Test backend connectivity
  console.log('3. Testing Backend Connection...');
  try {
    const backendUrl = API_CONFIG.BASE_URL || 'https://wiser-backend-66lo.onrender.com';
    console.log('Testing URL:', backendUrl);
    
    const response = await fetch(`${backendUrl}/api/admin/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email: 'test@example.com',
        password: 'wrongpassword'
      })
    });
    
    console.log('Backend Response Status:', response.status);
    
    if (response.status === 401) {
      console.log('✅ Backend is accessible and responding correctly');
      console.log('✅ Admin login endpoint is working');
    } else {
      console.log('⚠️ Unexpected response:', response.status);
    }
    
  } catch (error) {
    console.error('❌ Backend connection failed:', error);
    console.error('Common solutions:');
    console.error('1. Check if your backend is deployed and running on Render');
    console.error('2. Verify the backend URL in Netlify environment variables');
    console.error('3. Check Render logs for any errors');
    console.error('4. Ensure CORS is configured properly in your backend');
  }
  
  // 4. Check if required files exist
  console.log('4. Checking required files...');
  const requiredFiles = [
    '/src/config/api.js',
    '/src/pages/admin/AdminLogin.jsx',
    '/src/pages/admin/AdminDashboard.jsx'
  ];
  
  for (const file of requiredFiles) {
    try {
      await fetch(file);
      console.log(`✅ ${file} exists`);
    } catch (error) {
      console.error(`❌ ${file} not found`);
    }
  }
  
  console.log('=== DEBUG COMPLETE ===');
  console.log('If you see errors above, fix them and redeploy to Netlify');
}

// Run the debug
debugAdminLogin();