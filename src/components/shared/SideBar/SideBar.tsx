import React from 'react';
import Breadcrumbs from '../BradCrumbs/BradCrumbs';
import ChooseWorkspace from './blocks/ChooseWorkspace';
import NawLinks from './blocks/NawLinks';
import UserProfile from './blocks/UserProfile';

function SideBar({ children }: { children: React.ReactNode }) {
  return (
    <>
      <div>
        <div className="hidden lg:fixed lg:inset-y-0 lg:z-10 lg:flex lg:w-64 lg:flex-col border-r">
          <ChooseWorkspace />
          <NawLinks />
          <UserProfile />
        </div>
        <main className="lg:pl-64">
          <div className="border-b border-gray-200 bg-white">
            <Breadcrumbs />
          </div>
          <div>{children}</div>
        </main>
      </div>
    </>
  );
}

export default SideBar;
