# Fix for Form Submissions on Netlify Deployment

## Problem
When the website was deployed on Netlify, form submissions were failing because the frontend couldn't communicate with the backend API properly. This was due to cross-origin restrictions and the backend API being hosted separately.

## Solution Implemented

### 1. Updated API Configuration (`src/config/api.js`)
- Modified the API URL detection logic to properly handle different deployment environments
- Added specific handling for Netlify deployments to use relative paths when appropriate
- Maintained backward compatibility for local development

### 2. Netlify Configuration (`netlify.toml`)
- Added redirects to route API calls through a serverless function
- Configured proper CORS headers for API endpoints
- Ensured that `/api/*` routes are handled properly

### 3. Serverless Proxy Function (`netlify/functions/webhook.js`)
- Created a serverless function that acts as a proxy between the frontend and backend
- Handles CORS preflight requests (OPTIONS)
- Properly forwards all HTTP methods (GET, POST, PUT, PATCH, etc.)
- Includes error handling and timeout configurations
- Provides detailed error logging for debugging

### 4. Dependencies (`netlify/functions/package.json`)
- Added axios dependency for the serverless function to make HTTP requests

## How It Works
1. Frontend makes API calls to `/api/forms/*` endpoints
2. Netlify redirects these requests to the serverless function
3. Serverless function acts as a proxy, forwarding requests to the actual backend API
4. Response from backend is returned through the proxy to the frontend
5. This bypasses CORS restrictions since the request originates from the same domain

## Benefits
- Forms now work properly when deployed on Netlify
- Maintains security by not exposing backend directly
- Provides error handling and logging for debugging
- Works across different deployment environments
- Preserves existing functionality for local development

## Environment Variables
If needed, you can override the backend URL by setting the `VITE_API_URL` environment variable in your Netlify deployment settings.

## Files Modified/Added
- `src/config/api.js` - Updated API configuration
- `netlify.toml` - Added Netlify configuration
- `netlify/functions/webhook.js` - Created serverless proxy function
- `netlify/functions/package.json` - Added dependencies for serverless function