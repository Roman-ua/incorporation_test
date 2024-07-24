import React from 'react';
import {
  CalendarIcon,
  DocumentDuplicateIcon,
  FolderIcon,
  HomeIcon,
  UsersIcon,
} from '@heroicons/react/24/outline';
import { Link } from 'react-router-dom';
import { ROUTES } from '../../constants/navigation/routes';

const navigation = [
  { name: 'Company', href: '#', icon: HomeIcon, current: true },
  { name: 'Notices', href: '#', icon: UsersIcon, current: false },
  { name: 'Domains', href: '#', icon: FolderIcon, current: false },
  { name: 'Orders', href: '#', icon: CalendarIcon, current: false },
  { name: 'Senders', href: '#', icon: DocumentDuplicateIcon, current: false },
];
const teams = [
  { id: 1, name: 'Companies', href: '#', initial: 'C', current: false },
  { id: 2, name: 'Users', href: '#', initial: 'U', current: false },
  { id: 3, name: 'Rules', href: '#', initial: 'R', current: false },
  { id: 4, name: 'Ignored Links', href: '#', initial: 'I', current: false },
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
    <ul role="list" className="flex flex-1 flex-col gap-y-7">
      <li>
        <ul role="list" className="-mx-2 space-y-1">
          {navigation.map((item) => (
            <li key={item.name}>
              <Link
                to={ROUTES.HOME}
                onClick={() => currentMenuItemHandler(item.name)}
                className={classNames(
                  item.name === currentMenuItem
                    ? 'bg-gray-50 text-sideBarBlue'
                    : 'text-gray-700 hover:bg-gray-50 hover:text-mainBlue',
                  'group flex gap-x-3 rounded-md p-2 text-sm font-semibold leading-6'
                )}
              >
                <item.icon
                  className={classNames(
                    item.name === currentMenuItem
                      ? 'text-sideBarBlue'
                      : 'text-gray-400 group-hover:text-mainBlue',
                    'h-6 w-6 shrink-0'
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
        <div className="text-xs font-semibold leading-6 text-gray-400">
          Internal
        </div>
        <ul role="list" className="-mx-2 mt-2 space-y-1">
          {teams.map((team) => (
            <li key={team.name}>
              <Link
                to={ROUTES.HOME}
                onClick={() => currentMenuItemHandler(team.name)}
                className={classNames(
                  team.name === currentMenuItem
                    ? 'bg-gray-50 text-sideBarBlue'
                    : 'text-gray-700 hover:bg-gray-50 hover:text-mainBlue',
                  'group flex gap-x-3 rounded-md p-2 text-sm font-semibold leading-6'
                )}
              >
                <span
                  className={classNames(
                    team.name === currentMenuItem
                      ? 'border-sideBarBlue text-sideBarBlue'
                      : 'border-gray-200 text-gray-400 group-hover:border-mainBlue group-hover:text-mainBlue',
                    'flex h-6 w-6 shrink-0 items-center justify-center rounded-lg border bg-white text-[0.625rem] font-medium'
                  )}
                >
                  {team.initial}
                </span>
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
