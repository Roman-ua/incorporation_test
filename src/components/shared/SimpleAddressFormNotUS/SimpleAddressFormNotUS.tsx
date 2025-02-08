import { PlusIcon } from '@heroicons/react/24/outline';
import CountrySelector from '../CountrySelect/selector';
import { SelectMenuOption } from '../CountrySelect/types';
import { COUNTRIES } from '../CountrySelect/countries';
import React, { useState } from 'react';
import { classNames } from '../../../utils/helpers';
import { AddressFields } from '../../../interfaces/interfaces';
import { VALIDATORS } from '../../../constants/regexs';

interface IProps {
  disabledFlag: boolean;
  inputCommonClasses: string;
  requiredError: boolean;
  data: AddressFields;
  setData: (key: string, value: string) => void;
}

const addressFieldsMock = [
  { title: 'Address', type: 'text' },
  { title: 'Address', type: 'text' },
];

const SimpleAddressFormNotUS = ({
  disabledFlag,
  inputCommonClasses,
  requiredError,
  data,
  setData,
}: IProps) => {
  const [focused, setFocused] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [isOpenStates, setIsOpenStates] = useState(false);
  const [addressFields, setAddressFields] =
    useState<{ title: string; type: string }[]>(addressFieldsMock);

  const openCountryHandler = (value: boolean) => {
    if (isOpenStates) {
      setIsOpenStates(false);
    }

    setIsOpen(value);
  };

  const setZipHandler = (value: string) => {
    const cleanedValue = value.replace(/[^a-zA-Z0-9- ]/g, '');

    if (
      (VALIDATORS.POSTAL_CODE.test(cleanedValue) || cleanedValue === '') &&
      cleanedValue.length <= 10
    ) {
      setData('zip', cleanedValue.toUpperCase());
    }
  };

  const moreFieldAllowed = (index: number) => {
    return index < 3 && index === addressFields.length - 1 && !disabledFlag;
  };

  return (
    <div
      onFocus={() => setFocused(true)}
      onBlur={() => setFocused(false)}
      className={classNames(
        'rounded-md border w-full',
        'transition-all duration-150 ease-in-out',
        focused ? 'border border-mainBlue shadow-[0_0_0_1px_#0277ff]' : '',
        !focused ? 'bg-inputBackground' : 'bg-white'
      )}
    >
      {addressFields.map((field, index) => {
        const addressKey = `address${index}` as keyof AddressFields;

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
              onChange={(e) => setData(`address${index}`, e.target.value)}
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
            'border-r border-t-0 border-l-0 border-r-gray-200 w-1/2',
            requiredError && !data?.city ? 'bg-red-50' : 'bg-transparent'
          )}
          type="text"
          value={data?.city}
          disabled={disabledFlag}
          onChange={(e) => setData('city', e.target.value)}
          data-1p-ignore={true}
          placeholder="City"
        />
        <input
          className={classNames(
            inputCommonClasses,
            'border-r-0 border-t-0 border-l-0 border-r-gray-200 w-[30%]',
            requiredError && !data?.city ? 'bg-red-50' : 'bg-transparent'
          )}
          type="text"
          value={data?.state}
          disabled={disabledFlag}
          onChange={(e) => setData('state', e.target.value)}
          data-1p-ignore={true}
          placeholder="State/Province"
        />
        <input
          className={classNames(
            inputCommonClasses,
            'w-[20%] border-t-0 border-r-0 border-l-gray-200'
          )}
          type="text"
          value={data?.zip}
          disabled={disabledFlag}
          onChange={(e) => setZipHandler(e.target.value)}
          data-1p-ignore={true}
          placeholder="Postal Code"
        />
      </div>
      <CountrySelector
        id={'countries'}
        open={isOpen}
        list={COUNTRIES}
        withIcon={true}
        onToggle={() => openCountryHandler(!isOpen)}
        onChange={(val) => setData('country', val)}
        selectedValue={
          COUNTRIES.find(
            (option) => option.title === data.country
          ) as SelectMenuOption
        }
        disableDropDown={false}
        inputExtraStyles={`w-full `}
        wrapperExtraStyles={`rounded-b-0 border-0`}
      />
    </div>
  );
};

export default SimpleAddressFormNotUS;
