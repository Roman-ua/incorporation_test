import React from 'react';
import { Outlet } from 'react-router-dom';
// import Breadcrumbs from './BradCrumbs/BradCrumbs';
import WorkspacesListHeader from '../../pages/workspaces/components/WorkspacesListHeader';

const SidebarLayoutAdmin2 = () => {
  return (
    <>
      <div>
        <div className="hidden lg:fixed lg:inset-y-0 lg:z-10 lg:flex lg:w-56 lg:flex-col border-r border-white">
          <WorkspacesListHeader />
        </div>
        <main className="lg:pl-64">
          <div className="bg-white h-16 flex items-center justify-start">
            {/* <Breadcrumbs /> */}
          </div>
          <div>
            <Outlet />
          </div>
        </main>
      </div>
    </>
  );
};

export default SidebarLayoutAdmin2;
