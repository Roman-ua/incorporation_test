import React from 'react';
import { Outlet } from 'react-router-dom';
import SideBar from './SideBar/SideBar';

const ProtectedRoutes = () => {
  return (
    <SideBar>
      <Outlet />
    </SideBar>
  );
};

export default ProtectedRoutes;
