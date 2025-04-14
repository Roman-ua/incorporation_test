import React from 'react';
import { classNames } from '../../../utils/helpers';
import { MdOutlineCopyAll } from 'react-icons/md';

interface ProfileHeaderProps {
  id: string;
  name: string;
  status: string;
  email: string;
  picture: string;
  onAddEmail: () => void;
}

const statusBadge = (status: string) => {
  switch (status) {
    case 'Active':
      return 'bg-green-50 text-green-700 ring-green-600/20';
    case 'Inactive':
      return 'bg-red-50 text-red-700 ring-red-600/20';
    case 'Dissolved':
      return 'bg-gray-50 text-gray-900 ring-gray-600/20';
    case 'Withdrawn':
      return 'bg-gray-50 text-gray-900 ring-gray-600/20';
    default:
      return 'bg-red-50 text-red-700 ring-red-600/20';
  }
};

export function ProfileHeader({
  id,
  name,
  status,
  email,
  picture,
  onAddEmail,
}: ProfileHeaderProps) {
  return (
    <>
      <div className="w-full flex items-center justify-between pb-2 pr-2 border-b">
        <div className="text-2xl text-gray-700 flex items-center gap-x-2">
          {picture ? (
            <img
              src={picture || '/placeholder.svg'}
              alt={name}
              className="object-cover"
            />
          ) : (
            <div className="relative h-6 w-6 rounded-full overflow-hidden shadow-sm bg-gray-300 flex items-center justify-center text-white text-xl font-bold">
              {name[0]}
            </div>
          )}
          <span className="text-xl font-bold text-gray-900">{name}</span>
        </div>
        <span className="p-1 rounded flex items-center text-gray-600 text-sm hover:cursor-pointer hover:bg-gray-100 transition-all duration-150 ease-in-out">
          p_{id}
          <MdOutlineCopyAll className="text-base ml-2" />
        </span>
      </div>
      <dl className="w-full mt-4 mb-12 flex items-start justify-start overflow-x-scroll">
        <div className="flex flex-col gap-y-1 pr-6">
          <dt className="text-sm text-gray-500">Status</dt>
          <span
            className={classNames(
              'w-fit inline-flex items-center rounded-md  px-2 py-1 text-xs font-medium  ring-1 ring-inset',
              statusBadge(status)
            )}
          >
            {status}
          </span>
        </div>
        <div className="flex flex-col gap-y-1 border-l px-6">
          <dt className="text-nowrap text-sm text-gray-500">Email</dt>
          <dd>
            {email ? (
              <p className="text-base font-semibold tracking-tight text-gray-700">
                {email}
              </p>
            ) : (
              <div className="w-full flex justify-end">
                <button
                  onClick={onAddEmail}
                  className="text-gray-700 rounded transition-colors text-base hover:text-mainBlue"
                >
                  Add Email
                </button>
              </div>
            )}
          </dd>
        </div>
        <div className="flex flex-col gap-y-1 border-l px-6">
          <dt className="text-nowrap text-sm text-gray-500">Phone Number</dt>
          <dd className="text-base font-semibold tracking-tight text-gray-700">
            +1 234 567 890
          </dd>
        </div>
      </dl>
    </>
  );
}
