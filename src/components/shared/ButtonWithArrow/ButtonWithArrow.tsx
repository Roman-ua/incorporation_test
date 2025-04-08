import React from 'react';
import { ArrowRightIcon } from '@heroicons/react/20/solid';
import { classNames } from '../../../utils/helpers';

interface IProps {
  title: string;
  disabled?: boolean;
  clickHandler?: () => void;
}
const ButtonWithArrow = ({ title, disabled, clickHandler }: IProps) => {
  return (
    <button
      disabled={disabled}
      onClick={clickHandler}
      className={classNames(
        'relative inline-flex rounded-md bg-mainBlue items-center justify-start py-2.5 pl-4 pr-5 overflow-hidden font-semibold transition-all duration-150 ease-in-out hover:bg-sideBarBlue disabled:bg-gray-500',
        !disabled && 'group'
      )}
    >
      <span className="text-sm font-semibold text-white relative w-full text-left transition-colors duration-200 ease-in-out">
        {title}
      </span>
      <ArrowRightIcon className="w-5 stroke-white fill-white translate-x-1 group-hover:translate-x-2 transition-all duration-200 ease-in-out" />
    </button>
  );
};

export default ButtonWithArrow;
