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
  const [hoveredItem, setHoveredItem] = useState('');

  return (
    <>
      <SectionHeading text={title} status={!!value} />
      <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-2">
        {state.map((item) => {
          return (
            <div
              key={item}
              onMouseEnter={() => setHoveredItem(item)}
              onMouseLeave={() => setHoveredItem('')}
              onClick={() => {
                setSelectedState(item);
                changeEvent(item);
              }}
              className={classNames(
                'flex border rounded-lg relative flex-wrap items-baseline justify-between gap-x-4 gap-y-2 px-5 py-5 hover:cursor-pointer',
                'hover:cursor-pointer',
                selectedState === item ? 'bg-green-50' : 'bg-gray-50'
              )}
            >
              <dt className="flex items-center justify-start">
                <span
                  className={classNames(
                    'w-4 h-4 border rounded-full flex items-center justify-center',
                    selectedState === item
                      ? 'bg-green-500 border-green-500'
                      : '',
                    hoveredItem === item && selectedState !== item
                      ? 'bg-gray-200'
                      : ''
                  )}
                >
                  {hoveredItem === item && selectedState !== item && (
                    <CheckIcon className="w-3 h-3 text-gray-900" />
                  )}
                  {selectedState === item && (
                    <CheckIcon className="w-3 h-3 text-white" />
                  )}
                </span>
                <p
                  className={classNames('text-xl font-bold text-gray-900 ml-2')}
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
