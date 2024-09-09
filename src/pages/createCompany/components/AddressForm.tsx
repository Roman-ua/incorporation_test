import React, { useState } from 'react';
import CountrySelector from '../../../components/shared/CountrySelect/selector';
import { COUNTRIES } from '../../../components/shared/CountrySelect/countries';
import { SelectMenuOption } from '../../../components/shared/CountrySelect/types';
import { VALIDATORS } from '../../../constants/regexs';
import { PlusIcon } from '@heroicons/react/24/outline';

function classNames(...classes: (string | boolean)[]) {
  return classes.filter(Boolean).join(' ');
}

type AddressFields = {
  country: string;
  address0: string;
  address1?: string;
  address2?: string;
  address3?: string;
  city: string;
  zip: string;
  state: string;
};

interface IProps {
  setFromState: (value: AddressFields) => void;
}

const addressFieldsMock = [
  { title: 'Address', type: 'text' },
  { title: 'Address', type: 'text' },
];

const areFieldsValid = ({
  country,
  address0,
  city,
  zip,
  state,
}: AddressFields): boolean => {
  return !!country && !!address0 && !!city && !!zip && !!state;
};

const AddressForm = ({ setFromState }: IProps) => {
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

  const [country, setCountry] = useState('US');
  const [address, setAddress] = useState<{
    address0: string;
    [key: string]: string;
  }>({
    address0: '',
  });
  const [city, setCity] = useState('');
  const [zip, setZip] = useState('');
  const [state, setState] = useState('');

  const setZipHandler = (value: string) => {
    if (value.length === 1 && value[0] === '-') {
      return;
    }
    if (value.length > 5 && value[5] !== '-') {
      return;
    }

    if (VALIDATORS.ZIP_CODE.test(value) || value === '') {
      setZip(value);
    }
  };

  const inputCommonClasses = 'p-2 text-md border-b focus:outline-none';

  return (
    <div className="flex flex-col items-end">
      <div className="rounded-md border w-full">
        <CountrySelector
          id={'countries'}
          open={isOpen}
          list={COUNTRIES}
          withIcon={true}
          onToggle={() => openCountryHandler(!isOpen)}
          onChange={(val) => setCountry(val)}
          selectedValue={
            COUNTRIES.find(
              (option) => option.value === country
            ) as SelectMenuOption
          }
          wrapperExtraStyles={'rounded-b-none border-t-0 border-l-0 border-r-0'}
        />
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
                className={classNames(inputCommonClasses, `w-full`)}
                type={field.type}
                value={address[index]}
                onChange={(e) =>
                  setAddress({
                    ...address,
                    [`address${index}`]: e.target.value,
                  })
                }
                placeholder={index === 0 ? field.title : ''}
              />
              <div className="absolute right-2 top-1/2 -translate-y-2/4">
                {index < 3 && index === addressFields.length - 1 && (
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
            className={classNames(inputCommonClasses, 'w-1/2 border-r')}
            type="text"
            value={city}
            onChange={(e) => setCity(e.target.value)}
            placeholder="City"
          />
          <input
            className={classNames(inputCommonClasses, 'w-1/2')}
            type="text"
            value={zip}
            onChange={(e) => setZipHandler(e.target.value)}
            placeholder="Postal Code"
          />
        </div>
        <input
          className={classNames(
            inputCommonClasses,
            'w-full rounded-b-md border-b-0'
          )}
          type="text"
          value={state}
          onChange={(e) => setState(e.target.value)}
          placeholder="State, province"
        />
      </div>
      <button
        onClick={() => setFromState({ country, ...address, city, zip, state })}
        disabled={
          !areFieldsValid({ country, address0: address[0], city, zip, state })
        }
        className="px-4 py-2 text-base font-bold bg-mainBlue text-white rounded-md mt-2 disabled:bg-gray-500"
      >
        Save
      </button>
    </div>
  );
};

export default AddressForm;
