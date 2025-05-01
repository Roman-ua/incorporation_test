import React, { useEffect } from 'react';
import { Outlet } from 'react-router-dom';

function ProtectedRoute() {
  useEffect(() => {
    const token = localStorage.getItem('token');

    if (!token) {
      console.log('tut');
      try {
        // fetch('https://api.incorporatenow.com/api/user/auth0/authorize/').then(
        //   (res) => {
        //     const data = res.json();
        //     console.log(data);
        //   }
        // );
      } catch (e) {
        console.log(e);
      }
    }
  }, []);

  return <Outlet />;
}

export default ProtectedRoute;
