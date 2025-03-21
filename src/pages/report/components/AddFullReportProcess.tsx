import React, { useEffect, useState } from 'react';
import ButtonWithArrow from '../../../components/shared/ButtonWithArrow/ButtonWithArrow';
import {
  classNames,
  dockFieldHandler,
  truncateString,
} from '../../../utils/helpers';
import PageSign from '../../../components/shared/PageSign';
import { AddressFields, IFiles, Person } from '../../../interfaces/interfaces';
import AddFullReportSteps from './AddFullReportSteps';

import SimpleAddressForm from '../../../components/shared/SimpleAddressForm/SimpleAddressForm';
import ProcessingReportPeopleSection from '../ProcessingReportPeopleSection';
import PersonDataHandling from '../../../components/shared/PersonData/PersonDataHandling';
import DatePicker from '../../../components/shared/Modals/addCompanyFile/datePicker';
import useFileUpload from '../../../utils/hooks/useFileUpload';
import FileDownloadProgress from '../../createCompany/components/UploadedFile';
import DropFileArea from '../../../components/shared/Modals/addCompanyFile/DropFileArea';
import SectionHeading from '../../company/components/SectionHeading';
import { USStates } from '../../../constants/form/form';
import { ArrowRightIcon } from '@heroicons/react/20/solid';

import { useNavigate } from 'react-router-dom';
import { ROUTES } from '../../../constants/navigation/routes';
import CustomYearDropdown from '../../../components/shared/YearDropDown';

const today = new Date();
const formattedDate = today.toLocaleDateString('en-US', {
  month: 'long',
  day: '2-digit',
  year: 'numeric',
});

const mockData = {
  id: 1,
  year: 2021,
  status: 'Need to File',
  filingDate: 'February 12, 2021',
  confirmedBy: 'John Doe',
  relatedOrder: 'ord_12312',
  attachedFiles: true,
  confirmationLinks: [],
  address: {
    country: 'United States',
    address0: '1234 Elm St',
    address1: 'Apt 5B',
    address2: '',
    address3: '',
    city: 'Birmingham',
    zip: '35203',
    state: 'Alabama',
  },
  mailingAddress: {
    country: 'United States',
    address0: '1234 Elm St',
    address1: 'Apt 5B',
    address2: '',
    address3: '',
    city: 'Birmingham',
    zip: '35203',
    state: 'Alabama',
  },
  companyName: 'ABC Company Inc',
  registrationNumber: 'L23000056354',
  file: 'rep_2021',
  confirmFile: 'Confirmation_file',
  stateId: '12323342CC',
  state: 'Florida',
  people: [],
  signed: 'John Doe',
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
const RenderAddress = (removed: boolean, address: AddressFields) => {
  return (
    <>
      <div
        className={classNames(
          removed ? 'line-through text-gray-400' : 'text-gray-800'
        )}
      >
        <span>{address.address0}, </span>
        {address.address1 && <span>{address.address1}</span>}
      </div>
      <div
        className={classNames(
          removed ? 'line-through text-gray-400' : 'text-gray-800'
        )}
      >
        {address.address2 && <span>{address.address2}</span>}
        {address.address3 && (
          <span>
            {address.address2 ? ',' : ''} {address.address3}
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
          {USStates.find((item) => item.title === address.state)?.value || ''}{' '}
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

const AddFullReportProcess = () => {
  const [mandatoryErrorStep, setMandatoryErrorStep] = useState<number>(-1);
  const [reportYear, setReportYear] = React.useState<string>('');

  const [address, setAddress] = React.useState<AddressFields>(defaultUS);
  const [mailingAddress, setMailingAddress] =
    React.useState<AddressFields>(defaultUS);

  const [agentName, setAgentName] = React.useState<string>('');
  const [agentAddress, setAgentAddress] =
    React.useState<AddressFields>(defaultUS);

  const [people, setPeople] = React.useState<Person[] | []>([]);

  const [stateId, setStateId] = React.useState<string>('');
  const [dateValue, setDateValue] = React.useState<string>(formattedDate || '');
  const [file, setFile] = React.useState<IFiles | null>(null);
  console.log(file, 'file');
  const navigate = useNavigate();

  const {
    inputRef,
    selectedFile,
    handleFileInput,
    handleFileDrop,
    deleteFileHandler,
  } = useFileUpload();

  const [currentStep, setCurrentStep] = useState<number>(1);
  const [visitedSteps, setVisitedSteps] = useState<number[]>([]);

  const setAgentAddressHandler = (key: string, value: string) => {
    setAgentAddress({ ...agentAddress, [key]: value });
  };

  const setAddressHandler = (key: string, value: string) => {
    setAddress({ ...address, [key]: value });
  };

  const setMAilingAddressHandler = (key: string, value: string) => {
    setMailingAddress({ ...mailingAddress, [key]: value });
  };

  const handleChangeYear = (year: string) => {
    setReportYear(year);
  };

  const secondStepDisabled = () =>
    !address.address0 || !mailingAddress.address0;

  const thirdStepDisabled = () => !agentName || !agentAddress.address0;
  const fourthStepDisabled = () => !people.length;
  const fifthStepDisabled = () => !stateId || !file?.file;

  const submitStepHandler = (
    e: React.FormEvent<HTMLFormElement>,
    step: number
  ) => {
    console.log(
      address,
      mailingAddress,
      1,
      !address.address0,
      !mailingAddress.address0
    );
    if (step === 1 && (!address.address0 || !mailingAddress.address0)) {
      console.log(2);
      e.preventDefault();
      e.stopPropagation();
      setMandatoryErrorStep(step);
      return;
    }

    if (step === 2 && (!agentAddress.address0 || !agentName)) {
      e.preventDefault();
      e.stopPropagation();
      setMandatoryErrorStep(step);
      return;
    }
    console.log(2.5);
    if (step === 3 && !people.length) {
      e.preventDefault();
      e.stopPropagation();
      setMandatoryErrorStep(step);
      return;
    }

    if (step === 4 && (!stateId || !file?.file || !reportYear)) {
      e.preventDefault();
      e.stopPropagation();
      setMandatoryErrorStep(step);
      return;
    }

    console.log(3);

    setCurrentStep((prevState) => {
      if (prevState === 4) return prevState;
      setVisitedSteps([...visitedSteps, prevState]);
      return prevState + 1;
    });
  };

  const cancelStepHandler = () => {
    setCurrentStep((prevState) => {
      if (prevState === 1) return prevState;
      // setVisitedSteps([...visitedSteps, prevState]);
      return prevState - 1;
    });
  };

  useEffect(() => {
    setFile(selectedFile);
  }, [selectedFile]);

  const inputCommonClasses =
    'p-2 text-md border-b border-b-gray-200 placeholder:text-gray-500 hover:cursor-pointer focus:ring-0 focus:outline-none focus:border-gray-200';

  return (
    <>
      <div className="bg-mainBackground relative w-full border-b py-4 px-6 flex items-center justify-between max-lg:px-4 max-lg:fixed max-lg:top-0 max-lg:left-0 max-lg:right-0 max-lg:z-10 max-lg:justify-start">
        <div className="w-[200px] max-lg:w-fit pr-2" />
        <div className="w-[870px] flex items-center justify-center font-semibold">
          Annual Report for {mockData.companyName}
        </div>
        <div className="w-[200px] pr-2 flex items-end justify-end">
          <div
            onClick={() => navigate(ROUTES.COMPANY)}
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
            visitedSteps={visitedSteps}
            setCurrentStep={setCurrentStep}
          />
        </div>
        <div className="w-[870px] max-xl:w-full max-lg:px-20 max-lg:mt-6 max-sm:px-0 pb-20">
          {currentStep === 1 && (
            <form onSubmit={(e) => submitStepHandler(e, 1)}>
              <div className="mb-5">
                <PageSign
                  titleSize={'text-2xl font-bold text-gray-900'}
                  title={`Address`}
                  icon={<></>}
                />
              </div>
              <div className="flex items-start justify-start max-lg:flex-col gap-4 max-lg:gap-6">
                <div className="w-full">
                  <div className="text-gray-700 text-sm mb-2 font-bold">
                    Main Address
                  </div>
                  <SimpleAddressForm
                    disabledFlag={false}
                    inputCommonClasses={inputCommonClasses}
                    requiredError={mandatoryErrorStep === 1}
                    data={address}
                    countryDisabled={true}
                    setData={setAddressHandler}
                  />
                </div>
                <div className="w-full">
                  <div className="text-gray-700 text-sm mb-2 font-bold">
                    Mailing Address
                  </div>
                  <SimpleAddressForm
                    disabledFlag={false}
                    inputCommonClasses={inputCommonClasses}
                    requiredError={mandatoryErrorStep === 1}
                    data={mailingAddress}
                    countryDisabled={true}
                    setData={setMAilingAddressHandler}
                  />
                </div>
              </div>
              <div className="bg-mainBackground py-3 px-6 fixed left-0 bottom-0 border-t w-full max-lg:left-0 flex items-start justify-between max-lg:px-20 max-sm:px-6">
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
                    className={classNames(
                      'relative inline-flex rounded-md  items-center justify-start py-2.5 pl-4 pr-5 overflow-hidden font-semibold transition-all duration-150 ease-in-out',
                      secondStepDisabled()
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
            <form onSubmit={(e) => submitStepHandler(e, 2)}>
              <div className="mb-5">
                <PageSign
                  titleSize={'text-2xl font-bold text-gray-900'}
                  title={`Registered Agent`}
                  icon={<></>}
                />
              </div>
              <div className="flex items-start justify-between max-lg:flex-col gap-4 max-lg:gap-6">
                <input
                  onChange={(e) => setAgentName(e.target.value)}
                  className={classNames(
                    mandatoryErrorStep === 2 && !agentName
                      ? 'bg-red-50'
                      : 'bg-white',
                    'w-1/2 block rounded-md border  border-gray-200 p-2 text-md mb-2 text-gray-900 disabled:text-opacity-50 placeholder:text-gray-500  hover:cursor-pointer focus:placeholder:opacity-0'
                  )}
                  type="text"
                  placeholder="Agent Name"
                  value={agentName}
                />
                <div className="w-1/2">
                  <SimpleAddressForm
                    disabledFlag={false}
                    inputCommonClasses={inputCommonClasses}
                    requiredError={mandatoryErrorStep === 2}
                    data={agentAddress}
                    countryDisabled={true}
                    setData={setAgentAddressHandler}
                  />
                </div>
              </div>
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
                    className={classNames(
                      'relative inline-flex rounded-md  items-center justify-start py-2.5 pl-4 pr-5 overflow-hidden font-semibold transition-all duration-150 ease-in-out',
                      thirdStepDisabled()
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
          {currentStep === 3 && (
            <form onSubmit={(e) => submitStepHandler(e, 3)}>
              <div className="mb-5">
                <PageSign
                  titleSize={'text-2xl font-bold text-gray-900'}
                  title={`People`}
                  icon={<></>}
                />
              </div>
              {mandatoryErrorStep === 3 && !people.length && (
                <div className="text-red-500 font-semibold">
                  Should be added at least one person
                </div>
              )}
              {people.length ? (
                <ProcessingReportPeopleSection
                  disableEdit={true}
                  propData={people}
                />
              ) : (
                <></>
              )}
              <PersonDataHandling
                hideX={true}
                person={undefined}
                closeModalHandler={() => {}}
                submitProcess={(person) =>
                  setPeople((prevState) => [...prevState, person])
                }
                isCreateProcess={true}
              />
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
                    className={classNames(
                      'relative inline-flex rounded-md  items-center justify-start py-2.5 pl-4 pr-5 overflow-hidden font-semibold transition-all duration-150 ease-in-out',
                      fourthStepDisabled()
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
          {currentStep === 4 && (
            <form
              onSubmit={(e) => submitStepHandler(e, 4)}
              className="w-full relative pb-10"
            >
              <div className="mb-5">
                <PageSign
                  titleSize={'text-2xl font-bold text-gray-900'}
                  title={`Annual Report Details`}
                  icon={<></>}
                />
              </div>
              <div className="flex items-start justify-between gap-4 mt-1">
                <div className="w-full">
                  <input
                    onChange={(e) => setStateId(e.target.value)}
                    className={classNames(
                      'block rounded-md border w-full  border-gray-200 p-2 text-md mb-4 text-gray-900 disabled:text-opacity-50 placeholder:text-gray-500  hover:cursor-pointer focus:placeholder:opacity-0',
                      mandatoryErrorStep === 4 && !stateId
                        ? 'bg-red-50'
                        : 'bg-white'
                    )}
                    type="text"
                    placeholder="State ID"
                    value={stateId}
                  />
                </div>
                <div className="w-full">
                  <CustomYearDropdown
                    handleChangeYear={handleChangeYear}
                    year={reportYear}
                    mandatoryError={mandatoryErrorStep === 4}
                  />
                </div>
              </div>
              <div className="mb-4">
                <DatePicker
                  mandatoryError={false}
                  value={dateValue}
                  setValue={setDateValue}
                />
              </div>
              <div className="mb-4">
                {selectedFile?.name ? (
                  <div className="w-full">
                    <FileDownloadProgress
                      deleteFileHandler={deleteFileHandler}
                      fileName={truncateString(selectedFile.name, 15)}
                      fileSize={`${selectedFile?.size} MB`}
                      fileFormat={selectedFile.format}
                      duration={3}
                    />
                  </div>
                ) : (
                  <DropFileArea
                    loaderStatus={false}
                    inputRef={inputRef}
                    handleFileDrop={handleFileDrop}
                    handleFileInput={handleFileInput}
                    mandatoryError={mandatoryErrorStep === 4}
                  />
                )}
              </div>
              <>
                <SectionHeading
                  title={'Company Information'}
                  textSettings={'text-base'}
                />
                <div className="flex items-start justify-start mb-6 max-lg:flex-col">
                  <div className="w-full max-lg:mb-3">
                    <div className="w-full flex items-start justify-between pb-2">
                      <div className="w-2/3 text-sm max-xl:w-1/2 pr-2 text-nowrap text-gray-500">
                        Year
                      </div>
                      <div className="w-full pr-2 text-gray-700 text-sm">
                        {reportYear}
                      </div>
                    </div>
                    <div className="w-full flex items-start justify-between pb-2">
                      <div className="w-2/3 text-sm max-xl:w-1/2 pr-2 text-nowrap text-gray-500">
                        Company Name
                      </div>
                      <div className="w-full pr-2 text-gray-700 text-sm">
                        {mockData.companyName}
                      </div>
                    </div>
                    <div className="w-full flex items-start justify-between pb-2">
                      <div className="w-2/3 text-sm max-xl:w-1/2 pr-2 text-nowrap text-gray-500">
                        State
                      </div>
                      <div className="w-full pr-2 text-gray-700 text-sm">
                        {mockData.state}
                      </div>
                    </div>
                    <div className="w-full flex items-start justify-between pb-2">
                      <div className="w-2/3 text-sm max-xl:w-1/2 pr-2 text-nowrap text-gray-500">
                        {dockFieldHandler('state')}
                      </div>
                      <div className="w-full pr-2 text-gray-700 text-sm">
                        {mockData.registrationNumber}
                      </div>
                    </div>
                  </div>
                </div>
                <div className="bg-mainBackground py-3 px-6 fixed left-0 bottom-0 border-t w-full max-lg:left-0 flex items-start justify-between max-lg:px-36 max-sm:px-6">
                  <div className="w-[200px] pr-2 max-lg:hidden" />
                  <div className="w-[870px] max-xl:w-full flex items-center justify-between">
                    <div />
                    <ButtonWithArrow title={'Submit'} />
                  </div>
                  <div className="w-[200px] pr-2 max-lg:hidden" />
                </div>
              </>
              <>
                <SectionHeading title={'Address'} textSettings={'text-base'} />
                <div className="flex items-start justify-start mb-6 max-lg:flex-col max-lg:gap-6">
                  <div className="w-2/3">
                    <div className="mb-1 w-full flex items-center justify-between">
                      <span className="text-sm text-gray-500 ">
                        Main Address
                      </span>
                    </div>
                    <div className="flex items-start justify-start gap-16">
                      <div className="w-full">
                        {RenderAddress(false, address)}
                      </div>
                    </div>
                  </div>
                  <div className="w-full">
                    <div className="mb-1 w-full flex items-center justify-between">
                      <span className="text-sm text-gray-500 ">
                        Mailing Address
                      </span>
                    </div>
                    <div className="flex items-start justify-start gap-12">
                      <div className="w-full">
                        {RenderAddress(false, mailingAddress)}
                      </div>
                    </div>
                  </div>
                </div>
              </>
              <>
                <SectionHeading
                  title="Registered Agent"
                  textSettings={'text-base'}
                />
                <div className="w-full flex items-start justify-start mb-6 max-lg:flex-col max-lg:gap-6">
                  <div className="w-2/3 flex items-start justify-between pb-2 max-lg:w-full">
                    <div className="pr-1 text-gray-700 text-sm">
                      <div className="text-sm text-gray-500 mb-1">Name</div>
                      <div className="font-semibold">{agentName}</div>
                    </div>
                  </div>
                  <div className="flex items-start justify-start pb-2 w-full">
                    <div className="w-full pr-2 text-gray-700 text-sm">
                      <div className="text-sm text-gray-500 mb-1">Address</div>
                      {RenderAddress(false, agentAddress)}
                    </div>
                  </div>
                </div>
              </>
              <>
                <SectionHeading title="People" textSettings={'text-base'} />
                {people.length ? (
                  <ProcessingReportPeopleSection
                    disableEdit={true}
                    propData={people}
                  />
                ) : (
                  <></>
                )}
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
                    className={classNames(
                      'relative inline-flex rounded-md  items-center justify-start py-2.5 pl-4 pr-5 overflow-hidden font-semibold transition-all duration-150 ease-in-out',
                      fifthStepDisabled()
                        ? 'bg-gray-500'
                        : 'bg-mainBlue hover:bg-sideBarBlue'
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

export default AddFullReportProcess;
