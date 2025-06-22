import React from 'react';

import AdminsListHeader from '../../pages/admins/components/AdminsListHeader';
import { Outlet } from 'react-router-dom';

const SidebarLayoutAdmin = () => {
  return (
    <>
      <div>
        <div className="hidden lg:fixed lg:inset-y-0 lg:z-10 lg:flex lg:w-56 lg:flex-col border-r border-white">
          <AdminsListHeader />
        </div>
        <main className="lg:pl-64">
          <div>
            <Outlet />
          </div>
        </main>
      </div>
    </>
  );
};

export default SidebarLayoutAdmin;
