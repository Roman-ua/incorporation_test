import React from 'react';
import { ChevronsUpDown, LogOut, User } from 'lucide-react';
import { AnimatePresence, motion } from 'framer-motion';

const userProfile = {
  name: 'Alex Johnson',
  title: 'Senior Developer',
  avatarUrl: '/placeholder.svg?height=40&width=40&text=AJ',
};

const UserProfile = () => {
  const [isUserMenuOpen, setIsUserMenuOpen] = React.useState(false);
  const userDropdownRef = React.useRef<HTMLDivElement>(null);

  // Close dropdowns when clicking outside
  React.useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        userDropdownRef.current &&
        !userDropdownRef.current.contains(event.target as Node)
      ) {
        setIsUserMenuOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <div className="p-2 border-t dark:border-gray-800">
      <div className="relative w-full" ref={userDropdownRef}>
        <button
          onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
          className="w-full flex items-center gap-2 p-2"
        >
          <div className="flex-shrink-0 w-8 h-8 rounded-full overflow-hidden bg-gray-200 dark:bg-gray-700 flex items-center justify-center">
            <span className="text-xl font-bold">{userProfile.name[0]}</span>
          </div>
          <div className={`flex flex-col gap-0.5 leading-none text-left `}>
            <span className="font-semibold">{userProfile.name}</span>
            <span className="text-xs text-gray-500 dark:text-gray-400">
              {userProfile.title}
            </span>
          </div>
          <ChevronsUpDown className="ml-auto h-5 w-5 text-gray-500" />
        </button>

        <AnimatePresence>
          {isUserMenuOpen && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 10 }}
              transition={{ duration: 0.2 }}
              className="absolute bottom-full left-0 right-0 z-50 mb-1 rounded-md border bg-white dark:bg-gray-800 dark:border-gray-700 shadow-md"
            >
              <div className="py-1">
                <a
                  href="#"
                  className="flex w-full items-center gap-2 px-3 py-2 text-sm hover:bg-gray-100 dark:hover:bg-gray-700"
                >
                  <User className="h-4 w-4 text-gray-500" />
                  <span>Account Settings</span>
                </a>
                <button
                  onClick={() => {
                    // Handle logout logic here
                    setIsUserMenuOpen(false);
                  }}
                  className="flex w-full items-center gap-2 px-3 py-2 text-sm text-red-600 hover:bg-gray-100 dark:hover:bg-gray-700"
                >
                  <LogOut className="h-4 w-4" />
                  <span>Logout</span>
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default UserProfile;
