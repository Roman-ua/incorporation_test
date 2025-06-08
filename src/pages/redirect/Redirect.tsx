import React from 'react';
import { Navigate } from 'react-router-dom';
import { ROUTES } from '../../constants/navigation/routes';
import { useRecoilValue } from 'recoil';
import WorkspacesState from '../../state/atoms/Workspaces';

const RedirectPage = () => {
  const workspacesState = useRecoilValue(WorkspacesState);

  if (!workspacesState.current.id) {
    return <Navigate to={ROUTES.WORKSPACES} />;
  }

  return <Navigate to={`${ROUTES.HOME}?id=${workspacesState.current.id}`} />;
};

export default RedirectPage;
