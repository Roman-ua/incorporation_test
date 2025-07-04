import React from 'react';
import { classNames } from '../../../utils/helpers';

interface ButtonWithIconProps {
  onClick: () => void;
  title: string;
  icon: React.ReactNode;
  disabled?: boolean;
  active?: boolean;
}

const ButtonWithIcon = ({
  onClick,
  title,
  icon,
  disabled,
  active,
}: ButtonWithIconProps) => {
  return (
    <button
      disabled={disabled}
      className={classNames(
        ' inline-flex items-center justify-center whitespace-nowrap text-sm font-medium transition-all disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none outline-none border bg-background shadow-xs  hover:cursor-pointer h-8 rounded-md gap-1.5 px-3',
        active
          ? 'bg-gray-700 text-white hover:bg-gray-800 border-gray-700'
          : 'text-gray-700 hover:bg-foregraund border-gray-200'
      )}
      onClick={(e) => {
        e.preventDefault();
        onClick();
      }}
    >
      {icon}
      <span>{title}</span>
    </button>
  );
};

export default ButtonWithIcon;
