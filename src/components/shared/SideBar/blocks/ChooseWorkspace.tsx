import { AnimatePresence, motion } from 'framer-motion';
import { Check, ChevronsUpDown } from 'lucide-react';
import React, { useEffect, useState } from 'react';
import { LuArrowUpRight } from 'react-icons/lu';
import { Link, useNavigate } from 'react-router-dom';
import { useRecoilState } from 'recoil';
import { ROUTES } from '../../../../constants/navigation/routes';
import { Preloader } from '../../../../pages/workspaces/components/Preloader';
import WorkspacesState, {
  IWorkspace,
  IWorkspaces,
} from '../../../../state/atoms/Workspaces';
import { classNames } from '../../../../utils/helpers';

const ChooseWorkspace = () => {
  const navigate = useNavigate();
  const [workspacesState, setWorkspacesState] =
    useRecoilState<IWorkspaces>(WorkspacesState);

  const [isLoading, setIsLoading] = useState(false);
  const [selectedWorkspace, setSelectedWorkspace] = useState<IWorkspace | null>(
    null
  );
  const [isHoveredDropdown, setIsHoveredDropdown] = useState(false); // ← новое

  const [isOpen, setIsOpen] = React.useState(false);
  const dropdownRef = React.useRef<HTMLDivElement>(null);

  // Close dropdown when clicking outside
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

  const SelecteIcon = workspacesState?.current?.icon;

  return (
    <div className="p-2 bg-zinc-50">
      <Preloader
        isLoading={isLoading}
        onLoadingComplete={handleLoadingComplete}
        text={
          selectedWorkspace
            ? `Loading ${selectedWorkspace.title}`
            : 'Loading workspace'
        }
        logo={
          // !selectedWorkspace?.logoUrl ? (
          //   <div className="w-16 h-16 flex items-center justify-center rounded-xl border-2 border-gray-200 bg-zinc-50 text-2xl font-bold text-gray-800">
          //     {selectedWorkspace?.title[0]}
          //   </div>
          // ) : (
          //   <img
          //     src={selectedWorkspace?.logoUrl}
          //     alt={`${selectedWorkspace?.title} logo`}
          //     className="w-16 h-16 object-cover rounded-xl"
          //   />
          // )
          <img
            src={
              selectedWorkspace?.logoUrl || selectedWorkspace?.placeholderLogo
            }
            alt={`${selectedWorkspace?.title} logo`}
            className="w-16 h-16 object-cover rounded-xl"
          />
        }
      />
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
                alt={`${workspacesState?.current?.title} logo`}
                width={32}
                height={32}
                className="w-full h-full object-cover"
              />
            ) : (
              <div className="flex-shrink-0 w-8 h-8 p-1 rounded-lg overflow-hidden flex items-center border border-gray-200 justify-center">
                <SelecteIcon />
              </div>
            )}
          </div>
          <div className="flex flex-col gap-0.5 leading-none text-left min-w-0">
            <span className="text-sm font-semibold truncate">
              {workspacesState?.current?.title}
            </span>
            <span className="text-xs text-gray-500 dark:text-gray-400">
              {workspacesState?.current?.shortType}{' '}
              {workspacesState?.current?.shortType === 'Corporation'
                ? '- Florida'
                : ''}
              {workspacesState?.current?.shortType === 'LLC'
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
              className="absolute left-[244px] -top-1 w-[240px] z-40 mt-1 rounded-md border bg-white dark:bg-gray-800 dark:border-gray-700 shadow-md"
            >
              <div className="px-2.5 pt-2 font-semibold text-xs text-gray-500">
                Companies
              </div>
              <div className="p-1.5">
                {workspacesState.list.map((workspace) => {
                  const Icon = workspace.icon;
                  const isActive =
                    !isHoveredDropdown &&
                    workspacesState?.current?.id === workspace.id;
                  return (
                    <button
                      key={workspace.id}
                      onClick={() => {
                        selectWorkspaceHandler(workspace);
                        setIsOpen(false);
                      }}
                      className={classNames(
                        'text-gray-900 flex w-full items-center gap-2 overflow-hidden rounded-md p-2 text-left outline-none ring-sidebar-ring transition-[width,height,padding] focus-visible:ring-2 group-has-[[data-sidebar=menu-action]]/menu-item:pr-8 [&>span:last-child]:truncate [&>svg]:size-4 [&>svg]:shrink-0 h-9 text-sm',
                        isActive ? 'bg-gray-100' : 'hover:bg-gray-100/80'
                      )}
                    >
                      <div className="flex-shrink-0 flex items-center justify-center w-6 h-6 rounded-md overflow-hidden border border-gray-100 dark:bg-gray-700">
                        {!workspace.logoUrl ? (
                          <Icon className={`h-4 w-4 text-gray-900`} />
                        ) : (
                          <img
                            src={workspace.logoUrl}
                            alt={`${workspace.title} logo`}
                            width={22}
                            height={22}
                            className="w-full h-full object-cover"
                          />
                        )}
                      </div>
                      <span className="text-sm">{workspace.title}</span>
                      {workspacesState?.current?.id === workspace.id && (
                        <Check className="ml-auto h-4 w-4 text-black" />
                      )}
                    </button>
                  );
                })}
              </div>
              <div className="p-1.5 border-t border-gray-100">
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
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default ChooseWorkspace;
