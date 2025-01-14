import { classNames } from '../../../utils/helpers';
import { IconX } from '@tabler/icons-react';
import SimpleSelect from '../SimpleSelect/SimpleSelect';
import { mockReportData, mockTitleList } from '../../../mock/mockData';
import USAddressForm from '../../../pages/createCompany/components/USAddressForm';
import React, { useEffect, useRef, useState } from 'react';
import { AddressFields, Person } from '../../../interfaces/interfaces';

interface IProps {
  person: Person | undefined;
  closeModalHandler: () => void;
  removePersonHandler?: (id: number) => void;
  submitProcess: (person: Person) => void;
  isCreateProcess: boolean;
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

const PersonDataHandling = ({
  person,
  isCreateProcess,
  closeModalHandler,
  removePersonHandler,
  submitProcess,
}: IProps) => {
  const [localData, setLocalData] = useState<Person>(emptyValue);
  const componentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (person) {
      setLocalData(person);
    } else {
      setLocalData(emptyValue);
    }
  }, [person]);

  useEffect(() => {
    if (componentRef.current) {
      componentRef.current.scrollIntoView({
        behavior: 'smooth',
        block: 'center',
      });
    }
  }, []);

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

  const updatePersonAddressHandler = (updatedAddress: AddressFields) => {
    setLocalData((prevState) => {
      const data = { ...prevState };

      data.address = updatedAddress;

      submitProcess(data);
      closeModalHandler();

      return data;
    });
  };

  return (
    <div
      ref={componentRef}
      className="border border-gray-200 rounded-md p-7 my-5 bg-white relative"
    >
      <div
        onClick={closeModalHandler}
        className="flex items-center justify-between absolute top-6 right-6 p-1 border rounded-md hover:cursor-pointer"
      >
        <IconX className="w-4 h-4 text-gray-700" />
      </div>
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
              className="block rounded-md border w-full border-gray-200 p-2 text-md mb-2 text-gray-900 disabled:opacity-70 placeholder:text-gray-300 hover:placeholder:text-gray-400"
              type="text"
              placeholder="Full name"
              value={localData?.name}
              disabled={!isCreateProcess}
            />
            <SimpleSelect
              valueHandler={updatePersonTitleHandler}
              list={mockTitleList}
              currentItem={localData?.title}
            />
          </div>
          <div className="mb-5">
            <div className="font-bold mb-2 text-sm">Email</div>
            <input
              onChange={(e) => updatePersonDataHandler('email', e.target.value)}
              className="block rounded-md border w-full border-gray-200 p-2 text-md mb-2 text-gray-900 disabled:opacity-70 placeholder:text-gray-300 hover:placeholder:text-gray-400"
              type="text"
              placeholder="Email"
              value={localData?.email}
              disabled={!isCreateProcess}
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
      <div className="mb-2 font-bold text-sm">Address</div>
      <USAddressForm
        deleteAction={
          removePersonHandler
            ? () => removePersonHandler(localData?.id)
            : undefined
        }
        cancelAction={closeModalHandler}
        setFromState={updatePersonAddressHandler}
        heading={``}
        removeFocusEffect={true}
        requiredError={false}
        enableCountry={true}
        value={isCreateProcess ? localData?.address : mockReportData.address}
      />
    </div>
  );
};

export default PersonDataHandling;
