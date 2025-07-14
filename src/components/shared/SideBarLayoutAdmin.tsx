import React from 'react';

import AdminsListHeader from '../../pages/admins/components/AdminsListHeader';
import { Outlet } from 'react-router-dom';
import Breadcrumbs from './BradCrumbs/BradCrumbs';
import { QuickCreateCompany } from '../../pages/company/components/QuickCreateCompany';
import ModalState from '../../state/atoms/Modals';
import { useRecoilState } from 'recoil';

const SidebarLayoutAdmin = () => {
  const [modal, setModal] = useRecoilState(ModalState);

  return (
    <>
      <QuickCreateCompany
        isOpen={modal === 'QuickCreateCompany'}
        onClose={() => setModal('')}
      />
      <div>
        <div className="hidden lg:fixed lg:inset-y-0 lg:z-10 lg:flex lg:w-56 lg:flex-col border-r border-white">
          <AdminsListHeader />
        </div>
        <main className="lg:pl-64">
          <div className="bg-white h-16 flex items-center justify-start">
            <Breadcrumbs />
          </div>
          <div>
            <Outlet />
          </div>
        </main>
      </div>
    </>
  );
};

export default SidebarLayoutAdmin;
