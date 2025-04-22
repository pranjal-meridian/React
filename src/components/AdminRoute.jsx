import React from 'react';
import { Navigate } from 'react-router-dom';
import cookie from 'js-cookie';

const AdminRoute = ({ children }) => {
  const isAdmin = cookie.get("is_admin") === "true";

  return isAdmin ? children : <Navigate to="/login" />;
};

export default AdminRoute;
