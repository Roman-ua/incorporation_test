import React, { useState } from 'react';
import CountrySelector from '../../../components/shared/CountrySelect/selector';
import { COUNTRIES } from '../../../components/shared/CountrySelect/countries';
import { SelectMenuOption } from '../../../components/shared/CountrySelect/types';
import { USStates } from '../../../constants/form/form';
import { VALIDATORS } from '../../../constants/regexs';

function classNames(...classes: (string | boolean)[]) {
  return classes.filter(Boolean).join(' ');
}

type AddressFields = {
  country: string;
  addressOne: string;
  addressTwo?: string;
  city: string;
  zip: string;
  state: string;
};

interface IProps {
  setFromState: (value: AddressFields) => void;
}

const areFieldsValid = ({
  country,
  addressOne,
  city,
  zip,
  state,
}: AddressFields): boolean => {
  return !!country && !!addressOne && !!city && !!zip && !!state;
};

const AddressForm = ({ setFromState }: IProps) => {
  const [isOpen, setIsOpen] = useState(false);
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
  const [addressOne, setAddressOne] = useState('');
  const [addressTwo, setAddressTwo] = useState('');
  const [city, setCity] = useState('');
  const [zip, setZip] = useState('');
  const [state, setState] = useState('NY');

  const setZipHandler = (value: string) => {
    const validatedValue = value.replace(VALIDATORS.ZIP_CODE, '');
    setZip(validatedValue);
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
        <input
          className={classNames(inputCommonClasses, 'w-full')}
          type="text"
          value={addressOne}
          onChange={(e) => setAddressOne(e.target.value)}
          placeholder="Address line 1"
        />
        <input
          className={classNames(inputCommonClasses, 'w-full')}
          type="text"
          value={addressTwo}
          onChange={(e) => setAddressTwo(e.target.value)}
          placeholder="Address line 2"
        />
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
            placeholder="ZIP"
          />
        </div>
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
          wrapperExtraStyles={'rounded-t-none border-0'}
        />
      </div>
      <button
        onClick={() =>
          setFromState({ country, addressOne, addressTwo, city, zip, state })
        }
        disabled={!areFieldsValid({ country, addressOne, city, zip, state })}
        className="px-4 py-2 text-base font-bold bg-mainBlue text-white rounded-md mt-2 disabled:bg-gray-500"
      >
        Save
      </button>
    </div>
  );
};

export default AddressForm;
