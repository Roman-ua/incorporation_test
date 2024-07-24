import React, { useState } from 'react';
import { CheckIcon } from '@heroicons/react/20/solid';

function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(' ');
}

interface IProps {
  changeEvent: (value: string) => void;
  value: string;
  state: string[];
  title: string;
  extraStyles?: string;
  secondTitle?: string;
}
const StateCards = ({
  changeEvent,
  value,
  state,
  title,
  extraStyles,
  secondTitle,
}: IProps) => {
  const [selectedState, setSelectedState] = useState(value || state[0]);

  return (
    <>
      <h2 className="text-3xl font-semibold mb-8">{title}</h2>
      <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-2">
        {state.map((item) => {
          return (
            <div
              key={item}
              onClick={() => {
                setSelectedState(item);
                changeEvent(item);
              }}
              className={classNames(
                'relative overflow-hidden rounded-lg px-4 py-5 shadow-[0_0.5px_4px_rgb(0,0,0,0.2)] sm:px-6 sm:py-5',
                'hover:cursor-pointer',
                selectedState === item
                  ? 'border-2 border-green-500 bg-white'
                  : 'border-2 border-gray-100 bg-gray-100'
              )}
            >
              <dt>
                <p className="truncate text-sm font-medium text-gray-500">
                  {secondTitle}
                </p>
              </dt>
              <dd className="flex items-end justify-between w-full">
                <p
                  className={classNames(
                    'text-2xl font-semibold text-gray-900',
                    extraStyles || ''
                  )}
                >
                  {item}
                </p>
                {selectedState === item && (
                  <span className="absolute top-2 right-2 inline-flex items-center gap-x-1.5 rounded-md bg-green-100 px-2 py-1 text-xs font-medium text-green-700">
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
