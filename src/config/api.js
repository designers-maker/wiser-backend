// API Configuration
let API_BASE_URL;

// Check for environment variable first (for Netlify)
const RENDER_BACKEND_URL = import.meta.env.VITE_BACKEND_URL || process.env.REACT_APP_BACKEND_URL;

// During development with Vite, use relative paths to leverage proxy
// In production, use the actual backend URL
if (process.env.NODE_ENV === 'production') {
  // Use environment variable if available, otherwise fallback
  API_BASE_URL = RENDER_BACKEND_URL || 'https://wiser-backend-66lo.onrender.com';
} else {
  // For development, use relative paths so Vite proxy works
  API_BASE_URL = '';
}

const API_CONFIG = {
  BASE_URL: API_BASE_URL,
  ENDPOINTS: {
    ADMIN_LOGIN: API_BASE_URL ? `${API_BASE_URL}/api/admin/login` : '/api/admin/login',
    COMPANY_VOLUNTEERING: API_BASE_URL ? `${API_BASE_URL}/api/admin/company-volunteering` : '/api/admin/company-volunteering',
    DASHBOARD_STATS: API_BASE_URL ? `${API_BASE_URL}/api/admin/dashboard` : '/api/admin/dashboard',
    FORMS: {
      INDIVIDUAL_VOLUNTEERING: API_BASE_URL ? `${API_BASE_URL}/api/admin/forms/individual_volunteering` : '/api/admin/forms/individual_volunteering',
      CORPORATE_VOLUNTEERING: API_BASE_URL ? `${API_BASE_URL}/api/admin/forms/corporate_volunteering` : '/api/admin/forms/corporate_volunteering',
      REQUEST_FOR_VOLUNTEERING: API_BASE_URL ? `${API_BASE_URL}/api/admin/forms/request_for_volunteering` : '/api/admin/forms/request_for_volunteering',
      CONTACT: API_BASE_URL ? `${API_BASE_URL}/api/admin/forms/contact` : '/api/admin/forms/contact',
      DONATION: API_BASE_URL ? `${API_BASE_URL}/api/admin/forms/donation` : '/api/admin/forms/donation',
    },
    PUBLIC_FORMS: {
      INDIVIDUAL_VOLUNTEERING: API_BASE_URL ? `${API_BASE_URL}/api/forms/individual_volunteering` : '/api/forms/individual_volunteering',
      CORPORATE_VOLUNTEERING: API_BASE_URL ? `${API_BASE_URL}/api/forms/corporate_volunteering` : '/api/forms/corporate_volunteering',
      REQUEST_FOR_VOLUNTEERING: API_BASE_URL ? `${API_BASE_URL}/api/forms/request_for_volunteering` : '/api/forms/request_for_volunteering',
      CONTACT: API_BASE_URL ? `${API_BASE_URL}/api/forms/contact` : '/api/forms/contact',
      DONATION: API_BASE_URL ? `${API_BASE_URL}/api/forms/donation` : '/api/forms/donation',
    }
  }
};

export default API_CONFIG;