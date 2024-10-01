import React, { useState } from 'react';
import SectionHeading from './SectionHeading';
import CheckBox from '../../../components/shared/CheckBox';
import StateIconHandler from '../../../components/shared/StateIconHandler';

interface IProps {
  changeEvent: (value: string) => void;
  value: string;
  state: { fullName: string; shortName: string; title?: string }[];
  title: string;
  requiredError?: boolean;
}

function classNames(...classes: (string | boolean)[]) {
  return classes.filter(Boolean).join(' ');
}

const SeparatedCards = ({
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
      <div className="w-full">
        <dl className="mx-auto grid grid-cols-1 gap-2 md:grid-cols-1 lg:grid-cols-2">
          {state.map((stat) => (
            <div
              key={`${stat.fullName}`}
              onClick={() => {
                setSelectedState(stat.fullName);
                changeEvent(stat.fullName);
              }}
              onMouseEnter={() => setHoveredItem(stat.fullName)}
              onMouseLeave={() => setHoveredItem('')}
              className={classNames(
                'flex relative group border rounded-lg flex-wrap items-baseline justify-between gap-x-4 gap-y-1 px-5 py-3.5 hover:cursor-pointer',
                'transition-all duration-150 ease-in-out overflow-hidden',
                selectedState === stat.fullName
                  ? 'bg-green-50'
                  : 'bg-inputBackground',
                requiredError ? 'border-red-500' : '',
                selectedState !== stat.fullName && 'hover:bg-white'
              )}
            >
              {stat.title && (
                <div className="absolute right-0 -top-1 rotate-12">
                  <StateIconHandler state={stat.title} simpleIcon={false} />
                </div>
              )}
              <div className="flex items-center justify-start">
                <CheckBox
                  wrapperSize={'w-5 h-5'}
                  iconSize={'w-2.5 h-2.5'}
                  isItemHovered={hoveredItem === stat.fullName}
                  isItemSelected={selectedState === stat.fullName}
                />
                <dt className="text-xl font-bold text-gray-800 ml-2 flex items-center">
                  {stat.shortName}
                </dt>
              </div>

              <dd className="pl-7 w-full flex-none text-sm font-medium tracking-tight text-gray-500">
                {stat.fullName}
              </dd>
            </div>
          ))}
        </dl>
      </div>
    </>
  );
};

export default SeparatedCards;
