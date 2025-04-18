import React from 'react';

interface SwitchButtonProps {
  option1: string;
  option2: string;
  selected: 1 | 2;
  onSelect: (option: 1 | 2) => void;
  className?: string;
  disabled?: boolean;
}

const SwitchButton: React.FC<SwitchButtonProps> = ({
  option1,
  option2,
  selected,
  onSelect,
  className = '',
  disabled,
}) => {
  return (
    <div
      className={`inline-grid grid-cols-2 rounded-lg bg-gray-100 p-0.5 ${className}`}
    >
      <button
        disabled={disabled}
        onClick={(e) => {
          e.preventDefault();
          onSelect(1);
        }}
        className={`px-2 py-1 rounded-md text-sm font-medium transition-all duration-200 ease-in-out ${
          selected === 1
            ? 'bg-white text-gray-900 shadow-sm'
            : 'text-gray-400 hover:text-gray-900'
        }`}
      >
        {option1}
      </button>
      <button
        disabled={disabled}
        onClick={(e) => {
          e.preventDefault();
          onSelect(2);
        }}
        className={`px-2 py-1 rounded-md text-sm font-medium transition-all duration-200 ease-in-out ${
          selected === 2
            ? 'bg-white text-gray-900 shadow-sm'
            : 'text-gray-400 hover:text-gray-900'
        }`}
      >
        {option2}
      </button>
    </div>
  );
};

export default SwitchButton;
