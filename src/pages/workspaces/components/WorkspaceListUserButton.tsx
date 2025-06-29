import { AnimatePresence, motion } from 'framer-motion';

import React from 'react';

import { CircleUser, LogOut } from 'lucide-react';
import { BiDotsVerticalRounded } from 'react-icons/bi';
import { classNames } from '../../../utils/helpers';
import { useRecoilValue } from 'recoil';
import UserProfileState from '../../../state/atoms/UserProfile';
import UseUserData from '../../../utils/hooks/UserData/UseUserData';
import { Link } from 'react-router-dom';
import { ROUTES } from '../../../constants/navigation/routes';
import { PiChatCircleDotsBold } from 'react-icons/pi';

const WorkspaceListUserButton = () => {
  const [isUserMenuOpen, setIsUserMenuOpen] = React.useState(false);
  const userData = useRecoilValue(UserProfileState);
  const { logout } = UseUserData();

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
    <>
      <div className="px-2">
        <a
          href="mailto:support@incorporatenow.com"
          className={classNames(
            'text-gray-900 flex w-full items-center gap-2 overflow-hidden rounded-md p-2 text-left outline-none ring-sidebar-ring transition-[width,height,padding] focus-visible:ring-2 group-has-[[data-sidebar=menu-action]]/menu-item:pr-8 [&>span:last-child]:truncate [&>svg]:size-4 [&>svg]:shrink-0 h-9 text-sm hover:bg-gray-100/80 hover:cursor-pointer'
          )}
        >
          <PiChatCircleDotsBold className="h-4 w-4" />
          <span>Contact us</span>
        </a>
      </div>
      <div className="p-2 ">
        <div className="relative w-full" ref={userDropdownRef}>
          <button
            onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
            className={classNames(
              'w-full flex items-center gap-2 p-2 hover:bg-gray-100/80 rounded-md transition-colors',
              isUserMenuOpen && 'bg-gray-100/80'
            )}
          >
            <div className="flex-shrink-0 w-8 h-8 rounded-lg overflow-hidden bg-gray-200 dark:bg-gray-700 flex items-center justify-center">
              <span className="text-xl font-bold">
                {userData.data?.full_name?.[0] || 'U'}
              </span>
            </div>
            <div className="flex flex-col leading-none text-left min-w-0">
              <span className="font-semibold text-sm truncate">
                {userData.data?.full_name || 'User User'}
              </span>
              <span className="text-xs text-gray-500 dark:text-gray-400 truncate max-w-[170px] block">
                {userData.data?.email}
              </span>
            </div>
            <BiDotsVerticalRounded className="ml-auto h-5 w-4" />
          </button>

          <AnimatePresence>
            {isUserMenuOpen && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 10 }}
                transition={{ duration: 0.2 }}
                className="absolute left-[244px] bottom-0 w-[240px] z-50 mb-1 rounded-md border bg-white dark:bg-gray-800 dark:border-gray-700 shadow-md"
              >
                <div
                  onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
                  className="w-full flex items-center gap-2 p-2 border-b border-gray-100 transition-colors"
                >
                  <div className="flex-shrink-0 w-8 h-8 rounded-lg overflow-hidden bg-gray-200 dark:bg-gray-700 flex items-center justify-center">
                    <span className="text-xl font-bold">
                      {userData.data?.full_name?.[0] || 'U'}
                    </span>
                  </div>
                  <div
                    className={`flex flex-col leading-none text-left w-[255px] min-w-0`}
                  >
                    <span className="font-semibold text-sm truncate">
                      {userData.data?.full_name || 'User User'}
                    </span>
                    <span className="text-xs text-gray-500 dark:text-gray-400 truncate">
                      {userData.data?.email}
                    </span>
                  </div>
                </div>
                <div className="p-1">
                  <Link
                    to={`${ROUTES.ACCOUNT}/p_${userData.data?.id}`}
                    onClick={() => setIsUserMenuOpen(false)}
                    className={classNames(
                      'text-gray-900 flex w-full items-center gap-2 overflow-hidden rounded-md p-2 text-left outline-none ring-sidebar-ring transition-[width,height,padding] focus-visible:ring-2 group-has-[[data-sidebar=menu-action]]/menu-item:pr-8 [&>span:last-child]:truncate [&>svg]:size-4 [&>svg]:shrink-0 h-9 text-sm hover:bg-gray-100/80'
                    )}
                  >
                    <CircleUser className="h-4 w-4" />
                    <span>Account</span>
                  </Link>
                </div>
                <div className="p-1 border-t border-gray-100">
                  <button
                    onClick={() => {
                      logout();
                      setIsUserMenuOpen(false);
                    }}
                    className={classNames(
                      'text-gray-900 flex w-full items-center gap-2 overflow-hidden rounded-md p-2 text-left outline-none ring-sidebar-ring transition-[width,height,padding] focus-visible:ring-2 group-has-[[data-sidebar=menu-action]]/menu-item:pr-8 [&>span:last-child]:truncate [&>svg]:size-4 [&>svg]:shrink-0 h-9 text-sm hover:bg-gray-100/80'
                    )}
                  >
                    <LogOut className="h-4 w-4" />
                    <span>Log out</span>
                  </button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </>
  );
};

export default WorkspaceListUserButton;
