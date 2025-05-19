import { LayoutGrid } from 'lucide-react';
import React from 'react';

import { classNames } from '../../../utils/helpers';

const WorkspacesListHeaderCompanies = () => {
  return (
    <div className="p-1">
      <div className="relative w-full">
        <button
          className={classNames(
            'w-full flex items-center gap-2 p-2 rounded-md transition-colors hover:cursor-default'
          )}
        >
          <div className="flex-shrink-0 w-8 h-8 rounded-lg overflow-hidden">
            <div className="flex-shrink-0 w-8 h-8 rounded-lg overflow-hidden flex items-center border border-gray-200 justify-center">
              <LayoutGrid className="w-4 h-4" />
            </div>
          </div>
          <div className="flex flex-col gap-0.5 leading-none text-left min-w-0">
            <span className="text-sm font-semibold truncate">
              All Companies
            </span>
          </div>
        </button>
      </div>
    </div>
  );
};

export default WorkspacesListHeaderCompanies;
