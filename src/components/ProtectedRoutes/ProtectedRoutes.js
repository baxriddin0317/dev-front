import { Redirect, useHistory } from 'react-router-dom';
import React, { memo } from 'react';

function ProtectedRoutes({ isLoggedIn, children }) {
  const history = useHistory();

  const path = history.location.pathname;

  return isLoggedIn ? (
    <>{children}</>
  ) : path == '/signup' ? (
    <Redirect to="/signup" />
  ) : path == '/forgot-password' ? (
    <Redirect to="/forgot-password" />
  ) : path.includes('reset-password') ? (
    <Redirect to={path} />
  ) : path.includes('signup') ? (
    <Redirect to={path} />
  ) : (
    <Redirect to="/login" />
  );
}

export default memo(ProtectedRoutes);
