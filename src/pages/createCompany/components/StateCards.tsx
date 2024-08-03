import React, { useState } from 'react';
import SectionHeading from './SectionHeading';
import { CheckIcon } from '@heroicons/react/20/solid';

function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(' ');
}

interface IProps {
  changeEvent: (value: string) => void;
  value: string;
  state: string[];
  title: string;
  secondTitle?: string;
}
const StateCards = ({ changeEvent, value, state, title }: IProps) => {
  const [selectedState, setSelectedState] = useState(value);

  return (
    <>
      <SectionHeading text={title} status={!!value} />
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
                'flex border rounded-lg relative flex-wrap items-baseline justify-between gap-x-4 gap-y-2 px-6 py-8 bg-white hover:bg-gray-100 hover:cursor-pointer',
                'hover:cursor-pointer',
                selectedState === item ? 'bg-green-50' : ''
              )}
            >
              <dt className="flex items-center justify-start">
                <span
                  className={classNames(
                    'w-5 h-5 border rounded-full flex items-center justify-center',
                    selectedState === item ? 'bg-green-500' : ''
                  )}
                >
                  {selectedState === item && (
                    <CheckIcon className="w-3 h-3 text-white" />
                  )}
                </span>
                <p
                  className={classNames(
                    'text-2xl font-bold text-gray-900 ml-2'
                  )}
                >
                  {item}
                </p>
              </dt>
            </div>
          );
        })}
      </div>
    </>
  );
};

export default StateCards;
