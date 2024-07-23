import React, { useState } from 'react';
import { CheckIcon } from '@heroicons/react/20/solid';

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
    <>
      <h2 className="text-xl font-semibold mb-4">Select Registration State</h2>
      <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-2">
        {states.map((item) => {
          return (
            <div
              key={item}
              onClick={() => {
                setSelectedState(item);
                changeEvent(item);
              }}
              className={classNames(
                'relative overflow-hidden rounded-lg bg-white px-4 py-5 shadow-[0_2px_6px_rgb(0,0,0,0.2)] sm:px-6 sm:py-5',
                'hover:cursor-pointer',
                selectedState === item
                  ? 'border-2 border-green-500 bg-white'
                  : 'border-2 border-gray-100 bg-gray-100'
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
                    <CheckIcon className="w-3 h-3" />
                    Selected
                  </span>
                )}
              </dd>
            </div>
          );
        })}
      </div>
    </>
  );
};

export default StateCards;
