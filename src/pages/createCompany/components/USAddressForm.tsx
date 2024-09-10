import React, { useEffect, useState } from 'react';
import CountrySelector from '../../../components/shared/CountrySelect/selector';
import { COUNTRIES } from '../../../components/shared/CountrySelect/countries';
import { SelectMenuOption } from '../../../components/shared/CountrySelect/types';
import { USStates } from '../../../constants/form/form';
import { VALIDATORS } from '../../../constants/regexs';
import { PlusIcon } from '@heroicons/react/24/outline';
import CheckBox from '../../../components/shared/CheckBox';

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
  const [loader, setLoader] = React.useState(false);
  const [done, setDone] = React.useState(false);

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

  const [city, setCity] = useState('');
  const [zip, setZip] = useState('');
  const [state, setState] = useState('');

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
      areFieldsValid({ country, address0: address.address0, city, zip, state })
    ) {
      setLoader(true);

      const timeout = setTimeout(() => {
        setLoader(false);
        setDone(true);
        setFromState({ country, ...address, city, zip, state });

        clearTimeout(timeout);
      }, 500);
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
            className={classNames(
              inputCommonClasses,
              'min-w-[110px] max-w-[110px]'
            )}
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
      {done ? (
        <div
          className={classNames(
            'rounded-full w-7 flex items-center justify-center mt-2'
          )}
        >
          <CheckBox
            wrapperSize={'w-7 h-7'}
            iconSize={'w-3.5 h-3.5'}
            isItemHovered={false}
            isItemSelected={true}
          />
        </div>
      ) : (
        <button
          onClick={saveHandler}
          disabled={
            !areFieldsValid({
              country,
              address0: address.address0,
              city,
              zip,
              state,
            })
          }
          className="flex items-center justify-center w-[69px] h-[40px] text-base font-bold bg-mainBlue text-white rounded-md mt-2 disabled:bg-gray-500"
        >
          {loader ? (
            <svg
              aria-hidden="true"
              className="w-4 h-4 text-gray-200 animate-spin dark:text-gray-600 fill-white"
              viewBox="0 0 100 101"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                fill="currentColor"
              />
              <path
                d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                fill="currentFill"
              />
            </svg>
          ) : (
            'Save'
          )}
        </button>
      )}
    </div>
  );
};

export default USAddressForm;
