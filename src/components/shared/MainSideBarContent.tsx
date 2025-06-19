import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ROUTES } from '../../constants/navigation/routes';
import { TbMail, TbPuzzle, TbReportAnalytics } from 'react-icons/tb';
import { HiOutlineDocumentText } from 'react-icons/hi';
import { LuClipboardList, LuConciergeBell, LuFileStack } from 'react-icons/lu';
import { BiBuildings, BiReceipt } from 'react-icons/bi';
import { IoPeopleOutline } from 'react-icons/io5';
import { ChevronDownIcon } from '@heroicons/react/24/outline';
import { useRecoilValue } from 'recoil';
import WorkspacesState from '../../state/atoms/Workspaces';

function classNames(...classes: (string | boolean)[]) {
  return classes.filter(Boolean).join(' ');
}

const navigation = [
  { name: 'Home', href: ROUTES.HOME, icon: BiBuildings },
  { name: 'Mail', href: ROUTES.MAIL, icon: TbMail },
  { name: 'Documents', href: ROUTES.DOCUMENTS, icon: HiOutlineDocumentText },
  { name: 'Services', href: ROUTES.SERVICES, icon: LuConciergeBell },
  { name: 'Orders', href: ROUTES.ORDERS, icon: LuClipboardList },
  { name: 'Invoices', href: ROUTES.INVOICES, icon: BiReceipt },
  { name: 'People', href: ROUTES.PEOPLE, icon: IoPeopleOutline },
];

const teams = [
  { id: 11, name: 'Elements', href: ROUTES.ELEMENTS, icon: TbPuzzle },
  { id: 12, name: 'Emails', href: ROUTES.EMAILS, icon: LuFileStack },
  {
    id: 13,
    name: 'Annual Report Confirmation',
    href: ROUTES.REPORT_REVIEW,
    icon: TbReportAnalytics,
  },
];

const MainSideBarContent = ({ pathname }: { pathname: string }) => {
  const [elementsOpen, setElementsOpen] = useState(false);
  const navigate = useNavigate();
  const workspacesState = useRecoilValue(WorkspacesState);

  const handleNavigate = (href: string) => {
    if (href === ROUTES.HOME) {
      return `${href}/c_${workspacesState.current?.id}`;
    } else {
      return href;
    }
  };

  return (
    <ul role="list" className="flex flex-1 flex-col gap-y-7">
      <li>
        <ul role="list" className="-mx-2 space-y-1">
          {navigation.map((item) => (
            <li key={item.name}>
              <Link
                to={handleNavigate(item.href)}
                className={classNames(
                  '  text-gray-700 group flex items-center gap-x-2 rounded-md px-2 py-1.5 text-base leading-2 transition-bg hover:bg-gray-200/50 transition-all ease-in-out duration-150',
                  item.href === pathname && 'text-sideBarBlue font-semibold'
                )}
              >
                <item.icon
                  className={classNames(
                    item.href === pathname
                      ? 'text-sideBarBlue'
                      : 'text-gray-700',
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
        <div className="text-sm text-gray-500 mt-7">Internal</div>
        <ul role="list" className="-mx-2 mt-2 space-y-1">
          {teams.map((team) => {
            if (team.name === 'Elements') {
              const isActive = pathname.startsWith(team.href);
              return (
                <li key={team.name}>
                  <button
                    onClick={() => navigate(ROUTES.ELEMENTS)}
                    className={classNames(
                      '  text-gray-700 group flex w-full items-center justify-between gap-x-2 rounded-md px-2 py-1.5 text-base leading-2 transition-bg hover:bg-gray-200/50 transition-all ease-in-out duration-150',
                      isActive && 'text-sideBarBlue font-semibold'
                    )}
                  >
                    <span className="flex items-center gap-x-2">
                      <team.icon
                        className={classNames(
                          isActive ? 'text-sideBarBlue' : 'text-gray-700',
                          'h-5 w-5 shrink-0 transition-all'
                        )}
                        aria-hidden="true"
                      />
                      {team.name}
                    </span>
                    <ChevronDownIcon
                      onClick={() => setElementsOpen(!elementsOpen)}
                      className={classNames(
                        'h-4 w-4 transform transition-transform duration-200',
                        elementsOpen && 'rotate-180'
                      )}
                      aria-hidden="true"
                    />
                  </button>
                  {elementsOpen && (
                    <ul className="mt-1 space-y-1 pl-8">
                      <li>
                        <Link
                          to={ROUTES.ELEMENTS_BUTTONS}
                          className={classNames(
                            'block px-2 py-1 text-sm rounded-md hover:bg-gray-200/50 transition-all ease-in-out duration-150',
                            pathname === ROUTES.ELEMENTS_BUTTONS &&
                              'text-sideBarBlue font-semibold'
                          )}
                        >
                          Buttons
                        </Link>
                      </li>
                      <li>
                        <Link
                          to={ROUTES.ELEMENTS_NOTIONS}
                          className={classNames(
                            'block px-2 py-1 text-sm rounded-md hover:bg-gray-200/50 transition-all ease-in-out duration-150',
                            pathname === ROUTES.ELEMENTS_NOTIONS &&
                              'text-sideBarBlue font-semibold'
                          )}
                        >
                          Notions
                        </Link>
                      </li>
                      <li>
                        <Link
                          to={ROUTES.ELEMENTS_ADDRESS}
                          className={classNames(
                            'block px-2 py-1 text-sm rounded-md hover:bg-gray-200/50 transition-all ease-in-out duration-150',
                            pathname === ROUTES.ELEMENTS_ADDRESS &&
                              'text-sideBarBlue font-semibold'
                          )}
                        >
                          Address
                        </Link>
                      </li>
                    </ul>
                  )}
                </li>
              );
            }

            // Обычные элементы
            const isActive = pathname === team.href;
            return (
              <li key={team.name}>
                <Link
                  to={team.href}
                  className={classNames(
                    '  text-gray-700 group flex items-center gap-x-2 rounded-md px-2 py-1.5 text-base leading-2 transition-bg hover:bg-gray-200/50 transition-all ease-in-out duration-150',
                    isActive && 'text-sideBarBlue font-semibold'
                  )}
                >
                  <team.icon
                    className={classNames(
                      isActive ? 'text-sideBarBlue' : 'text-gray-700',
                      'h-5 w-5 shrink-0 transition-all'
                    )}
                    aria-hidden="true"
                  />
                  <span className="truncate">{team.name}</span>
                </Link>
              </li>
            );
          })}
        </ul>
      </li>

      <li className="-mx-6 mt-auto max-lg:hidden">
        <Link
          to={ROUTES.ACCOUNT}
          className="  flex items-center gap-x-4 px-6 py-3 text-sm font-semibold leading-6 text-gray-900 hover:bg-gray-50"
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
