# WISER Volunteer Website - Deployment Guide

## Common Form Submission Issues and Solutions

### Issue: Forms not working after deployment

**Root Causes:**
1. **API URL Configuration** - Frontend can't connect to backend
2. **CORS Issues** - Cross-origin requests blocked
3. **Environment Variables** - Missing configuration
4. **Server Not Running** - Backend service not active

## Solution Steps:

### 1. API Configuration Fix
The `src/config/api.js` file has been updated to handle different deployment scenarios:
- Local development: `http://localhost:3001`
- Production deployments: Uses relative paths for same-domain hosting
- Supports Netlify, Vercel, Render, and other platforms

### 2. Form Component Improvements
All form components now have:
- Enhanced error handling with specific error messages
- Better user feedback for different error types
- Timestamps added to submissions
- Detailed console logging for debugging

### 3. Environment Setup

#### For Local Development:
```bash
# Start backend server
cd server
npm start

# In another terminal, start frontend
npm run dev
```

#### For Production Deployment:

**Option A: Same Domain Deployment (Recommended)**
- Deploy both frontend and backend to the same domain
- Backend serves API at `/api/` path
- No CORS issues

**Option B: Separate Domains**
- Set `VITE_API_URL` environment variable
- Example: `VITE_API_URL=https://your-backend-domain.com`

### 4. Testing Form Submissions

#### Local Testing:
1. Start both frontend and backend servers
2. Navigate to form pages
3. Fill out and submit forms
4. Check browser console for logs
5. Verify data appears in Firebase

#### Production Testing:
1. Deploy the application
2. Test all form submissions
3. Check browser developer tools console
4. Verify network requests to `/api/forms/` endpoints

### 5. Common Error Messages and Solutions:

**"Unable to connect to server"**
- Check if backend server is running
- Verify API URL configuration
- Check network connectivity

**"Network connection failed"**
- Internet connection issues
- Server might be down
- Firewall blocking requests

**"Server error"**
- Backend service error
- Check server logs
- Verify Firebase connection

**"Form submission endpoint not found"**
- Incorrect API URL
- Backend route doesn't exist
- Server not properly configured

### 6. Debugging Steps:

1. **Check Browser Console:**
   - Look for error messages
   - Check network tab for failed requests
   - Verify request URLs

2. **Check Server Logs:**
   - Look for error messages in backend console
   - Verify Firebase connection
   - Check for authentication issues

3. **Verify Environment:**
   - Ensure all required environment variables are set
   - Check Firebase configuration
   - Verify server is running on correct port

### 7. Environment Variables Required:

**Frontend (.env file):**
```
VITE_API_URL= # Optional: Set if backend is on different domain
```

**Backend (server/.env file):**
```
FIREBASE_DATABASE_SECRET=your_firebase_secret
PORT=3001
```

### 8. Deployment Platforms:

**Netlify:**
- Set `VITE_API_URL` in Netlify environment variables if needed
- Backend must be deployed separately or use serverless functions

**Vercel:**
- Similar to Netlify, set environment variables as needed
- Can deploy frontend and backend separately

**Render:**
- Can deploy both frontend and backend
- Set environment variables in Render dashboard

**Traditional Hosting:**
- Deploy frontend build files
- Run backend server on same or different server
- Configure reverse proxy if needed

## Quick Fix Checklist:

- [ ] Verify backend server is running
- [ ] Check API URL configuration in `src/config/api.js`
- [ ] Ensure all environment variables are set
- [ ] Test form submissions locally first
- [ ] Check browser console for errors
- [ ] Verify network requests in developer tools
- [ ] Confirm Firebase connection is working
- [ ] Check server logs for error messages

The form submission issues should now be resolved with the improved error handling and API configuration.