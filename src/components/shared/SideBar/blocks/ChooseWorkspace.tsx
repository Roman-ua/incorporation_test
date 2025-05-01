import React from 'react';
import { Check, ChevronsUpDown } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import logo from '../../../../images/round_logo.png';

const workspaces = [
  {
    id: '1',
    title: 'Incorporate Now',
    description: 'Main company',
    logoUrl: '/placeholder.svg?height=40&width=40',
  },
  {
    id: '2',
    title: 'Marketing Team',
    description: 'Campaign planning',
    logoUrl: '/placeholder.svg?height=40&width=40&text=M',
  },
  {
    id: '3',
    title: 'Design Studio',
    description: 'Creative projects',
    logoUrl: '/placeholder.svg?height=40&width=40&text=D',
  },
  {
    id: '4',
    title: 'Engineering',
    description: 'Development',
    logoUrl: '/placeholder.svg?height=40&width=40&text=E',
  },
];

const ChooseWorkspace = () => {
  const [selectedWorkspace, setSelectedWorkspace] = React.useState(
    workspaces[0]
  );
  const [isOpen, setIsOpen] = React.useState(false);
  const dropdownRef = React.useRef<HTMLDivElement>(null);

  // Close dropdown when clicking outside
  React.useEffect(() => {
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
    <div className="p-2 border-b dark:border-gray-800">
      <div className="relative w-full" ref={dropdownRef}>
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="w-full flex items-center gap-2 p-2 rounded-md transition-colors"
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
          <ChevronsUpDown
            className={`ml-auto transition-transform duration-200 w-5 h-5 text-gray-500`}
          />
        </button>

        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.2 }}
              className="absolute left-0 right-0 z-50 mt-1 rounded-md border bg-white dark:bg-gray-800 dark:border-gray-700 shadow-md"
            >
              <div className="py-1">
                {workspaces.map((workspace) => (
                  <button
                    key={workspace.id}
                    onClick={() => {
                      setSelectedWorkspace(workspace);
                      setIsOpen(false);
                    }}
                    className="flex w-full items-center gap-2 px-3 py-2 hover:bg-gray-100 dark:hover:bg-gray-700"
                  >
                    <div className="flex-shrink-0 w-8 h-8 rounded-md overflow-hidden bg-gray-100 dark:bg-gray-700">
                      <img
                        src={logo}
                        alt={`${workspace.title} logo`}
                        width={32}
                        height={32}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="flex flex-col items-start text-left">
                      <span className="font-medium">{workspace.title}</span>
                      <span className="text-xs text-gray-500 dark:text-gray-400">
                        {workspace.description}
                      </span>
                    </div>
                    {selectedWorkspace.id === workspace.id && (
                      <Check className="ml-auto h-4 w-4 text-blue-500" />
                    )}
                  </button>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default ChooseWorkspace;
