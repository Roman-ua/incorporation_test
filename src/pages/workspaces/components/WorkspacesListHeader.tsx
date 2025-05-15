import React from 'react';
import WorkspacesListHeaderCompanies from './WorkspaceListHeaderCompanies';
import { Undo2 } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const menuItems = [
  { title: 'Mails' },
  { title: 'Documents' },
  { title: 'Services' },
  { title: 'Orders' },
  { title: 'Invoices' },
];
const WorkspacesListHeader = () => {
  const navigate = useNavigate();
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
      <div
        onClick={() => navigate(-1)}
        className="flex items-center justify-center gap-1 hover:cursor-pointer text-sm font-semibold ml-auto px-6 py-2 text-gray-700 hover:text-gray-900 transition-colors"
      >
        <Undo2 className="w-4 h-4" />
        Back
      </div>
    </div>
  );
};

export default WorkspacesListHeader;
