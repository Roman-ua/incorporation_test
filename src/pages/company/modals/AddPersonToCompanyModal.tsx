import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { format } from 'date-fns';
import { classNames, filterLatinOnly } from '../../../utils/helpers';
import SwitchButton from '../../../components/shared/SwitchButton/SwitchButton';
import SimpleAddressForm from '../../../components/shared/SimpleAddressForm/SimpleAddressForm';
import SimpleAddressFormNotUS from '../../../components/shared/SimpleAddressFormNotUS/SimpleAddressFormNotUS';
import { AddressFields } from '../../../interfaces/interfaces';
import { Checkbox } from '../../../components/shared/Checkboxes/CheckBoxSq';
import XBtn from '../../../components/shared/buttons/XBtn';
import { AvatarUpload } from '../components/AddPersonPhoto';
import { validateEmail } from '../../../utils/validators';
import ModalWrapperLayout from '../../../components/shared/Modals/ModalWrapperLayout';
import { VALIDATORS } from '../../../constants/regexs';
import { X } from 'lucide-react';

export interface Person {
  id: string;
  fullName: string;
  email: string;
  sendInvitation: boolean;
  titles: string[];
  dateAdded: string;
  status: string;
  address: AddressFields;
  picture: string;
}

interface AddPersonModalProps {
  isOpen: boolean;
  onClose: () => void;
  companyType: string;
  onAdd: (person: Person) => void;
}

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

const incTitles = [
  'Director',
  'CEO',
  'Treasurer',
  'CFO',
  'Secretary',
  'President',
];

const defaultPerson = {
  fullName: '',
  email: '',
  sendInvitation: false,
  titles: [] as string[],
  dateAdded: format(new Date(), 'yyyy-MM-dd'),
  addressType: 'US' as 'US' | 'Other',
  status: 'Inactive',
  street: '',
  city: '',
  state: '',
  zipCode: '',
  country: '',
  picture: '',
};

const llcTitles = ['Authorized Member (AMBR)', 'Manager'];

export function AddPersonModal({
  companyType,
  isOpen,
  onClose,
  onAdd,
}: AddPersonModalProps) {
  const [mandatoryError, setMandatoryError] = useState<boolean>(false);
  const [selected, setSelected] = useState<1 | 2>(1);
  const [address, setAddress] = React.useState<AddressFields>(defaultUS);
  const [error, setError] = React.useState<string>('');
  const [fullNameError, setFullNameError] = React.useState<string>('');
  const [isNotValidEmail, setIsNotValidEmail] = React.useState<boolean>(false);
  const [formData, setFormData] = useState(defaultPerson);
  const [languageError, setLanguageError] = useState<boolean>(false);

  const cleanFormHandler = () => {
    setFormData(defaultPerson);
    setError('');
    setAddress(defaultUS);
    setSelected(1);
    setMandatoryError(false);
    setIsNotValidEmail(false);
    setFullNameError('');
  };

  const formTypeHandler = (value: 1 | 2) => {
    if (value === 1) {
      setAddress(defaultUS);
    } else {
      setAddress(defaultOther);
    }

    setSelected(value);
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

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.fullName || !formData.titles.length || fullNameError) {
      setMandatoryError(true);
      return;
    }

    const person: Person = {
      id: crypto.randomUUID(),
      fullName: formData.fullName,
      email: formData.email,
      sendInvitation: formData.sendInvitation,
      titles: formData.titles,
      dateAdded: formData.dateAdded,
      status: formData.status,
      address: address,
      picture:
        formData.picture ||
        'https://images.unsplash.com/photo-1633332755192-727a05c4013d?w=400',
    };
    onAdd(person);
    cleanFormHandler();
    onClose();
  };

  const handleBlurEmail = () => {
    if (validateEmail(formData.email) || !formData.email) {
      setIsNotValidEmail(false);
      setError('');
    } else {
      setIsNotValidEmail(true);
      setError('Provide a valid email.');
    }
  };

  const disabledButtonFlag = () => {
    return !formData.fullName || formData.titles.length <= 0 || fullNameError;
  };

  const fullNameValidator = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.trim();

    const fullNameRegex = /^[A-Za-zА-Яа-яЁё]+(\s+[A-Za-zА-Яа-яЁё]+)+$/;

    if (!value || fullNameRegex.test(value)) {
      setFullNameError('');
    } else {
      setFullNameError('Provide first name and last name.');
    }
  };

  const fullNameHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, fullName: e.target.value });

    if (fullNameError) {
      setFullNameError('');
    }
  };

  const inputCommonClasses =
    'p-2 text-md border-b border-b-gray-200 placeholder:text-gray-500 hover:cursor-pointer focus:ring-0 focus:outline-none focus:border-gray-200';

  return (
    <ModalWrapperLayout closeModal={onClose} isOpen={isOpen}>
      <div className="p-6">
        <div className="mb-6">
          <h2 className="text-xl font-medium  ">
            <span>Add New Person</span>
            <XBtn clickHandler={onClose} />
          </h2>
        </div>

        <form>
          <div className="flex gap-6 mb-6">
            <div className="flex-1 space-y-5">
              <div>
                <AvatarUpload removeControles={true} />
              </div>
              <div className="relative">
                <div className="mb-1 font-bold text-sm">Full Name</div>
                <input
                  onChange={fullNameHandler}
                  className={classNames(
                    'block rounded-md border w-full border-gray-200 p-2 text-md mb-2 ring-0 text-gray-900 disabled:text-opacity-50 placeholder:text-gray-500  hover:cursor-pointer',
                    fullNameError &&
                      'ring-1 ring-red-400 focus:ring-red-400 border-red-400 focus:border-red-400',
                    mandatoryError && !formData?.fullName
                      ? 'bg-red-50 focus:ring-red-400 focus:border-red-400'
                      : 'focus:ring-mainBlue'
                  )}
                  type="text"
                  placeholder="Full name"
                  onBlur={fullNameValidator}
                  data-1p-ignore={true}
                  value={formData?.fullName}
                />
                {fullNameError && (
                  <span className="text-red-500 text-sm font-semibold absolute -bottom-6 right-0">
                    {fullNameError}
                  </span>
                )}
              </div>

              <div className="relative">
                <div className="font-bold mb-1 text-sm">Email</div>
                <input
                  onChange={(e) => {
                    if (error) {
                      setIsNotValidEmail(false);
                      setError('');
                    }
                    setFormData({ ...formData, email: e.target.value });
                  }}
                  className={classNames(
                    isNotValidEmail &&
                      'ring-1 ring-red-400 focus:ring-red-400 border-red-400 focus:border-red-400',
                    'block rounded-md border w-full  border-gray-200 p-2 text-md mb-2 text-gray-900 disabled:text-opacity-50 placeholder:text-gray-500  hover:cursor-pointer'
                  )}
                  type="text"
                  onBlur={handleBlurEmail}
                  placeholder="Email"
                  data-1p-ignore={true}
                  value={formData.email}
                />
                <div className="mt-2">
                  <Checkbox
                    wrapperClass={'h-4 w-4 min-w-4 min-h-4'}
                    iconClass={'h-2.5 w-2.5'}
                    id={`Send invitation`}
                    title={'Send invitation'}
                    mandatoryError={false}
                    underInput={true}
                    checked={formData.sendInvitation}
                    onChange={(value) =>
                      setFormData({
                        ...formData,
                        sendInvitation: value,
                      })
                    }
                  />
                </div>
                {error && (
                  <span className="text-red-500 text-sm font-semibold absolute bottom-3 right-0">
                    {error}
                  </span>
                )}
              </div>

              <div>
                <div className="font-bold mb-2 text-sm">Titles</div>
                <div className="mt-2 grid grid-cols-2 gap-y-1 gap-x-4 w-fit">
                  {(companyType === 'Corporation' ? incTitles : llcTitles).map(
                    (title, index) => (
                      <Checkbox
                        key={index}
                        id={`${index}`}
                        title={title}
                        underInput={false}
                        wrapperClass={'h-5 w-5 min-w-5 min-h-5'}
                        iconClass={'h-3 w-3'}
                        mandatoryError={
                          mandatoryError && formData.titles.length <= 0
                        }
                        checked={formData.titles.includes(title)}
                        onChange={(value) => {
                          const newTitles = value
                            ? [...formData.titles, title]
                            : formData.titles.filter((t) => t !== title);
                          setFormData({ ...formData, titles: newTitles });
                        }}
                      />
                    )
                  )}
                </div>
              </div>
            </div>
          </div>

          <div className="mb-10">
            <div className="flex items-end justify-between mb-2">
              <span className="font-bold text-sm">Address</span>
              <SwitchButton
                option1="US Address"
                option2="Other"
                selected={selected}
                onSelect={formTypeHandler}
              />
            </div>

            <motion.div
              initial={false}
              animate={{ height: 'auto' }}
              className="space-y-4 relative"
            >
              {selected === 1 ? (
                <SimpleAddressForm
                  disabledFlag={false}
                  inputCommonClasses={inputCommonClasses}
                  requiredError={false}
                  countryDisabled={true}
                  data={address}
                  setData={addressHandler}
                />
              ) : (
                <SimpleAddressFormNotUS
                  disabledFlag={false}
                  inputCommonClasses={inputCommonClasses}
                  requiredError={false}
                  data={address}
                  setData={addressHandler}
                />
              )}
              {languageError && (
                <div className="absolute -bottom-9 left-0 w-full text-sm text-gray-900 bg-yellow-300/30 px-2 py-1 rounded-md flex items-center justify-between">
                  <div>
                    ⚠️{' '}
                    <span className="ml-1">
                      We currently support only English letters for address.
                    </span>
                  </div>
                  <button
                    className="hover:cursor-pointer"
                    onClick={() => setLanguageError(false)}
                  >
                    <X className="w-3.5 h-3.5 text-gray-500" />
                  </button>
                </div>
              )}
            </motion.div>
          </div>

          <div className="mr-auto flex items-center justify-end pt-1">
            <div className="w-1/2" />
            <div
              onClick={() => {
                cleanFormHandler();
                onClose();
              }}
              className="mr-2 block px-3 py-2 text-center text-sm font-semibold text-gray-800 hover:text-gray-900 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 transition-all duration-150 ease-in-out hover:cursor-pointer"
            >
              Cancel
            </div>
            <div
              onClick={handleSubmit}
              className={classNames(
                !disabledButtonFlag()
                  ? 'bg-mainBlue hover:bg-sideBarBlue '
                  : 'bg-gray-500',
                'block rounded-md px-3 py-2 text-center text-sm font-semibold text-white shadow-sm  focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 transition-all duration-150 ease-in-out hover:cursor-pointer'
              )}
            >
              Submit
            </div>
          </div>
        </form>
      </div>
    </ModalWrapperLayout>
  );
}
