// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-nocheck
import React from 'react';
import { Menu, MenuButton, MenuItem, MenuItems } from '@headlessui/react';
import { ChevronDownIcon } from '@heroicons/react/16/solid';
import { useNavigate } from 'react-router-dom';
import { ROUTES } from '../../../constants/navigation/routes';
import {
  BuildingOfficeIcon,
  PlusCircleIcon,
} from '@heroicons/react/24/outline';

function classNames(...classes: (string | boolean)[]) {
  return classes.filter(Boolean).join(' ');
}

const CompanyDropDown = () => {
  const navigate = useNavigate();

  const currentCompany = JSON.parse(
    localStorage.getItem('multistep-form-data')
  );
  const [selectedState, setSelectedState] = React.useState(
    currentCompany?.stepOneData?.companyName || 'Company Name'
  );

  return (
    <div className="text-left w-full relative">
      <Menu>
        <MenuButton className="w-60 inline-flex items-center justify-between border gap-2 rounded bg-gray-50/90 py-1 px-3 text-sm/6 font-semibold text-gray-700 shadow-inner shadow-white/10 focus:outline-none data-[hover]:bg-mainBlue data-[hover]:text-white data-[open]:bg-mainBlue data-[open]:text-white data-[focus]:outline-1 data-[focus]:outline-white">
          <div className="flex items-center">
            <BuildingOfficeIcon className="w-4 h-4 mr-2" />
            {selectedState}
          </div>
          <ChevronDownIcon className="size-4" />
        </MenuButton>

        <MenuItems
          transition
          anchor="right"
          className="z-50 w-60 origin-top-right rounded border bg-white p-1 text-sm/6 text-gray-700 transition duration-100 ease-out [--anchor-gap:var(--spacing-1)] focus:outline-none data-[closed]:scale-95 data-[closed]:opacity-0"
        >
          <MenuItem>
            <button
              onClick={() => setSelectedState('Company ABC')}
              className={classNames(
                'group flex w-full items-center gap-2 rounded py-1 px-3 data-[focus]:bg-gray-100',
                selectedState === 'Company ABC' && 'bg-gray-200 text-gray-700'
              )}
            >
              Company ABC
            </button>
          </MenuItem>
          <MenuItem>
            <button
              onClick={() => setSelectedState('Second Company ABC ')}
              className={classNames(
                'group flex w-full items-center gap-2 rounded py-1 px-3 data-[focus]:bg-gray-100',
                selectedState === 'Second Company ABC ' &&
                  'bg-gray-200 text-gray-700'
              )}
            >
              Second Company ABC
            </button>
          </MenuItem>
          <div className="my-1 h-px bg-gray-200" />
          <MenuItem>
            <button
              onClick={() => navigate(ROUTES.CREATE_COMPANY)}
              className="group flex w-full items-center justify-between gap-2 rounded py-1 px-3 data-[focus]:bg-gray-100"
            >
              Create New Company
              <PlusCircleIcon className="w-6 h-6" />
            </button>
          </MenuItem>
        </MenuItems>
      </Menu>
    </div>
  );
};

export default CompanyDropDown;
