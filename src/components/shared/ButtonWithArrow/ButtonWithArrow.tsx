import React from 'react';
import Arrow from '../../../images/svgIcons/Arrow';
// import styles from './ButtonWithArrow.module.scss';
// function classNames(...classes: (string | boolean)[]) {
//   return classes.filter(Boolean).join(' ');
// }
const ButtonWithArrow = () => {
  return (
    <button className="relative inline-flex rounded-md bg-mainBlue items-center justify-start py-2.5 pl-4 pr-6 overflow-hidden font-semibold transition-all duration-150 ease-in-out group hover:bg-sideBarBlue">
      <span className="text-sm font-semibold text-white relative w-full text-left transition-colors duration-200 ease-in-out">
        Next Step
      </span>
      <Arrow />
    </button>
  );
};

export default ButtonWithArrow;
