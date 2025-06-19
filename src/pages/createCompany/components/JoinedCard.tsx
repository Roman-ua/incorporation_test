import React, { useState } from 'react';
import SectionHeading from './SectionHeading';
import CheckBox from '../../../components/shared/CheckBox';

interface IProps {
  changeEvent: (value: string) => void;
  value: string;
  state: { fullName: string; shortName: string }[];
  title: string;
  requiredError?: boolean;
}

function classNames(...classes: (string | boolean)[]) {
  return classes.filter(Boolean).join(' ');
}

const JoinedCard = ({
  changeEvent,
  value,
  state,
  title,
  requiredError,
}: IProps) => {
  const [selectedState, setSelectedState] = useState(value);
  const [hoveredItem, setHoveredItem] = useState('');

  return (
    <>
      <SectionHeading text={title} status={!!value} hideStatus={true} />
      <div
        className={classNames(
          'w-full border rounded-lg',
          requiredError ? 'border-red-500' : ''
        )}
      >
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
                'flex relative flex-wrap items-baseline justify-between gap-x-4 gap-y-1.5 px-5 py-3.5 hover:cursor-pointer',
                'transition-all duration-150 ease-in-out',
                index === 0 &&
                  'rounded-tl-lg lg:rounded-bl-lg max-lg:rounded-tr-lg',
                index === 2 &&
                  'lg:rounded-tr-lg rounded-br-lg max-lg:rounded-bl-lg',
                selectedState === stat.shortName
                  ? 'bg-green-50'
                  : 'bg-inputBackground',
                selectedState !== stat.shortName && 'hover:bg-white'
              )}
            >
              <div className="flex items-center justify-start">
                <CheckBox
                  wrapperSize={'w-5 h-5'}
                  iconSize={'w-2.5 h-2.5'}
                  isItemHovered={hoveredItem === stat.shortName}
                  isItemSelected={selectedState === stat.shortName}
                />
                <dt className="text-xl font-bold text-gray-800 ml-2">
                  {stat.shortName}
                </dt>
              </div>

              <dd className="pl-7 w-full flex-none text-sm font-medium   text-gray-500">
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
