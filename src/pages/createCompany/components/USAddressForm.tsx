import React, { useState } from 'react';
import CountrySelector from '../../../components/shared/CountrySelect/selector';
import { COUNTRIES } from '../../../components/shared/CountrySelect/countries';
import { SelectMenuOption } from '../../../components/shared/CountrySelect/types';
import { USStates } from '../../../constants/form/form';
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

const USAddressForm = ({ setFromState }: IProps) => {
  const [isOpen, setIsOpen] = useState(false);
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

  const [country, setCountry] = useState('US');
  const [address, setAddress] = useState<{
    address0: string;
    [key: string]: string;
  }>({
    address0: '',
  });
  console.log(address, 'address');
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

  const inputCommonClasses =
    'p-2 text-md border-b focus:outline-none placeholder-gray-500';

  return (
    <div className="flex flex-col items-end">
      <div className="rounded-md border w-full">
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
                  `w-full ${index === 0 ? 'rounded-t-md' : ''}`
                )}
                type={field.type}
                value={address[index]}
                onChange={(e) =>
                  setAddress({
                    ...address,
                    [`address${index}`]: e.target.value,
                  })
                }
                placeholder={field.title}
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
            className={classNames(inputCommonClasses, 'w-full border-r')}
            type="text"
            value={city}
            onChange={(e) => setCity(e.target.value)}
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
                (option) => option.value === state
              ) as SelectMenuOption
            }
            inputExtraStyles={'min-w-[80px] max-w-[80px]'}
            wrapperExtraStyles={'rounded-none border-t-0 border-l-0'}
          />
          <input
            className={classNames(inputCommonClasses, 'w-5/12')}
            type="text"
            value={zip}
            onChange={(e) => setZipHandler(e.target.value)}
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
              (option) => option.value === country
            ) as SelectMenuOption
          }
          inputExtraStyles={'w-full opacity-40'}
          disableDropDown={true}
          wrapperExtraStyles={'rounded-b-0 border-0'}
        />
      </div>
      <button
        onClick={() => {
          setFromState({ country, ...address, city, zip, state });
        }}
        disabled={
          !areFieldsValid({
            country,
            address0: address.address0,
            city,
            zip,
            state,
          })
        }
        className="px-4 py-2 text-base font-bold bg-mainBlue text-white rounded-md mt-2 disabled:bg-gray-500"
      >
        Save
      </button>
    </div>
  );
};

export default USAddressForm;
