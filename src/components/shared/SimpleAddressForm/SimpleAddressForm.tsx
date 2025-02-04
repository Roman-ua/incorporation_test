import { PlusIcon } from '@heroicons/react/24/outline';
import CountrySelector from '../CountrySelect/selector';
import { USStates } from '../../../constants/form/form';
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

const SimpleAddressForm = ({
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
  const openStateHandler = (value: boolean) => {
    if (isOpen) {
      setIsOpen(false);
    }

    setIsOpenStates(value);
  };

  const setZipHandler = (value: string) => {
    let cleanedValue = value.replace(/[^0-9-]/g, '');

    if (cleanedValue.length > 5 && cleanedValue[5] !== '-') {
      cleanedValue = cleanedValue.slice(0, 5) + '-' + cleanedValue.slice(5);
    }

    if (VALIDATORS.ZIP_CODE.test(cleanedValue) || cleanedValue === '') {
      setData('zip', cleanedValue);
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
              onChange={
                (e) => setData(`address${index}`, e.target.value)
                // setAddress({
                //   ...address,
                //   [`address${index}`]: e.target.value,
                // })
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
          list={USStates}
          withIcon={false}
          onToggle={() => openStateHandler(!isOpenStates)}
          onChange={(val) => setData('state', val)}
          selectedValue={
            USStates.find(
              (option) => option.title === data?.state
            ) as SelectMenuOption
          }
          disableDropDown={disabledFlag}
          inputExtraStyles={'min-w-[80px] max-w-[80px]'}
          wrapperExtraStyles={'rounded-none border-t-0 border-l-0 border-r-0'}
        />
        <input
          className={classNames(
            inputCommonClasses,
            'min-w-[110px] max-w-[110px] border-t-0 border-r-0 border-l-gray-200'
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
        list={COUNTRIES}
        withIcon={true}
        onToggle={() => openCountryHandler(!isOpen)}
        onChange={(val) => setData('country', val)}
        selectedValue={
          COUNTRIES.find(
            (option) => option.title === data?.country
          ) as SelectMenuOption
        }
        inputExtraStyles={`${requiredError && !data?.country ? 'bg-red-50 rounded-b-md' : 'bg-transparent'} w-full `}
        wrapperExtraStyles={`rounded-b-0 border-0 ${requiredError && !data?.country ? 'bg-red-50' : 'bg-transparent'}`}
      />
    </div>
  );
};

export default SimpleAddressForm;
