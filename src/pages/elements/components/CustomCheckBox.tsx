import React from 'react';
import SectionHeading from '../../createCompany/components/SectionHeading';
import darkCheck from '../../../images/checkIcons/check.png';
import greenCheck from '../../../images/checkIcons/checkDarkGreen.png';
import checkMark from '../../../images/checkIcons/checking-mark.png';
import greenCheckMark from '../../../images/checkIcons/checking-mark-dark-green.png';

const items = [1, 2];

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
              src={greenCheck}
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
            <img src={checkMark} alt="check" className="w-3 h-3 inline-block" />
          )}
          {selectedState === item && (
            <img
              src={greenCheckMark}
              alt="check"
              className="w-3 h-3 inline-block"
            />
          )}
        </>
      );
    }
  };
  return (
    <div className="mb-20">
      <SectionHeading text={'Check-box'} status={!!selectedState} hideStatus />
      <div className="flex items-center justify-start gap-2">
        {items.map((item) => {
          return (
            <div key={item} className="flex flex-col items-center">
              <span className="text-xs font-bold mb-2 text-gray-700">
                {item}
              </span>
              <span
                onClick={() => setSelectedState(item)}
                onMouseEnter={() => setHoveredItem(item)}
                onMouseLeave={() => setHoveredItem(0)}
                className={classNames(
                  'w-6 h-6 border rounded-full flex items-center justify-center hover:cursor-pointer',
                  selectedState === item && 'bg-green-300 border-white',
                  hoveredItem === item &&
                    selectedState !== item &&
                    'bg-gray-200'
                )}
              >
                {iconsHandler(item)}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default CustomCheckBox;
