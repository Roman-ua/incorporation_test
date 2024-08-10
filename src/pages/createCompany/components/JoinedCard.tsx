import React, { useState } from 'react';
import SectionHeading from './SectionHeading';
import { CheckCircleIcon } from '@heroicons/react/24/outline';

interface IProps {
  changeEvent: (value: string) => void;
  value: string;
  state: { fullName: string; shortName: string }[];
  title: string;
  // extraStyles?: string;
  // secondTitle?: string;
}

function classNames(...classes: (string | boolean)[]) {
  return classes.filter(Boolean).join(' ');
}

const JoinedCard = ({
  changeEvent,
  value,
  state,
  title,
  // extraStyles,
  // secondTitle,
}: IProps) => {
  const [selectedState, setSelectedState] = useState(value);
  const [hoveredItem, setHoveredItem] = useState('');

  return (
    <>
      <SectionHeading text={title} status={!!value} />
      <div className="w-full border rounded-lg">
        <dl className="mx-auto grid grid-cols-1 gap-px bg-gray-900/5 md:grid-cols-1 lg:grid-cols-3 rounded-lg">
          {state.map((stat, index) => (
            <div
              key={`${stat.fullName}`}
              onClick={() => {
                setSelectedState(stat.shortName);
                changeEvent(stat.shortName);
              }}
              onMouseEnter={() => setHoveredItem(stat.shortName)}
              onMouseLeave={() => setHoveredItem('')}
              className={classNames(
                'flex relative flex-wrap items-baseline justify-between gap-x-4 gap-y-2 px-5 py-4 hover:cursor-pointer',
                index === 0 &&
                  'rounded-tl-lg lg:rounded-bl-lg max-lg:rounded-tr-lg',
                index === 2 &&
                  'lg:rounded-tr-lg rounded-br-lg max-lg:rounded-bl-lg',
                selectedState === stat.shortName ? 'bg-green-50' : 'bg-white'
              )}
            >
              <div className="flex items-center justify-start">
                <span
                  className={classNames(
                    'w-4 h-4 border rounded-full flex items-center justify-center',
                    selectedState === stat.shortName
                      ? 'bg-green-500 border-white'
                      : '',
                    hoveredItem === stat.shortName &&
                      selectedState !== stat.shortName &&
                      'bg-gray-200'
                  )}
                >
                  {hoveredItem === stat.shortName &&
                    selectedState !== stat.shortName && (
                      <CheckCircleIcon className="w-6 h-6 text-gray-900" />
                    )}
                  {selectedState === stat.shortName && (
                    <CheckCircleIcon className="w-6 h-6 text-white" />
                  )}
                </span>
                <dt className="text-xl font-bold text-gray-800 ml-2">
                  {stat.shortName}
                </dt>
              </div>

              <dd className="pl-6 w-full flex-none text-sm font-medium tracking-tight text-gray-500">
                {stat.fullName}
              </dd>
            </div>
          ))}
        </dl>
      </div>
    </>
  );
};

export default JoinedCard;
