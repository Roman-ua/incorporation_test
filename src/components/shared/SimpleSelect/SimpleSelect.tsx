import React from 'react';
import { classNames } from '../../../utils/helpers';
import { ChevronDownIcon } from '@heroicons/react/20/solid';

interface IProps {
  list: string[];
  currentItem: string;
  valueHandler: (item: string) => void;
}

const SimpleSelect = ({ list, currentItem, valueHandler }: IProps) => {
  const [selected, setSelected] = React.useState(currentItem);
  const [openState, setOpenState] = React.useState(false);

  return (
    <div className="relative inline-block overflow-visible w-full">
      <button
        onClick={() => setOpenState(!openState)}
        className="rounded-md border w-full border-gray-200 p-2 text-md text-gray-900 focus:ring-none focus:outline-none text-center inline-flex items-center justify-between"
        type="button"
      >
        <span>{selected || 'Dropdown button'}</span>
        <ChevronDownIcon
          className={classNames(
            'w-4 h-4 text-gray-500 transition-all',
            openState ? 'transform rotate-180' : ''
          )}
        />
      </button>

      {openState && (
        <div className="mb-2 w-full top-11 absolute z-20 bg-white divide-y divide-gray-100 rounded-lg shadow ">
          <ul className="py-2 text-sm text-gray-700 dark:text-gray-200">
            {list.map((item) => (
              <li
                key={item}
                onClick={() => {
                  setSelected(item);
                  valueHandler(item);
                  setOpenState(false);
                }}
              >
                <a href="#" className="block px-4 py-2">
                  {item}
                </a>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default SimpleSelect;
