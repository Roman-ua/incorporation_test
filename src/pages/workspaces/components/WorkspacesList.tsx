import React, { useState } from 'react';
import { useRecoilState } from 'recoil';
import WorkspacesState, { IWorkspace } from '../../../state/atoms/Workspaces';
import { TbHandClick } from 'react-icons/tb';
import { Preloader } from './Preloader';
import { ROUTES } from '../../../constants/navigation/routes';
import { useNavigate } from 'react-router-dom';

export function WorkspacesList() {
  const navigate = useNavigate();

  const [workspacesState, setWorkspacesState] = useRecoilState(WorkspacesState);
  const [isLoading, setIsLoading] = useState(false);
  const [selectedWorkspace, setSelectedWorkspace] = useState<IWorkspace | null>(
    null
  );

  const selectWorkspaceHandler = (workspace: IWorkspace) => {
    setSelectedWorkspace(workspace);
    setIsLoading(true);
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
            ? `Loading ${selectedWorkspace.title}`
            : 'Loading workspace'
        }
        logo={
          selectedWorkspace && (
            <div className="w-16 h-16 flex items-center justify-center rounded-xl border-2 border-gray-200 bg-zinc-50 text-2xl font-bold text-gray-800">
              {selectedWorkspace.title[0]}
            </div>
          )
        }
      />

      <div className="w-full overflow-hidden mb-12">
        <div>
          <div
            className={`flex py-1 group text-xs transition-all ease-in-out duration-150 border-b border-gray-100`}
          >
            <div className="w-[25%] pr-2 flex items-center justify-start text-gray-600">
              <span>Companies</span>
            </div>

            <div className="w-[24%] px-2 flex items-center justify-start text-gray-600">
              Balance
            </div>
            <div className="w-[24%] px-2 flex items-center justify-start text-gray-600 justify-end">
              Details
            </div>
            <div className="pl-2 flex items-center justify-end ml-auto"></div>
          </div>
          {workspacesState.list.map((workspace, rowIndex) => (
            <div
              onClick={() => selectWorkspaceHandler(workspace)}
              key={rowIndex}
              className={`flex py-3 group hover:cursor-pointer transition-all ease-in-out duration-150 border-b border-gray-100`}
            >
              <div className="w-[25%] pr-2 flex items-center justify-start font-bold text-gray-900">
                <div className="w-10 h-10 mr-2 flex items-center justify-center rounded-md border border-gray-100 bg-zinc-50">
                  {workspace.title[0]}
                </div>
                <span>{workspace.title}</span>
              </div>

              <div className="w-[24%] px-2 flex items-center justify-start text-gray-900">
                {workspace.balance}
              </div>
              <div className="w-[24%] px-2 flex items-center justify-start text-gray-900 justify-end">
                {workspace.description}
              </div>
              <div className="pl-2 flex items-center justify-end ml-auto">
                <div className="p-1 rounded w-fit bg-gray-700 text-white hover:bg-gray-900 transition-all duration-150 ease-in-out hover:cursor-pointer opacity-0 group-hover:opacity-100">
                  <TbHandClick className="h-4 w-4" />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
