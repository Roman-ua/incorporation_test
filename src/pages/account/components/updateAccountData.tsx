import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { format } from 'date-fns';
import { classNames, filterLatinOnly } from '../../../utils/helpers';
import SwitchButton from '../../../components/shared/SwitchButton/SwitchButton';
import SimpleAddressForm from '../../../components/shared/SimpleAddressForm/SimpleAddressForm';
import SimpleAddressFormNotUS from '../../../components/shared/SimpleAddressFormNotUS/SimpleAddressFormNotUS';
import { AddressFields } from '../../../interfaces/interfaces';
import XBtn from '../../../components/shared/buttons/XBtn';
import { AvatarUpload } from '../../company/components/AddPersonPhoto';
import { validateEmail } from '../../../utils/validators';
import ModalWrapperLayout from '../../../components/shared/Modals/ModalWrapperLayout';
import { VALIDATORS } from '../../../constants/regexs';
import { FiPhone } from 'react-icons/fi';

import { MdOutlineMail } from 'react-icons/md';
import { PhoneWithValidation } from '../../../components/shared/PhoneWithValidation/PhoneWithValidation';
import WarningMessage from '../../../components/shared/WarningMessage/WarningMessage';
import { FaLinkedin, FaSquareXTwitter } from 'react-icons/fa6';
import { FaFacebookSquare } from 'react-icons/fa';
import { BsTelegram } from 'react-icons/bs';

export interface Person {
  id: string;
  fullName: string;
  email: string;
  titles: string[];
  dateAdded: string;
  status: string;
  address: AddressFields;
  picture: string;
}

interface AddPersonModalProps {
  isOpen: boolean;
  onClose: () => void;
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

const defaultPerson = {
  fullName: '',
  email: '',
  phone: '',
  telegram: '',
  whatsapp: '',
  linkedin: '',
  facebook: '',
  twitter: '',
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

export function UpdateAccountData({
  isOpen,
  onClose,
  onAdd,
}: AddPersonModalProps) {
  const [mandatoryError, setMandatoryError] = useState<boolean>(false);
  const [selected, setSelected] = useState<1 | 2>(1);
  const [address, setAddress] = React.useState<AddressFields>(defaultUS);
  const [formData, setFormData] = useState(defaultPerson);

  const [error, setError] = React.useState<string>('');
  const [fullNameError, setFullNameError] = React.useState<string>('');
  const [isNotValidEmail, setIsNotValidEmail] = React.useState<boolean>(false);
  const [languageError, setLanguageError] = useState<boolean>(false);
  const [phoneError, setPhoneError] = React.useState<string>('');

  const [focusedInput, setFocusedInput] = useState<string>('');

  const [tgNickNameFlag, setTgNickNameFlag] = useState<boolean>(false);

  const cleanFormHandler = () => {
    setFormData(defaultPerson);
    setError('');
    setPhoneError('');
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
    return (
      !formData.fullName ||
      formData.titles.length <= 0 ||
      fullNameError ||
      phoneError
    );
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
    <ModalWrapperLayout
      closeModal={() => {
        cleanFormHandler();
        onClose();
      }}
      isOpen={isOpen}
    >
      <div className="p-6">
        <div className="mb-6">
          <h2 className="text-xl font-medium  ">
            <span>Update Account Data</span>
            <XBtn
              clickHandler={() => {
                cleanFormHandler();
                onClose();
              }}
            />
          </h2>
        </div>

        <form>
          <div className="flex gap-6 mb-6">
            <div className="flex-1 space-y-8">
              <div className="flex gap-4 items-center w-full">
                <AvatarUpload removeControles={true} />
                <div className="relative w-full">
                  <input
                    onChange={fullNameHandler}
                    className={classNames(
                      'block rounded-md border w-full border-gray-200 p-2 text-md ring-0 text-gray-900 disabled:text-opacity-50 placeholder:text-gray-500  hover:cursor-pointer focus:placeholder:text-transparent',
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
                    <WarningMessage
                      message={fullNameError}
                      onClose={() => setFullNameError('')}
                      wrapperClass="absolute -bottom-7 right-0 w-[270px] text-xs"
                    />
                  )}
                </div>
              </div>

              <div className="relative">
                {/* <div className="font-bold mb-1 text-sm">Email</div> */}
                <MdOutlineMail className="w-4 h-4 text-gray-500 absolute top-[31%] left-2.5" />
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
                    'block rounded-md border w-full  border-gray-200 pl-8 p-2 text-md mb-4 text-gray-900 disabled:text-opacity-50 placeholder:text-gray-500  hover:cursor-pointer focus:placeholder:text-transparent',
                    mandatoryError && !formData?.email
                      ? 'bg-red-50 focus:ring-red-400 focus:border-red-400'
                      : 'focus:ring-mainBlue'
                  )}
                  type="text"
                  onBlur={handleBlurEmail}
                  placeholder="Email"
                  data-1p-ignore={true}
                  value={formData.email}
                />
                {error && (
                  <WarningMessage
                    message={error}
                    onClose={() => setError('')}
                    wrapperClass="absolute -bottom-7 right-0 w-[270px] text-xs"
                  />
                )}
              </div>

              <div className="relative">
                <PhoneWithValidation
                  value={formData.phone}
                  onChange={(value) => {
                    setFormData({ ...formData, phone: value });
                  }}
                  error={phoneError}
                  setError={setPhoneError}
                  placeholder="Phone"
                  required={true}
                />
              </div>

              {/* Telegram */}
              <div className="relative">
                <BsTelegram className="w-4 h-4 text-gray-500 absolute top-[31%] left-2.5" />
                <input
                  onChange={(e) => {
                    setFormData({
                      ...formData,
                      telegram: e.target.value,
                    });
                  }}
                  className={classNames(
                    'focus:ring-mainBlue block rounded-md border w-full border-gray-200 pl-8 p-2 text-md mb-4 ring-0 text-gray-900 disabled:text-opacity-50 placeholder:text-gray-500 hover:cursor-pointer'
                  )}
                  type="text"
                  placeholder={
                    focusedInput === 'telegram' && tgNickNameFlag
                      ? '@username'
                      : 'Phone number'
                  }
                  data-1p-ignore={true}
                  value={formData?.telegram}
                  onFocus={() => setFocusedInput('telegram')}
                  onBlur={() => setFocusedInput('')}
                />
                <div
                  onClick={() => {
                    setTgNickNameFlag(!tgNickNameFlag);
                    setFormData({
                      ...formData,
                      telegram: '',
                    });
                  }}
                  className="absolute top-[31%] right-2 hover:cursor-pointer"
                >
                  {!tgNickNameFlag ? (
                    <div className=" flex items-center justify-center text-sm w-4 h-4 text-gray-700 font-bold">
                      @
                    </div>
                  ) : (
                    <FiPhone className="w-4 h-4 text-gray-700" />
                  )}
                </div>
              </div>

              {/* Twitter */}
              <div className="relative">
                <FaSquareXTwitter className="w-4 h-4 text-gray-500 absolute top-[30%] left-2.5" />
                <input
                  onChange={(e) => {
                    setFormData({
                      ...formData,
                      twitter: e.target.value,
                    });
                  }}
                  className={classNames(
                    'focus:ring-mainBlue block rounded-md border w-full border-gray-200 pl-8 p-2 text-md mb-4 ring-0 text-gray-900 disabled:text-opacity-50 placeholder:text-gray-500  hover:cursor-pointer'
                  )}
                  type="text"
                  placeholder={focusedInput === 'x' ? 'x.com/username' : 'X'}
                  data-1p-ignore={true}
                  value={formData?.twitter}
                  onFocus={() => setFocusedInput('x')}
                  onBlur={() => setFocusedInput('')}
                />
              </div>
              {/* Facebook */}
              <div className="relative">
                <FaFacebookSquare className="w-4 h-4 text-gray-500 absolute top-[30%] left-2.5" />
                <input
                  onChange={(e) => {
                    setFormData({
                      ...formData,
                      facebook: e.target.value,
                    });
                  }}
                  className={classNames(
                    'focus:ring-mainBlue block rounded-md border w-full border-gray-200 pl-8 p-2 text-md mb-4 ring-0 text-gray-900 disabled:text-opacity-50 placeholder:text-gray-500  hover:cursor-pointer'
                  )}
                  type="text"
                  placeholder={
                    focusedInput === 'facebook'
                      ? 'facebook.com/username'
                      : 'Facebook'
                  }
                  data-1p-ignore={true}
                  value={formData?.facebook}
                  onFocus={() => setFocusedInput('facebook')}
                  onBlur={() => setFocusedInput('')}
                />
              </div>
              {/* LinkedIn */}
              <div className="relative">
                <FaLinkedin className="w-4 h-4 text-gray-500 absolute top-[30%] left-2.5" />
                <input
                  onChange={(e) => {
                    setFormData({
                      ...formData,
                      linkedin: e.target.value,
                    });
                  }}
                  className={classNames(
                    'focus:ring-mainBlue block rounded-md border w-full border-gray-200 pl-8 p-2 text-md mb-4 ring-0 text-gray-900 disabled:text-opacity-50 placeholder:text-gray-500  hover:cursor-pointer'
                  )}
                  type="text"
                  placeholder={
                    focusedInput === 'linkedin'
                      ? 'linkedin.com/in/username'
                      : 'LinkedIn'
                  }
                  data-1p-ignore={true}
                  value={formData?.linkedin}
                  onFocus={() => setFocusedInput('linkedin')}
                  onBlur={() => setFocusedInput('')}
                />
              </div>
            </div>
          </div>

          <div className="mb-10">
            <div className="flex items-end justify-between mb-2">
              <span className="text-sm font-medium text-black">Address</span>
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
                <WarningMessage
                  message="We currently support only English letters for address."
                  onClose={() => setLanguageError(false)}
                  wrapperClass="absolute -bottom-9 left-0"
                />
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
