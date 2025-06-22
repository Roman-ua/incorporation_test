import { classNames } from '../../../utils/helpers';
import React, { useEffect, useState } from 'react';
import { AddressFields } from '../../../interfaces/interfaces';
import XBtn from '../../../components/shared/buttons/XBtn';
import SimpleAddressForm from '../../../components/shared/SimpleAddressForm/SimpleAddressForm';
import SwitchButton from '../../../components/shared/SwitchButton/SwitchButton';
import { VALIDATORS } from '../../../constants/regexs';

interface IProps {
  agentName: string;
  agentAddress: AddressFields;
  closeModalHandler: () => void;
  submitProcess: (address: AddressFields, name: string) => void;
  hideX?: boolean;
}

// const emptyValue = {
//   id: 0,
//   name: '',
//   title: '',
//   email: '',
//   signer: false,
//   added: false,
//   removed: false,
//   address: {
//     country: '',
//     address0: '',
//     address1: '',
//     address2: '',
//     address3: '',
//     city: '',
//     zip: '',
//     state: '',
//     county: '',
//   },
// };

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

const notMandatoryFields = ['address1', 'address2', 'address3'];

const areFieldsValid = (fields: {
  [key: string]: string | number | undefined;
}): boolean => {
  return Object.entries(fields).every(([key, value]) => {
    if (notMandatoryFields.includes(key)) return true;

    if (key === 'zip') {
      return !!value && typeof value === 'string' && value.length >= 5;
    }
    return !!value;
  });
};

const RegAgentDataHandling = ({
  agentName,
  agentAddress,
  closeModalHandler,
  submitProcess,
  hideX,
}: IProps) => {
  const [agentNameLocal, setAgentNameLocal] = useState<string>(agentName);
  const [mandatoryError, setMandatoryError] = useState(false);
  const [languageError, setLanguageError] = useState<boolean>(false);
  const [address, setAddress] = React.useState<AddressFields>(
    agentAddress || defaultUS
  );

  useEffect(() => {
    if (agentName) {
      setAgentNameLocal(agentName);
    } else {
      setAgentNameLocal('');
    }

    return () => {
      setMandatoryError(false);
    };
  }, [agentName]);

  const updateAgentNameHandler = (value: string) => {
    setAgentNameLocal(value);
  };

  const addressHandler = (key: string, value: string) => {
    if (VALIDATORS.LANGUAGE.test(value)) {
      setAddress((prevState) => ({
        ...prevState,
        [key]: value,
      }));

      if (languageError) {
        setLanguageError(false);
      }
    } else {
      setLanguageError(true);
    }
  };

  const inputCommonClasses =
    'p-2 text-md border-b border-b-gray-200 placeholder:text-gray-500 hover:cursor-pointer focus:ring-0 focus:outline-none focus:border-gray-200';

  return (
    <div className="border border-gray-200 rounded-md p-7 my-5 bg-white relative w-full">
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
              onChange={(e) => updateAgentNameHandler(e.target.value)}
              className={classNames(
                'block rounded-md border w-full border-gray-200 p-2 text-md mb-2 text-gray-900 disabled:text-opacity-50 placeholder:text-gray-500  hover:cursor-pointer',
                mandatoryError && !agentName && 'bg-red-50'
              )}
              type="text"
              placeholder="Full name"
              value={agentNameLocal}
              data-1p-ignore={true}
            />
          </div>
        </div>
      </div>
      <div className="mb-2 flex items-end justify-between">
        <span className="font-bold text-sm">Address</span>
        <SwitchButton
          disabled={true}
          option1="US Address"
          option2="Other"
          selected={1}
          onSelect={() => {}}
        />
      </div>
      <div className="relative">
        <SimpleAddressForm
          disabledFlag={false}
          inputCommonClasses={inputCommonClasses}
          requiredError={mandatoryError}
          countryDisabled={true}
          data={address}
          setData={addressHandler}
          stateDisabled={true}
        />
        {languageError && (
          <div className="absolute -bottom-9 left-0 text-sm text-gray-900 bg-yellow-300/30 px-2 py-1 rounded-md">
            ⚠️ We currently support only English letters for address.
          </div>
        )}
      </div>
      <div className="flex items-center justify-end w-full py-2">
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
            if (areFieldsValid(address)) {
              submitProcess(address, agentNameLocal);
            } else {
              setMandatoryError(true);
            }
          }}
          className={classNames(
            'block rounded-md  px-3 py-2 text-center text-sm font-semibold text-white shadow-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 transition-all duration-150 ease-in-out hover:cursor-pointer',
            areFieldsValid(address)
              ? 'bg-mainBlue hover:bg-sideBarBlue '
              : 'bg-gray-500'
          )}
        >
          Save
        </div>
      </div>
    </div>
  );
};

export default RegAgentDataHandling;
