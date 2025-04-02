import React, { useEffect, useState } from 'react';
import { classNames, truncateString } from '../../../utils/helpers';
import PageSign from '../../../components/shared/PageSign';
import { AddressFields, IFiles, Person } from '../../../interfaces/interfaces';
import AddFullReportSteps from './AddFullReportSteps';
import DatePicker from '../../../components/shared/Modals/addCompanyFile/datePicker';
import useFileUpload from '../../../utils/hooks/useFileUpload';
import DropFileArea from '../../../components/shared/Modals/addCompanyFile/DropFileArea';
import { ArrowRightIcon } from '@heroicons/react/20/solid';
import { useNavigate } from 'react-router-dom';
import { ROUTES } from '../../../constants/navigation/routes';
import CustomYearDropdown from '../../../components/shared/YearDropDown';
import AddFullReportReview from './AddFullReportReview';
import UploadedReportFile from './UploadedReportFile';

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
  updatedAddress: null,
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
  updatedMailingAddress: null,
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

const AddFullReportProcess = () => {
  const [completedSteps, setCompletedSteps] = useState(false);
  const [mandatoryErrorStep, setMandatoryErrorStep] = useState<number>(-1);
  const [reportYear, setReportYear] = React.useState<string>('');

  const [address] = React.useState<AddressFields>(mockData.address);
  const [mailingAddress] = React.useState<AddressFields>(
    mockData.mailingAddress
  );

  const [updatedAddress, setUpdatedAddress] =
    React.useState<AddressFields | null>(null);
  const [updatedMailingAddress, setUpdatedMailingAddress] =
    React.useState<AddressFields | null>(null);

  const [agentName, setAgentName] = React.useState<string>('');
  const [agentAddress, setAgentAddress] =
    React.useState<AddressFields>(defaultUS);

  const [people, setPeople] = React.useState<Person[] | []>([]);

  const [stateId, setStateId] = React.useState<string>('');
  const [dateValue, setDateValue] = React.useState<string>(formattedDate || '');

  const [file, setFile] = React.useState<IFiles | null>(null);

  const setStateIdHandler = (value: string) => {
    const sanitizedValue = value.replace(/[^a-zA-Z0-9]/g, '');

    const numbers = sanitizedValue.replace(/\D/g, '').slice(0, 10); // Только цифры (макс. 10)
    const letters = sanitizedValue.replace(/\d/g, '').slice(0, 2); // Только буквы (макс. 2)

    setStateId(numbers + letters);
  };
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

  const setPeopleHAndler = (person: Person) => {
    setPeople((prevState) => [...prevState, person]);
  };

  const handleChangeYear = (year: string) => {
    setReportYear(year);
  };

  const firstStepDisabled = () => !stateId || !file?.file || !reportYear;

  const submitStepHandler = (
    e: React.FormEvent<HTMLFormElement>,
    step: number
  ) => {
    if (step === 1 && (!stateId || !file?.file || !reportYear)) {
      e.preventDefault();
      e.stopPropagation();
      setMandatoryErrorStep(step);
      return;
    }

    setCurrentStep((prevState) => {
      if (prevState === 5) return prevState;
      setVisitedSteps([...visitedSteps, prevState]);
      return prevState + 1;
    });
  };

  const cancelStepHandler = () => {
    navigate(ROUTES.COMPANY);
  };

  useEffect(() => {
    setFile(selectedFile);
  }, [selectedFile]);

  useEffect(() => {
    if (
      address.address0 &&
      mailingAddress.address0 &&
      agentName &&
      people.length &&
      file?.file
    ) {
      setCompletedSteps(true);
    } else {
      setCompletedSteps(false);
    }
  }, [address, mailingAddress, agentName, people.length, file]);

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
            completedSteps={completedSteps}
          />
        </div>
        <div className="w-[870px] max-xl:w-full max-lg:px-20 max-lg:mt-6 max-sm:px-0 pb-20">
          {currentStep === 1 && (
            <form onSubmit={(e) => submitStepHandler(e, 1)}>
              <div className="mb-5">
                <PageSign
                  titleSize={'text-2xl font-bold text-gray-900'}
                  title={`Provide Annual Report details`}
                  icon={<></>}
                />
              </div>
              <div className="flex items-start justify-between max-lg:flex-col gap-4 max-lg:gap-6">
                <div className="flex flex-col items-start justify-start gap-4 w-1/2">
                  <div className="w-full">
                    <div className="text-gray-700 text-sm mb-2 font-bold">
                      Year
                    </div>
                    <CustomYearDropdown
                      handleChangeYear={handleChangeYear}
                      year={reportYear}
                      mandatoryError={mandatoryErrorStep === 1}
                    />
                  </div>
                  <div className="w-full">
                    <div className="text-gray-700 text-sm mb-2 font-bold">
                      Filling Date
                    </div>
                    <DatePicker
                      mandatoryError={false}
                      value={dateValue}
                      setValue={setDateValue}
                    />
                  </div>
                  <div className="w-full">
                    <div className="text-gray-700 text-sm mb-2 font-bold">
                      State ID
                    </div>
                    <input
                      onChange={(e) => setStateIdHandler(e.target.value)}
                      className={classNames(
                        'block rounded-md border w-full  border-gray-200 p-2 text-md mb-4 text-gray-900 disabled:text-opacity-50 placeholder:text-gray-500  hover:cursor-pointer focus:placeholder:opacity-0',
                        mandatoryErrorStep === 1 && !stateId
                          ? 'bg-red-50'
                          : 'bg-white'
                      )}
                      type="text"
                      placeholder="State ID"
                      data-1p-ignore={true}
                      value={stateId}
                    />
                  </div>
                </div>

                <div className="mb-4 w-1/2">
                  <div className="text-gray-700 text-sm mb-2 font-bold">
                    Upload file
                  </div>
                  {selectedFile?.name ? (
                    <div className="w-full">
                      <UploadedReportFile
                        deleteFileHandler={deleteFileHandler}
                        fileName={truncateString(selectedFile.name, 15)}
                        fileSize={`${selectedFile?.size} MB`}
                        fileFormat={selectedFile.format}
                        file={selectedFile?.file as File}
                        wrapperStyles={'h-[225px]'}
                      />
                    </div>
                  ) : (
                    <DropFileArea
                      loaderStatus={false}
                      inputRef={inputRef}
                      handleFileDrop={handleFileDrop}
                      handleFileInput={handleFileInput}
                      mandatoryError={mandatoryErrorStep === 1}
                      wrapperStyles={'h-[225px]'}
                    />
                  )}
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
              <AddFullReportReview
                reportYear={reportYear}
                mockData={mockData}
                stateId={stateId}
                address={address}
                updatedAddress={updatedAddress}
                setUpdatedAddress={setUpdatedAddress}
                mailingAddress={mailingAddress}
                updatedMailingAddress={updatedMailingAddress}
                setUpdatedMailingAddress={setUpdatedMailingAddress}
                agentName={agentName}
                setAgentName={setAgentName}
                agentAddress={agentAddress}
                setAgentAddress={setAgentAddress}
                people={people}
                setPeople={setPeopleHAndler}
                file={selectedFile}
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

export default AddFullReportProcess;
