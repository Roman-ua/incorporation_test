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
        'inline-flex items-center justify-center whitespace-nowrap text-sm font-medium transition-all disabled:pointer-events-none disabled:opacity-50 hover:opacity-100 [&_svg]:pointer-events-none outline-none border bg-background shadow-xs  hover:cursor-pointer h-7 rounded-md gap-1.5 px-3',
        active ? 'opacity-100' : 'opacity-50'
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
