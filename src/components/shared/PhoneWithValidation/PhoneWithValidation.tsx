import React, { MutableRefObject } from 'react';
import { useState, useEffect, useRef } from 'react';
import { Country } from '../../../state/types/globalDataTypes';
import {
  CountryCode,
  isValidPhoneNumber,
  validatePhoneNumberLength,
} from 'libphonenumber-js';
import { classNames } from '../../../utils/helpers';
import { AnimatePresence, motion } from 'framer-motion';

const countryCodesEn = [
  { full_name: 'United States', short_name: 'US', code: '+1' },
  { full_name: 'Ukraine', short_name: 'UA', code: '+380' },
];

interface PhoneInputProps {
  value: string;
  onChange: (value: string) => void;
  error?: string;
  setError?: (value: string) => void;
  placeholder?: string;
  required?: boolean;
  className?: string;
  label?: string;
  setIso?: (val: string) => void;
}

const getFlagCode = (item: Country) => {
  if (!item) return;
  return item.short_name;
};

const getDisplayValue = (item: Country) => {
  if (!item) return;
  return item.full_name;
};

const validateInternationalPhoneNumber = (
  fullNumber: string,
  isoCode: CountryCode
): { isValid: boolean; error?: string } => {
  console.log(fullNumber, isoCode, 'fullNumber');
  const cleanNumber = fullNumber.replace(/\s|\(|\)|-/g, '');
  if (!/^\+\d+$/.test(cleanNumber)) {
    return { isValid: false, error: 'Number is not valid' };
  }
  const lengthCheck = validatePhoneNumberLength(cleanNumber, isoCode);
  if (lengthCheck !== undefined) {
    return {
      isValid: false,
      error:
        lengthCheck === 'TOO_LONG'
          ? 'Number is too long'
          : lengthCheck === 'TOO_SHORT'
            ? 'Number is too short'
            : 'Number is not valid',
    };
  }

  // Проверка формата номера
  if (!isValidPhoneNumber(cleanNumber, isoCode)) {
    return { isValid: false, error: 'Number is not valid' };
  }

  return { isValid: true };
};

export function PhoneWithValidation({
  value,
  onChange,
  error,
  setError,
  placeholder = 'Номер телефона',
  required = false,
  className = '',
  setIso,
}: PhoneInputProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedCountry, setSelectedCountry] = useState<Country>({
    id: 99,
    full_name: 'United States',
    short_name: 'US',
    code: '+1',
  });
  const [phoneNumber, setPhoneNumber] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const dropdownRef = useRef<HTMLDivElement>(null);
  const [inputFocus, setInputFocus] = useState(false);
  const [query, setQuery] = useState('');

  const isInitialMount = useRef(true);
  const prevValue = useRef(value);
  const ref = useRef<HTMLDivElement>(null);

  const inputRef = useRef<HTMLInputElement>(null);
  useEffect(() => {
    const mutableRef = ref as MutableRefObject<HTMLDivElement | null>;

    const handleClickOutside = (event: MouseEvent) => {
      if (
        mutableRef.current &&
        !mutableRef.current.contains(event.target as Node) &&
        isOpen
      ) {
        setIsOpen(false);
        setQuery('');
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [ref]);

  useEffect(() => {
    if (isOpen && inputRef.current) {
      inputRef.current?.focus();
    }
  }, [isOpen, inputRef.current]);

  const cntr = countryCodesEn as Country[];

  const onBlurHandler = () => {
    console.log(selectedCountry, 'onBlurHandler');
    setInputFocus(false);
    const numberResult = `${selectedCountry?.code}${phoneNumber}`;
    const validation = validateInternationalPhoneNumber(
      numberResult,
      selectedCountry?.short_name as CountryCode
    );

    if (!validation.isValid) {
      setError?.(validation.error || 'Некорректный номер');
      return;
    }

    setError?.('');
  };

  const filteredCountries = searchTerm
    ? cntr.filter(
        (country) =>
          country.full_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          country.code?.includes(searchTerm)
      )
    : cntr;

  useEffect(() => {
    if (isInitialMount.current) {
      isInitialMount.current = false;
      return;
    }

    const fullNumber = selectedCountry?.code + phoneNumber;

    // Проверка, чтобы избежать лишних обновлений и зацикливания
    if (prevValue.current !== fullNumber) {
      prevValue.current = fullNumber; // Запоминаем новое значение
      onChange(fullNumber);
    }
  }, [selectedCountry, phoneNumber, onChange]);

  // When external value changes, update internal state
  useEffect(() => {
    if (prevValue.current === value) return; // Предотвращаем повторное выполнение с тем же значением

    prevValue.current = value;

    if (value) {
      const cntr = countryCodesEn;
      const matchedCountry = cntr.find((country) =>
        value.startsWith(country.code)
      );

      if (matchedCountry) {
        setSelectedCountry(matchedCountry as Country);

        const newPhoneNumber = value.substring(matchedCountry.code.length);
        if (phoneNumber !== newPhoneNumber) {
          setPhoneNumber(newPhoneNumber);
        }
      } else {
        const newPhoneNumber = value.replace(/\D/g, '');
        if (phoneNumber !== newPhoneNumber) {
          setPhoneNumber(newPhoneNumber);
        }
      }
    } else if (phoneNumber !== '') {
      setPhoneNumber('');
    }
  }, [value]);

  // Close dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    }

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const input = e.target.value;

    // Only allow digits for the phone number part
    const sanitizedInput = input.replace(/\D/g, '');

    setPhoneNumber(sanitizedInput);
  };

  const handleCountrySelect = (country: Country) => {
    setSelectedCountry(country);
    setIsOpen(false);
    setSearchTerm('');
  };

  return (
    <div
      className={`space-y-1 ${className} flex flex-col items-start justify-start relative`}
    >
      <div className="flex relative w-full">
        {/* Country Code Dropdown */}
        <div className="relative" ref={dropdownRef}>
          <button
            type="button"
            onClick={() => {
              setIsOpen(!isOpen);
            }}
            className={classNames(
              'flex items-center justify-between w-[120px] max-md:w-[100px] px-4 py-2.5 text-sm border rounded-l-md bg-white focus:outline-none',
              inputFocus && !error
                ? 'ring-1 ring-blue-600  border-blue-600'
                : '',
              error ? 'ring-1 ring-red-400 border-red-400' : '',
              !inputFocus && !error && 'border-gray-200'
            )}
          >
            <div className="flex items-center">
              {selectedCountry && (
                <img
                  alt={`${getDisplayValue(selectedCountry as Country)}`}
                  src={`https://purecatamphetamine.github.io/country-flag-icons/3x2/${getFlagCode(selectedCountry as Country)}.svg`}
                  className={'inline mr-2 h-3 rounded-sm'}
                />
              )}
              <span className="truncate">
                {selectedCountry?.code || 'Select code'}
              </span>
            </div>
            <svg
              className={`w-4 h-4 ml-1 transition-transform ${isOpen ? 'rotate-180' : ''}`}
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M19 9l-7 7-7-7"
              />
            </svg>
          </button>

          {/* Dropdown Menu */}
          {isOpen && (
            // <div
            //   className={`absolute z-10 w-[250px] ${
            //     dropdownPosition === 'top'
            //       ? 'bottom-full mb-1'
            //       : 'top-full mt-1'
            //   } bg-white border border-gray-300 rounded-md shadow-lg`}
            // >
            //   <div className="p-2">
            //     <input
            //       type="text"
            //       value={searchTerm}
            //       onChange={(e) => setSearchTerm(e.target.value)}
            //       placeholder="Поиск страны..."
            //       className="w-full px-4 py-2 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-1 "
            //     />
            //   </div>
            //   <div className="max-h-[300px] overflow-y-auto">
            //     {filteredCountries.length === 0 ? (
            //       <div className="px-3 py-2 text-sm text-gray-500">
            //         Страна не найдена
            //       </div>
            //     ) : (
            //       filteredCountries.map((country) => (
            //         <button
            //           key={country.code}
            //           type="button"
            //           onClick={() => {
            //             setIso?.(country.short_name);
            //             handleCountrySelect(country);
            //           }}
            //           className="flex items-center justify-between w-full px-4 py-2 text-sm text-left hover:bg-gray-100"
            //         >
            //           <img
            //             alt={`${getDisplayValue(country)}`}
            //             src={`https://purecatamphetamine.github.io/country-flag-icons/3x2/${getFlagCode(country)}.svg`}
            //             className={'inline mr-2 h-4 rounded-sm'}
            //           />
            //           <span>
            //             {country.full_name} {country.code}
            //           </span>
            //           {selectedCountry?.full_name === country.full_name && (
            //             <svg
            //               className="w-4 h-4 text-red-400"
            //               fill="none"
            //               stroke="currentColor"
            //               viewBox="0 0 24 24"
            //               xmlns="http://www.w3.org/2000/svg"
            //             >
            //               <path
            //                 strokeLinecap="round"
            //                 strokeLinejoin="round"
            //                 strokeWidth={2}
            //                 d="M5 13l4 4L19 7"
            //               />
            //             </svg>
            //           )}
            //         </button>
            //       ))
            //     )}
            //   </div>
            // </div>
            <AnimatePresence>
              {isOpen && (
                <motion.ul
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.1 }}
                  className="absolute z-10 mt-1 w-[200px] bg-white shadow-lg max-h-80 rounded-md text-md focus:outline-none sm:text-sm"
                  tabIndex={-1}
                  role="listbox"
                  aria-labelledby="listbox-label"
                  aria-activedescendant="listbox-option-3"
                >
                  <div className="p-2">
                    <input
                      ref={inputRef}
                      type="text"
                      placeholder="Search..."
                      value={query}
                      onChange={(e) => setQuery(e.target.value)}
                      className="w-full border border-gray-200 rounded-md p-1.5 mb-2 text-sm focus:outline-none focus:ring-0 focus:border-gray-200"
                    />
                  </div>
                  <div
                    className={
                      'max-h-64 scrollbar scrollbar-track-gray-100 scrollbar-thumb-gray-300 hover:scrollbar-thumb-gray-600 scrollbar-thumb-rounded scrollbar-thin overflow-y-scroll'
                    }
                  >
                    {filteredCountries.filter((country) => {
                      return getDisplayValue(country)
                        ?.toLowerCase()
                        .includes(query.toLowerCase());
                    }).length === 0 ? (
                      <li className="text-gray-900 cursor-default select-none relative py-2 pl-3 pr-9">
                        No results found
                      </li>
                    ) : (
                      filteredCountries
                        .filter((country) => {
                          return getDisplayValue(country)
                            ?.toLowerCase()
                            .includes(query.toLowerCase());
                        })
                        .map((value, index) => {
                          return (
                            <li
                              key={`${value.id}-${index}`}
                              className={classNames(
                                'text-gray-900 cursor-default select-none relative py-2 pl-3 pr-9 flex items-center hover:bg-gray-50 transition'
                              )}
                              id="listbox-option-0"
                              role="option"
                              onClick={() => {
                                // onChange(getDisplayValue(value) || '');
                                setQuery('');
                                setIso?.(value.short_name);
                                handleCountrySelect(value);
                              }}
                            >
                              <img
                                alt={`${getDisplayValue(value)}`}
                                src={`https://purecatamphetamine.github.io/country-flag-icons/3x2/${getFlagCode(value)}.svg`}
                                className={'inline mr-2 h-4 rounded-sm'}
                              />
                              <span className="text-md font-normal truncate">
                                {getDisplayValue(value)}
                              </span>
                              {getDisplayValue(value) ===
                              getDisplayValue(selectedCountry) ? (
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
          )}
        </div>

        {/* Phone Number Input - Without duplicate country code */}
        <input
          type="tel"
          value={phoneNumber}
          onChange={handlePhoneChange}
          placeholder={placeholder}
          required={required}
          onBlur={onBlurHandler}
          onFocus={() => setInputFocus(true)}
          disabled={!selectedCountry}
          className={classNames(
            'block rounded-r-md border border-l-0 w-full border-gray-200 p-2 text-md mb-2 ring-0 text-gray-900 disabled:text-opacity-50 placeholder:text-gray-500  hover:cursor-pointer focus:placeholder:text-transparent',
            error
              ? 'ring-1 ring-red-400 focus:ring-red-400 border-red-400 focus:border-red-400'
              : ''
          )}
        />
      </div>
      {error && (
        <span className="text-red-500 text-sm font-semibold absolute -bottom-5 right-0">
          {error}
        </span>
      )}
    </div>
  );
}
