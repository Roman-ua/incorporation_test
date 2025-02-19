import React from 'react';
import { Check } from 'lucide-react';
import { classNames } from '../../../utils/helpers';

interface CheckboxProps {
  id: string;
  title: string;
  checked: boolean;
  wrapperClass: string;
  onChange: (checked: boolean) => void;
}

export const Checkbox: React.FC<CheckboxProps> = ({
  id,
  title,
  checked,
  onChange,
  wrapperClass,
}) => {
  return (
    <div className="flex items-center space-x-2 w-full">
      <div
        onClick={() => onChange(!checked)}
        className={classNames(
          'rounded-md border-2 cursor-pointer transition-all duration-200 flex items-center justify-center',
          wrapperClass,
          checked
            ? 'border-blue-600 bg-blue-600'
            : 'border-gray-300 hover:border-indigo-400'
        )}
      >
        {checked && <Check size={16} className="text-white" />}
      </div>
      <label
        htmlFor={id}
        className="text-sm font-medium text-gray-700 select-none cursor-pointer whitespace-nowrap"
      >
        {title}
      </label>
    </div>
  );
};
