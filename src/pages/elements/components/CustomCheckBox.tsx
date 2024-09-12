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
  const [selectedState, setSelectedState] = React.useState<number[]>([]);
  const [hoveredItem, setHoveredItem] = React.useState(0);

  const handleToggleNumber = (number: number) => {
    setSelectedState((prevState) => {
      if (prevState.includes(number)) {
        return prevState.filter((item) => item !== number);
      } else {
        return [...prevState, number];
      }
    });
  };

  const iconsHandler = (item: number) => {
    if (item === 1) {
      return (
        <>
          {hoveredItem === item && !selectedState.includes(item) && (
            <img src={darkCheck} alt="check" className="w-3 h-3 inline-block" />
          )}
          {selectedState.includes(item) && (
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
          {hoveredItem === item && !selectedState.includes(item) && (
            <img src={checkMark} alt="check" className="w-3 h-3 inline-block" />
          )}
          {selectedState.includes(item) && (
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
        {items.map((item: number) => {
          // if (item === 3) {
          //   return (
          //     <label
          //       key={item}
          //       htmlFor="checkboxScaleUp"
          //       className="flex cursor-pointer items-center gap-2 text-sm font-medium text-neutral-600 dark:text-neutral-300 [&:has(input:checked)]:text-neutral-900 dark:[&:has(input:checked)]:text-white [&:has(input:disabled)]:cursor-not-allowed [&:has(input:disabled)]:opacity-75"
          //     >
          //       <div
          //         onClick={() => handleToggleNumber(item)}
          //         className="relative flex items-center"
          //       >
          //         <input
          //           id="checkboxScaleUp"
          //           type="checkbox"
          //           className={classNames(
          //             "before:content[''] peer relative size-6 cursor-pointer appearance-none overflow-hidden rounded-full border border-neutral-300 bg-neutral-50 before:absolute before:inset-0 before:scale-0 before:rounded-full before:transition before:duration-200 checked:border-green-300",
          //             'checked:before:scale-125 checked:before:bg-green-300 focus:outline-none active:outline-offset-0 disabled:cursor-not-allowed'
          //           )}
          //           checked={selectedState.includes(3)}
          //         />
          //         <svg
          //           xmlns="http://www.w3.org/2000/svg"
          //           viewBox="0 0 24 24"
          //           aria-hidden="true"
          //           stroke="currentColor"
          //           fill="none"
          //           strokeWidth="4"
          //           className="pointer-events-none invisible absolute left-1/2 top-1/2 size-4 -translate-x-1/2 -translate-y-1/2 scale-0 transition duration-200 delay-200 peer-checked:scale-100 text-black peer-checked:visible"
          //         >
          //           <path
          //             strokeLinecap="round"
          //             strokeLinejoin="round"
          //             d="M4.5 12.75l6 6 9-13.5"
          //           />
          //         </svg>
          //       </div>
          //       <span>Check Me</span>
          //     </label>
          //   );
          // }
          return (
            <div key={item} className="flex flex-col items-center">
              <span className="text-xs font-bold mb-2 text-gray-700">
                {item}
              </span>
              <span
                onClick={() => handleToggleNumber(item)}
                onMouseEnter={() => setHoveredItem(item)}
                onMouseLeave={() => setHoveredItem(0)}
                className={classNames(
                  'w-6 h-6 border rounded-full flex items-center justify-center hover:cursor-pointer',
                  selectedState.includes(item) && 'bg-green-300 border-white',
                  hoveredItem === item &&
                    !selectedState.includes(item) &&
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
