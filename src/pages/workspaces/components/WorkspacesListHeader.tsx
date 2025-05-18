import React from 'react';
import WorkspacesListHeaderCompanies from './WorkspaceListHeaderCompanies';

const menuItems = [
  { title: 'Mails' },
  { title: 'Documents' },
  { title: 'Services' },
  { title: 'Orders' },
  { title: 'Invoices' },
];
const WorkspacesListHeader = () => {
  return (
    <div className="flex items-center justify-start gap-16">
      <WorkspacesListHeaderCompanies />
      <div className="flex items-center justify-start gap-4 text-sm font-semibold">
        {menuItems.map((item, index) => (
          <div className="hover:cursor-pointer" key={index}>
            {item.title}
          </div>
        ))}
      </div>
    </div>
  );
};

export default WorkspacesListHeader;
