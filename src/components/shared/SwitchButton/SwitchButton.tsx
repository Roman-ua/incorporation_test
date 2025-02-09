import React from 'react';

interface SwitchButtonProps {
  option1: string;
  option2: string;
  selected: 1 | 2;
  onSelect: (option: 1 | 2) => void;
  className?: string;
}

const SwitchButton: React.FC<SwitchButtonProps> = ({
  option1,
  option2,
  selected,
  onSelect,
  className = '',
}) => {
  return (
    <div
      className={`inline-grid grid-cols-2 rounded-lg bg-gray-100 p-1 ${className}`}
    >
      <button
        onClick={(e) => {
          e.preventDefault();
          onSelect(1);
        }}
        className={`px-2 py-1 rounded-md text-sm font-medium transition-all duration-200 ${
          selected === 1
            ? 'bg-gray-500 text-white shadow-sm'
            : 'text-gray-500 hover:text-gray-700'
        }`}
      >
        {option1}
      </button>
      <button
        onClick={(e) => {
          e.preventDefault();
          onSelect(2);
        }}
        className={`px-2 py-1 rounded-md text-sm font-medium transition-all duration-200 ${
          selected === 2
            ? 'bg-gray-500 text-white shadow-sm'
            : 'text-gray-500 hover:text-gray-700'
        }`}
      >
        {option2}
      </button>
    </div>
  );
};

export default SwitchButton;
