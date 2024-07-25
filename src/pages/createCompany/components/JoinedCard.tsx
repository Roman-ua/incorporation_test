import React, { useState } from 'react';
import { CheckIcon } from '@heroicons/react/20/solid';

interface IProps {
  changeEvent: (value: string) => void;
  value: string;
  state: { fullName: string; shortName: string }[];
  title: string;
  // extraStyles?: string;
  // secondTitle?: string;
}

const JoinedCard = ({
  changeEvent,
  value,
  state,
  title,
  // extraStyles,
  // secondTitle,
}: IProps) => {
  const [selectedState, setSelectedState] = useState(
    value || state[0].shortName
  );

  return (
    <>
      <h2 className="text-3xl font-semibold mb-8">{title}</h2>
      <div className="w-full border">
        <dl className="mx-auto grid grid-cols-1 gap-px bg-gray-900/5 sm:grid-cols-2 lg:grid-cols-3">
          {state.map((stat) => (
            <div
              key={`${stat.fullName}`}
              onClick={() => {
                setSelectedState(stat.shortName);
                changeEvent(stat.fullName);
              }}
              className="flex relative flex-wrap items-baseline justify-between gap-x-4 gap-y-2 bg-white px-6 py-8"
            >
              <dt className="text-sm font-medium leading-6 text-gray-500">
                {stat.fullName}
              </dt>
              {selectedState === stat.shortName && (
                <span className="p-1 rounded-full bg-green-500 absolute top-8 right-6">
                  <CheckIcon className="w-3 h-3 text-white" />
                </span>
              )}
              <dd className="w-full flex-none text-3xl font-medium leading-10 tracking-tight text-gray-900">
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
