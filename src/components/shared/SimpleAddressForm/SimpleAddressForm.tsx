import { PlusIcon } from '@heroicons/react/24/outline';
import CountrySelector from '../CountrySelect/selector';
import React, { useState } from 'react';
import { classNames } from '../../../utils/helpers';
import { AddressFields } from '../../../interfaces/interfaces';
import { VALIDATORS } from '../../../constants/regexs';
import { useRecoilValue } from 'recoil';
import GlobalDataState from '../../../state/atoms/GlobalData';
import { CountryOrState } from '../../../state/types/globalDataTypes';

interface IProps {
  disabledFlag: boolean;
  inputCommonClasses: string;
  requiredError: boolean;
  data: AddressFields;
  countryDisabled: boolean;
  setData: (key: string, value: string) => void;
  stateDisabled?: boolean;
  extraWrapperClass?: string;
  disableExtraLines?: boolean;
}

const addressFieldsMock = [
  { title: 'Address', type: 'text' },
  { title: 'Address', type: 'text' },
];

const SimpleAddressForm = ({
  extraWrapperClass,
  disabledFlag,
  disableExtraLines,
  inputCommonClasses,
  requiredError,
  countryDisabled,
  stateDisabled,
  data,
  setData,
}: IProps) => {
  const [focused, setFocused] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [isOpenStates, setIsOpenStates] = useState(false);
  const [addressFields, setAddressFields] =
    useState<{ title: string; type: string }[]>(addressFieldsMock);

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

  const setZipHandler = (value: string) => {
    const cleanedValue = value.replace(/[^0-9-]/g, '');

    if (
      (VALIDATORS.ZIP_CODE.test(cleanedValue) || cleanedValue === '') &&
      cleanedValue.length <= 5
    ) {
      setData('zip', cleanedValue);
    }
  };

  const moreFieldAllowed = (index: number) => {
    return index < 3 && index === addressFields.length - 1 && !disabledFlag;
  };

  const borderFocusState =
    extraWrapperClass || 'border border-black shadow-[0_0_0_1px_#000]';

  return (
    <div
      onFocus={() => setFocused(true)}
      onBlur={() => setFocused(false)}
      className={classNames(
        'rounded-md border w-full',
        'transition-all duration-150 ease-in-out',
        focused ? borderFocusState : '',
        !focused ? 'bg-inputBackground' : 'bg-white'
      )}
    >
      {addressFields.map((field, index) => {
        const addressKey = `line${index + 1}` as keyof AddressFields;

        return (
          <div
            key={index}
            className={classNames('w-full relative', index < 3 ? 'group' : '')}
          >
            <input
              key={index}
              className={classNames(
                inputCommonClasses,
                `w-full ${index === 0 ? 'rounded-t-md' : ''} border-0`,
                requiredError && index === 0 && !data[addressKey]
                  ? 'bg-red-50'
                  : 'bg-transparent'
              )}
              type={field.type}
              value={data[addressKey]}
              data-1p-ignore={true}
              disabled={disabledFlag}
              onChange={(e) => setData(addressKey, e.target.value)}
              placeholder={field.title}
            />
            <div className="absolute right-2 top-1/2 -translate-y-2/4">
              {moreFieldAllowed(index) && !disableExtraLines && (
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
            requiredError && !data?.city ? 'bg-red-50' : 'bg-transparent'
          )}
          type="text"
          value={data?.city}
          disabled={disabledFlag}
          onChange={(e) => setData('city', e.target.value)}
          data-1p-ignore={true}
          placeholder="City"
        />
        <CountrySelector
          id={'states'}
          open={isOpenStates}
          list={countriesData.states}
          withIcon={false}
          onToggle={() => openStateHandler(!isOpenStates)}
          onChange={(val) => setData('state', val)}
          selectedValue={
            countriesData.states.find(
              (option) => option.name === data?.state
            ) as CountryOrState
          }
          disableDropDown={disabledFlag || stateDisabled}
          inputExtraStyles={`${requiredError && !data.state ? 'bg-red-50' : 'bg-white'} min-w-[110px] max-w-[110px]`}
          wrapperExtraStyles={`rounded-none border-t-0 border-l-0 border-r-0 ${stateDisabled ? 'opacity-60' : ''}`}
        />
        <input
          className={classNames(
            inputCommonClasses,
            'min-w-[110px] max-w-[110px] border-t-0 border-r-0 border-l-gray-200',
            requiredError && (!data?.zip || data.zip?.length !== 5)
              ? 'bg-red-50'
              : 'bg-transparent'
          )}
          type="text"
          value={data?.zip}
          disabled={disabledFlag}
          onChange={(e) => setZipHandler(e.target.value)}
          data-1p-ignore={true}
          placeholder="Zip Code"
        />
      </div>
      <CountrySelector
        id={'countries'}
        open={isOpen}
        list={countriesData.countryies}
        withIcon={true}
        isCountry={true}
        onToggle={() => openCountryHandler(!isOpen)}
        onChange={(val) => setData('country', val)}
        selectedValue={
          countriesData.countryies.find(
            (option) => option.full_name === 'United States'
          ) as CountryOrState
        }
        disableDropDown={countryDisabled}
        inputExtraStyles={`${countryDisabled && 'opacity-40'} w-full `}
        wrapperExtraStyles={`rounded-b-0 border-0`}
      />
    </div>
  );
};

export default SimpleAddressForm;
