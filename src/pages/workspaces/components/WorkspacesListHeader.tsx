import React from 'react';
import WorkspacesListHeaderCompanies from './WorkspaceListHeaderCompanies';
import { classNames } from '../../../utils/helpers';

const menuItems = [
  { title: 'Mails' },
  { title: 'Documents' },
  { title: 'Services' },
  { title: 'Orders' },
  { title: 'Invoices' },
];
const WorkspacesListHeader = () => {
  return (
    <div>
      <WorkspacesListHeaderCompanies />
      <div className="p-2 flex items-start flex-col justify-start text-sm ">
        <div className="text-xs text-gray-600 p-2">
          Related to all companies
        </div>
        {menuItems.map((item, index) => (
          <div
            className={classNames(
              'hover:cursor-pointer font-semibold hover:bg-gray-100/80 text-gray-900 flex w-full items-center gap-2 overflow-hidden rounded-md p-2 text-left outline-none ring-sidebar-ring transition-[width,height,padding] focus-visible:ring-2 group-has-[[data-sidebar=menu-action]]/menu-item:pr-8 [&>span:last-child]:truncate [&>svg]:size-4 [&>svg]:shrink-0 h-9 text-sm'
            )}
            key={index}
          >
            {item.title}
          </div>
        ))}
      </div>
    </div>
  );
};

export default WorkspacesListHeader;
