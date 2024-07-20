import React, { useState } from 'react';

const states = ['Florida', 'Texas', 'Delaware', 'California'];

function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(' ');
}

interface IProps {
  changeEvent: (value: string) => void;
  value: string;
}
const StateCards = ({ changeEvent, value }: IProps) => {
  const [selectedState, setSelectedState] = useState(value || 'Texas');

  return (
    <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-2 mt-12">
      {states.map((item) => {
        return (
          <div
            key={item}
            onClick={() => {
              setSelectedState(item);
              changeEvent(item);
            }}
            className={classNames(
              'relative overflow-hidden rounded-lg bg-white px-4 py-5 shadow sm:px-6 sm:py-5',
              'hover:cursor-pointer',
              selectedState === item
                ? 'border-2 border-green-500'
                : 'border-2 border-white'
            )}
          >
            <dt>
              <p className="truncate text-sm font-medium text-gray-500">
                Registration state
              </p>
            </dt>
            <dd className="flex items-end justify-between w-full">
              <p className="text-2xl font-semibold text-gray-900">{item}</p>
              {selectedState === item && (
                <span className="inline-flex items-center gap-x-1.5 rounded-md bg-green-100 px-2 py-1 text-xs font-medium text-green-700">
                  <svg
                    viewBox="0 0 6 6"
                    aria-hidden="true"
                    className="h-1.5 w-1.5 fill-green-500"
                  >
                    <circle r={3} cx={3} cy={3} />
                  </svg>
                  Selected
                </span>
              )}
            </dd>
          </div>
        );
      })}
    </div>
  );
};

export default StateCards;
