# WISER Volunteer Website - Domain Deployment Fix

## Problem
Forms work in localhost but not when deployed to a domain because the frontend can't connect to the backend API.

## Solutions

### Option 1: Deploy Frontend and Backend Together (Recommended)
This is the simplest and most reliable approach.

**For Netlify:**
1. Deploy your backend to a separate service (Render, Heroku, etc.)
2. Set environment variable in Netlify:
   - Key: `VITE_API_URL`
   - Value: `https://your-backend-domain.com`

**For Vercel:**
1. Deploy your backend separately
2. Set environment variable in Vercel dashboard:
   - `VITE_API_URL=https://your-backend-domain.com`

**For Traditional Hosting:**
1. Build your frontend: `npm run build`
2. Deploy build files to your web server
3. Run your backend server on the same or different server
4. If different servers, set `VITE_API_URL` to your backend URL

### Option 2: Same Domain Deployment (Most Reliable)
Deploy both frontend and backend to the same domain using a reverse proxy.

**Nginx Configuration Example:**
```nginx
server {
    listen 80;
    server_name your-domain.com;
    
    # Serve frontend static files
    location / {
        root /path/to/your/frontend/dist;
        try_files $uri $uri/ /index.html;
    }
    
    # Proxy API requests to backend
    location /api/ {
        proxy_pass http://localhost:3001;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
    }
}
```

### Option 3: Serverless Functions (For Netlify/Vercel)
Convert your backend to serverless functions that run on the same platform as your frontend.

## Quick Fix Instructions

1. **Set Environment Variable:**
   - Go to your hosting platform's dashboard
   - Find "Environment Variables" or "Build Settings"
   - Add: `VITE_API_URL=https://your-backend-domain.com`

2. **Rebuild and Redeploy:**
   - Make sure to rebuild your frontend after setting the environment variable
   - The environment variable must be set BEFORE building

3. **Verify Backend is Running:**
   - Make sure your backend server is accessible at the URL you specified
   - Test: `https://your-backend-domain.com/api/health`

## Debugging Steps

1. Visit your deployed website
2. Open browser developer tools (F12)
3. Go to Console tab
4. Look for error messages
5. Check Network tab for failed API requests
6. The error messages will tell you exactly what's wrong

## Common Issues and Solutions

**"Failed to fetch" or CORS errors:**
- Your backend URL is incorrect or not accessible
- Check if your backend server is running
- Verify the VITE_API_URL environment variable is set correctly

**404 errors:**
- API routes don't exist on your backend
- Wrong backend URL
- Backend not properly configured

**500 errors:**
- Backend server error
- Check backend server logs
- Database connection issues

The debug page included in this project will help you identify the exact issue when deployed.