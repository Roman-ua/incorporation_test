import React, { useState } from 'react';
import { CheckIcon } from '@heroicons/react/20/solid';
import SectionHeading from './SectionHeading';

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
              className={classNames(
                'flex relative flex-wrap items-baseline justify-between gap-x-4 gap-y-2 px-6 py-8 bg-white hover:bg-gray-100 hover:cursor-pointer',
                index === 0 &&
                  'rounded-tl-lg lg:rounded-bl-lg max-lg:rounded-tr-lg',
                index === 2 &&
                  'lg:rounded-tr-lg rounded-br-lg max-lg:rounded-bl-lg',
                selectedState === stat.shortName ? 'bg-green-50' : ''
              )}
            >
              <div className="flex items-center justify-start">
                <span
                  className={classNames(
                    'w-4 h-4 border rounded flex items-center justify-center',
                    selectedState === stat.shortName ? 'bg-green-500' : ''
                  )}
                >
                  {selectedState === stat.shortName && (
                    <CheckIcon className="w-3 h-3 text-white" />
                  )}
                </span>
                <dt className="text-sm font-medium leading-6 text-gray-500 ml-2">
                  {stat.fullName}
                </dt>
              </div>

              <dd className="w-full flex-none text-2xl font-bold leading-10 tracking-tight text-gray-900">
                {stat.shortName}
              </dd>
            </div>
          ))}
        </dl>
      </div>
    </>
  );
};

export default JoinedCard;
