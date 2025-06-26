import React from 'react';
import { Check } from 'lucide-react';
import { classNames } from '../../../utils/helpers';
import { inputSimpleFocus } from '../../../constants/form/form';

interface SearchHeaderProps {
  filter: string;
  setFilter: (value: string) => void;
  showColumnsMenu: boolean;
  setShowColumnsMenu: (value: boolean) => void;
  columns: {
    key: string;
    label: string;
    sortable: boolean;
  }[];
  visibleColumns: string[];
  handleColumnVisibility: (columnKey: string) => void;
}

const SearchHeader = ({
  filter,
  setFilter,
  showColumnsMenu,
  setShowColumnsMenu,
  columns,
  visibleColumns,
  handleColumnVisibility,
}: SearchHeaderProps) => {
  return (
    <div className="flex items-center gap-10 mb-6">
      <div className="flex-1 relative">
        <input
          type="text"
          placeholder={`Search...`}
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
          className={classNames(
            'w-1/2 px-3 py-0.5 border flex h-8 min-w-0 shadow-xs border-gray-200 rounded-md focus:outline-none ring-offset-0 text-sm placeholder:text-gray-400',
            inputSimpleFocus
          )}
        />
      </div>
      <div className="relative">
        <button
          onClick={() => setShowColumnsMenu(!showColumnsMenu)}
          className="inline-flex items-center justify-center whitespace-nowrap border-gray-200 text-sm font-medium transition-all disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg:not([class*='size-'])]:size-4 shrink-0 [&_svg]:shrink-0 outline-none focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive border bg-background shadow-xs hover:bg-gray-50 hover:text-accent-foreground dark:bg-input/30 dark:border-input dark:hover:bg-input/50 h-8 rounded-md gap-1.5 px-3 has-[>svg]:px-2.5"
        >
          Columns
          <svg
            className={classNames(
              'w-4 h-4 transition-transform duration-200',
              showColumnsMenu ? 'rotate-180' : ''
            )}
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M19 9l-7 7-7-7"
            />
          </svg>
        </button>

        {showColumnsMenu && (
          <div className="absolute right-0 top-full mt-2 w-48 bg-white border border-gray-200 rounded-md shadow-md z-10">
            <div className="p-1">
              {columns.map((col) => (
                <label
                  key={col.key}
                  onClick={() => handleColumnVisibility(col.key)}
                  className="relative flex items-center gap-2 py-1.5 pr-2 pl-8 hover:bg-gray-50 text-sm cursor-pointer rounded-md"
                >
                  {visibleColumns.includes(col.key) && (
                    <Check className="absolute left-2 top-1/2 -translate-y-1/2 w-4 h-4" />
                  )}
                  {col.label}
                </label>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default SearchHeader;
