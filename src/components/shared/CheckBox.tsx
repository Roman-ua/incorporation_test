import React from 'react';
import darkCheck from '../../images/checkIcons/check.png';
import greenCheck from '../../images/checkIcons/checkDarkGreen.png';

function classNames(...classes: (string | boolean)[]) {
  return classes.filter(Boolean).join(' ');
}

interface IProps {
  isItemSelected: boolean;
  isItemHovered: boolean;
  wrapperSize?: string;
  iconSize?: string;
}

const CheckBox = ({
  isItemSelected,
  isItemHovered,
  wrapperSize,
  iconSize,
}: IProps) => {
  return (
    <span
      className={classNames(
        'border rounded-full flex items-center justify-center hover:cursor-pointer',
        wrapperSize ? wrapperSize : 'w-6 h-6',
        isItemSelected && 'bg-green-300 border-green-300',
        isItemHovered && !isItemSelected && 'bg-gray-200'
      )}
    >
      <>
        {isItemHovered && !isItemSelected && (
          <img
            src={darkCheck}
            alt="check"
            className={classNames(
              'inline-block',
              iconSize ? iconSize : 'w-3 h-3'
            )}
          />
        )}
        {isItemSelected && (
          <img
            src={greenCheck}
            alt="check"
            className={classNames(
              'inline-block',
              iconSize ? iconSize : 'w-3 h-3'
            )}
          />
        )}
      </>
    </span>
  );
};

export default CheckBox;
