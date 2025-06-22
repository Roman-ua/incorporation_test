import React from 'react';
import AdminsListHeaderCompanies from './AdminsListHeaderCompanies';
import { classNames } from '../../../utils/helpers';
import {
  ClipboardList,
  ConciergeBell,
  FileText,
  Mail,
  Users,
} from 'lucide-react';
import { IconBuilding, IconFileInvoice } from '@tabler/icons-react';
import WorkspaceListUserButton from './AdminsListUserButton';
import { ROUTES } from '../../../constants/navigation/routes';
import { useLocation, useNavigate } from 'react-router-dom';

const menuItems = [
  { title: 'Companies', icon: IconBuilding, href: ROUTES.INTERNAL_COMPANIES },
  { title: 'Mail', icon: Mail, href: ROUTES.INTERNAL_MAIL },
  { title: 'Documents', icon: FileText, href: ROUTES.INTERNAL_DOCUMENTS },
  { title: 'Services', icon: ConciergeBell, href: ROUTES.INTERNAL_SERVICES },
  { title: 'Orders', icon: ClipboardList, href: ROUTES.INTERNAL_ORDERS },
  { title: 'Invoices', icon: IconFileInvoice, href: ROUTES.INTERNAL_INVOICES },
  { title: 'Users', icon: Users, href: ROUTES.INTERNAL_USERS },
];

const AdminsListHeader = () => {
  const navigate = useNavigate();
  const { pathname } = useLocation();

  return (
    <div className="hidden lg:fixed lg:inset-y-0 lg:z-10 lg:flex lg:w-[255px] lg:flex-col">
      <AdminsListHeaderCompanies />
      <div className="p-2 flex items-start flex-col space-y-1 justify-start text-sm w-full">
        <div className="text-xs text-gray-600 p-2">Pages</div>
        <div className="flex flex-col w-full gap-1">
          {menuItems.map((item, index) => {
            const Icon = item.icon;
            return (
              <div
                onClick={() => navigate(item.href)}
                className={classNames(
                  'hover:cursor-pointer font-semibold hover:bg-gray-100/80 text-gray-900 flex w-full items-center gap-2 overflow-hidden rounded-md p-2 text-left outline-none ring-sidebar-ring transition-[width,height,padding] focus-visible:ring-2 group-has-[[data-sidebar=menu-action]]/menu-item:pr-8 [&>span:last-child]:truncate [&>svg]:size-4 [&>svg]:shrink-0 h-9 text-sm',
                  pathname === item.href && 'bg-gray-100/80'
                )}
                key={index}
              >
                <Icon className={`h-5 w-5 text-gray-900`} />
                {item.title}
              </div>
            );
          })}
        </div>
      </div>
      <div className="mt-auto">
        <WorkspaceListUserButton />
      </div>
    </div>
  );
};

export default AdminsListHeader;
