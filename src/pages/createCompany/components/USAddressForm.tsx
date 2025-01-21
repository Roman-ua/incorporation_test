import React, { useEffect, useState } from 'react';
import CountrySelector from '../../../components/shared/CountrySelect/selector';
import { COUNTRIES } from '../../../components/shared/CountrySelect/countries';
import { SelectMenuOption } from '../../../components/shared/CountrySelect/types';
import { USStates } from '../../../constants/form/form';
import { VALIDATORS } from '../../../constants/regexs';
import { PlusIcon } from '@heroicons/react/24/outline';
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-expect-error
import CustomButton from '../../../components/shared/ButtonWithLoader/Button';
import SectionHeading from './SectionHeading';
import { AddressFields } from '../../../interfaces/interfaces';

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
}: IProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [done, setDone] = React.useState(false);
  const [focused, setFocused] = useState(false);

  const [addressFields, setAddressFields] =
    useState<{ title: string; type: string }[]>(addressFieldsMock);
  const [isOpenStates, setIsOpenStates] = useState(false);

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
    address0: string;
    [key: string]: string;
  }>({
    address0: value?.address0 || '',
    address1: value?.address1 || '',
    address2: value?.address2 || '',
    address3: value?.address3 || '',
  });

  const [city, setCity] = useState(value?.city || '');
  const [zip, setZip] = useState(value?.zip || '');
  const [state, setState] = useState(value?.state || '');

  const validationData = isCreateUser
    ? { country, address0: address.address0, city, zip }
    : { country, address0: address.address0, city, zip, state };

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
    } else if (typeof setMandatoryError === 'function') {
      setMandatoryError();
    }
  };

  useEffect(() => {
    if (done) {
      setDone(false);
    }
  }, [address, state, city, country, zip]);

  useEffect(() => {
    if (value?.address2) {
      setAddressFields((prevState) => {
        if (prevState.length < 3) {
          return [...prevState, { title: 'Address', type: 'text' }];
        }
        return prevState;
      });
    }
    if (value?.address3) {
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
      <div className="flex flex-col items-end">
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
                    requiredError && index === 0 && !address[`address${index}`]
                      ? 'bg-red-50'
                      : 'bg-transparent'
                  )}
                  type={field.type}
                  value={address[`address${index}`]}
                  data-1p-ignore={true}
                  disabled={disabledFlag}
                  onChange={(e) =>
                    setAddress({
                      ...address,
                      [`address${index}`]: e.target.value,
                    })
                  }
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
                      className="p-1 rounded-md bg-gray-100 opacity-0 group-hover:opacity-100 transition hover:cursor-pointer"
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
              onChange={(e) => setCity(e.target.value)}
              data-1p-ignore={true}
              placeholder="City"
            />
            <CountrySelector
              id={'states'}
              open={isOpenStates}
              list={USStates}
              withIcon={false}
              onToggle={() => openStateHandler(!isOpenStates)}
              onChange={(val) => setState(val)}
              selectedValue={
                USStates.find(
                  (option) => option.title === state
                ) as SelectMenuOption
              }
              disableDropDown={disabledFlag}
              inputExtraStyles={'min-w-[80px] max-w-[80px]'}
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
              onChange={(e) => setZipHandler(e.target.value)}
              data-1p-ignore={true}
              placeholder="Zip Code"
            />
          </div>
          <CountrySelector
            id={'countries'}
            open={isOpen}
            list={COUNTRIES}
            withIcon={true}
            onToggle={() => openCountryHandler(!isOpen)}
            onChange={(val) => setCountry(val)}
            selectedValue={
              COUNTRIES.find(
                (option) => option.title === country
              ) as SelectMenuOption
            }
            inputExtraStyles={`${!enableCountry && 'opacity-40'} w-full `}
            disableDropDown={!enableCountry}
            wrapperExtraStyles={`rounded-b-0 border-0 ${requiredError && !country ? 'bg-red-50' : 'bg-transparent'}`}
          />
        </div>
        <div className="ml-auto flex items-center justify-end w-full">
          {deleteAction ? (
            <div
              onClick={deleteAction}
              className="rounded-md bg-red-50 px-3 mr-auto h-[35px] text-sm font-semibold flex items-center mt-2 text-gray-900 shadow-sm hover:bg-red-100 hover:cursor-pointer transition-all ease-in-out duration-150"
            >
              Delete
            </div>
          ) : (
            <div className="w-1/2" />
          )}
          {cancelAction && (
            <button
              type="button"
              onClick={cancelAction}
              className="mt-2 mr-2 ml-auto h-[35px] rounded-md bg-white px-2.5 py-1.5 text-sm font-semibold text-gray-900 transition-all ease-in-out duration-150"
            >
              Cancel
            </button>
          )}
          {!disabledFlag && (
            <CustomButton
              discard={done}
              clickHandler={saveHandler}
              disabled={
                !(
                  areFieldsValid(validationData) &&
                  (!isCreateUser || additionalMandatoryCheck)
                )
              }
              uniqId={'USAddressForm'}
            />
          )}
        </div>
      </div>
    </>
  );
};

export default USAddressForm;
