import React from 'react';
import { classNames } from '../../../utils/helpers';

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
    <div className="flex flex-col md:flex-row items-start gap-8 p-4 bg-gray-50 rounded-md">
      {picture ? (
        <img
          src={picture || '/placeholder.svg'}
          alt={name}
          className="object-cover"
        />
      ) : (
        <div className="relative h-20 w-20 rounded-full overflow-hidden shadow-sm bg-gray-300 flex items-center justify-center text-white text-5xl font-bold">
          {name[0]}
        </div>
      )}

      <div className="flex-1 space-y-3">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-2">
          <h1 className="text-2xl font-medium tracking-tight">{name}</h1>
          <div className="text-sm font-medium text-slate-500">ID: {id}</div>
        </div>

        <div className="flex items-center gap-2">
          <span
            className={classNames(
              'w-fit inline-flex items-center rounded-md  px-2 py-1 text-xs font-medium  ring-1 ring-inset',
              statusBadge(status)
            )}
          >
            {status}
          </span>
        </div>

        <div className="pt-2">
          {email ? (
            <p className="text-sm text-slate-700">
              <span className="font-medium">Email:</span> {email}
            </p>
          ) : (
            <div className="w-full flex justify-end">
              <button
                onClick={onAddEmail}
                className="text-sm px-3 py-1 text-slate-700 hover:text-slate-900 hover:bg-slate-100 rounded transition-colors"
              >
                Add Email
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
