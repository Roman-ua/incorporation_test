import React, { useState } from 'react';
import SectionHeading from './SectionHeading';
import CheckBox from '../../../components/shared/CheckBox';
import StateIconHandler from '../../../components/shared/StateIconHandler';

function classNames(...classes: (string | boolean)[]) {
  return classes.filter(Boolean).join(' ');
}

interface IProps {
  changeEvent: (value: string) => void;
  value: string;
  state: string[];
  title: string;
  secondTitle?: string;
  requiredError?: boolean;
}
const StateCards = ({
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
      <div className="grid gap-2 sm:grid-cols-2 lg:grid-cols-2">
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
                'flex border group overflow-hidden rounded-lg relative flex-wrap items-baseline justify-between gap-x-4 gap-y-2 px-5 py-5 hover:cursor-pointer',
                'transition-all duration-150 ease-in-out',
                'hover:cursor-pointer',
                selectedState === item ? 'bg-green-50' : 'bg-inputBackground',
                requiredError ? 'border-red-500' : '',
                selectedState !== item && 'hover:bg-white'
              )}
            >
              <div className="absolute right-0 -top-1 rotate-12">
                <StateIconHandler state={item} simpleIcon={false} />
              </div>
              <dt className="flex items-center justify-start">
                <CheckBox
                  wrapperSize={'w-5 h-5'}
                  iconSize={'w-2.5 h-2.5'}
                  isItemHovered={hoveredItem === item}
                  isItemSelected={selectedState === item}
                />
                <p
                  className={classNames(
                    'text-xl font-bold text-gray-900 ml-2 flex items-center'
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
