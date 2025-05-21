import React from 'react';
import ChooseWorkspace from './blocks/ChooseWorkspace';
import NawLinks from './blocks/NawLinks';
import UserProfile from './blocks/UserProfile';
import Breadcrumbs from '../BradCrumbs/BradCrumbs';

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
          <div className="bg-white h-16 flex items-center justify-start">
            <Breadcrumbs />
          </div>
          <div>{children}</div>
        </main>
      </div>
    </>
  );
}

export default SideBar;
