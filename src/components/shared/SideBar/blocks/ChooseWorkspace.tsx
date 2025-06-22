import { AnimatePresence, motion } from 'framer-motion';
import { Check, ChevronsUpDown } from 'lucide-react';
import React, { useEffect, useState } from 'react';
import { LuArrowUpRight } from 'react-icons/lu';
import { Link, useNavigate } from 'react-router-dom';
import { useRecoilState, useSetRecoilState } from 'recoil';
import { ROUTES } from '../../../../constants/navigation/routes';
import { Preloader } from '../../../../pages/workspaces/components/Preloader';
import WorkspacesState, {
  IWorkspaces,
} from '../../../../state/atoms/Workspaces';
import { classNames } from '../../../../utils/helpers';
import logo from '../../../../images/icon_square.png';
import { IconBuildings } from '@tabler/icons-react';
import { ICompanyData } from '../../../../state/types/company';
import useEin from '../../../../utils/hooks/EIN/useEin';
import EinState from '../../../../state/atoms/EIN';
import { TbUserShield } from 'react-icons/tb';

const ChooseWorkspace = () => {
  const navigate = useNavigate();
  const { getEin } = useEin();

  const [workspacesState, setWorkspacesState] =
    useRecoilState<IWorkspaces>(WorkspacesState);

  const [isLoading, setIsLoading] = useState(false);
  const [selectedWorkspace, setSelectedWorkspace] =
    useState<ICompanyData | null>(null);
  const [isHoveredDropdown, setIsHoveredDropdown] = useState(false);

  const [isOpen, setIsOpen] = React.useState(false);

  const setEin = useSetRecoilState(EinState);
  const dropdownRef = React.useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const selectWorkspaceHandler = (workspace: ICompanyData) => {
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
    <div className="p-2 bg-zinc-50">
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
        <div className="relative w-full" ref={dropdownRef}>
          <button
            onClick={() => setIsOpen(!isOpen)}
            className={classNames(
              'w-full flex items-center gap-2 p-2 rounded-md transition-colors hover:bg-gray-100/80',
              isOpen && 'bg-gray-100/80'
            )}
          >
            <div className="flex-shrink-0 w-8 h-8 rounded-lg overflow-hidden">
              {workspacesState?.current?.logoUrl ? (
                <img
                  src={workspacesState?.current?.logoUrl}
                  alt={`${workspacesState?.current?.name} logo`}
                  width={32}
                  height={32}
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="flex-shrink-0 w-8 h-8 p-1 rounded-lg overflow-hidden flex items-center border border-gray-200 justify-center">
                  <IconBuildings />
                </div>
              )}
            </div>
            <div className="flex flex-col gap-0.5 leading-none text-left min-w-0">
              <span className="text-sm font-semibold truncate">
                {workspacesState?.current?.name}
              </span>
              <span className="text-xs text-gray-500 dark:text-gray-400">
                {workspacesState?.current?.type_name}{' '}
                {workspacesState?.current?.type_name === 'Corporation'
                  ? '- Florida'
                  : ''}
                {workspacesState?.current?.type_name === 'LLC'
                  ? '- Delaware'
                  : ''}
              </span>
            </div>
            <ChevronsUpDown className={`ml-auto w-4 h-4`} />
          </button>

          <AnimatePresence>
            {isOpen && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.2 }}
                onMouseEnter={() => setIsHoveredDropdown(true)}
                onMouseLeave={() => setIsHoveredDropdown(false)}
                className="absolute left-[244px] -top-1 z-40 mt-1 w-[240px] max-h-[260px] rounded-md border bg-white dark:bg-gray-800 dark:border-gray-700 shadow-md flex flex-col"
              >
                <div className="px-2.5 pt-2 font-semibold text-xs text-gray-500">
                  Companies
                </div>

                <div className="flex-1 overflow-y-auto p-1.5">
                  {workspacesState.list.map((workspace) => {
                    const isActive =
                      !isHoveredDropdown &&
                      workspacesState?.current?.id === workspace.id;
                    return (
                      <button
                        key={workspace.id}
                        onClick={() => {
                          selectWorkspaceHandler(workspace);
                          setIsOpen(false);

                          if (workspace?.ein) {
                            getEin(workspace.ein);
                          } else {
                            setEin(null);
                          }

                          localStorage.setItem(
                            'selected_company',
                            `${workspace?.id}`
                          );
                        }}
                        className={classNames(
                          'text-gray-900 flex w-full items-center gap-2 overflow-hidden rounded-md p-2 text-left outline-none ring-sidebar-ring transition-[width,height,padding] focus-visible:ring-2 group-has-[[data-sidebar=menu-action]]/menu-item:pr-8 [&>span:last-child]:truncate [&>svg]:size-4 [&>svg]:shrink-0 h-9 text-sm',
                          isActive ? 'bg-gray-100' : 'hover:bg-gray-100/80'
                        )}
                      >
                        <div className="flex-shrink-0 flex items-center justify-center w-6 h-6 rounded-md overflow-hidden border border-gray-100 dark:bg-gray-700">
                          {!workspace.logoUrl ? (
                            <IconBuildings className="h-4 w-4 text-gray-900" />
                          ) : (
                            <img
                              src={workspace.logoUrl}
                              alt={`${workspace.name} logo`}
                              width={22}
                              height={22}
                              className="w-full h-full object-cover"
                            />
                          )}
                        </div>
                        <span className="text-sm">{workspace.name}</span>
                        {workspacesState?.current?.id === workspace.id && (
                          <Check className="ml-auto h-4 w-4 text-black" />
                        )}
                      </button>
                    );
                  })}
                </div>

                <div className="border-t border-gray-100 p-1.5">
                  <Link
                    to={ROUTES.WORKSPACES}
                    onClick={() => {
                      setIsOpen(false);
                    }}
                    className={classNames(
                      'text-gray-900 flex w-full items-center gap-2 overflow-hidden rounded-md p-2 text-left outline-none ring-sidebar-ring transition-[width,height,padding] focus-visible:ring-2 group-has-[[data-sidebar=menu-action]]/menu-item:pr-8 [&>span:last-child]:truncate [&>svg]:size-4 [&>svg]:shrink-0 h-9 text-sm hover:bg-gray-100/80'
                    )}
                  >
                    <div className="flex-shrink-0 flex items-center justify-center w-6 h-6 rounded-md overflow-hidden border border-gray-100 dark:bg-gray-700">
                      <LuArrowUpRight className="h-4 w-4" />
                    </div>
                    <span className="text-sm">All Companies</span>
                  </Link>
                  <Link
                    to={ROUTES.INTERNAL_COMPANIES}
                    className={classNames(
                      'text-gray-900 flex w-full items-center gap-2 overflow-hidden rounded-md p-2 text-left outline-none ring-sidebar-ring transition-[width,height,padding] focus-visible:ring-2 group-has-[[data-sidebar=menu-action]]/menu-item:pr-8 [&>span:last-child]:truncate [&>svg]:size-4 [&>svg]:shrink-0 h-9 text-sm hover:bg-gray-100/80'
                    )}
                  >
                    <div className="flex-shrink-0 flex items-center justify-center w-6 h-6 rounded-md overflow-hidden border border-gray-100 dark:bg-gray-700">
                      <TbUserShield />
                    </div>
                    <span className="text-sm">Internal</span>
                  </Link>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      ) : (
        <img src={logo} className="w-10 h-10 rounded-lg" />
      )}
    </div>
  );
};

export default ChooseWorkspace;
