import React from 'react';
import { ArrowRightIcon } from '@heroicons/react/20/solid';

interface IProps {
  title: string;
}
const ButtonWithArrow = ({ title }: IProps) => {
  return (
    <button className="relative inline-flex rounded-md bg-mainBlue items-center justify-start py-2.5 pl-4 pr-5 overflow-hidden font-semibold transition-all duration-150 ease-in-out group hover:bg-sideBarBlue">
      <span className="text-sm font-semibold text-white relative w-full text-left transition-colors duration-200 ease-in-out">
        {title}
      </span>
      <ArrowRightIcon className="w-5 stroke-white fill-white translate-x-1 group-hover:translate-x-2 transition-all duration-200 ease-in-out" />
    </button>
  );
};

export default ButtonWithArrow;
