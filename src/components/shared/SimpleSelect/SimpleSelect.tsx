import React from 'react';
import { classNames } from '../../../utils/helpers';
import { ChevronDownIcon } from '@heroicons/react/20/solid';

interface IProps {
  list: string[];
  currentItem: string;
  valueHandler: (item: string) => void;
  mandatoryError: boolean;
}

const SimpleSelect = ({
  list,
  currentItem,
  valueHandler,
  mandatoryError,
}: IProps) => {
  const [selected, setSelected] = React.useState(currentItem);
  const [openState, setOpenState] = React.useState(false);

  return (
    <div className="relative inline-block overflow-visible w-full">
      <div
        onClick={() => setOpenState(!openState)}
        className={classNames(
          'rounded-md border w-full border-gray-200 p-2 hover:cursor-pointer focus:ring-none focus:outline-none text-center inline-flex items-center justify-between',
          mandatoryError && !selected && 'bg-red-50'
        )}
      >
        <span
          className={classNames(
            'text-base',
            !selected ? 'text-gray-500' : 'text-gray-900'
          )}
        >
          {selected || 'Choose title'}
        </span>
        <ChevronDownIcon
          className={classNames(
            'w-4 h-4 text-gray-500 transition-all',
            openState ? 'transform rotate-180' : ''
          )}
        />
      </div>

      {openState && (
        <div className="mb-2 w-full top-11 absolute z-20 bg-white divide-y divide-gray-100 rounded-lg shadow ">
          <div className="py-2 text-gray-900 ">
            {list.map((item) => (
              <div
                className="hover:cursor-pointer hover:bg-gray-50"
                key={item}
                onClick={() => {
                  setSelected(item);
                  valueHandler(item);
                  setOpenState(false);
                }}
              >
                <span className="block px-4 py-2 text-base">{item}</span>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default SimpleSelect;
