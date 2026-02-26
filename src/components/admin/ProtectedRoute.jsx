import React from 'react';
import { Navigate } from 'react-router-dom';

const ProtectedRoute = ({ children, adminOnly = false }) => {
  const token = localStorage.getItem('adminToken');
  
  // If no token, redirect to admin login
  if (!token) {
    return <Navigate to="/admin/login" replace />;
  }

  // Verify token is still valid (basic check - in production you might want to decode and verify expiration)
  try {
    const tokenPayload = JSON.parse(atob(token.split('.')[1]));
    const currentTime = Math.floor(Date.now() / 1000);
    
    if (tokenPayload.exp < currentTime) {
      // Token expired, remove it and redirect to login
      localStorage.removeItem('adminToken');
      localStorage.removeItem('adminInfo');
      return <Navigate to="/admin/login" replace />;
    }
  } catch (error) {
    // Invalid token format, remove it and redirect to login
    localStorage.removeItem('adminToken');
    localStorage.removeItem('adminInfo');
    return <Navigate to="/admin/login" replace />;
  }

  // If route requires admin privileges and user is not an admin, redirect
  if (adminOnly) {
    const adminInfo = JSON.parse(localStorage.getItem('adminInfo') || '{}');
    if (!adminInfo.isAdmin) {
      return <Navigate to="/unauthorized" replace />;
    }
  }

  return children;
};

export default ProtectedRoute;