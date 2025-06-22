import React, { useEffect, useState } from 'react';
import PageSign from '../../../components/shared/PageSign';
import {
  classNames,
  dockFieldHandler,
  truncateString,
} from '../../../utils/helpers';
import {
  AddressFields,
  MockAnnualReportData,
  Person,
} from '../../../interfaces/interfaces';
import ProcessingReportPeopleSection from '../ProcessingReportPeopleSection';
import StateSolidIconHandler from '../../../components/shared/StateSolidIconHandler';
import USAddressForm from '../../createCompany/components/USAddressForm';
import { BiEditAlt } from 'react-icons/bi';
import { IconArrowBackUp } from '@tabler/icons-react';
import PersonDataHandling from '../../../components/shared/PersonData/PersonDataHandling';
import { EmptySection } from '../../../components/shared/EmptySection';
import DropFileArea from '../../../components/shared/Modals/addCompanyFile/DropFileArea';

import useFileUpload from '../../../utils/hooks/useFileUpload';
import UploadedFileSmall from './UploadedFileSmall';
import { useRecoilValue } from 'recoil';
import GlobalDataState from '../../../state/atoms/GlobalData';

const RenderAddress: React.FC<{ removed: boolean; address: AddressFields }> = ({
  removed,
  address,
}) => {
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
            ?.abbreviation || ''}
        </span>{' '}
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

interface IProps {
  reportYear: string;
  mockData: MockAnnualReportData;
  stateId: string;
  address: AddressFields;
  updatedAddress: AddressFields | null;
  mailingAddress: AddressFields;
  updatedMailingAddress: AddressFields | null;
  agentName: string;
  setAgentName: (value: string) => void;
  agentAddress: AddressFields;
  setAgentAddress: (data: AddressFields) => void;
  people: Person[];
  setPeople: (data: Person) => void;
  setUpdatedMailingAddress: (data: AddressFields | null) => void;
  setUpdatedAddress: (data: AddressFields | null) => void;
  file: File | null;
}

const AddFullReportReview = ({
  reportYear,
  mockData,
  stateId,
  address,
  updatedAddress,
  setUpdatedAddress,
  mailingAddress,
  updatedMailingAddress,
  setUpdatedMailingAddress,
  agentName,
  setAgentName,
  agentAddress,
  setAgentAddress,
  people,
  setPeople,
  file,
}: IProps) => {
  const [addPerson, setAddPerson] = useState(false);
  const [editingAgent, setEditingAgent] = useState(false);
  const [emptyAgent, setEmptyAgent] = useState(false);

  const [editingAddress, setEditingAddress] = useState(false);
  const [editingMailingAddress, setEditingMailingAddress] = useState(false);
  const [addressCopied, setAddressCopied] = useState(false);
  const [languageError, setLanguageError] = useState<boolean>(false);

  const {
    inputRef,
    selectedFile,
    handleFileInput,
    handleFileDrop,
    deleteFileHandler,
  } = useFileUpload(file);

  const undoAddress = (key: string) => {
    if (key === 'updatedAddress') {
      setUpdatedAddress(null);
      return;
    }
    if (key === 'updatedMailingAddress') {
      setUpdatedMailingAddress(null);
      return;
    }
  };

  const cancelAddress = (key: string) => {
    if (key === 'updatedAddress') {
      const dataForSave =
        updatedAddress !== null && !addressCopied ? updatedAddress : null;
      setUpdatedAddress(dataForSave);
    }

    if (key === 'updatedMailingAddress') {
      const dataForSave =
        updatedMailingAddress !== null && !updatedMailingAddress
          ? updatedMailingAddress
          : null;
      setUpdatedMailingAddress(dataForSave);
    }

    if (key === 'updatedMailingAddress') {
      setEditingMailingAddress(false);
      setAddressCopied(false);
    }
    if (key === 'updatedAddress') {
      setEditingAddress(false);
    }
  };

  const updateAddressHandler = (data: AddressFields, key: string) => {
    if (key === 'updatedAddress') {
      setUpdatedAddress(data);

      setEditingAddress(false);
    }

    if (key === 'updatedMailingAddress') {
      setUpdatedMailingAddress(data);

      setEditingMailingAddress(false);
      setAddressCopied(false);
    }
  };

  const updateAgentAddress = (data: AddressFields) => {
    setAgentAddress(data);
    setEditingAgent(false);
  };

  const cancelAgentHandler = () => {
    if (!agentName || !agentAddress.line1) {
      setEmptyAgent(true);
    }

    setEditingAgent(false);
  };

  const addAgentHandler = () => {
    setEditingAgent(true);
    setEmptyAgent(false);
  };

  const copyToMailingAddress = (data: AddressFields) => {
    setAddressCopied(true);
    setUpdatedMailingAddress(data || updatedAddress || address);

    setEditingMailingAddress(true);
  };

  const copyFromMailingAddress = () => {
    setUpdatedMailingAddress(updatedAddress || address);
  };

  useEffect(() => {
    if (!agentName) {
      setEmptyAgent(true);
    }
  }, [agentName]);

  return (
    <>
      <div className="mb-5">
        <PageSign
          titleSize={'text-2xl font-bold text-gray-900'}
          title={`Verify company information on ${reportYear} Annual Report`}
          icon={<></>}
        />
      </div>
      <div className="w-full flex items-start justify-center max-lg:flex-col">
        <dl className="w-full mt-4 mb-12 flex items-start justify-start overflow-x-scroll pb-1">
          <div className="flex flex-col gap-y-1 pr-5">
            <dt className="text-sm text-gray-500">Year</dt>
            <dd className="text-sm font-semibold   text-gray-800">
              {reportYear}
            </dd>
          </div>
          <div className="flex flex-col gap-y-1 border-l px-5">
            <dt className="text-nowrap text-sm text-gray-500">Company Name</dt>
            <dd className="text-nowrap text-sm font-semibold   text-gray-800 relative">
              {mockData.companyName}
            </dd>
          </div>
          <div className="flex flex-col gap-y-1 border-l px-5">
            <dt className="text-nowrap text-sm text-gray-500">Filing Date</dt>
            <dd className="text-nowrap text-sm font-semibold   text-gray-800 relative">
              {mockData.filingDate}
            </dd>
          </div>
          <div className="flex flex-col gap-y-1 border-l px-5">
            <dt className="text-nowrap text-sm text-gray-500">State</dt>
            <dd className="text-nowrap text-sm font-semibold   text-gray-800 relative flex items-center justify-start">
              <StateSolidIconHandler
                simpleIcon={true}
                selectedState={mockData.state || 'Florida'}
                state={mockData.state || 'Florida'}
              />
              {mockData.state}
            </dd>
          </div>

          <div className="flex flex-col gap-y-1 border-l px-5">
            <dt className="text-nowrap text-sm text-gray-500">
              {dockFieldHandler(mockData.state)}
            </dt>
            <dd className="text-nowrap text-sm font-semibold   text-gray-800 relative">
              {mockData.registrationNumber}
            </dd>
          </div>

          <div className="flex flex-col gap-y-1 border-l px-5">
            <dt className="text-nowrap text-sm text-gray-500">State ID</dt>
            <dd className="text-nowrap text-sm font-semibold   text-gray-800 relative pr-6">
              {stateId}
            </dd>
          </div>
        </dl>
      </div>
      {/* File */}
      <div className="mb-12">
        <div className="w-full border-b text-base font-semibold text-gray-700 pb-1 mb-3 flex items-center justify-between">
          Report File
        </div>
        <div className="mb-4 w-full">
          {selectedFile?.name ? (
            <div className="w-full">
              <UploadedFileSmall
                file={selectedFile as File}
                deleteFileHandler={deleteFileHandler}
                fileName={truncateString(selectedFile.name, 15)}
                fileSize={`${selectedFile?.size} MB`}
                // fileFormat={selectedFile.format}
                fileFormat={'Jpeg'}
                duration={0}
                hideProgressBar={true}
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
      </div>
      {/* Address */}
      <div className="mb-12">
        <div className="w-full border-b text-base font-semibold text-gray-700 pb-1 mb-3 flex items-center justify-between">
          Address
        </div>
        <div className="w-full flex items-start justify-start gap-3 max-lg:flex-col">
          <div className="w-full">
            {editingAddress ? (
              <div className="relative">
                <div className="text-sm text-gray-500 mb-1 flex items-center justify-start">
                  <span>Main Address</span>
                  {languageError && (
                    <div className="text-xs text-gray-900 bg-yellow-300/30 px-1 py-0.5 rounded-md ml-2">
                      We currently support only English letters for address.
                    </div>
                  )}
                </div>
                <USAddressForm
                  disabledFlag={false}
                  copyTitle={'Copy to Mailing Address'}
                  setFromState={(data) =>
                    updateAddressHandler(data, 'updatedAddress')
                  }
                  copyClickHandler={(data) => copyToMailingAddress(data)}
                  cancelAction={() => cancelAddress('updatedAddress')}
                  heading={''}
                  requiredError={false}
                  value={updatedAddress || address}
                  showClear={true}
                  setLanguageError={setLanguageError}
                  languageError={languageError}
                />
              </div>
            ) : (
              <div className="pr-2 text-gray-700 text-sm">
                <div className="text-sm text-gray-500 mb-1">Main Address</div>
                <div className="flex flex-col items-start justify-between w-full">
                  <div className="flex items-start justify-between w-full">
                    <div>
                      <RenderAddress
                        removed={false}
                        address={updatedAddress || address}
                      />
                    </div>
                    <div
                      onClick={() => {
                        setEditingAddress(true);
                      }}
                      className="group h-fit flex items-center justify-between top-6 right-7 p-1.5 border rounded-md hover:cursor-pointer"
                    >
                      <BiEditAlt className="w-4 h-4 text-gray-500 group-hover:text-gray-900 transition-all easy-in-out duration-150" />
                    </div>
                  </div>
                  <div className="flex items-start justify-between w-full group/updated">
                    {updatedAddress && (
                      <div>
                        <RenderAddress
                          removed={!!updatedAddress}
                          address={address}
                        />
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
                  </div>
                </div>
              </div>
            )}
          </div>
          <div className="w-full">
            {editingMailingAddress ? (
              <div className="relative">
                <div className="text-sm text-gray-500 mb-1 flex items-center justify-start">
                  <span>Mailing Address</span>
                  {languageError && (
                    <div className="text-xs text-gray-900 bg-yellow-300/30 px-1 py-0.5 rounded-md ml-2">
                      We currently support only English letters for address.
                    </div>
                  )}
                </div>
                <USAddressForm
                  disabledFlag={false}
                  copyTitle={'Copy from Main Address'}
                  copyClickHandler={
                    !editingAddress ? () => copyFromMailingAddress() : undefined
                  }
                  setFromState={(data) =>
                    updateAddressHandler(data, 'updatedMailingAddress')
                  }
                  cancelAction={() => cancelAddress('updatedMailingAddress')}
                  heading={''}
                  requiredError={false}
                  value={updatedMailingAddress || mailingAddress}
                  showClear={true}
                  setLanguageError={setLanguageError}
                  languageError={languageError}
                />
              </div>
            ) : (
              <div className="pr-2 text-gray-700 text-sm">
                <div className="text-sm text-gray-500 mb-1">
                  Mailing Address
                </div>
                <div className="flex items-start justify-between w-full">
                  <div className="flex flex-col items-start justify-between w-full">
                    <div className="flex items-start justify-between w-full">
                      <div>
                        <RenderAddress
                          removed={false}
                          address={updatedMailingAddress || mailingAddress}
                        />
                      </div>
                      <div
                        onClick={() => {
                          setEditingMailingAddress(true);
                        }}
                        className="group h-fit flex items-center justify-between top-6 right-7 p-1.5 border rounded-md hover:cursor-pointer"
                      >
                        <BiEditAlt className="w-4 h-4 text-gray-500 group-hover:text-gray-900 transition-all easy-in-out duration-150" />
                      </div>
                    </div>
                    <div className="flex items-start justify-between w-full group/updated">
                      {updatedMailingAddress && (
                        <div>
                          <RenderAddress
                            removed={!!updatedMailingAddress}
                            address={mailingAddress}
                          />
                        </div>
                      )}
                      {updatedMailingAddress && (
                        <div
                          onClick={() => undoAddress('updatedMailingAddress')}
                          className="group group-hover/updated:opacity-100 opacity-0 ml-auto mt-1 h-fit flex items-center justify-between top-6 right-7 p-1.5 border rounded-md hover:cursor-pointer transition-all duration-150 ease-in-out"
                        >
                          <IconArrowBackUp className="w-4 h-4 text-gray-500 group-hover:text-gray-900 transition-all easy-in-out duration-150" />
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
      {/* Agent */}
      <>
        <div className="w-full border-b text-base font-semibold text-gray-700 pb-1 mb-3 flex items-center justify-between">
          Registered Agent
        </div>
        {!emptyAgent ? (
          <div className="w-full flex items-start justify-start mb-6 gap-4 max-lg:flex-col max-lg:gap-6">
            <div className="w-1/2 flex items-start justify-between pb-2 max-lg:w-full">
              <div className="pr-1 text-gray-700 text-sm w-full">
                <div className="text-sm text-gray-500 mb-1">Name</div>
                {!editingAgent ? (
                  <div className="font-semibold">{agentName}</div>
                ) : (
                  <input
                    onChange={(e) => setAgentName(e.target.value)}
                    className={classNames(
                      'block rounded-md border w-full  border-gray-200 p-2 text-md mb-4 text-gray-900 disabled:text-opacity-50 placeholder:text-gray-500  hover:cursor-pointer focus:placeholder:opacity-0'
                    )}
                    type="text"
                    placeholder="Name"
                    data-1p-ignore={true}
                    value={agentName}
                  />
                )}
              </div>
            </div>
            <div className="flex items-start justify-start pb-2 w-1/2">
              <div className="w-full text-gray-700 text-sm relative">
                <div className="text-sm text-gray-500 mb-1 flex items-center justify-start">
                  <span>Address</span>
                  {languageError && (
                    <div className="text-xs text-gray-900 bg-yellow-300/30 px-1 py-0.5 rounded-md ml-2">
                      We currently support only English letters for address.
                    </div>
                  )}
                </div>
                {!editingAgent ? (
                  <div className="flex items-start justify-between w-full">
                    <div>
                      <RenderAddress removed={false} address={agentAddress} />
                    </div>
                    <div
                      onClick={() => {
                        setEditingAgent(true);
                      }}
                      className="group h-fit flex items-center justify-between top-6 right-7 p-1.5 border rounded-md hover:cursor-pointer"
                    >
                      <BiEditAlt className="w-4 h-4 text-gray-500 group-hover:text-gray-900 transition-all easy-in-out duration-150" />
                    </div>
                  </div>
                ) : (
                  <>
                    <USAddressForm
                      disabledFlag={false}
                      setFromState={(data) => updateAgentAddress(data)}
                      cancelAction={cancelAgentHandler}
                      heading={''}
                      requiredError={false}
                      value={agentAddress}
                      showClear={true}
                      setLanguageError={setLanguageError}
                      languageError={languageError}
                    />
                  </>
                )}
              </div>
            </div>
          </div>
        ) : (
          <EmptySection
            title="No Registered Agent Found"
            ctaText="Add Registered Agent"
            onAction={addAgentHandler}
          />
        )}
      </>
      {/* People */}
      <>
        <div className="w-full border-b text-base font-semibold text-gray-700 pb-1 mb-3 flex items-center justify-between">
          People
          {!addPerson && (
            <div
              onClick={() => setAddPerson(true)}
              className="
             px-2.5 py-1 border rounded-md  text-sm font-medium text-gray-900 transition-all ease-in-out duration-150 hover:cursor-pointer
            "
            >
              Add Person
            </div>
          )}
        </div>
        {addPerson && (
          <PersonDataHandling
            person={undefined}
            isCreateProcess={true}
            closeModalHandler={() => setAddPerson(false)}
            removePersonHandler={() => {}}
            submitProcess={(data) => {
              setPeople(data);
              setAddPerson(false);
            }}
          />
        )}
        {people.length ? (
          <ProcessingReportPeopleSection
            disableEdit={false}
            propData={people}
            firstColStyle={'w-[59%]'}
          />
        ) : (
          !addPerson && (
            <EmptySection
              title="No People Found"
              ctaText="Add Person"
              onAction={() => setAddPerson(true)}
            />
          )
        )}
      </>
    </>
  );
};

export default AddFullReportReview;
