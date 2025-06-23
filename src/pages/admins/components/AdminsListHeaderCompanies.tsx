import React from 'react';

import { classNames } from '../../../utils/helpers';
import { TbUserShield } from 'react-icons/tb';

const AdminsListHeaderCompanies = () => {
  return (
    <div className="p-2 w-full">
      <div className="relative">
        <button
          className={classNames(
            'flex items-center gap-2 p-2 rounded-md transition-colors hover:cursor-pointer'
          )}
        >
          <div className="flex-shrink-0 w-8 h-8 rounded-lg overflow-hidden">
            <div className="flex-shrink-0 w-8 h-8 rounded-lg overflow-hidden flex items-center border border-gray-200 justify-center">
              <TbUserShield className="w-4 h-4" />
            </div>
          </div>
          <div className="flex flex-col gap-0.5 leading-none text-left min-w-0">
            <span className="text-sm font-semibold truncate">Internal</span>
          </div>
        </button>
      </div>
    </div>
  );
};

export default AdminsListHeaderCompanies;
