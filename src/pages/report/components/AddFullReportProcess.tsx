import { AddressFields, IFiles, Person } from '../../../interfaces/interfaces';
import SectionHeading from '../../company/components/SectionHeading';
import {
  classNames,
  dockFieldHandler,
  truncateString,
} from '../../../utils/helpers';
import { USStates } from '../../../constants/form/form';
import React, { useEffect } from 'react';
import DatePicker from '../../../components/shared/Modals/addCompanyFile/datePicker';
import FileDownloadProgress from '../../createCompany/components/UploadedFile';
import DropFileArea from '../../../components/shared/Modals/addCompanyFile/DropFileArea';
import useFileUpload from '../../../utils/hooks/useFileUpload';
import logo from '../../../images/shared/bluelogo.svg';
import smallLogo from '../../../images/shared/round_logo.png';
import StateCards from '../../createCompany/components/StateCards';
import { states } from '../../elements/components/StateCardsElements';
import SimpleAddressForm from '../../../components/shared/SimpleAddressForm/SimpleAddressForm';
import PersonDataHandling from '../../../components/shared/PersonData/PersonDataHandling';
import ProcessingReportPeopleSection from '../ProcessingReportPeopleSection';

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
    <div className="text-sm">
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
    </div>
  );
};

const today = new Date();

const formattedDate = today.toLocaleDateString('en-US', {
  month: 'long',
  day: '2-digit',
  year: 'numeric',
});

const AddFullReportProcess = () => {
  const [completedSteps, setCompletedSteps] = React.useState<number[]>([]);
  const [savedSteps, setSavedSteps] = React.useState<number[]>([]);
  const [reportYear, setReportYear] = React.useState<string>('');
  const [companyName, setCompanyName] = React.useState<string>('');
  const [dockNumber, setDockNumber] = React.useState<string>('');
  const [state, setState] = React.useState('');

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
  console.log(people, 'people');
  const setAddressHandler = (key: string, value: string) => {
    setAddress({ ...address, [key]: value });
  };

  const setMAilingAddressHandler = (key: string, value: string) => {
    setMailingAddress({ ...mailingAddress, [key]: value });
  };

  const setAgentAddressHandler = (key: string, value: string) => {
    setAgentAddress({ ...agentAddress, [key]: value });
  };

  useEffect(() => {
    const lastElem = document.getElementById(`${completedSteps.at(-1)}`);

    if (lastElem) {
      lastElem.scrollIntoView({
        behavior: 'smooth',
        block: 'start',
        inline: 'start',
      });
    }
  }, [completedSteps]);

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;
    if (value.length <= 12) {
      setDockNumber(value);
    }
  };

  const {
    inputRef,
    selectedFile,
    handleFileInput,
    handleFileDrop,
    deleteFileHandler,
  } = useFileUpload();

  useEffect(() => {
    setFile(selectedFile);
  }, [selectedFile]);

  const inputCommonClasses =
    'p-2 text-md border-b border-b-gray-200 placeholder:text-gray-500 hover:cursor-pointer focus:ring-0 focus:outline-none focus:border-gray-200';

  return (
    <>
      <div className="bg-mainBackground relative w-full border-b py-4 px-6 flex items-center justify-between max-lg:px-4 max-lg:fixed max-lg:top-0 max-lg:left-0 max-lg:right-0 max-lg:z-10 max-lg:justify-start">
        <div className="w-[200px] max-lg:w-fit pr-2">
          <img
            className="h-6 w-auto max-lg:hidden"
            src={logo}
            alt="Your Company"
          />
          <img
            className="h-6 w-auto lg:hidden"
            src={smallLogo}
            alt="Your Company"
          />
        </div>
        <div className="w-[870px] flex items-center justify-center font-semibold">
          {`Annual Report Filing`}
        </div>
        <div className="w-[200px] pr-2" />
      </div>

      <div className="bg-mainBackground m-auto flex items-start justify-between w-full max-lg:flex-col px-6 pt-10 max-lg:pt-32 max-lg:pb-20 min-h-[calc(100vh-65px)]">
        <div className="w-[200px]" />
        <div className="w-[870px] max-xl:w-full max-lg:px-20 max-lg:mt-6 max-sm:px-0 pb-20">
          <div id={'1'} className="mb-16">
            <SectionHeading
              title={'Company Information'}
              textSettings={'text-base'}
            />
            {!savedSteps.includes(1) ? (
              <>
                <div className="mb-4 mt-1">
                  <input
                    onChange={(e) => setCompanyName(e.target.value)}
                    className={classNames(
                      'block rounded-md border w-full  border-gray-200 p-2 text-md mb-2 text-gray-900 disabled:text-opacity-50 placeholder:text-gray-500  hover:cursor-pointer focus:placeholder:opacity-0'
                    )}
                    type="text"
                    placeholder="Company Name"
                    value={companyName}
                  />
                </div>
                <div className="flex items-start justify-between gap-4">
                  <div className="w-full">
                    <div className="mb-4">
                      <input
                        onChange={(e) => setReportYear(e.target.value)}
                        className={classNames(
                          'block rounded-md border w-full  border-gray-200 p-2 text-md mb-2 text-gray-900 disabled:text-opacity-50 placeholder:text-gray-500  hover:cursor-pointer focus:placeholder:opacity-0'
                        )}
                        type="text"
                        placeholder="Report Year"
                        value={reportYear}
                      />
                    </div>
                  </div>
                  <div className="w-full">
                    <div className="mb-4">
                      <input
                        onChange={handleInputChange}
                        className={classNames(
                          'block rounded-md border w-full  border-gray-200 p-2 text-md mb-2 text-gray-900 disabled:text-opacity-50 placeholder:text-gray-500  hover:cursor-pointer focus:placeholder:opacity-0'
                        )}
                        type="text"
                        placeholder="Document Number"
                        value={dockNumber}
                      />
                    </div>
                  </div>
                </div>
                <StateCards
                  value={state}
                  changeEvent={setState}
                  state={states}
                  title={''}
                />
              </>
            ) : (
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
                      {companyName}
                    </div>
                  </div>
                  <div className="w-full flex items-start justify-between pb-2">
                    <div className="w-2/3 text-sm max-xl:w-1/2 pr-2 text-nowrap text-gray-500">
                      State
                    </div>
                    <div className="w-full pr-2 text-gray-700 text-sm">
                      {state}
                    </div>
                  </div>
                  <div className="w-full flex items-start justify-between pb-2">
                    <div className="w-2/3 text-sm max-xl:w-1/2 pr-2 text-nowrap text-gray-500">
                      {dockFieldHandler(state)}
                    </div>
                    <div className="w-full pr-2 text-gray-700 text-sm">
                      {dockNumber}
                    </div>
                  </div>
                </div>
              </div>
            )}
            {!savedSteps.includes(1) ? (
              <div className="w-full">
                <div
                  onClick={() => {
                    setSavedSteps([...savedSteps, 1]);
                    setCompletedSteps([...completedSteps, 1]);
                  }}
                  className="ml-auto mt-3 w-fit block rounded-md bg-mainBlue px-3 py-2 text-center text-sm font-semibold text-white shadow-sm hover:bg-sideBarBlue focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 transition-all duration-150 ease-in-out hover:cursor-pointer"
                >
                  Save
                </div>
              </div>
            ) : (
              <div className="w-full">
                <div
                  onClick={() => {
                    setSavedSteps(savedSteps.filter((item) => item !== 1));
                  }}
                  className="ml-auto mt-3 w-fit block rounded-md border border-gray-200 bg-white px-3 py-2 text-center text-sm font-semibold text-gray-900 shadow-sm hover:bg-gray-50 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 transition-all duration-150 ease-in-out hover:cursor-pointer"
                >
                  Edit
                </div>
              </div>
            )}
          </div>
          <div
            id={'2'}
            className={classNames(
              'mb-16 relative',
              !completedSteps.includes(1) ? 'opacity-50' : 'opacity-100'
            )}
          >
            <div
              className={classNames(
                'absolute left-0 top-0 right-0 bottom-0 z-40',
                completedSteps.includes(1) && 'hidden'
              )}
            />
            <SectionHeading title={'Address'} textSettings={'text-base'} />

            {!savedSteps.includes(2) ? (
              <div className="flex items-start justify-start max-lg:flex-col gap-4 max-lg:gap-6">
                <div className="w-full">
                  <div className="text-gray-700 text-sm mb-2 font-bold">
                    Main Address
                  </div>
                  <SimpleAddressForm
                    disabledFlag={false}
                    inputCommonClasses={inputCommonClasses}
                    requiredError={false}
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
                    requiredError={false}
                    data={mailingAddress}
                    countryDisabled={true}
                    setData={setMAilingAddressHandler}
                  />
                </div>
              </div>
            ) : (
              <div className="flex items-start justify-start mb-6 max-lg:flex-col gap-28 max-lg:gap-6">
                <div>
                  <div className="mb-1 w-full flex items-center justify-between">
                    <span className="text-sm text-gray-500 ">Main Address</span>
                  </div>
                  <div className="flex items-start justify-start gap-16">
                    <div className="w-full">
                      {RenderAddress(false, address)}
                    </div>
                  </div>
                </div>
                <div className="ml-2">
                  <div className="mb-1 w-full flex items-center justify-between">
                    <span className="text-sm text-gray-500 ">
                      Mailing Address
                    </span>
                  </div>
                  <div className="flex items-start justify-start gap-12">
                    {RenderAddress(false, mailingAddress)}
                  </div>
                </div>
              </div>
            )}
            {!savedSteps.includes(2) ? (
              <div className="w-full">
                <div
                  onClick={() => {
                    setSavedSteps([...savedSteps, 2]);
                    setCompletedSteps([...completedSteps, 2]);
                  }}
                  className="ml-auto mt-3 w-fit block rounded-md bg-mainBlue px-3 py-2 text-center text-sm font-semibold text-white shadow-sm hover:bg-sideBarBlue focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 transition-all duration-150 ease-in-out hover:cursor-pointer"
                >
                  Save
                </div>
              </div>
            ) : (
              <div className="w-full">
                <div
                  onClick={() => {
                    setSavedSteps(savedSteps.filter((item) => item !== 2));
                  }}
                  className="ml-auto mt-3 w-fit block rounded-md border border-gray-200 bg-white px-3 py-2 text-center text-sm font-semibold text-gray-900 shadow-sm hover:bg-gray-50 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 transition-all duration-150 ease-in-out hover:cursor-pointer"
                >
                  Edit
                </div>
              </div>
            )}
          </div>
          <div
            id={'3'}
            className={classNames(
              'mb-16 relative',
              !completedSteps.includes(2) ? 'opacity-50' : 'opacity-100'
            )}
          >
            <div
              className={classNames(
                'absolute left-0 top-0 right-0 bottom-0 z-40',
                completedSteps.includes(2) && 'hidden'
              )}
            />

            <SectionHeading
              title="Registered Agent"
              textSettings={'text-base'}
            />
            {!savedSteps.includes(3) ? (
              <div className="flex items-start justify-between max-lg:flex-col gap-4 max-lg:gap-6">
                <input
                  onChange={(e) => setAgentName(e.target.value)}
                  className={classNames(
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
                    requiredError={false}
                    data={agentAddress}
                    countryDisabled={true}
                    setData={setAgentAddressHandler}
                  />
                </div>
              </div>
            ) : (
              <div className="w-full flex items-start justify-start mb-6 max-lg:flex-col gap-40 max-lg:gap-6">
                <div className="flex items-start justify-between pb-2 max-lg:w-full">
                  <div className="pr-1 text-gray-700 text-sm">
                    <div className="text-sm text-gray-500 mb-1">Name</div>
                    <div className="font-semibold">{agentName}</div>
                  </div>
                </div>
                <div className="flex items-start justify-start pb-2 ml-1">
                  <div className="w-full pr-2 text-gray-700 text-sm">
                    <div className="text-sm text-gray-500 mb-1">Address</div>
                    {RenderAddress(false, agentAddress)}
                  </div>
                </div>
              </div>
            )}

            {!savedSteps.includes(3) ? (
              <div className="w-full">
                <div
                  onClick={() => {
                    setSavedSteps([...savedSteps, 3]);
                    setCompletedSteps([...completedSteps, 3]);
                  }}
                  className="ml-auto mt-3 w-fit block rounded-md bg-mainBlue px-3 py-2 text-center text-sm font-semibold text-white shadow-sm hover:bg-sideBarBlue focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 transition-all duration-150 ease-in-out hover:cursor-pointer"
                >
                  Save
                </div>
              </div>
            ) : (
              <div className="w-full">
                <div
                  onClick={() => {
                    setSavedSteps(savedSteps.filter((item) => item !== 3));
                  }}
                  className="ml-auto mt-3 w-fit block rounded-md border border-gray-200 bg-white px-3 py-2 text-center text-sm font-semibold text-gray-900 shadow-sm hover:bg-gray-50 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 transition-all duration-150 ease-in-out hover:cursor-pointer"
                >
                  Edit
                </div>
              </div>
            )}
          </div>
          <div
            id={'4'}
            className={classNames(
              'mb-16 relative',
              !completedSteps.includes(3) ? 'opacity-50' : 'opacity-100'
            )}
          >
            <div
              className={classNames(
                'absolute left-0 top-0 right-0 bottom-0 z-40',
                completedSteps.includes(3) && 'hidden'
              )}
            />
            <SectionHeading title="People" textSettings={'text-base'} />
            {people.length ? (
              <ProcessingReportPeopleSection
                disableEdit={true}
                propData={people}
              />
            ) : (
              <></>
            )}
            {!savedSteps.includes(4) ? (
              <PersonDataHandling
                person={undefined}
                closeModalHandler={() => {}}
                submitProcess={(person) =>
                  setPeople((prevState) => [...prevState, person])
                }
                isCreateProcess={true}
              />
            ) : (
              <></>
            )}
            {!savedSteps.includes(4) ? (
              <div className="w-full">
                <div
                  onClick={() => {
                    setSavedSteps([...savedSteps, 4]);
                    setCompletedSteps([...completedSteps, 4]);
                  }}
                  className="ml-auto mt-3 w-fit block rounded-md bg-mainBlue px-3 py-2 text-center text-sm font-semibold text-white shadow-sm hover:bg-sideBarBlue focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 transition-all duration-150 ease-in-out hover:cursor-pointer"
                >
                  Save
                </div>
              </div>
            ) : (
              <div className="w-full">
                <div
                  onClick={() => {
                    setSavedSteps(savedSteps.filter((item) => item !== 4));
                  }}
                  className="ml-auto mt-3 w-fit block rounded-md border border-gray-200 bg-white px-3 py-2 text-center text-sm font-semibold text-gray-900 shadow-sm hover:bg-gray-50 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 transition-all duration-150 ease-in-out hover:cursor-pointer"
                >
                  Edit
                </div>
              </div>
            )}
          </div>
          <div
            id={'5'}
            className={classNames(
              'mb-16 relative',
              !completedSteps.includes(4) ? 'opacity-50' : 'opacity-100'
            )}
          >
            <div
              className={classNames(
                'absolute left-0 top-0 right-0 bottom-0 z-40',
                completedSteps.includes(4) && 'hidden'
              )}
            />
            <SectionHeading
              title="Provide State ID and Annual Report filing date"
              textSettings={'text-base'}
            />
            <div className="mb-4 mt-1">
              <input
                onChange={(e) => setStateId(e.target.value)}
                className={classNames(
                  'block rounded-md border w-full  border-gray-200 p-2 text-md mb-2 text-gray-900 disabled:text-opacity-50 placeholder:text-gray-500  hover:cursor-pointer focus:placeholder:opacity-0'
                )}
                type="text"
                placeholder="State ID"
                value={stateId}
              />
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
                  mandatoryError={false}
                />
              )}
            </div>
            {!savedSteps.includes(5) ? (
              <div className="w-full">
                <div
                  onClick={() => {
                    setSavedSteps([...savedSteps, 5]);
                    setCompletedSteps([...completedSteps, 5]);
                  }}
                  className="ml-auto mt-3 w-fit block rounded-md bg-mainBlue px-3 py-2 text-center text-sm font-semibold text-white shadow-sm hover:bg-sideBarBlue focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 transition-all duration-150 ease-in-out hover:cursor-pointer"
                >
                  Save
                </div>
              </div>
            ) : (
              <div className="w-full">
                <div
                  onClick={() => {
                    setSavedSteps(savedSteps.filter((item) => item !== 5));
                  }}
                  className="ml-auto mt-3 w-fit block rounded-md border border-gray-200 bg-white px-3 py-2 text-center text-sm font-semibold text-gray-900 shadow-sm hover:bg-gray-50 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 transition-all duration-150 ease-in-out hover:cursor-pointer"
                >
                  Edit
                </div>
              </div>
            )}
          </div>
        </div>
        <div className="w-[200px]" />
      </div>
    </>
  );
};

export default AddFullReportProcess;
