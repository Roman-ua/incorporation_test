import React from 'react';
import WorkspacesListHeaderCompanies from './WorkspaceListHeaderCompanies';
import { classNames } from '../../../utils/helpers';
import { ClipboardList, ConciergeBell, FileText, Mail } from 'lucide-react';
import { IconFileInvoice } from '@tabler/icons-react';
import WorkspaceListUserButton from './WorkspaceListUserButton';

const menuItems = [
  { title: 'Mail', icon: Mail },
  { title: 'Documents', icon: FileText },
  { title: 'Services', icon: ConciergeBell },
  { title: 'Orders', icon: ClipboardList },
  { title: 'Invoices', icon: IconFileInvoice },
];
const WorkspacesListHeader = () => {
  return (
    <div className="h-screen flex items-start justify-start flex-col">
      <WorkspacesListHeaderCompanies />
      <div className="p-2 flex items-start flex-col justify-start text-sm ">
        <div className="text-xs text-gray-600 p-2">
          Related to all companies
        </div>
        {menuItems.map((item, index) => {
          const Icon = item.icon;
          return (
            <div
              className={classNames(
                'hover:cursor-pointer font-semibold hover:bg-gray-100/80 text-gray-900 flex w-full items-center gap-2 overflow-hidden rounded-md p-2 text-left outline-none ring-sidebar-ring transition-[width,height,padding] focus-visible:ring-2 group-has-[[data-sidebar=menu-action]]/menu-item:pr-8 [&>span:last-child]:truncate [&>svg]:size-4 [&>svg]:shrink-0 h-9 text-sm'
              )}
              key={index}
            >
              <Icon className={`h-5 w-5 text-gray-900`} />
              {item.title}
            </div>
          );
        })}
      </div>
      <div className="mt-auto">
        <WorkspaceListUserButton />
      </div>
    </div>
  );
};

export default WorkspacesListHeader;
