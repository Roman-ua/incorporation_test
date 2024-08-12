import { CheckCircleIcon } from '@heroicons/react/24/outline';
import React from 'react';
import SectionHeading from '../../createCompany/components/SectionHeading';
import darkCheck from '../../../images/checkIcons/check.png';
import whiteCheck from '../../../images/checkIcons/checkWhite.png';
import checkMark from '../../../images/checkIcons/checking-mark.png';
import whiteCheckMark from '../../../images/checkIcons/checking-mark-white.png';

import { CheckIcon } from '@heroicons/react/20/solid';

const items = [1, 2, 3, 4];

function classNames(...classes: (string | boolean)[]) {
  return classes.filter(Boolean).join(' ');
}

const CustomCheckBox = () => {
  const [selectedState, setSelectedState] = React.useState(0);
  const [hoveredItem, setHoveredItem] = React.useState(0);

  const iconsHandler = (item: number) => {
    if (item === 1) {
      return (
        <>
          {hoveredItem === item && selectedState !== item && (
            <img src={darkCheck} alt="check" className="w-3 h-3 inline-block" />
          )}
          {selectedState === item && (
            <img
              src={whiteCheck}
              alt="check"
              className="w-3 h-3 inline-block"
            />
          )}
        </>
      );
    }

    if (item === 2) {
      return (
        <>
          {hoveredItem === item && selectedState !== item && (
            <CheckCircleIcon className="w-6 h-6 text-gray-900" />
          )}
          {selectedState === item && (
            <CheckCircleIcon className="w-6 h-6 text-xl text-white" />
          )}
        </>
      );
    }

    if (item === 3) {
      return (
        <>
          {hoveredItem === item && selectedState !== item && (
            <CheckIcon className="w-4 h-4 text-gray-900" />
          )}
          {selectedState === item && (
            <CheckIcon className="w-4 h-4 text-white" />
          )}
        </>
      );
    }

    if (item === 4) {
      return (
        <>
          {hoveredItem === item && selectedState !== item && (
            <img src={checkMark} alt="check" className="w-3 h-3 inline-block" />
          )}
          {selectedState === item && (
            <img
              src={whiteCheckMark}
              alt="check"
              className="w-3 h-3 inline-block"
            />
          )}
        </>
      );
    }
  };
  return (
    <div className="mb-32">
      <SectionHeading text={'Check-box'} status={!!selectedState} />
      <div className="flex items-center justify-start gap-2">
        {items.map((item) => {
          return (
            <span
              key={item}
              onClick={() => setSelectedState(item)}
              onMouseEnter={() => setHoveredItem(item)}
              onMouseLeave={() => setHoveredItem(0)}
              className={classNames(
                'w-6 h-6 border rounded-full flex items-center justify-center hover:cursor-pointer',
                selectedState === item && 'bg-green-500 border-white',
                hoveredItem === item && selectedState !== item && 'bg-gray-200'
              )}
            >
              {iconsHandler(item)}
            </span>
          );
        })}
      </div>
    </div>
  );
};

export default CustomCheckBox;
