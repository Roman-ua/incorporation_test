// eslint-disable-next-line @typescript-eslint/ban-ts-comment
//@ts-nocheck
import { SelectMenuOption } from './types';
import { AnimatePresence, motion } from 'framer-motion';
import React, { MutableRefObject, useEffect, useRef, useState } from 'react';
import { ChevronDownIcon } from '@heroicons/react/20/solid';

export interface CountrySelectorProps {
  id: string;
  open: boolean;
  disabled?: boolean;
  onToggle: () => void;
  withIcon: boolean;
  list: { title: string; value: string }[];
  onChange: (value: SelectMenuOption['value']) => void;
  selectedValue: SelectMenuOption;
  inputExtraStyles?: string;
  wrapperExtraStyles?: string;
  disableDropDown?: boolean;
}

function classNames(...classes: (string | boolean)[]) {
  return classes.filter(Boolean).join(' ');
}

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

  // const placeholder = id === 'states' ? 'Search a state' : 'Search a country';
  const emptyState = id === 'states' ? 'No state found' : 'No countries found';

  return (
    <div ref={ref} className={inputExtraStyles}>
      <div className="relative">
        <button
          type="button"
          className={classNames(
            disabled ? 'bg-neutral-100' : 'bg-white',
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
                  alt={`${selectedValue.value}`}
                  src={`https://purecatamphetamine.github.io/country-flag-icons/3x2/${selectedValue.value}.svg`}
                  className={'inline mr-2 h-4 rounded-sm'}
                />
              )}
              {id === 'states' ? selectedValue.value : selectedValue.title}
            </span>
          ) : (
            <span className="truncate flex items-center text-gray-500">
              State
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
              <div className="sticky top-0 z-10 bg-white">
                <li className=" text-gray-900 cursor-default select-none relative py-2 px-2">
                  <input
                    type="text"
                    name="search"
                    autoComplete={'off'}
                    ref={inputRef}
                    className="block w-full sm:text-sm focus:outline-none"
                    placeholder={'Search'}
                    onChange={(e) => setQuery(e.target.value)}
                  />
                </li>
                <hr />
              </div>

              <div
                className={
                  'max-h-64 scrollbar scrollbar-track-gray-100 scrollbar-thumb-gray-300 hover:scrollbar-thumb-gray-600 scrollbar-thumb-rounded scrollbar-thin overflow-y-scroll'
                }
              >
                {list.filter((country) =>
                  country.title.toLowerCase().startsWith(query.toLowerCase())
                ).length === 0 ? (
                  <li className="text-gray-900 cursor-default select-none relative py-2 pl-3 pr-9">
                    {emptyState}
                  </li>
                ) : (
                  list
                    .filter((country) =>
                      country.title
                        .toLowerCase()
                        .startsWith(query.toLowerCase())
                    )
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
                            onChange(value.value);
                            setQuery('');
                            onToggle();
                          }}
                        >
                          {withIcon && (
                            <img
                              alt={`${value.value}`}
                              src={`https://purecatamphetamine.github.io/country-flag-icons/3x2/${value.value}.svg`}
                              className={'inline mr-2 h-4 rounded-sm'}
                            />
                          )}
                          <span className="text-md font-normal truncate">
                            {id === 'states' ? value.value : value.title}
                          </span>
                          {value.value === selectedValue?.value ? (
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
