import { AnimatePresence, motion } from 'framer-motion';
import React, { MutableRefObject, useEffect, useRef, useState } from 'react';
import { ChevronDownIcon } from '@heroicons/react/20/solid';
import { CountryOrState } from '../../../state/types/globalDataTypes';

export interface CountrySelectorProps {
  id: string;
  open: boolean;
  disabled?: boolean;
  onToggle: () => void;
  withIcon: boolean;
  list: CountryOrState[];
  onChange: (value: string) => void;
  selectedValue: CountryOrState;
  inputExtraStyles?: string;
  wrapperExtraStyles?: string;
  disableDropDown?: boolean;
  isCountry?: boolean;
}

function classNames(...classes: (string | boolean)[]) {
  return classes.filter(Boolean).join(' ');
}

const getDisplayValue = (item: CountryOrState) => {
  if (!item) return;
  return 'full_name' in item ? item.full_name : item.name;
};

const getShortValue = (item: CountryOrState) => {
  if (!item) return;
  return 'short_name' in item ? item.short_name : item.abbreviation;
};

const getFlagCode = (item: CountryOrState) => {
  if (!item) return;
  return 'short_name' in item ? item.short_name : item.abbreviation;
};

export default function CountrySelector({
  id,
  open,
  list,
  disabled = false,
  onToggle,
  onChange,
  withIcon,
  selectedValue,
  inputExtraStyles,
  wrapperExtraStyles,
  disableDropDown = false,
  isCountry = false,
}: CountrySelectorProps) {
  const ref = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  useEffect(() => {
    const mutableRef = ref as MutableRefObject<HTMLDivElement | null>;

    const handleClickOutside = (event: MouseEvent) => {
      if (
        mutableRef.current &&
        !mutableRef.current.contains(event.target as Node) &&
        open
      ) {
        onToggle();
        setQuery('');
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [ref]);

  useEffect(() => {
    if (open && inputRef.current) {
      inputRef.current?.focus();
    }
  }, [open, inputRef.current]);

  const [query, setQuery] = useState('');

  const emptyPlaceholder = id === 'states' ? 'State' : 'Country';

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (open && !disableDropDown && !isCountry) {
        if (event.key === 'Backspace') {
          setQuery((prevQuery) => prevQuery.slice(0, -1));
        } else if (/^[a-zA-Z]$/.test(event.key)) {
          setQuery((prevQuery) => prevQuery + event.key);
        }
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [open, disableDropDown, isCountry]);

  useEffect(() => {
    if (!open) {
      setQuery('');
    }
  }, [open]);

  return (
    <div ref={ref} className={inputExtraStyles}>
      <div className="relative">
        <button
          type="button"
          className={classNames(
            disabled && 'bg-neutral-100',
            'relative w-full border rounded-md pl-2 pr-8 py-2 text-left cursor-default focus:outline-none sm:text-md',
            wrapperExtraStyles || ''
          )}
          aria-haspopup="listbox"
          aria-expanded="true"
          aria-labelledby="listbox-label"
          onClick={onToggle}
          disabled={disableDropDown}
        >
          {selectedValue ? (
            <span className="truncate flex items-center">
              {withIcon && (
                <img
                  alt={`${getFlagCode(selectedValue)}`}
                  src={`https://purecatamphetamine.github.io/country-flag-icons/3x2/${getFlagCode(selectedValue)}.svg`}
                  className={'inline mr-2 h-4 rounded-sm'}
                />
              )}
              {isCountry
                ? getDisplayValue(selectedValue)
                : getShortValue(selectedValue)}
            </span>
          ) : (
            <span className="truncate flex items-center text-gray-500">
              {emptyPlaceholder}
            </span>
          )}
          <span
            className={`absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none ${
              disabled ? 'hidden' : ''
            }`}
          >
            {!disableDropDown && (
              <ChevronDownIcon
                className={classNames(
                  'w-4 h-4 text-gray-500 transition-all',
                  open ? 'transform rotate-180' : ''
                )}
              />
            )}
          </span>
        </button>

        <AnimatePresence>
          {open && (
            <motion.ul
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.1 }}
              className="absolute z-10 mt-1 w-full bg-white shadow-lg max-h-80 rounded-md text-md focus:outline-none sm:text-sm"
              tabIndex={-1}
              role="listbox"
              aria-labelledby="listbox-label"
              aria-activedescendant="listbox-option-3"
            >
              <div className="p-2">
                {isCountry && (
                  <input
                    ref={inputRef}
                    type="text"
                    placeholder="Search..."
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    className="w-full border border-gray-200 rounded-md p-1.5 mb-2 text-sm focus:outline-none focus:ring-0 focus:border-gray-200"
                  />
                )}
              </div>
              <div
                className={
                  'max-h-64 scrollbar scrollbar-track-gray-100 scrollbar-thumb-gray-300 hover:scrollbar-thumb-gray-600 scrollbar-thumb-rounded scrollbar-thin overflow-y-scroll'
                }
              >
                {list.filter((country) => {
                  if (isCountry) {
                    return getDisplayValue(country)
                      ?.toLowerCase()
                      .includes(query.toLowerCase());
                  } else {
                    return getShortValue(country)
                      ?.toLowerCase()
                      .includes(query.toLowerCase());
                  }
                }).length === 0 ? (
                  <li className="text-gray-900 cursor-default select-none relative py-2 pl-3 pr-9">
                    No results found
                  </li>
                ) : (
                  list
                    .filter((country) => {
                      if (isCountry) {
                        return getDisplayValue(country)
                          ?.toLowerCase()
                          .includes(query.toLowerCase());
                      } else {
                        return getShortValue(country)
                          ?.toLowerCase()
                          .includes(query.toLowerCase());
                      }
                    })
                    .map((value, index) => {
                      return (
                        <li
                          key={`${id}-${index}`}
                          className={classNames(
                            'text-gray-900 cursor-default select-none relative py-2 pl-3 pr-9 flex items-center hover:bg-gray-50 transition'
                          )}
                          id="listbox-option-0"
                          role="option"
                          onClick={() => {
                            onChange(getDisplayValue(value) || '');
                            setQuery('');
                            onToggle();
                          }}
                        >
                          {withIcon && (
                            <img
                              alt={`${getDisplayValue(value)}`}
                              src={`https://purecatamphetamine.github.io/country-flag-icons/3x2/${getFlagCode(value)}.svg`}
                              className={'inline mr-2 h-4 rounded-sm'}
                            />
                          )}
                          <span className="text-md font-normal truncate">
                            {isCountry
                              ? getDisplayValue(value)
                              : getShortValue(value)}
                          </span>
                          {getDisplayValue(value) ===
                          getDisplayValue(selectedValue) ? (
                            <span className="text-blue-600 absolute inset-y-0 right-0 flex items-center pr-2">
                              <svg
                                className="h-5 w-5"
                                xmlns="http://www.w3.org/2000/svg"
                                viewBox="0 0 20 20"
                                fill="currentColor"
                                aria-hidden="true"
                              >
                                <path
                                  fillRule="evenodd"
                                  d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                                  clipRule="evenodd"
                                />
                              </svg>
                            </span>
                          ) : null}
                        </li>
                      );
                    })
                )}
              </div>
            </motion.ul>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
