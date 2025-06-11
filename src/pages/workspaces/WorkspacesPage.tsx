import React from 'react';
import { WorkspacesList } from './components/WorkspacesList';
import WorkspacesListHeader from './components/WorkspacesListHeader';

const WorkspacesPage = () => {
  return (
    <>
      <div className="hidden lg:fixed lg:inset-y-0 lg:z-10 lg:flex lg:w-56 lg:flex-col border-r border-white">
        <WorkspacesListHeader />
      </div>
      <div className="lg:pl-56">
        <WorkspacesList />
      </div>
    </>
  );
};

export default WorkspacesPage;
