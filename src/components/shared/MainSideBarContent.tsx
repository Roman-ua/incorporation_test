import React from 'react';
import { Link } from 'react-router-dom';
import { ROUTES } from '../../constants/navigation/routes';
import { RiHome6Line } from 'react-icons/ri';
import { TbMail, TbPuzzle, TbPuzzle2 } from 'react-icons/tb';
import { HiOutlineDocumentText } from 'react-icons/hi';
import { LuClipboardList } from 'react-icons/lu';
import { BiReceipt } from 'react-icons/bi';

const navigation = [
  { name: 'Home', href: '/home', icon: RiHome6Line, current: true },
  { name: 'Mail', href: '/home', icon: TbMail, current: true },
  {
    name: 'Documents',
    href: '/home',
    icon: HiOutlineDocumentText,
    current: true,
  },
  { name: 'Services', href: '/home', icon: TbPuzzle2, current: true },
  { name: 'Orders', href: '/home', icon: LuClipboardList, current: true },
  { name: 'Invoices', href: '/home', icon: BiReceipt, current: true },
];
const teams = [
  {
    id: 1,
    name: 'Elements',
    href: '/elements',
    initial: 'C',
    current: false,
    icon: TbPuzzle,
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
                  'text-gray-700 group flex items-center gap-x-2 rounded-md px-2 py-1 text-sm font-bold leading-2 transition-all'
                )}
              >
                <item.icon
                  className={classNames(
                    item.name === currentMenuItem
                      ? 'text-sideBarBlue/80'
                      : 'text-gray-700 group-hover:text-mainBlue/80',
                    'h-5 w-5 shrink-0 transition-all'
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
                  'text-gray-700 group flex items-center gap-x-2 rounded-md px-2 py-1 text-sm font-bold leading-6 transition-all'
                )}
              >
                <team.icon
                  className={classNames(
                    team.name === currentMenuItem
                      ? 'text-sideBarBlue/80'
                      : 'text-gray-700 group-hover:text-mainBlue/80',
                    'h-5 w-5 shrink-0 transition-all'
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
