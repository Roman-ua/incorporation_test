import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { classNames, filterLatinOnly } from '../../../utils/helpers';
import SwitchButton from '../../../components/shared/SwitchButton/SwitchButton';
import SimpleAddressForm from '../../../components/shared/SimpleAddressForm/SimpleAddressForm';
import SimpleAddressFormNotUS from '../../../components/shared/SimpleAddressFormNotUS/SimpleAddressFormNotUS';
import { AddressFields } from '../../../interfaces/interfaces';
import XBtn from '../../../components/shared/buttons/XBtn';
import { AvatarUpload } from '../../company/components/AddPersonPhoto';
import {
  isValidFacebookUrl,
  isValidLinkedinUrl,
  isValidTwitterUrl,
  isValidXUrl,
  validateEmail,
} from '../../../utils/validators';
import ModalWrapperLayout from '../../../components/shared/Modals/ModalWrapperLayout';
import { VALIDATORS } from '../../../constants/regexs';

import { MdOutlineMail } from 'react-icons/md';
import { PhoneWithValidation } from '../../../components/shared/PhoneWithValidation/PhoneWithValidation';
import WarningMessage from '../../../components/shared/WarningMessage/WarningMessage';
import { FaLinkedin, FaSquareXTwitter } from 'react-icons/fa6';
import { FaFacebookSquare } from 'react-icons/fa';
import { BsTelegram } from 'react-icons/bs';
import UseUserData from '../../../utils/hooks/UserData/UseUserData';
import { IUpdateUserContactInfo } from '../../../state/types/user';
import { useRecoilValue } from 'recoil';
import GlobalDataState from '../../../state/atoms/GlobalData';
import { IUser } from '../../../state/atoms/UserProfile';

import { TbLockCog } from 'react-icons/tb';

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
  userData: IUser;
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

export function UpdateAccountData({
  isOpen,
  onClose,
  userData,
}: AddPersonModalProps) {
  const globalData = useRecoilValue(GlobalDataState);

  const [avatar, setAvatar] = useState<File | null>(null);
  const [selected, setSelected] = useState<1 | 2>(1);
  const [address, setAddress] = React.useState<AddressFields>({
    ...defaultUS,
    country:
      globalData.countryies.find((country) => country.id === userData.country)
        ?.full_name || '',
    line1: userData.line1 || '',
    line2: userData.line2 || '',
    line3: userData.line3 || '',
    line4: userData.line4 || '',
    city: userData.city || '',
    zip: userData.zip || '',
    state:
      globalData.states.find((state) => state.id === userData.state)?.name ||
      '',
  });
  const [formData, setFormData] = useState({
    fullName: userData.full_name || '',
    email: userData.email || '',
    phone: userData.phone || '',
    telegram: userData.telegram || '',
    whatsapp: userData.whatsapp || '',
    linkedin: userData.linkedin || '',
    facebook: userData.facebook || '',
    twitter: userData.twitter || '',
    phoneCountry: userData.phone_country || '',
  });

  const [emailError, setEmailError] = React.useState<string>('');
  const [fullNameError, setFullNameError] = React.useState<string>('');
  const [isNotValidEmail, setIsNotValidEmail] = React.useState<boolean>(false);
  const [languageError, setLanguageError] = useState<boolean>(false);
  const [phoneError, setPhoneError] = React.useState<string>('');
  const [linkedinError, setLinkedinError] = React.useState<string>('');
  const [facebookError, setFacebookError] = React.useState<string>('');
  const [xError, setXError] = React.useState<string>('');

  const [focusedInput, setFocusedInput] = useState<string>('');

  const { updateUserData } = UseUserData();

  const cleanFormHandler = () => {
    setPhoneError('');
    setSelected(1);
    setIsNotValidEmail(false);
    setFullNameError('');
    setEmailError('');
    setPhoneError('');
    setLinkedinError('');
    setFacebookError('');
    setXError('');
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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.fullName) {
      setFullNameError('Provide first name and last name.');
      return;
    }

    if (fullNameError) return;

    const stateId = globalData.states.find(
      (state) => state.name === address?.state
    )?.id;

    const countryId = globalData.countryies.find(
      (country) => country.full_name === address.country
    )?.id;

    const person: IUpdateUserContactInfo = {
      full_name: formData.fullName,
      phone: formData.phone,
      telegram: formData.telegram,
      whatsapp: formData.whatsapp,
      linkedin: formData.linkedin,
      facebook: formData.facebook,
      twitter: formData.twitter,
      line1: address.line1,
      line2: address.line2,
      city: address.city,
      zip: address.zip,
      state: stateId || null,
      country: countryId,
      is_report_signer: false,
      phone_country: formData.phoneCountry,
    };

    const cleanedTg = formData.telegram.replace(/^@/, '');

    if (formData.phone.length < 5) {
      person.phone = '';
    }

    if (cleanedTg) {
      person.telegram = cleanedTg;
    }

    if (avatar) {
      person.image = avatar;
    }

    await updateUserData(person);
    cleanFormHandler();
    onClose();
  };

  const handleBlurEmail = () => {
    if (validateEmail(formData.email) || !formData.email) {
      setIsNotValidEmail(false);
    } else {
      setIsNotValidEmail(true);
      setEmailError('Provide a valid email.');
    }
  };

  const fullNameValidator = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.trim();

    if (!value) {
      setFullNameError('');
      return;
    }

    const parts = value.split(/\s+/); // разбиваем по пробелам, убираем лишние
    if (parts.length < 2) {
      setFullNameError('Provide first name and last name.');
      return;
    }

    const hasShortWord = parts.some((word) => word.length < 2);
    if (hasShortWord) {
      setFullNameError('Provide full first and last name.');
      return;
    }

    setFullNameError('');
  };

  const fullNameHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, fullName: e.target.value });

    if (fullNameError) {
      setFullNameError('');
    }
  };

  const checkLinkedin = () => {
    setFocusedInput('');
    if (isValidLinkedinUrl(formData.linkedin)) {
      setLinkedinError('');
    } else {
      setLinkedinError('Provide a valid link to LinkedIn profile.');
    }
  };

  const checkFacebook = () => {
    setFocusedInput('');
    if (isValidFacebookUrl(formData.facebook)) {
      setFacebookError('');
    } else {
      setFacebookError('Provide a valid link to Facebook profile.');
    }
  };

  const checkX = () => {
    setFocusedInput('');
    if (isValidXUrl(formData.twitter) || isValidTwitterUrl(formData.twitter)) {
      setXError('');
    } else {
      setXError('Provide a valid link to X profile.');
    }
  };

  useEffect(() => {
    if (!isOpen) {
      setFormData({
        fullName: userData.full_name || '',
        email: userData.email || '',
        phone: userData.phone || '',
        telegram: userData.telegram || '',
        whatsapp: userData.whatsapp || '',
        linkedin: userData.linkedin || '',
        facebook: userData.facebook || '',
        twitter: userData.twitter || '',
        phoneCountry: userData.phone_country || '',
      });
    }
  }, [isOpen]);

  const inputCommonClasses =
    'p-2 text-md border-b border-b-gray-200 placeholder:text-gray-400 hover:cursor-pointer focus:ring-0 focus:outline-none focus:border-gray-200';

  return (
    <ModalWrapperLayout closeModal={() => {}} isOpen={isOpen}>
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
            <div className="flex-1 space-y-9">
              <div className="flex gap-4 items-center w-full">
                <AvatarUpload
                  image={userData.image}
                  removeControles={true}
                  onFileSelect={(file) => {
                    setAvatar(file);
                  }}
                />
                <div className="relative w-full">
                  <input
                    onChange={fullNameHandler}
                    className={classNames(
                      'block rounded-md border w-full border-gray-200 p-2 text-md ring-0 text-gray-900 disabled:text-opacity-50 placeholder:text-gray-400  hover:cursor-pointer focus:placeholder:text-transparent',
                      fullNameError &&
                        'ring-1 ring-red-400 focus:ring-red-400 border-red-400 focus:border-red-400',
                      'focus:ring-mainBlue'
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
                      wrapperClass="absolute -bottom-7 right-0 w-full text-xs"
                    />
                  )}
                </div>
              </div>

              <div className="relative">
                <div
                  onClick={() => {
                    console.log('clicked');
                    setEmailError('If you wish to update your email, please');
                  }}
                  className="absolute top-0 left-0 w-full h-full z-50"
                />

                <MdOutlineMail className="w-4 h-4 text-gray-500 absolute top-[31%] left-2.5" />
                <input
                  onChange={(e) => {
                    if (emailError) {
                      setIsNotValidEmail(false);
                    }
                    setFormData({ ...formData, email: e.target.value });
                  }}
                  className={classNames(
                    isNotValidEmail &&
                      'ring-1 ring-red-400 focus:ring-red-400 border-red-400 focus:border-red-400',
                    'block rounded-md border w-full  border-gray-200 pl-8 p-2 text-md mb-4 text-gray-900 placeholder:400  hover:cursor-pointer focus:placeholder:text-transparent',
                    'focus:ring-mainBlue'
                  )}
                  type="text"
                  disabled={true}
                  onBlur={handleBlurEmail}
                  placeholder="Email"
                  data-1p-ignore={true}
                  value={formData.email}
                />
                <TbLockCog className="w-5 h-5 text-gray-500 absolute top-[31%] right-2.5" />
                {emailError && (
                  <WarningMessage
                    message={emailError || 'qweqwe'}
                    onClose={() => setEmailError('')}
                    wrapperClass="absolute -bottom-7 right-0 w-full text-xs"
                    bgSettings="bg-gray-400/30"
                    contacktLink="mailto:support@incorporatenow.com"
                  />
                )}
              </div>

              <div className="relative">
                <PhoneWithValidation
                  value={formData.phone}
                  onChange={(value) => {
                    setFormData({ ...formData, phone: value });
                  }}
                  phoneCountry={globalData.countryies.find(
                    (country) => country.id === formData.phoneCountry
                  )}
                  setPhoneCountry={(val) => {
                    setFormData({ ...formData, phoneCountry: val });
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
                    'focus:ring-mainBlue block rounded-md border w-full border-gray-200 pl-8 p-2 text-md mb-4 ring-0 text-gray-900 disabled:text-opacity-50 placeholder:text-gray-400 hover:cursor-pointer'
                  )}
                  type="text"
                  placeholder={
                    focusedInput === 'telegram' ? '@username' : 'Telegram'
                  }
                  data-1p-ignore={true}
                  value={formData?.telegram}
                  onFocus={() => setFocusedInput('telegram')}
                  onBlur={() => setFocusedInput('')}
                />
                {/* <div
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
                </div> */}
              </div>

              {/* Twitter */}
              <div className="relative">
                <FaSquareXTwitter className="w-4 h-4 text-gray-500 absolute top-[30%] left-2.5" />
                <input
                  onChange={(e) => {
                    if (xError) {
                      setXError('');
                    }
                    setFormData({
                      ...formData,
                      twitter: e.target.value,
                    });
                  }}
                  className={classNames(
                    'focus:ring-mainBlue block rounded-md border w-full border-gray-200 pl-8 p-2 text-md mb-4 ring-0 text-gray-900 disabled:text-opacity-50 placeholder:text-gray-400  hover:cursor-pointer'
                  )}
                  type="text"
                  placeholder={focusedInput === 'x' ? 'x.com/username' : 'X'}
                  data-1p-ignore={true}
                  value={formData?.twitter}
                  onFocus={() => setFocusedInput('x')}
                  onBlur={checkX}
                />
                {xError && formData.twitter && (
                  <WarningMessage
                    message={xError}
                    onClose={() => setXError('')}
                    wrapperClass="absolute -bottom-7 right-0 w-full text-xs"
                  />
                )}
              </div>
              {/* Facebook */}
              <div className="relative">
                <FaFacebookSquare className="w-4 h-4 text-gray-500 absolute top-[30%] left-2.5" />
                <input
                  onChange={(e) => {
                    if (facebookError) {
                      setFacebookError('');
                    }
                    setFormData({
                      ...formData,
                      facebook: e.target.value,
                    });
                  }}
                  className={classNames(
                    'focus:ring-mainBlue block rounded-md border w-full border-gray-200 pl-8 p-2 text-md mb-4 ring-0 text-gray-900 disabled:text-opacity-50 placeholder:text-gray-400  hover:cursor-pointer'
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
                  onBlur={checkFacebook}
                />
                {facebookError && formData.facebook && (
                  <WarningMessage
                    message={facebookError}
                    onClose={() => setFacebookError('')}
                    wrapperClass="absolute -bottom-7 right-0 w-full text-xs"
                  />
                )}
              </div>
              {/* LinkedIn */}
              <div className="relative">
                <FaLinkedin className="w-4 h-4 text-gray-500 absolute top-[30%] left-2.5" />
                <input
                  onChange={(e) => {
                    if (linkedinError) {
                      setLinkedinError('');
                    }
                    setFormData({
                      ...formData,
                      linkedin: e.target.value,
                    });
                  }}
                  className={classNames(
                    'focus:ring-mainBlue block rounded-md border w-full border-gray-200 pl-8 p-2 text-md mb-4 ring-0 text-gray-900 disabled:text-opacity-50 placeholder:text-gray-400  hover:cursor-pointer'
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
                  onBlur={checkLinkedin}
                />
                {linkedinError && formData.linkedin && (
                  <WarningMessage
                    message={linkedinError}
                    onClose={() => setLinkedinError('')}
                    wrapperClass="absolute -bottom-7 right-0 w-full text-xs"
                  />
                )}
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
                  extraWrapperClass={
                    'border border-sideBarBlue shadow-[0_0_0_1px_#0277ff]'
                  }
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
                formData.fullName && !fullNameError
                  ? 'bg-mainBlue hover:bg-sideBarBlue'
                  : 'bg-gray-500 hover:bg-gray-600',

                'block rounded-md px-3 py-2 text-center text-sm font-semibold text-white shadow-sm  focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 transition-all duration-150 ease-in-out hover:cursor-pointer'
              )}
            >
              Save
            </div>
          </div>
        </form>
      </div>
    </ModalWrapperLayout>
  );
}
