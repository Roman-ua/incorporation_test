import React from 'react';
import { MdOutlineCopyAll } from 'react-icons/md';

const statusBadge = (status: string) => {
  switch (status) {
    case 'Active':
      return 'bg-green-50 text-green-700 ring-green-600/20';
    case 'Inactive':
      return 'bg-red-50 text-red-700 ring-red-600/20';
    case 'Dissolved':
      return 'bg-gray-50 text-gray-700 ring-gray-600/20';
    case 'Withdrawn':
      return 'bg-gray-50 text-gray-700 ring-gray-600/20';
    default:
      return 'bg-red-50 text-red-700 ring-red-600/20';
  }
};

function classNames(...classes: (string | boolean)[]) {
  return classes.filter(Boolean).join(' ');
}

const UserGeneralInfo = () => {
  return (
    <div className="mb-12">
      <div className="pb-7 pt-1.5 border-b flex items-center justify-between">
        <div className="flex items-center justify-start">
          <div className="p-2 rounded-full bg-gray-400 text-xl font-black text-white mr-3">
            JD
          </div>
          <div className="text-xl font-bold text-gray-700">John Doe</div>
        </div>
        <div className="text-sm text-sideBarBlue font-bold hover:cursor-pointer">
          Edit
        </div>
      </div>
      <dl className="w-full pt-4 flex items-center justify-start">
        <div className="flex flex-col gap-y-1 pr-5">
          <dt className="text-sm text-gray-500">User ID</dt>
          <dd className="text-sm font-semibold tracking-tight text-gray-700 flex items-center">
            u_1v2FG
            <MdOutlineCopyAll className="text-base ml-2 text-gray-400 hover:text-gray-700 hover:cursor-pointer" />
          </dd>
        </div>
        <div className="flex flex-col gap-y-1 border-l border-gray-100 px-5">
          <dt className="text-sm text-gray-500">Email</dt>
          <dd className="text-sm font-semibold tracking-tight text-gray-700 flex items-center">
            john.do@example.com
            <MdOutlineCopyAll className="text-base ml-2 text-gray-400 hover:text-gray-700 hover:cursor-pointer" />
          </dd>
        </div>
        <div className="flex flex-col gap-y-1 border-l border-gray-100 px-5">
          <dt className="text-sm text-gray-500">Phone number</dt>
          <dd className="text-sm font-semibold tracking-tight text-gray-700 flex items-center">
            +1-212-456-7890
            <MdOutlineCopyAll className="text-base ml-2 text-gray-400 hover:text-gray-700 hover:cursor-pointer" />
          </dd>
        </div>
        <div className="flex flex-col gap-y-1 border-l border-gray-100 px-5">
          <dt className="text-sm text-gray-500">Status</dt>
          <span
            className={classNames(
              'w-fit inline-flex items-center rounded-md  px-2 py-0.5 text-xs font-medium  ring-1 ring-inset',
              statusBadge('Active')
            )}
          >
            Active
          </span>
        </div>
      </dl>
    </div>
  );
};

export default UserGeneralInfo;
