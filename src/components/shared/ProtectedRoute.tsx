import React, { useEffect } from 'react';
import { Outlet } from 'react-router-dom';

function ProtectedRoute() {
  useEffect(() => {
    const token = localStorage.getItem('token');

    if (!token) {
      fetch('https://api.incorporatenow.com/api/user/auth0/authorize/').then(
        (res) => {
          const data = res.json();
          console.log(data);
        }
      );
    }
  }, []);

  return <Outlet />;
}

export default ProtectedRoute;
