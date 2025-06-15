import React, { useState } from 'react';
import { useRecoilState, useSetRecoilState } from 'recoil';
import WorkspacesState from '../../../state/atoms/Workspaces';

import { Preloader } from './Preloader';
import { ROUTES } from '../../../constants/navigation/routes';
import { useNavigate } from 'react-router-dom';
import { ArrowUpRight } from 'lucide-react';
import { classNames } from '../../../utils/helpers';
import StateSolidIconHandler from '../../../components/shared/StateSolidIconHandler';
import { EmptySection } from '../../../components/shared/EmptySection';
import { IconBuildings } from '@tabler/icons-react';
import { ICompanyData } from '../../../state/types/company';
import useEin from '../../../utils/hooks/EIN/useEin';
import EinState from '../../../state/atoms/EIN';

const statusBadge = (status: string) => {
  switch (status) {
    case 'Active':
      return 'bg-green-50 text-green-700 ring-green-600/20';
    case 'Inactive':
      return 'bg-red-50 text-red-700 ring-red-600/20';
    case 'Dissolved':
      return 'bg-gray-50 text-gray-700 ring-gray-600/20';
    case 'Withdrawn':
      return 'bg-gray-50 text-gray-700 ring-gray-600/20';
    default:
      return 'bg-red-50 text-red-700 ring-red-600/20';
  }
};

export function WorkspacesList() {
  const navigate = useNavigate();
  const { getEin } = useEin();

  const setEin = useSetRecoilState(EinState);
  const [workspacesState, setWorkspacesState] = useRecoilState(WorkspacesState);
  const [isLoading, setIsLoading] = useState(false);
  const [selectedWorkspace, setSelectedWorkspace] =
    useState<ICompanyData | null>(null);

  const selectWorkspaceHandler = (workspace: ICompanyData) => {
    setSelectedWorkspace(workspace);
    setIsLoading(true);

    if (workspace?.ein) {
      getEin(workspace.ein);
    } else {
      setEin(null);
    }

    localStorage.setItem('selected_company', `${workspace?.id}`);
  };

  const handleLoadingComplete = () => {
    if (selectedWorkspace) {
      setWorkspacesState((prev) => ({
        ...prev,
        current: selectedWorkspace,
      }));
    }
    setIsLoading(false);
    navigate(`${ROUTES.COMPANY}/${selectedWorkspace?.id}`);
  };

  return (
    <>
      <Preloader
        isLoading={isLoading}
        onLoadingComplete={handleLoadingComplete}
        text={
          selectedWorkspace
            ? `Loading ${selectedWorkspace.name}`
            : 'Loading workspace'
        }
        logo={
          selectedWorkspace?.logoUrl ? (
            <img
              src={selectedWorkspace?.logoUrl}
              alt={`${selectedWorkspace?.name} logo`}
              className="w-16 h-16 object-cover rounded-xl"
            />
          ) : (
            <div className="mr-2 flex-shrink-0 w-16 h-16 p-1 rounded-lg overflow-hidden flex items-center border border-gray-200 justify-center">
              <IconBuildings />
            </div>
          )
        }
      />
      {workspacesState.list.length ? (
        <div className="w-full overflow-hidden mb-12 container max-w-7xl mx-auto pl-10 pr-10 pb-8 pt-16 mt-3 text-sm">
          <div>
            <div
              className={`flex py-1 group text-xs transition-all ease-in-out duration-150 border-b border-gray-100`}
            >
              <div className="w-[27%] pr-2 flex items-center justify-start font-semibold text-xs text-gray-500">
                <span>Company Name</span>
              </div>

              <div className="w-[15%] px-2 flex items-center justify-start font-semibold text-xs text-gray-500">
                Type
              </div>
              <div className="w-[20%] px-2 flex items-center justify-start font-semibold text-xs text-gray-500">
                State
              </div>
              <div className="w-[25%] px-2 flex items-center justify-start font-semibold text-xs text-gray-500">
                Status
              </div>
              <div className="pl-2 flex items-center justify-end ml-auto"></div>
            </div>
            {workspacesState.list.map((workspace, rowIndex) => {
              return (
                <div
                  onClick={() => selectWorkspaceHandler(workspace)}
                  key={rowIndex}
                  className={`flex py-3 group hover:cursor-pointer transition-all ease-in-out duration-150 border-b border-gray-100`}
                >
                  <div className="w-[27%] pr-2 flex items-center justify-start font-bold text-gray-900">
                    {workspace?.logoUrl ? (
                      <img
                        src={workspace?.logoUrl}
                        alt={`${workspace?.name} logo`}
                        className="mr-2 w-7 h-7 object-cover rounded-lg"
                      />
                    ) : (
                      <div className="mr-2 flex-shrink-0 w-7 h-7 p-1 rounded-lg overflow-hidden flex items-center border border-gray-200 justify-center">
                        <IconBuildings />
                      </div>
                    )}
                    <span>{workspace.name}</span>
                  </div>

                  <div className="w-[15%] px-2 flex items-center justify-start text-gray-900">
                    {workspace?.type?.name}
                  </div>
                  <div className="w-[20%] px-2 flex items-center justify-start text-gray-900">
                    <StateSolidIconHandler
                      simpleIcon={true}
                      selectedState={workspace?.state?.name || 'Florida'}
                      state={workspace?.state?.name || 'Florida'}
                    />
                    {workspace?.state?.name}
                  </div>
                  <div className="w-[25%] px-2 flex items-center justify-start text-gray-900">
                    <span
                      className={classNames(
                        'w-fit inline-flex items-center rounded-md  px-2 py-1 text-xs font-medium  ring-1 ring-inset',
                        statusBadge(workspace?.status?.name)
                      )}
                    >
                      {workspace?.status?.name}
                    </span>
                  </div>
                  <div className="pl-2 flex items-center justify-end ml-auto">
                    <div className="flex items-center gap-1 mr-1 px-2.5 py-1 border rounded-md  text-sm text-gray-900 transition-all ease-in-out duration-150 hover:cursor-pointer">
                      Open{' '}
                      <ArrowUpRight className="h-4 w-4" strokeWidth={1.5} />
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      ) : (
        <div className="w-full overflow-hidden mb-12 container max-w-5xl mx-auto pl-10 pr-10 pb-8 pt-16 text-sm">
          <EmptySection
            title="You don't have related company yet"
            ctaText="Create Company"
            onAction={() => navigate(ROUTES.CREATE_COMPANY)}
          />
        </div>
      )}
    </>
  );
}
