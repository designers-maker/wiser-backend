// Environment-based API configuration
const getApiUrl = () => {
  // Production (when deployed)
  if (import.meta.env.PROD) {
    return 'https://wiser-backend-66lo.onrender.com';
  }
  // Development (local)
  return 'http://localhost:3001';
};

export const API_BASE_URL = getApiUrl();

// For proxy in development
export const PROXY_CONFIG = {
  '/api': {
    target: getApiUrl(),
    changeOrigin: true,
    secure: false
  }
};