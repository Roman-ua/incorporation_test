import React, { MutableRefObject } from 'react';
import { useState, useEffect, useRef } from 'react';
import { Country } from '../../../state/types/globalDataTypes';
import {
  CountryCode,
  getExampleNumber,
  isValidPhoneNumber,
  validatePhoneNumberLength,
} from 'libphonenumber-js';
import { classNames } from '../../../utils/helpers';
import { AnimatePresence, motion } from 'framer-motion';

import examples from 'libphonenumber-js/examples.mobile.json';
import WarningMessage from '../WarningMessage/WarningMessage';
import GlobalDataState from '../../../state/atoms/GlobalData';
import { useRecoilValue } from 'recoil';

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
  setPhoneCountry?: (val: string) => void;
  phoneCountry?: Country;
}

const getFlagCode = (item: Country) => {
  if (!item) return;
  return item.short_name;
};

const getDisplayValue = (item: Country) => {
  if (!item) return;
  return item.full_name;
};

const getMaxPhoneLengthForCountry = (country: string) => {
  const exampleNumber = getExampleNumber(country as CountryCode, examples);
  if (!exampleNumber) return null;

  const nationalNumber = exampleNumber.nationalNumber.toString(); // без +1
  return nationalNumber.length;
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
  setPhoneCountry,
  error,
  setError,
  placeholder = 'Номер телефона',
  required = false,
  className = '',
  setIso,
  phoneCountry,
}: PhoneInputProps) {
  const globalData = useRecoilValue(GlobalDataState);

  const [isOpen, setIsOpen] = useState(false);
  const [selectedCountry, setSelectedCountry] = useState<Country>({
    id: 'cc_e143ff71',
    full_name: 'United States',
    short_name: 'US',
    dial_code: '+1',
  });
  const [phoneNumber, setPhoneNumber] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [maxLength, setMaxLength] = useState<number | null>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const [inputFocus, setInputFocus] = useState(false);
  const [query, setQuery] = useState('');

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

  const cntr = globalData.countryies as Country[];

  const onBlurHandler = () => {
    setInputFocus(false);
    const numberResult = `${selectedCountry?.dial_code}${phoneNumber}`;
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
          country.dial_code?.includes(searchTerm)
      )
    : cntr;

  useEffect(() => {
    setMaxLength(
      getMaxPhoneLengthForCountry(selectedCountry?.short_name as CountryCode)
    );
  }, [selectedCountry, phoneNumber, onChange]);

  useEffect(() => {
    if (phoneCountry) {
      setSelectedCountry(phoneCountry);
    }
    if (!phoneNumber) {
      console.log(value.startsWith(phoneCountry?.dial_code || ''), 'value');
      const slicedNumber = value.startsWith(phoneCountry?.dial_code || '')
        ? value.slice((phoneCountry?.dial_code || '').length)
        : '';
      setPhoneNumber(slicedNumber);
    }
  }, [phoneCountry]);

  useEffect(() => {
    if (prevValue.current === value) return;
    prevValue.current = value;
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
    const sanitizedInput = input.replace(/\D/g, '');
    setPhoneNumber(sanitizedInput);
    onChange(selectedCountry?.dial_code + sanitizedInput);
  };

  const handleCountrySelect = (country: Country) => {
    setSelectedCountry(country);
    setPhoneNumber('');
    setIsOpen(false);
    setSearchTerm('');
  };

  return (
    <div
      className={`${className} flex flex-col items-start justify-start relative`}
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
              'relative flex items-center justify-between w-[120px] max-md:w-[100px] px-4 py-2.5 text-sm border  rounded-l-md bg-white focus:outline-none',
              inputFocus && !error
                ? 'ring-1 ring-blue-600 border-blue-600'
                : '',
              error ? 'ring-1 ring-red-400 border-red-400' : '',
              !inputFocus && !error && 'border-gray-200'
              // 'ring-inset'
            )}
          >
            {(inputFocus || error) && (
              <div className="border-l border-gray-200 h-full absolute -right-1 top-0 w-[4px] bg-white" />
            )}
            <div className="flex items-center">
              {selectedCountry && (
                <img
                  alt={`${getDisplayValue(selectedCountry as Country)}`}
                  src={`https://purecatamphetamine.github.io/country-flag-icons/3x2/${getFlagCode(selectedCountry as Country)}.svg`}
                  className={'inline mr-2 h-3 rounded-sm'}
                />
              )}
              <span className="truncate">
                {selectedCountry?.dial_code || 'Select code'}
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
                                console.log(value, 'value');
                                // onChange(getDisplayValue(value) || '');
                                setQuery('');
                                setIso?.(value.short_name);
                                setPhoneCountry?.(value?.id || '');
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
          maxLength={maxLength || undefined}
          onFocus={() => setInputFocus(true)}
          disabled={!selectedCountry}
          className={classNames(
            'block rounded-r-md border border-l-0 w-full border-gray-200 p-2 text-md ring-0 text-gray-900 disabled:text-opacity-50 placeholder:text-gray-500  hover:cursor-pointer focus:placeholder:text-transparent',
            error
              ? 'ring-1 ring-red-400 focus:ring-red-400 border-red-400 focus:border-red-400'
              : ''
          )}
        />
      </div>
      {error && (
        <WarningMessage
          message={error}
          onClose={() => setError?.('')}
          wrapperClass="absolute -bottom-7 right-0 w-[270px] text-xs"
        />
      )}
    </div>
  );
}
