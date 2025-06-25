import React, { useEffect, useRef, useState } from 'react';
import { classNames, filterLatinOnly } from '../../../../utils/helpers';
import PageSign from '../../../../components/shared/PageSign';
import { AddressFields } from '../../../../interfaces/interfaces';
import AddFullReportSteps from './AddPersonSteps';
import { ArrowRightIcon } from '@heroicons/react/20/solid';
import { useNavigate } from 'react-router-dom';
import { ROUTES } from '../../../../constants/navigation/routes';
import SimpleAddressForm from '../../../../components/shared/SimpleAddressForm/SimpleAddressForm';
import SimpleAddressFormNotUS from '../../../../components/shared/SimpleAddressFormNotUS/SimpleAddressFormNotUS';
import SwitchButton from '../../../../components/shared/SwitchButton/SwitchButton';

import { inputError, inputSimpleFocus } from '../../../../constants/form/form';
import USAddressForm from '../../../createCompany/components/USAddressForm';
import { BiEditAlt } from 'react-icons/bi';
import { useRecoilState, useRecoilValue } from 'recoil';
import PeopleState from '../../../../state/atoms/People';
import { validateEmail } from '../../../../utils/validators';
import PersonAvatar from '../../components/personAvatar';
import GlobalDataState from '../../../../state/atoms/GlobalData';
import { VALIDATORS } from '../../../../constants/regexs';
import { X } from 'lucide-react';

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

const RenderAddress = (removed: boolean, address: AddressFields) => {
  const globalData = useRecoilValue(GlobalDataState);

  return (
    <>
      <div
        className={classNames(
          removed ? 'line-through text-gray-400' : 'text-gray-800'
        )}
      >
        <span>{address.line1}, </span>
        {address.line2 && <span>{address.line2}</span>}
      </div>
      <div
        className={classNames(
          removed ? 'line-through text-gray-400' : 'text-gray-800'
        )}
      >
        {address.line3 && <span>{address.line3}</span>}
        {address.line4 && (
          <span>
            {address.line3 ? ',' : ''} {address.line4}
          </span>
        )}
      </div>
      <div
        className={classNames(
          removed ? 'line-through text-gray-400' : 'text-gray-800'
        )}
      >
        <span>{address.city}, </span>
        <span>
          {globalData.states.find((item) => item.name === address.state)
            ?.abbreviation || ''}{' '}
        </span>
        <span>{address.zip}</span>
      </div>
      <div
        className={classNames(
          removed ? 'line-through text-gray-400' : 'text-gray-800'
        )}
      >
        {address.country}
      </div>
      <div className="my-4" />
    </>
  );
};

const AddPersonProcess = () => {
  const [completedSteps, setCompletedSteps] = useState(false);
  const [mandatoryErrorStep, setMandatoryErrorStep] = useState<number>(-1);
  const [selected, setSelected] = useState<1 | 2>(1);
  const [address, setAddress] = React.useState<AddressFields>(defaultUS);
  const [firstName, setFirstName] = useState<string>('');
  const [lastName, setLastName] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [editingAddress, setEditingAddress] = useState<boolean>(false);
  const [peopleData, setPeopleData] = useRecoilState(PeopleState);
  const [image, setImage] = useState<string | null>(null);
  const [croppedImage, setCroppedImage] = useState<string | null>(null);
  const [languageError, setLanguageError] = useState<boolean>(false);

  const avatarInputRef = useRef<HTMLInputElement>(null);

  const triggerFileUpload = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    avatarInputRef.current?.click();
  };
  const navigate = useNavigate();

  const [currentStep, setCurrentStep] = useState<number>(1);
  // const [visitedSteps, setVisitedSteps] = useState<number[]>([]);

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

  const updateAddressHandler = (data: AddressFields, key: string) => {
    if (key === 'updatedAddress') {
      setAddress(data);

      setEditingAddress(false);
    }
  };

  const firstStepDisabled = () =>
    !firstName || !lastName || !validateEmail(email);

  const formTypeHandler = (value: 1 | 2) => {
    if (value === 1) {
      setAddress(defaultUS);
    } else {
      setAddress(defaultOther);
    }

    setSelected(value);
  };
  const submitStepHandler = (
    e: React.FormEvent<HTMLFormElement>,
    step: number
  ) => {
    if (step === 1 && (!firstName || !lastName || !validateEmail(email))) {
      e.preventDefault();
      e.stopPropagation();
      setMandatoryErrorStep(step);
      return;
    } else {
      setPeopleData([
        ...peopleData,
        {
          id: `${peopleData.length + 1}`,
          fullName: `${firstName} ${lastName}`,
          email,
          sendInvitation: false,
          titles: [],
          dateAdded: new Date().toISOString(),
          status: 'Active',
          address: address,
          picture: croppedImage || '',
        },
      ]);

      navigate(ROUTES.PEOPLE);
    }
  };

  const cancelStepHandler = () => {
    navigate(ROUTES.PEOPLE);
  };

  useEffect(() => {
    if (address.line1) {
      setCompletedSteps(true);
    } else {
      setCompletedSteps(false);
    }
  }, [address]);
  const inputCommonClasses =
    'p-2 text-md border-b border-b-gray-200 placeholder:text-gray-500 hover:cursor-pointer focus:ring-0 focus:outline-none focus:border-gray-200';

  return (
    <>
      <div className="bg-mainBackground relative w-full border-b py-4 px-6 flex items-center justify-between max-lg:px-4 max-lg:fixed max-lg:top-0 max-lg:left-0 max-lg:right-0 max-lg:z-10 max-lg:justify-start">
        <div className="w-[200px] max-lg:w-fit pr-2" />
        <div className="w-[600px] flex items-center justify-center font-semibold">
          Add New Person
        </div>
        <div className="w-[200px] pr-2 flex items-end justify-end">
          <div
            onClick={() => navigate(ROUTES.PEOPLE)}
            className="p-1 hover:cursor-pointer flex items-center justify-end gap-1 text-gray-500 font-semibold hover:text-gray-700 transition-all ease-in-out duration-150"
          >
            <span>Exit</span>
            <ArrowRightIcon className="w-4" />
          </div>
        </div>
      </div>
      <div
        className={classNames(
          'bg-mainBackground m-auto flex items-start justify-between w-full max-lg:flex-col px-6 pt-10 max-lg:pt-32 max-lg:pb-20 min-h-[calc(100vh-65px)]'
        )}
      >
        <div className="w-[200px] pr-2 max-lg:w-full max-lg:pr-0 max-lg:mb-6">
          <AddFullReportSteps
            editMode={true}
            currentStep={currentStep}
            visitedSteps={[]}
            setCurrentStep={setCurrentStep}
            completedSteps={completedSteps}
          />
        </div>
        <div className="w-[600px] max-xl:w-full max-lg:px-20 max-lg:mt-6 max-sm:px-0 pb-20">
          {currentStep === 1 && (
            <form onSubmit={(e) => submitStepHandler(e, 1)}>
              <div className="mb-5">
                <PageSign
                  titleSize={'text-2xl font-bold text-gray-900'}
                  title={`New person details`}
                  icon={<></>}
                />
              </div>
              <div className="flex items-start flex-col gap-6 max-lg:gap-6">
                <div className="flex items-center justify-between gap-4 w-full max-md:flex-col">
                  {!croppedImage && !image && (
                    <button
                      onClick={triggerFileUpload}
                      className="rounded-md bg-mainBackground px-2.5 py-1.5 text-xs font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 transition-all ease-in-out duration-150"
                    >
                      Upload Picture
                    </button>
                  )}
                  <PersonAvatar
                    fileInputRef={avatarInputRef}
                    image={image}
                    setImage={setImage}
                    croppedImage={croppedImage}
                    setCroppedImage={setCroppedImage}
                    addPictureHandler={() => undefined}
                    prevImage={''}
                  />
                </div>
                <div className="flex items-center justify-between gap-4 w-full max-md:flex-col">
                  <div className="w-1/2 max-md:w-full">
                    <div className="text-gray-900 text-sm mb-2 font-bold">
                      First Name
                    </div>
                    <input
                      type="text"
                      placeholder="First Name"
                      value={firstName}
                      onChange={(e) => setFirstName(e.target.value)}
                      data-1p-ignore={true}
                      className={classNames(
                        'w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none ring-offset-0',
                        mandatoryErrorStep === currentStep && !firstName
                          ? inputError
                          : inputSimpleFocus
                      )}
                    />
                  </div>
                  <div className="w-1/2 max-md:w-full">
                    <div className="text-gray-900 text-sm mb-2 font-bold">
                      Last Name
                    </div>
                    <input
                      type="text"
                      placeholder="Last Name"
                      value={lastName}
                      onChange={(e) => setLastName(e.target.value)}
                      data-1p-ignore={true}
                      className={classNames(
                        'w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none ring-offset-0',
                        mandatoryErrorStep === currentStep && !lastName
                          ? inputError
                          : inputSimpleFocus
                      )}
                    />
                  </div>
                </div>
                <div className="flex items-start justify-start gap-6 w-full flex-col ">
                  <div className="w-full">
                    <div className="text-gray-900 text-sm mb-2 font-bold">
                      Email
                    </div>
                    <input
                      type="text"
                      placeholder="Email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      data-1p-ignore={true}
                      className={classNames(
                        'w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none ring-offset-0',
                        mandatoryErrorStep === currentStep &&
                          !validateEmail(email)
                          ? inputError
                          : inputSimpleFocus
                      )}
                    />
                  </div>
                  <div className="w-full">
                    <div className="mb-2 flex items-end justify-between">
                      <span className="font-bold text-sm">Address</span>
                      <SwitchButton
                        option1="US Address"
                        option2="Other"
                        selected={selected}
                        onSelect={formTypeHandler}
                      />
                    </div>
                    <div className="relative">
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
                        <div
                          className={classNames(
                            'text-sm text-gray-900 bg-yellow-300/30 px-2 py-1 rounded-md flex items-center justify-between w-full mt-2'
                          )}
                        >
                          <div>
                            ⚠️{' '}
                            <span className="ml-1">
                              We currently support only English letters for
                              address.
                            </span>
                          </div>
                          <button
                            onClick={() => setLanguageError(false)}
                            className="hover:cursor-pointer"
                          >
                            <X className="w-3.5 h-3.5 text-gray-500" />
                          </button>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
              <div className="bg-mainBackground py-3 px-6 fixed left-0 bottom-0 border-t w-full max-lg:left-0 flex items-start justify-between max-lg:px-20 max-sm:px-6">
                <div className="w-[200px] pr-2 max-lg:hidden" />
                <div className="w-[600px] max-xl:w-full flex items-center justify-between">
                  <button
                    type="button"
                    onClick={() => {
                      cancelStepHandler();
                    }}
                    className="min-w-28 rounded-md mr-2 bg-mainBackground px-3.5 py-2.5 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
                  >
                    Cancel
                  </button>
                  <button
                    className={classNames(
                      'relative inline-flex rounded-md  items-center justify-start py-2.5 pl-4 pr-5 overflow-hidden font-semibold transition-all duration-150 ease-in-out',
                      firstStepDisabled()
                        ? 'bg-gray-500'
                        : 'bg-mainBlue hover:bg-sideBarBlue'
                    )}
                  >
                    <span className="text-sm font-semibold text-white relative w-full text-left transition-colors duration-200 ease-in-out">
                      Save
                    </span>
                    <ArrowRightIcon className="w-5 stroke-white fill-white translate-x-1 group-hover:translate-x-2 transition-all duration-200 ease-in-out" />
                  </button>
                </div>
                <div className="w-[200px] pr-2 max-lg:hidden" />
              </div>
            </form>
          )}
          {currentStep === 2 && (
            <form
              onSubmit={(e) => submitStepHandler(e, 2)}
              className="w-full relative pb-10"
            >
              <>
                <div className="mb-5">
                  <PageSign
                    titleSize={'text-2xl font-bold text-gray-900'}
                    title={`Verify person information`}
                    icon={<></>}
                  />
                </div>
                <div className="w-full flex items-start justify-center max-lg:flex-col">
                  <dl className="w-full mt-4 mb-12 flex items-start justify-start overflow-x-scroll pb-1">
                    <div className="flex flex-col gap-y-1 pr-5">
                      <dt className="text-sm text-gray-500">First Name</dt>
                      <dd className="text-sm font-semibold   text-gray-800">
                        {firstName}
                      </dd>
                    </div>
                    <div className="flex flex-col gap-y-1 border-l px-5">
                      <dt className="text-nowrap text-sm text-gray-500">
                        Last Name
                      </dt>
                      <dd className="text-nowrap text-sm font-semibold   text-gray-800 relative">
                        {lastName}
                      </dd>
                    </div>
                    <div className="flex flex-col gap-y-1 border-l px-5">
                      <dt className="text-nowrap text-sm text-gray-500">
                        Email
                      </dt>
                      <dd className="text-nowrap text-sm font-semibold   text-gray-800 relative">
                        {email}
                      </dd>
                    </div>
                  </dl>
                </div>

                <div className="mb-12">
                  <div className="w-full border-b text-base font-semibold text-gray-700 pb-1 mb-3 flex items-center justify-between">
                    Address
                  </div>
                  <div className="w-full flex items-start justify-start gap-3 max-lg:flex-col">
                    <div className="w-full">
                      {editingAddress ? (
                        <>
                          <div className="text-sm text-gray-500 mb-1">
                            Main Address
                          </div>
                          <USAddressForm
                            disabledFlag={false}
                            copyTitle={'Copy to Mailing Address'}
                            setFromState={(data) =>
                              updateAddressHandler(data, 'updatedAddress')
                            }
                            heading={''}
                            requiredError={false}
                            value={address}
                            showClear={true}
                            setLanguageError={setLanguageError}
                            languageError={languageError}
                            showLanguageError={true}
                          />
                        </>
                      ) : (
                        <div className="pr-2 text-gray-700 text-sm">
                          <div className="text-sm text-gray-500 mb-1">
                            Main Address
                          </div>
                          <div className="flex flex-col items-start justify-between w-full">
                            <div className="flex items-start justify-between w-full">
                              <div>{RenderAddress(false, address)}</div>
                              <div
                                onClick={() => {
                                  setEditingAddress(true);
                                }}
                                className="group h-fit flex items-center justify-between top-6 right-7 p-1.5 border rounded-md hover:cursor-pointer"
                              >
                                <BiEditAlt className="w-4 h-4 text-gray-500 group-hover:text-gray-900 transition-all easy-in-out duration-150" />
                              </div>
                            </div>
                            {/* <div className="flex items-start justify-between w-full group/updated">
                              {updatedAddress && (
                                <div>
                                  {RenderAddress(!!updatedAddress, address)}
                                </div>
                              )}
                              {updatedAddress && (
                                <div
                                  onClick={() => undoAddress('updatedAddress')}
                                  className="group group-hover/updated:opacity-100 opacity-0 ml-auto mt-1 h-fit flex items-center justify-between top-6 right-7 p-1.5 border rounded-md hover:cursor-pointer transition-all duration-150 ease-in-out"
                                >
                                  <IconArrowBackUp className="w-4 h-4 text-gray-500 group-hover:text-gray-900 transition-all easy-in-out duration-150" />
                                </div>
                              )}
                            </div> */}
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </>
              <div className="bg-mainBackground py-3 px-6 fixed left-0 bottom-0 border-t w-full max-lg:left-0 flex items-start justify-between max-lg:px-36 max-sm:px-6">
                <div className="w-[200px] pr-2 max-lg:hidden" />
                <div className="w-[870px] max-xl:w-full flex items-center justify-between">
                  <button
                    type="button"
                    onClick={() => {
                      cancelStepHandler();
                    }}
                    className="min-w-28 rounded-md mr-2 bg-mainBackground px-3.5 py-2.5 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
                  >
                    Cancel
                  </button>
                  <button
                    disabled={!completedSteps}
                    className={classNames(
                      'relative inline-flex rounded-md  items-center justify-start py-2.5 pl-4 pr-5 overflow-hidden font-semibold transition-all duration-150 ease-in-out disabled:bg-gray-500',
                      'bg-mainBlue hover:bg-sideBarBlue'
                    )}
                  >
                    <span className="text-sm font-semibold text-white relative w-full text-left transition-colors duration-200 ease-in-out">
                      Submit
                    </span>
                    <ArrowRightIcon className="w-5 stroke-white fill-white translate-x-1 group-hover:translate-x-2 transition-all duration-200 ease-in-out" />
                  </button>
                </div>
                <div className="w-[200px] pr-2 max-lg:hidden" />
              </div>
            </form>
          )}
        </div>
        <div className="w-[200px]" />
      </div>
    </>
  );
};

export default AddPersonProcess;
