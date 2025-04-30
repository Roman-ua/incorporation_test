import React from 'react';
import { Outlet } from 'react-router-dom';

function ProtectedRoute() {
  // const token = localStorage.getItem('token');
  //
  // return token ? <Outlet /> : <Navigate to="/login" />;

  return <Outlet />;
}

export default ProtectedRoute;
