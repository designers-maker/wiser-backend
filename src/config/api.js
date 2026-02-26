// Environment-based API configuration
const getApiUrl = () => {
  // Check if we're in production (deployed environment)
  if (typeof window !== 'undefined') {
    // If running in browser and not on localhost, use relative path (same origin)
    // This handles most deployment scenarios where frontend and backend are on same domain
    if (window.location.hostname !== 'localhost' && 
        !window.location.hostname.startsWith('127.') &&
        !window.location.hostname.startsWith('192.168') &&
        !window.location.hostname.startsWith('10.')) {
      
      // For production deployments, first check environment variable
      if (import.meta.env.VITE_API_URL) {
        return import.meta.env.VITE_API_URL;
      }
      
      // For Netlify deployments, use relative path to leverage proxy
      if (window.location.hostname.includes('netlify.app')) {
        return '';
      }
      
      // For Vercel deployments, use relative path
      if (window.location.hostname.includes('vercel.app')) {
        return '';
      }
      
      // For Render deployments, use relative path
      if (window.location.hostname.includes('onrender.com')) {
        return '';
      }
      
      // For GitHub Pages, use relative path as well
      if (window.location.hostname.includes('github.io')) {
        return '';
      }
      
      // Default fallback for other production deployments
      // Use your Render backend URL
      return 'https://wiser-backend-66lo.onrender.com';
    }
  }
  
  // For local development, use the local backend server
  return 'http://localhost:3001';
};

export const API_BASE_URL = getApiUrl();

// For proxy in development
export const PROXY_CONFIG = {
  '/api': {
    target: 'http://localhost:3001', // Always proxy to local backend in dev
    changeOrigin: true,
    secure: false
  }
};