import React, { useEffect, useState } from 'react';
import CountrySelector from '../../../components/shared/CountrySelect/selector';
import { VALIDATORS } from '../../../constants/regexs';
import { PlusIcon } from '@heroicons/react/24/outline';
import SectionHeading from './SectionHeading';
import { AddressFields } from '../../../interfaces/interfaces';
import { MdOutlinePlaylistRemove } from 'react-icons/md';
import { useRecoilValue } from 'recoil';
import GlobalDataState from '../../../state/atoms/GlobalData';
import { CountryOrState } from '../../../state/types/globalDataTypes';

function classNames(...classes: (string | boolean)[]) {
  return classes.filter(Boolean).join(' ');
}

interface IProps {
  setFromState: (value: AddressFields) => void;
  value?: AddressFields;
  requiredError?: boolean;
  heading?: string;
  disabledFlag?: boolean;
  enableCountry?: boolean;
  deleteAction?: () => void;
  removeFocusEffect?: boolean;
  cancelAction?: () => void;
  isCreateUser?: boolean;
  additionalMandatoryCheck?: boolean;
  setMandatoryError?: () => void;
  copyTitle?: string;
  copyClickHandler?: (value: AddressFields) => void;
  showClear?: boolean;
}

const addressFieldsMock = [
  { title: 'Address', type: 'text' },
  { title: 'Address', type: 'text' },
];

const areFieldsValid = (fields: {
  [key: string]: string | number | undefined;
}): boolean => {
  return Object.entries(fields).every(([key, value]) => {
    if (key === 'zip') {
      return !!value && typeof value === 'string' && value.length >= 5;
    }
    return !!value;
  });
};

const USAddressForm = ({
  setFromState,
  value,
  requiredError,
  heading,
  disabledFlag,
  enableCountry,
  deleteAction,
  cancelAction,
  removeFocusEffect,
  isCreateUser,
  additionalMandatoryCheck,
  setMandatoryError,
  copyTitle,
  copyClickHandler,
  showClear,
}: IProps) => {
  const [saved, setSaved] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [done, setDone] = React.useState(false);
  const [focusedInput, setFocusedInput] = useState(-1);

  const [addressFields, setAddressFields] =
    useState<{ title: string; type: string }[]>(addressFieldsMock);
  const [isOpenStates, setIsOpenStates] = useState(false);

  const countriesData = useRecoilValue(GlobalDataState);

  const openCountryHandler = (value: boolean) => {
    if (isOpenStates) {
      setIsOpenStates(false);
    }

    setIsOpen(value);
  };
  const openStateHandler = (value: boolean) => {
    if (isOpen) {
      setIsOpen(false);
    }

    setIsOpenStates(value);
  };

  const [country, setCountry] = useState(
    isCreateUser ? value?.country : 'United States'
  );
  const [address, setAddress] = useState<{
    line1: string;
    [key: string]: string;
  }>({
    line1: value?.line1 || '',
    line2: value?.line2 || '',
    line3: value?.line3 || '',
    line4: value?.line4 || '',
  });

  const [city, setCity] = useState(value?.city || '');
  const [zip, setZip] = useState(value?.zip || '');
  const [state, setState] = useState(value?.state || '');

  const [focused, setFocused] = useState(false);

  const validationData = isCreateUser
    ? { country, line1: address.line1, city }
    : { country, line1: address.line1, city, zip, state };

  const setZipHandler = (value: string) => {
    let cleanedValue = value.replace(/[^0-9-]/g, '');

    if (cleanedValue.length > 5 && cleanedValue[5] !== '-') {
      cleanedValue = cleanedValue.slice(0, 5) + '-' + cleanedValue.slice(5);
    }

    if (VALIDATORS.ZIP_CODE.test(cleanedValue) || cleanedValue === '') {
      setZip(cleanedValue);
    }
  };
  const saveHandler = () => {
    if (
      areFieldsValid(validationData) &&
      (!isCreateUser || additionalMandatoryCheck)
    ) {
      setDone(true);
      setFromState({ country, ...address, city, zip, state });
      setSaved(true);
    } else if (typeof setMandatoryError === 'function') {
      setMandatoryError();
    }
  };

  const cleanUpForm = () => {
    setCity('');
    setState('');
    setZip('');

    setAddress({
      line1: '',
      line2: '',
      line3: '',
      line4: '',
    });

    setCountry(value?.country);
  };

  useEffect(() => {
    setCity(value?.city || '');
    setState(value?.state || '');
    setZip(value?.zip || '');

    setAddress({
      line1: value?.line1 || '',
      line2: value?.line2 || '',
      line3: value?.line3 || '',
      line4: value?.line4 || '',
    });

    setCountry(value?.country || '');
  }, [value]);

  useEffect(() => {
    if (done) {
      setDone(false);
    }
  }, [address, state, city, country, zip]);

  useEffect(() => {
    if (value?.line3) {
      setAddressFields((prevState) => {
        if (prevState.length < 3) {
          return [...prevState, { title: 'Address', type: 'text' }];
        }
        return prevState;
      });
    }
    if (value?.line4) {
      setAddressFields((prevState) => {
        if (prevState.length < 4) {
          return [...prevState, { title: 'Address', type: 'text' }];
        }
        return prevState;
      });
    }
  }, [value]);

  const inputCommonClasses =
    'p-2 text-md border-b border-b-gray-200 placeholder:text-gray-500 hover:cursor-pointer focus:ring-0 focus:outline-none focus:border-gray-200';
  const moreFieldAllowed = (index: number) => {
    return index < 3 && index === addressFields.length - 1 && !disabledFlag;
  };

  return (
    <>
      <SectionHeading text={heading || ''} status={done} hideStatus={true} />
      <div className="flex flex-col items-end relative group/form">
        {showClear && (
          <div
            onClick={cleanUpForm}
            className="p-1 absolute -top-6 right-0 opacity-100 transition-all ease-in-out duration-150 hover:cursor-pointer"
          >
            <MdOutlinePlaylistRemove className="h-4.5 w-4.5  text-gray-500 " />
          </div>
        )}
        <div
          onFocus={() => setFocused(true)}
          onBlur={() => setFocused(false)}
          className={classNames(
            'rounded-md border w-full',
            'transition-all duration-150 ease-in-out',
            focused && !removeFocusEffect
              ? 'border border-mainBlue shadow-[0_0_0_1px_#0277ff]'
              : '',
            !focused ? 'bg-inputBackground' : 'bg-white'
          )}
        >
          {addressFields.map((field, index) => {
            return (
              <div
                key={index}
                className={classNames(
                  'w-full relative',
                  index < 3 ? 'group' : ''
                )}
              >
                <input
                  key={index}
                  className={classNames(
                    inputCommonClasses,
                    `w-full ${index === 0 ? 'rounded-t-md' : ''} border-0`,
                    requiredError && index === 0 && !address[`line${index + 1}`]
                      ? 'bg-red-50'
                      : 'bg-transparent'
                  )}
                  type={field.type}
                  onFocus={() => setFocusedInput(index)}
                  onBlur={() => setFocusedInput(-1)}
                  value={address[`line${index + 1}`]}
                  data-1p-ignore={true}
                  disabled={disabledFlag}
                  onChange={(e) => {
                    setAddress({
                      ...address,
                      [`line${index + 1}`]: e.target.value,
                    });
                    setSaved(false);
                  }}
                  placeholder={field.title}
                />
                <div className="absolute right-2 top-1/2 -translate-y-2/4">
                  {moreFieldAllowed(index) && (
                    <div
                      onClick={() => {
                        if (addressFields.length < 4) {
                          setAddressFields((prevState) => [
                            ...prevState,
                            { title: 'Address', type: 'text' },
                          ]);
                        }
                      }}
                      className={classNames(
                        moreFieldAllowed(focusedInput)
                          ? 'opacity-100'
                          : 'opacity-0 ',
                        'p-1 rounded-md bg-gray-100 group-hover:opacity-100 transition hover:cursor-pointer'
                      )}
                    >
                      <PlusIcon className="w-4 h-4 text-gray-700" />
                    </div>
                  )}
                </div>
              </div>
            );
          })}
          <div className="w-full flex items-center justify-center">
            <input
              className={classNames(
                inputCommonClasses,
                'w-full border-r border-t-0 border-l-0 border-r-gray-200',
                requiredError && !city ? 'bg-red-50' : 'bg-transparent'
              )}
              type="text"
              value={city}
              disabled={disabledFlag}
              onChange={(e) => {
                setCity(e.target.value);
                setSaved(false);
              }}
              data-1p-ignore={true}
              placeholder="City"
            />
            <CountrySelector
              id={'states'}
              open={isOpenStates}
              list={countriesData.states}
              withIcon={false}
              onToggle={() => openStateHandler(!isOpenStates)}
              onChange={(val) => {
                setState(val);
                setSaved(false);
              }}
              selectedValue={
                countriesData.states.find(
                  (option) => option.name === state
                ) as CountryOrState
              }
              disableDropDown={disabledFlag}
              inputExtraStyles={'min-w-[80px] max-w-[80px] text-base'}
              wrapperExtraStyles={
                'rounded-none border-t-0 border-l-0 border-r-0'
              }
            />
            <input
              className={classNames(
                inputCommonClasses,
                'min-w-[110px] max-w-[110px] border-t-0 border-r-0 border-l-gray-200'
              )}
              type="text"
              value={zip}
              disabled={disabledFlag}
              onChange={(e) => {
                setZipHandler(e.target.value);
                setSaved(false);
              }}
              data-1p-ignore={true}
              placeholder="Zip Code"
            />
          </div>
          <CountrySelector
            id={'countries'}
            open={isOpen}
            list={countriesData.countryies}
            withIcon={true}
            onToggle={() => openCountryHandler(!isOpen)}
            onChange={(val) => {
              setCountry(val);
              setSaved(false);
            }}
            selectedValue={
              countriesData.countryies.find(
                (option) => option.full_name === country
              ) as CountryOrState
            }
            isCountry={true}
            inputExtraStyles={`${!enableCountry && 'opacity-40'} ${requiredError && !country ? 'bg-red-50 rounded-b-md' : 'bg-transparent'} w-full `}
            disableDropDown={!enableCountry}
            wrapperExtraStyles={`rounded-b-0 border-0 ${requiredError && !country ? 'bg-red-50' : 'bg-transparent'}`}
          />
        </div>
        <div className="ml-auto flex items-center justify-between w-full">
          <div className="flex items-center justify-start">
            {deleteAction && (
              <div
                onClick={deleteAction}
                className="rounded-md bg-red-50 px-3 mr-auto h-[35px] text-sm font-semibold flex items-center mt-2 text-gray-900 shadow-sm hover:bg-red-100 hover:cursor-pointer transition-all ease-in-out duration-150"
              >
                Delete
              </div>
            )}
            {copyClickHandler && (
              <div
                onClick={() => {
                  if (
                    !(
                      areFieldsValid(validationData) &&
                      (!isCreateUser || additionalMandatoryCheck)
                    ) &&
                    copyTitle !== 'Copy from Main Address'
                  ) {
                    return;
                  }
                  copyClickHandler({ country, ...address, city, zip, state });
                }}
                className="mt-2 rounded-md bg-transparent px-2.5 py-1 text-sm font-medium text-gray-900 transition-all ease-in-out duration-150 hover:cursor-pointer"
              >
                {copyTitle || 'Copy to Mailing Address'}
              </div>
            )}
          </div>
          <div className="flex items-center justify-end">
            {cancelAction && (
              <button
                type="button"
                onClick={cancelAction}
                className="mr-2 mt-2 ml-auto rounded-md bg-transparent px-2.5 py-1 text-sm font-medium text-gray-900 transition-all ease-in-out duration-150"
              >
                Cancel
              </button>
            )}
            {!disabledFlag && (
              <button
                type="button"
                onClick={saveHandler}
                className={classNames(
                  'mt-2 px-2.5 py-1 border rounded-md  text-sm font-medium transition-all ease-in-out duration-150',
                  !(
                    areFieldsValid(validationData) &&
                    (!isCreateUser || additionalMandatoryCheck)
                  )
                    ? 'text-gray-400'
                    : 'text-gray-900 '
                )}
              >
                {!saved ? 'Save' : 'Saved'}
              </button>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default USAddressForm;
