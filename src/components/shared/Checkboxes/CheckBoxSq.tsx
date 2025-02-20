import React from 'react';
import { Check } from 'lucide-react';
import { classNames } from '../../../utils/helpers';

interface CheckboxProps {
  id: string;
  title: string;
  checked: boolean;
  wrapperClass: string;
  underInput: boolean;
  onChange: (checked: boolean) => void;
}

export const Checkbox: React.FC<CheckboxProps> = ({
  id,
  title,
  checked,
  onChange,
  underInput,
  wrapperClass,
}) => {
  return (
    <div
      onClick={(e) => {
        e.preventDefault();
        onChange(!checked);
      }}
      className={classNames(
        underInput ? 'py-1' : 'py-3 px-3.5 hover:bg-gray-50',
        'w-fit flex items-center justify-start  rounded-md  transition-all duration-150 ease-in-out hover:cursor-pointer'
      )}
    >
      <button
        id={id}
        className={classNames(
          wrapperClass,
          checked ? 'border-gray-700 bg-gray-700' : 'border-gray-300 bg-white',
          'rounded-md border hover:border-2  relative flex items-center justify-center overflow-hidden transition-all duration-150 ease-in-out'
        )}
      >
        <div
          className={`absolute transform transition-all duration-300 ${checked ? 'scale-100 opacity-100 animate-check-bounce' : 'scale-0 opacity-0'}`}
        >
          <Check className="w-3 h-3 text-white" strokeWidth={3} />
        </div>
      </button>
      <div className="text-sm font-semibold ml-2 whitespace-nowrap">
        {title}
      </div>
    </div>
  );
};
