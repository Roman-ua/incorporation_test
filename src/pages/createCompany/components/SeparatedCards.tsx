import React, { useState } from 'react';
import SectionHeading from './SectionHeading';
import CheckBox from '../../../components/shared/CheckBox';

interface IProps {
  changeEvent: (value: string) => void;
  value: string;
  state: { fullName: string; shortName: string }[];
  title: string;
}

function classNames(...classes: (string | boolean)[]) {
  return classes.filter(Boolean).join(' ');
}

const SeparatedCards = ({ changeEvent, value, state, title }: IProps) => {
  const [selectedState, setSelectedState] = useState(value);
  const [hoveredItem, setHoveredItem] = useState('');

  return (
    <>
      <SectionHeading text={title} status={!!value} />
      <div className="w-full">
        <dl className="mx-auto grid grid-cols-1 gap-2 md:grid-cols-1 lg:grid-cols-2">
          {state.map((stat) => (
            <div
              key={`${stat.fullName}`}
              onClick={() => {
                setSelectedState(stat.shortName);
                changeEvent(stat.fullName);
              }}
              onMouseEnter={() => setHoveredItem(stat.shortName)}
              onMouseLeave={() => setHoveredItem('')}
              className={classNames(
                'flex relative border rounded-lg flex-wrap items-baseline justify-between gap-x-4 gap-y-1 px-5 py-3.5 hover:cursor-pointer',
                selectedState === stat.shortName ? 'bg-green-50' : 'bg-white'
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
