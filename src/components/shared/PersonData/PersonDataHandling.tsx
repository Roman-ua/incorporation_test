import { classNames, filterLatinOnly } from '../../../utils/helpers';
import SimpleSelect from '../SimpleSelect/SimpleSelect';
import { mockTitleList } from '../../../mock/mockData';
import React, { useEffect, useState } from 'react';
import { AddressFields, Person } from '../../../interfaces/interfaces';
import SwitchButton from '../SwitchButton/SwitchButton';
import SimpleAddressForm from '../SimpleAddressForm/SimpleAddressForm';
import SimpleAddressFormNotUS from '../SimpleAddressFormNotUS/SimpleAddressFormNotUS';
import XBtn from '../buttons/XBtn';
import { VALIDATORS } from '../../../constants/regexs';
import { X } from 'lucide-react';

interface IProps {
  person: Person | undefined;
  closeModalHandler: () => void;
  removePersonHandler?: (id: number) => void;
  submitProcess: (person: Person) => void;
  isCreateProcess: boolean;
  hideX?: boolean;
}

const emptyValue = {
  id: 0,
  name: '',
  title: '',
  email: '',
  signer: false,
  added: false,
  removed: false,
  address: {
    country: '',
    address0: '',
    address1: '',
    address2: '',
    address3: '',
    city: '',
    zip: '',
    state: '',
    county: '',
  },
};

const defaultUS = {
  country: 'United States',
  address0: '',
  address1: '',
  address2: '',
  address3: '',
  city: '',
  zip: '',
  state: '',
};

const defaultOther = {
  country: '',
  address0: '',
  address1: '',
  address2: '',
  address3: '',
  city: '',
  zip: '',
  state: '',
};

const notMandatoryFields = ['address1', 'address2', 'address3'];
const notMandatoryFieldsUS = [
  'address1',
  'address2',
  'address3',
  'state',
  'zip',
];

interface IValidator {
  [key: string]: string | number | undefined;
}

const areFieldsValid = (fields: IValidator, isUS: boolean): boolean => {
  return Object.entries(fields).every(([key, value]) => {
    const notMandatoryFieldsBasedOption = isUS
      ? notMandatoryFieldsUS
      : notMandatoryFields;

    if (notMandatoryFieldsBasedOption.includes(key)) return true;

    if (isUS) {
      if (key === 'zip') {
        return !!value && typeof value === 'string' && value.length >= 5;
      }
      return !!value;
    } else {
      // For non-US addresses, only validate address0, city, and country
      if (key === 'address0' || key === 'city' || key === 'country') {
        return !!value;
      }
      return true; // Other fields are not mandatory
    }
  });
};

const PersonDataHandling = ({
  person,
  isCreateProcess,
  closeModalHandler,
  removePersonHandler,
  submitProcess,
  hideX,
}: IProps) => {
  const [localData, setLocalData] = useState<Person>(emptyValue);
  const [mandatoryError, setMandatoryError] = useState(false);
  const [selected, setSelected] = useState<1 | 2>(1);
  const [address, setAddress] = React.useState<AddressFields>(
    person?.address || defaultUS
  );
  const [languageError, setLanguageError] = useState<boolean>(false);

  useEffect(() => {
    if (person) {
      setLocalData(person);
    } else {
      setLocalData(emptyValue);
    }

    return () => {
      setMandatoryError(false);
    };
  }, [person]);

  const formTypeHandler = (value: 1 | 2) => {
    if (value === 1) {
      setAddress(defaultUS);
    } else {
      setAddress(defaultOther);
    }

    setSelected(value);
  };

  const signerCheckHandler = (currentChecked: boolean) => {
    setLocalData((prevState) => {
      const data = { ...prevState };
      data.signer = !currentChecked;
      return data;
    });
  };

  const updatePersonTitleHandler = (title: string) => {
    setLocalData((prevState) => {
      const data = { ...prevState };
      data.title = title;

      return data;
    });
  };

  const updatePersonDataHandler = (key: string, value: string) => {
    setLocalData((prevState) => {
      return {
        ...prevState,
        [key]: value,
      };
    });
  };

  const addressHandler = (key: string, value: string) => {
    const isOnlyAllowed = VALIDATORS.LANGUAGE.test(value);
    const hasCyrillic = /[\u0400-\u04FF]/.test(value);

    const filteredResult = filterLatinOnly(value);
    setAddress((prevState) => ({
      ...prevState,
      [key]: filteredResult,
    }));

    if (isOnlyAllowed && !hasCyrillic) {
      setLanguageError(false);
    } else {
      setLanguageError(true);
    }
  };

  const updatePersonAddressHandler = (updatedAddress: AddressFields) => {
    setLocalData((prevState) => {
      const data = { ...prevState };

      if (isCreateProcess) {
        data.id = Math.floor(Math.random() * 100) + 1;
      }
      data.address = updatedAddress;

      submitProcess(data);
      setLocalData(emptyValue);
      setAddress(defaultUS);
      closeModalHandler();

      return data;
    });
  };

  const inputCommonClasses =
    'p-2 text-md border-b border-b-gray-200 placeholder:text-gray-500 hover:cursor-pointer focus:ring-0 focus:outline-none focus:border-gray-200';

  return localData?.name || isCreateProcess ? (
    <div className="border border-gray-200 rounded-md p-7 my-5 bg-white relative">
      {!hideX && <XBtn clickHandler={closeModalHandler} />}
      <div
        className={classNames(
          `flex py-3 group transition-all ease-in-out duration-150 items-start justify-start`
        )}
      >
        <div className="w-full">
          <div className="mb-5">
            <div className="mb-2 font-bold text-sm">Name and Title</div>
            <input
              onChange={(e) => updatePersonDataHandler('name', e.target.value)}
              className={classNames(
                'block rounded-md border w-full border-gray-200 p-2 text-md mb-2 text-gray-900 disabled:text-opacity-50 placeholder:text-gray-500  hover:cursor-pointer',
                mandatoryError && !localData?.name && 'bg-red-50'
              )}
              type="text"
              placeholder="Full name"
              value={localData?.name}
              data-1p-ignore={true}
              disabled={person?.new ? false : !isCreateProcess}
            />
            <SimpleSelect
              valueHandler={updatePersonTitleHandler}
              list={mockTitleList}
              currentItem={localData?.title}
              mandatoryError={mandatoryError}
            />
          </div>
          <div className="mb-5">
            <div className="font-bold mb-2 text-sm">Email</div>
            <input
              onChange={(e) => updatePersonDataHandler('email', e.target.value)}
              className={classNames(
                'block rounded-md border w-full  border-gray-200 p-2 text-md mb-2 text-gray-900 disabled:text-opacity-50 placeholder:text-gray-500  hover:cursor-pointer'
              )}
              type="text"
              placeholder="Email"
              value={localData?.email}
              data-1p-ignore={true}
              disabled={person?.new ? false : !isCreateProcess}
            />
          </div>
          <div className="mb-3">
            <div className="mb-2 font-bold text-sm">Signer</div>
            <div className="flex items-center">
              <input
                onChange={() => signerCheckHandler(localData?.signer)}
                checked={localData?.signer}
                id="checked-checkbox"
                type="checkbox"
                value=""
                data-1p-ignore={true}
                className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600 hover:cursor-pointer"
              />
              <label
                htmlFor="checked-checkbox"
                className="text-xs font-semibold text-gray-700 ml-2"
              >
                Signatory of the Annual Report.
              </label>
            </div>
          </div>
        </div>
      </div>
      <div className="mb-2 flex items-end justify-between">
        <div className="flex items-center justify-start gap-3">
          <span className="font-bold text-sm py-1">Address</span>
        </div>
        <SwitchButton
          option1="US Address"
          option2="Other"
          selected={selected}
          onSelect={formTypeHandler}
        />
      </div>
      <div className="relative w-full">
        {selected === 1 ? (
          <SimpleAddressForm
            disabledFlag={false}
            inputCommonClasses={inputCommonClasses}
            requiredError={mandatoryError}
            countryDisabled={true}
            data={address}
            setData={addressHandler}
          />
        ) : (
          <SimpleAddressFormNotUS
            disabledFlag={false}
            inputCommonClasses={inputCommonClasses}
            requiredError={mandatoryError}
            data={address}
            setData={addressHandler}
          />
        )}
      </div>
      {languageError ? (
        <div
          className={classNames(
            'text-sm text-gray-900 bg-yellow-300/30 px-2 py-1 rounded-md flex items-center justify-between w-full mt-2'
          )}
        >
          <div>
            ⚠️{' '}
            <span className="ml-1">
              We currently support only English letters for address.
            </span>
          </div>
          <button
            onClick={() => setLanguageError(false)}
            className="hover:cursor-pointer"
          >
            <X className="w-3.5 h-3.5 text-gray-500" />
          </button>
        </div>
      ) : (
        <div className="h-7 mt-2" />
      )}
      <div className="flex items-center justify-end w-full py-2">
        {removePersonHandler && localData?.id ? (
          <div
            onClick={() => removePersonHandler(localData?.id)}
            className="mr-auto block rounded-md bg-red-50 border-red-50 px-3 py-2 border text-center text-sm font-semibold shadow-sm text-gray-900 hover:bg-red-100 hover:border-red-100 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 transition-all duration-150 ease-in-out hover:cursor-pointer"
          >
            Delete
          </div>
        ) : (
          <div className="w-1/2" />
        )}
        {closeModalHandler && (
          <div
            onClick={closeModalHandler}
            className="mr-2 block px-3 py-2 text-center text-sm font-semibold text-gray-800 hover:text-gray-900 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 transition-all duration-150 ease-in-out hover:cursor-pointer"
          >
            Cancel
          </div>
        )}
        <div
          onClick={() => {
            console.log(address, 'address');
            if (areFieldsValid(address, selected === 1)) {
              updatePersonAddressHandler(address);
            } else {
              setMandatoryError(true);
            }
          }}
          className={classNames(
            'block rounded-md  px-3 py-2 text-center text-sm font-semibold text-white shadow-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 transition-all duration-150 ease-in-out hover:cursor-pointer',
            areFieldsValid(address, selected === 1)
              ? 'bg-mainBlue hover:bg-sideBarBlue '
              : 'bg-gray-500'
          )}
        >
          Save
        </div>
      </div>
    </div>
  ) : (
    <></>
  );
};

export default PersonDataHandling;
