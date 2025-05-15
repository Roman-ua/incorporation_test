import React from 'react';
import { WorkspacesList } from './components/WorkspacesList';
import WorkspacesListHeader from './components/WorkspacesListHeader';

const WorkspacesPage = () => {
  return (
    <>
      <WorkspacesListHeader />
      <div className="container max-w-5xl mx-auto pl-10 pr-10 pb-8 pt-8 text-sm">
        <WorkspacesList />
      </div>
    </>
  );
};

export default WorkspacesPage;
