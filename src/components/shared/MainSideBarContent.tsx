import React from 'react';
import {
  // CalendarIcon,
  // DocumentDuplicateIcon,
  // FolderIcon,
  HomeIcon,
  Squares2X2Icon,
  // UsersIcon,
} from '@heroicons/react/24/outline';
import { Link } from 'react-router-dom';
import { ROUTES } from '../../constants/navigation/routes';

const navigation = [
  { name: 'Company', href: '/home', icon: HomeIcon, current: true },
  // { name: 'Notices', href: '/home', icon: UsersIcon, current: false },
  // { name: 'Domains', href: '/home', icon: FolderIcon, current: false },
  // { name: 'Orders', href: '/home', icon: CalendarIcon, current: false },
  // {
  //   name: 'Senders',
  //   href: '/home',
  //   icon: DocumentDuplicateIcon,
  //   current: false,
  // },
];
const teams = [
  {
    id: 1,
    name: 'Elements',
    href: '/elements',
    initial: 'C',
    current: false,
    icon: Squares2X2Icon,
  },
];

function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(' ');
}

const MainSideBarContent = ({
  currentMenuItem,
  currentMenuItemHandler,
}: {
  currentMenuItem: string;
  currentMenuItemHandler: (value: string) => void;
}) => {
  return (
    <ul role="list" className="flex flex-1 flex-col gap-y-2">
      <li>
        <ul role="list" className="-mx-2 space-y-1">
          {navigation.map((item) => (
            <li key={item.name}>
              <Link
                to={item.href}
                onClick={() => currentMenuItemHandler(item.name)}
                className={classNames(
                  item.name === currentMenuItem
                    ? 'text-gray-600'
                    : 'text-gray-400 hover:text-gray-600',
                  'group flex gap-x-3 rounded-md p-2 text-sm font-semibold leading-6 transition-all'
                )}
              >
                <item.icon
                  className={classNames(
                    item.name === currentMenuItem
                      ? 'text-sideBarBlue/80'
                      : 'text-gray-400 group-hover:text-mainBlue/80',
                    'h-6 w-6 shrink-0 transition-all'
                  )}
                  aria-hidden="true"
                />
                {item.name}
              </Link>
            </li>
          ))}
        </ul>
      </li>
      <li>
        <div className="text-xs font-semibold leading-6 text-gray-500">
          Internal
        </div>
        <ul role="list" className="-mx-2 mt-2 space-y-1">
          {teams.map((team) => (
            <li key={team.name}>
              <Link
                to={team.href}
                onClick={() => currentMenuItemHandler(team.name)}
                className={classNames(
                  team.name === currentMenuItem
                    ? 'text-gray-600'
                    : 'text-gray-400 hover:text-gray-600',
                  'group flex gap-x-3 rounded-md p-2 text-sm font-semibold leading-6 transition-all'
                )}
              >
                <team.icon
                  className={classNames(
                    team.name === currentMenuItem
                      ? 'text-sideBarBlue/80'
                      : 'text-gray-400 group-hover:text-mainBlue/80',
                    'h-6 w-6 shrink-0 transition-all'
                  )}
                  aria-hidden="true"
                />
                <span className="truncate">{team.name}</span>
              </Link>
            </li>
          ))}
        </ul>
      </li>
      <li className="-mx-6 mt-auto max-lg:hidden">
        <Link
          to={ROUTES.ACCOUNT}
          onClick={() => currentMenuItemHandler('Account')}
          className="flex items-center gap-x-4 px-6 py-3 text-sm font-semibold leading-6 text-gray-900 hover:bg-gray-50"
        >
          <img
            className="h-8 w-8 rounded-full bg-gray-50"
            src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
            alt=""
          />
          <span className="sr-only">Your profile</span>
          <span aria-hidden="true">Tom Cook</span>
        </Link>
      </li>
    </ul>
  );
};

export default MainSideBarContent;
