import React, { useEffect } from 'react';
import { Check, ChevronsUpDown, GalleryVerticalEnd } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import logo from '../../../../images/round_logo.png';
import { classNames } from '../../../../utils/helpers';

const workspaces = [
  {
    id: '1',
    title: 'Incorporate Now',
    description: 'Main company',
    logoUrl: '/placeholder.svg?height=40&width=40',
    icon: GalleryVerticalEnd,
  },
  {
    id: '2',
    title: 'Marketing Team',
    description: 'Campaign planning',
    logoUrl: '',
    icon: GalleryVerticalEnd,
  },
  {
    id: '3',
    title: 'Design Studio',
    description: 'Creative projects',
    logoUrl: '',
    icon: GalleryVerticalEnd,
  },
  {
    id: '4',
    title: 'Engineering',
    description: 'Development',
    logoUrl: '',
    icon: GalleryVerticalEnd,
  },
];

const ChooseWorkspace = () => {
  const [selectedWorkspace, setSelectedWorkspace] = React.useState(
    workspaces[0]
  );
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

  return (
    <div className="p-2 bg-zinc-50">
      <div className="relative w-full" ref={dropdownRef}>
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="w-full flex items-center gap-2 p-2 rounded-md transition-colors hover:bg-gray-100/80"
        >
          <div className="flex-shrink-0 w-8 h-8 rounded-lg overflow-hidden">
            <img
              src={logo}
              alt={`${selectedWorkspace.title} logo`}
              width={32}
              height={32}
              className="w-full h-full object-cover"
            />
          </div>
          <div className={`flex flex-col gap-0.5 leading-none text-left`}>
            <span className="font-semibold">{selectedWorkspace.title}</span>
            <span className="text-xs text-gray-500 dark:text-gray-400">
              {selectedWorkspace.description}
            </span>
          </div>
          <ChevronsUpDown className={`ml-auto w-5 h-5 text-gray-500`} />
        </button>

        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.2 }}
              className="absolute p-1.5 left-56 top-0 w-[240px] z-40 mt-1 rounded-md border bg-white dark:bg-gray-800 dark:border-gray-700 shadow-md"
            >
              <div className="px-2 py-1.5 font-semibold text-xs text-gray-500">
                Workspaces
              </div>
              <div className="py-1">
                {workspaces.map((workspace) => {
                  const Icon = workspace.icon;
                  const isActive = selectedWorkspace.id === workspace.id;
                  return (
                    <button
                      key={workspace.id}
                      onClick={() => {
                        setSelectedWorkspace(workspace);
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
                            src={logo}
                            alt={`${workspace.title} logo`}
                            width={22}
                            height={22}
                            className="w-full h-full object-cover"
                          />
                        )}
                      </div>
                      <span className="text-sm">{workspace.title}</span>
                      {selectedWorkspace.id === workspace.id && (
                        <Check className="ml-auto h-4 w-4 text-black" />
                      )}
                    </button>
                  );
                })}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default ChooseWorkspace;
