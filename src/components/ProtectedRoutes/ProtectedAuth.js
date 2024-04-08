import { Redirect, useHistory } from 'react-router-dom';
import React from 'react';

function ProtectedAuth({ isLoggedIn, children }) {
  const history = useHistory();

  const path = history.location.pathname;

  return !isLoggedIn ? (
    <>{children}</>
  ) : path == '/signup' ? (
    <Redirect to="/" />
  ) : path == '/login' ? (
    <Redirect to="/" />
  ) : path == '/forgot-password' ? (
    <Redirect to="/" />
  ) : path.includes('reset-password') ? (
    <Redirect to="/" />
  ) : path.includes('signup') ? (
    <Redirect to="/" />
  ) : (
    <Redirect
      to={{ pathname: `${path}`, state: { toast: true, login: true } }}
    />
  );
}

export default ProtectedAuth;
