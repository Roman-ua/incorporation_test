import React, { useEffect, useState } from 'react';
import CountrySelector from '../../../components/shared/CountrySelect/selector';
import { COUNTRIES } from '../../../components/shared/CountrySelect/countries';
import { SelectMenuOption } from '../../../components/shared/CountrySelect/types';
import { PlusIcon } from '@heroicons/react/24/outline';
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-expect-error
import CustomButton from '../../../components/shared/ButtonWithLoader/Button';

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
}: AddressFields): boolean => {
  return !!country && !!address0 && !!city;
};

const AddressForm = ({ setFromState }: IProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [done, setDone] = React.useState(false);
  const [focused, setFocused] = useState(false);

  const [isOpenStates, setIsOpenStates] = useState(false);
  const [addressFields, setAddressFields] =
    useState<{ title: string; type: string }[]>(addressFieldsMock);

  const openCountryHandler = (value: boolean) => {
    if (isOpenStates) {
      setIsOpenStates(false);
    }

    setIsOpen(value);
  };

  const [country, setCountry] = useState('');
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
    setZip(value);
  };

  const saveHandler = () => {
    if (areFieldsValid({ country, address0: address.address0, city })) {
      setDone(true);
      setFromState({ country, ...address, city });
    }
  };

  useEffect(() => {
    if (done) {
      setDone(false);
    }
  }, [address, state, city, country, zip]);

  const inputCommonClasses =
    'p-2 text-md border-b focus:outline-none placeholder-gray-500';

  return (
    <div className="flex flex-col items-end">
      <div
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
        className={classNames(
          'rounded-md border w-full',
          focused ? 'border border-mainBlue shadow-[0_0_0_1px_#0277ff]' : ''
        )}
      >
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
          disableDropDown={false}
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
                data-1p-ignore={true}
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
            className={classNames(inputCommonClasses, 'w-1/2 border-r')}
            type="text"
            value={city}
            onChange={(e) => setCity(e.target.value)}
            data-1p-ignore={true}
            placeholder="City"
          />
          <input
            className={classNames(inputCommonClasses, 'w-1/2')}
            type="text"
            value={zip}
            onChange={(e) => setZipHandler(e.target.value)}
            data-1p-ignore={true}
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
          data-1p-ignore={true}
          placeholder="State, province"
        />
      </div>
      <CustomButton
        discard={done}
        clickHandler={saveHandler}
        disabled={
          !areFieldsValid({ country, address0: address.address0, city })
        }
        uniqId={'addressForm'}
      />
    </div>
  );
};

export default AddressForm;
