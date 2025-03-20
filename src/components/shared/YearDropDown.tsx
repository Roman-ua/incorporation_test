import React, { useState, useRef, useEffect } from 'react';
import { ChevronDown } from 'lucide-react';
import { classNames } from '../../utils/helpers';

interface IProps {
  handleChangeYear: (value: string) => void;
  year: string;
  mandatoryError: boolean;
}
export default function CustomYearDropdown({
  handleChangeYear,
  year,
  mandatoryError,
}: IProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedYear, setSelectedYear] = useState<string | null>(year);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const currentYear = new Date().getFullYear();
  const startYear = 1980;

  // Generate years array from current year down to 1980
  const years = Array.from(
    { length: currentYear - startYear + 1 },
    (_, i) => currentYear - i
  );

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <div className="relative w-full" ref={dropdownRef}>
      {/* Dropdown trigger button */}
      <button
        type="button"
        className={classNames(
          'flex items-center justify-between w-full rounded-md text-left border border-gray-200 p-2 text-md mb-4 focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500',
          mandatoryError && !selectedYear ? 'bg-red-50' : 'bg-white '
        )}
        onClick={() => setIsOpen(!isOpen)}
        aria-haspopup="listbox"
        aria-expanded={isOpen}
      >
        <span
          className={`block truncate ${!selectedYear ? 'text-gray-500' : ''}`}
        >
          {selectedYear || 'Select year'}
        </span>
        <ChevronDown
          className={`w-4 h-4 ml-2 text-gray-400 transition-transform duration-200 ${isOpen ? 'transform rotate-180' : ''}`}
        />
      </button>

      {/* Dropdown menu */}
      {isOpen && (
        <div
          className="absolute z-10 w-full mt-1 bg-white border border-gray-300 rounded-lg shadow-lg max-h-60 overflow-auto"
          role="listbox"
        >
          <div className="py-1">
            {years.map((year) => (
              <button
                key={year}
                className={`w-full px-4 py-2 text-left hover:bg-gray-50 focus:outline-none ${
                  selectedYear === year.toString()
                    ? 'bg-gray-100 text-gray-900 font-medium'
                    : 'text-gray-700'
                }`}
                onClick={() => {
                  handleChangeYear(year.toString());
                  setSelectedYear(year.toString());
                  setIsOpen(false);
                }}
                role="option"
                aria-selected={selectedYear === year.toString()}
              >
                {year}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
