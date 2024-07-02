import React from 'react';
import { Outlet } from 'react-router-dom';
import SideBar from './SideBar';

const ProtectedRoutes = () => {
  return (
    <div>
      <SideBar>
        <Outlet />
      </SideBar>
    </div>
  );
};

export default ProtectedRoutes;
