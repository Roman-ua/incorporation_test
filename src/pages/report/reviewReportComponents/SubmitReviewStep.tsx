import React, { useEffect, useState } from 'react';
import {
  AddressFields,
  Agent,
  Person,
  ReportData,
} from '../../../interfaces/interfaces';
import { classNames, dockFieldHandler } from '../../../utils/helpers';
import StateSolidIconHandler from '../../../components/shared/StateSolidIconHandler';
import TooltipWrapper from '../../../components/shared/TooltipWrapper';
import {
  IconArrowBackUp,
  IconInfoCircle,
  IconTrashX,
} from '@tabler/icons-react';
import { FaSignature } from 'react-icons/fa6';
import USAddressForm from '../../createCompany/components/USAddressForm';
import { mockReportData } from '../../../mock/mockData';
import PersonDataHandling from '../../../components/shared/PersonData/PersonDataHandling';
import { BiEditAlt } from 'react-icons/bi';
import RegAgentDataHandling from '../components/RegisteredAgentHandling';
import { TbUserPlus } from 'react-icons/tb';
import { useRecoilValue } from 'recoil';
import GlobalDataState from '../../../state/atoms/GlobalData';

interface IProps {
  reportData: ReportData;
  agentReportData: Agent;
  peopleData: Person[];
  setPeopleData: (data: (prevState: Person[]) => Person[]) => void;
  setReportData: React.Dispatch<React.SetStateAction<ReportData>>;
  clickHandlerPeople?: () => void;
  clickHandlerAddress?: () => void;
  status: string;
  confirmStep: boolean;
}

const statusBadge = (status: string) => {
  switch (status) {
    case 'Filed':
      return 'bg-green-50 text-green-700 ring-green-600/20';
    case 'In Progress':
      return 'bg-yellow-50 text-yellow-700 ring-yellow-600/20';
    case 'Cancelled':
      return 'bg-red-50 text-red-700 ring-red-600/20';
    case 'Confirmation Needed':
      return 'bg-red-50 text-red-700 ring-red-600/20';
    case 'Declined':
      return 'bg-gray-50 text-gray-700 ring-gray-600/20';
    case 'Confirmed':
      return 'bg-blue-50 text-blue-700 ring-blue-600/20';
    case 'Waiting for Confirmation':
      return 'bg-yellow-50 text-yellow-700 ring-yellow-600/20';
    default:
      return 'bg-gray-50 text-gray-700 ring-gray-600/20';
  }
};

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

const SubmitReviewStep = ({
  reportData,
  setReportData,
  agentReportData,
  peopleData,
  setPeopleData,
  status,
  confirmStep,
}: IProps) => {
  const [editingAddress, setEditingAddress] = useState(false);
  const [editingMailingAddress, setEditingMailingAddress] = useState(false);
  const [addressCopied, setAddressCopied] = useState(false);
  const [languageError, setLanguageError] = useState<boolean>(false);
  const [languageErrorMailing, setLanguageErrorMailing] =
    useState<boolean>(false);

  const globalData = useRecoilValue(GlobalDataState);

  const undoAddress = (key: string) => {
    setReportData((prevState) => ({ ...prevState, [key]: null }));
  };
  const cancelAddress = (key: keyof ReportData) => {
    setReportData((prevState) => {
      if (prevState[key] !== null && !addressCopied) {
        return prevState;
      }
      return { ...prevState, [key]: null };
    });

    if (key === 'updatedMailingAddress') {
      setEditingMailingAddress(false);
      setAddressCopied(false);
    }

    if (key === 'updatedAddress') {
      setEditingAddress(false);
    }

    if (languageError) {
      setLanguageError(false);
    }
  };

  const updateAddressHandler = (data: AddressFields, key: keyof ReportData) => {
    setReportData((prevState) => {
      if (!prevState) return prevState; // Ensure prevState is not null

      const fieldForCompare =
        key === 'updatedAddress' ? 'address' : 'mailingAddress';

      // Ensure prevState[fieldForCompare] exists and is an Address type
      const existingAddress = prevState[fieldForCompare as keyof ReportData];

      if (typeof existingAddress !== 'object' || existingAddress === null) {
        return prevState;
      }

      // Compare each field safely
      const isEqual = (Object.keys(data) as Array<keyof AddressFields>).every(
        (field) => data[field] === (existingAddress as AddressFields)[field]
      );

      if (isEqual) {
        return prevState;
      }

      return { ...prevState, [key]: data };
    });

    if (key === 'updatedMailingAddress') {
      setEditingMailingAddress(false);
      setAddressCopied(false);
    }

    if (key === 'updatedAddress') {
      setEditingAddress(false);
    }

    if (languageError) {
      setLanguageError(false);
    }
  };

  const copyToMailingAddress = (data: AddressFields) => {
    setAddressCopied(true);
    setReportData((prevState) => ({
      ...prevState,
      updatedMailingAddress:
        data || prevState.updatedAddress || prevState.address,
    }));
    setEditingMailingAddress(true);
  };

  const copyFromMailingAddress = () => {
    console.log('Copy from Main Address');
    setReportData((prevState) => {
      return {
        ...prevState,
        updatedMailingAddress: prevState.updatedAddress || prevState.address,
      };
    });
  };

  // const [peopleData, setPeopleData] =
  //   useState<Person[]>(peopleData);
  const [allPeopleRemoved, setAllPeopleRemoved] = React.useState(false);
  const [editingPersonId, setEditingPersonId] = useState(-1);
  const [addPersonPressed, setAddPersonPressed] = React.useState(false);

  const returnEdditedPersonHandler = (id: number) => {
    setPeopleData((prevState: Person[]) => {
      const data = [...prevState];
      const sourcePerson = peopleData.find((person) => person.id === id);

      const currentPersonIndex = data.findIndex((person) => person.id === id);

      if (currentPersonIndex !== -1 && sourcePerson) {
        data[currentPersonIndex] = sourcePerson;
      }
      return data;
    });
  };

  const returnPersonHandler = (id: number) => {
    setPeopleData((prevState) => {
      const data = [...prevState];
      const currentPersonIndex = data.findIndex((person) => person.id === id);

      if (currentPersonIndex !== -1) {
        data[currentPersonIndex].removed = false;
      }
      return data;
    });
  };
  const removePersonHandler = (id: number) => {
    setPeopleData((prevState) => {
      const data = [...prevState];
      const currentPersonIndex = data.findIndex((person) => person.id === id);

      if (data[currentPersonIndex].signer && data[currentPersonIndex + 1]) {
        data[currentPersonIndex].signer = false;
        data[currentPersonIndex + 1].signer = true;
      }

      if (currentPersonIndex !== -1) {
        data[currentPersonIndex].removed = true;
      }
      return data;
    });
  };
  const updateExistedPersonHandler = (person: Person) => {
    setPeopleData((prevState) => {
      const data = [...prevState];
      const currentItemIndex = prevState.findIndex(
        (item) => item.id === person.id
      );

      if (person.signer) {
        const prevSignerIndex = data.findIndex((item) => item.signer);

        if (prevSignerIndex !== -1) {
          data[prevSignerIndex].signer = false;
        }
      }

      if (currentItemIndex !== -1) {
        data[currentItemIndex] = person;
        data[currentItemIndex].edited = true;
      }
      return data;
    });
  };
  const addNewPersonHandler = (person: Person) => {
    setPeopleData((prevState) => {
      const data = [...prevState];
      const personData = { ...person };
      personData.id = Math.floor(Math.random() * 90000) + 10000;
      personData.new = true;

      if (personData.signer) {
        const prevSignerIndex = data.findIndex((item) => item.signer);
        if (prevSignerIndex !== -1) {
          data[prevSignerIndex].signer = false;
        }
      }

      data.push(personData);

      return data;
    });
  };

  useEffect(() => {
    const allRemoved = peopleData.every((person) => person.removed === true);

    if (allRemoved) {
      setAllPeopleRemoved(true);
    } else {
      setAllPeopleRemoved(false);
    }
  }, [peopleData]);

  const [agentreportData, setAgentreportData] = React.useState(agentReportData);
  const [editingAddressAgent, setEditingAddressAgent] = useState(false);

  const submitRegAgentData = (address: AddressFields, name: string) => {
    setAgentreportData((prevState) => ({
      ...prevState,
      name: name,
      address: { ...prevState.address, ...address },
    }));

    setEditingAddressAgent(false);
  };

  return (
    <>
      <div className="w-full flex items-start justify-center max-lg:flex-col">
        <dl
          className={classNames(
            confirmStep ? 'justify-between' : 'justify-start',
            'w-full mt-4 mb-12 flex items-start  overflow-x-scroll pb-1'
          )}
        >
          <div className="flex flex-col gap-y-1 pr-5">
            <dt className="text-sm text-gray-500">Year</dt>
            <dd className="text-sm font-semibold   text-gray-800">
              {reportData?.year}
            </dd>
          </div>
          <div className="flex flex-col gap-y-1 border-l px-5">
            <dt className="text-nowrap text-sm text-gray-500">Status</dt>
            <span
              className={classNames(
                'w-fit inline-flex items-center rounded-md  px-2 py-1 text-xs font-medium  ring-1 ring-inset whitespace-nowrap',
                statusBadge(status)
              )}
            >
              {status}
            </span>
          </div>
          <div className="flex flex-col gap-y-1 border-l px-5">
            <dt className="text-nowrap text-sm text-gray-500">Company Name</dt>
            <dd className="text-nowrap text-sm font-semibold   text-gray-800 relative pr-6">
              {reportData.companyName}
            </dd>
          </div>
          <div className="flex flex-col gap-y-1 border-l px-5">
            <dt className="text-nowrap text-sm text-gray-500">Due Date</dt>
            <dd className="text-nowrap text-sm font-semibold   text-gray-800 relative pr-6">
              May 1, {+reportData.year + 1}
            </dd>
          </div>
          <div className="flex flex-col gap-y-1 border-l px-5">
            <dt className="text-nowrap text-sm text-gray-500">State</dt>
            <dd className="text-nowrap text-sm font-semibold   text-gray-800 relative pr-6 flex items-center justify-start">
              <StateSolidIconHandler
                simpleIcon={true}
                selectedState={reportData.state || 'Florida'}
                state={reportData.state || 'Florida'}
              />
              {reportData.state}
            </dd>
          </div>
          <div
            className={classNames(
              confirmStep ? 'pl-5' : 'px-5',
              'flex flex-col gap-y-1 border-l '
            )}
          >
            <dt className="text-nowrap text-sm text-gray-500">
              {dockFieldHandler(reportData.state)}
            </dt>
            <dd
              className={classNames(
                confirmStep ? 'pr-0' : 'pr-6',
                'text-nowrap text-sm font-semibold   text-gray-800 relative '
              )}
            >
              {reportData.registrationNumber}
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
                <div className="text-sm text-gray-500 mb-1 flex items-center justify-start">
                  <span>Main Address</span>
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
                  value={reportData.updatedAddress || mockReportData.address}
                  showClear={true}
                  setLanguageError={setLanguageError}
                  languageError={languageError}
                  showLanguageError={true}
                />
              </>
            ) : (
              <div className="pr-2 text-gray-700 text-sm">
                <div className="text-sm text-gray-500 mb-1">Main Address</div>
                <div className="flex flex-col items-start justify-between w-full">
                  <div className="flex items-start justify-between w-full">
                    <div>
                      <RenderAddress
                        removed={false}
                        address={
                          reportData.updatedAddress || reportData.address
                        }
                      />
                    </div>
                    {!confirmStep && (
                      <div
                        onClick={() => {
                          setEditingAddress(true);
                        }}
                        className="group h-fit flex items-center justify-between top-6 right-7 p-1.5 border rounded-md hover:cursor-pointer"
                      >
                        <BiEditAlt className="w-4 h-4 text-gray-500 group-hover:text-gray-900 transition-all easy-in-out duration-150" />
                      </div>
                    )}
                  </div>
                  <div className="flex items-start justify-between w-full group/updated">
                    {reportData.updatedAddress && (
                      <div>
                        {status === 'In Progress' ? (
                          <div />
                        ) : (
                          <RenderAddress
                            removed={!!reportData.updatedAddress}
                            address={reportData.address}
                          />
                        )}
                      </div>
                    )}
                    {reportData.updatedAddress && (
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
              <>
                <div className="text-sm text-gray-500 mb-1 flex items-center justify-start">
                  <span>Mailing Address</span>
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
                  value={
                    reportData.updatedMailingAddress ||
                    reportData.mailingAddress
                  }
                  showClear={true}
                  setLanguageError={setLanguageErrorMailing}
                  languageError={languageErrorMailing}
                  showLanguageError={true}
                />
              </>
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
                          address={
                            reportData.updatedMailingAddress ||
                            reportData.mailingAddress
                          }
                        />
                      </div>
                      {!confirmStep && (
                        <div
                          onClick={() => {
                            setEditingMailingAddress(true);
                          }}
                          className="group h-fit flex items-center justify-between top-6 right-7 p-1.5 border rounded-md hover:cursor-pointer"
                        >
                          <BiEditAlt className="w-4 h-4 text-gray-500 group-hover:text-gray-900 transition-all easy-in-out duration-150" />
                        </div>
                      )}
                    </div>
                    <div className="flex items-start justify-between w-full group/updated">
                      {reportData.updatedMailingAddress && (
                        <div>
                          {status === 'In Progress' ? (
                            <div />
                          ) : (
                            <RenderAddress
                              removed={!!reportData.updatedMailingAddress}
                              address={reportData.mailingAddress}
                            />
                          )}
                        </div>
                      )}
                      {reportData.updatedMailingAddress && (
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
      <div className="mb-12">
        <div className="w-full border-b text-base font-semibold text-gray-700 pb-1 mb-3 flex items-center justify-between">
          People
          {!confirmStep && (
            <div className="flex items-center justify-end ml-auto">
              <div
                onClick={() => setAddPersonPressed(true)}
                className="group h-fit flex items-center justify-between top-6 right-7 p-1.5 border rounded-md hover:cursor-pointer"
              >
                <TbUserPlus className="w-4 h-4 text-gray-500 group-hover:text-gray-900 transition-all easy-in-out duration-150" />
              </div>
            </div>
          )}
        </div>
        {(addPersonPressed || allPeopleRemoved) && (
          <PersonDataHandling
            person={undefined}
            closeModalHandler={() => setAddPersonPressed(false)}
            submitProcess={addNewPersonHandler}
            isCreateProcess={true}
          />
        )}
        {peopleData.map((person, rowIndex) => (
          <>
            {editingPersonId !== person.id ? (
              <div
                key={rowIndex}
                className={`flex py-3 group transition-all ease-in-out duration-150 items-start justify-start w-full`}
              >
                <div
                  className={classNames(
                    'whitespace-nowrap w-1/2 pr-2 flex items-start justify-start  text-gray-900'
                  )}
                >
                  <span className="mr-4 uppercase min-w-7 min-h-7 text-lg font-bold text-white bg-gray-300 rounded-full flex items-center justify-center">
                    {person.name[0]}
                  </span>
                  <div
                    className={classNames(
                      'text-sm flex flex-col items-start justify-start',
                      person.removed ? 'line-through text-gray-400' : ''
                    )}
                  >
                    <span
                      className={classNames(
                        'font-semibold flex items-center justify-start',
                        person.removed ? 'text-gray-400' : 'text-gray-900'
                      )}
                    >
                      {person.name}{' '}
                      {person.signer && (
                        <TooltipWrapper tooltipText="Signer of the Annual Report">
                          <FaSignature
                            className={classNames(
                              'w-4 h-4 ml-2 hover:cursor-pointer',
                              person.removed ? 'text-gray-400' : 'text-gray-700'
                            )}
                          />
                        </TooltipWrapper>
                      )}
                    </span>
                    <span
                      className={classNames(
                        ' font-semibold text-xs',
                        person.removed ? 'text-gray-400' : 'text-gray-500'
                      )}
                    >
                      {person.title}
                    </span>
                    <span className="text-gray-400">{person.email}</span>
                  </div>
                </div>
                <div
                  className={classNames(
                    'whitespace-nowrap w-1/2 flex items-center justify-start',
                    person.removed ? 'line-through text-gray-400' : ''
                  )}
                >
                  <div
                    className={classNames(
                      'w-full pr-2 text-sm ml-10',
                      person.removed ? 'text-gray-400' : 'text-gray-800'
                    )}
                  >
                    <RenderAddress
                      removed={person?.removed || false}
                      address={person.address}
                    />
                  </div>
                </div>
                <div
                  className={classNames(
                    'transform transition-all duration-300 ease-out translate-y-0',
                    confirmStep ? 'opacity-0' : 'opacity-100'
                  )}
                >
                  {!person.removed ? (
                    <div className="pl-2 flex items-center justify-end ml-auto">
                      <div
                        onClick={() => {
                          setAddPersonPressed(false);
                          setEditingPersonId(person.id);
                        }}
                        className="group/edit h-fit flex items-center justify-between top-6 right-7 p-1.5 border rounded-md hover:cursor-pointer"
                      >
                        <BiEditAlt className="w-4 h-4 text-gray-500 group-hover/edit:text-gray-900 transition-all easy-in-out duration-150" />
                      </div>
                      {!person.edited ? (
                        <div
                          onClick={() => {
                            removePersonHandler(person.id);
                          }}
                          className="ml-1 group/remove h-fit flex items-center justify-between top-6 right-7 p-1.5 border rounded-md hover:cursor-pointer"
                        >
                          <IconTrashX className="w-4 h-4 text-red-500 group-hover/remove:text-red-700 transition-all easy-in-out duration-150" />
                        </div>
                      ) : (
                        <div
                          onClick={() => {
                            returnEdditedPersonHandler(person.id);
                          }}
                          className="group/backup ml-1 h-fit flex items-center justify-between top-6 right-7 p-1.5 border rounded-md hover:cursor-pointer"
                        >
                          <IconArrowBackUp className="w-4 h-4 text-gray-500 group-hover/backup:text-gray-900 transition-all easy-in-out duration-150" />
                        </div>
                      )}
                    </div>
                  ) : (
                    <div className="pl-2 flex items-center justify-end ml-auto">
                      <div className="w-8 h-4 p-2" />
                      <div
                        onClick={() => {
                          returnPersonHandler(person.id);
                        }}
                        className="group ml-auto h-fit flex items-center justify-between top-6 right-7 p-1.5 border rounded-md hover:cursor-pointer"
                      >
                        <IconArrowBackUp className="w-4 h-4 text-gray-500 group-hover:text-gray-900 transition-all easy-in-out duration-150" />
                      </div>
                    </div>
                  )}
                </div>
              </div>
            ) : (
              <PersonDataHandling
                key={rowIndex}
                person={person}
                closeModalHandler={() => {
                  setEditingPersonId(-1);
                }}
                removePersonHandler={() => {
                  removePersonHandler(person.id);
                  setEditingPersonId(-1);
                }}
                submitProcess={updateExistedPersonHandler}
                isCreateProcess={false}
              />
            )}
          </>
        ))}
      </div>

      <div className="mb-12">
        <div className="w-full border-b text-base font-semibold text-gray-700 pb-1 mb-3 flex items-center justify-between">
          Registered Agent
        </div>

        <div className="w-full flex items-start justify-between mb-12 max-lg:flex-col">
          {editingAddressAgent ? (
            <RegAgentDataHandling
              agentName={agentreportData.name}
              agentAddress={agentreportData.address}
              closeModalHandler={() => setEditingAddressAgent(false)}
              submitProcess={submitRegAgentData}
              hideX={false}
            />
          ) : (
            <>
              <div className="w-full flex items-start justify-between pb-2 max-lg:w-full">
                <div className="pr-1 text-gray-700 text-sm">
                  <div className="text-sm text-gray-500 mb-1">Name</div>
                  <div className="font-semibold text-gray-800">
                    {agentreportData.name}
                  </div>
                </div>
              </div>
              <div className="w-full flex items-start justify-end pb-2">
                <div className="w-full pr-2 text-gray-800 text-sm">
                  <div className="text-sm text-gray-500 mb-1">Address</div>
                  <div className="flex items-start justify-between">
                    <div>
                      <div>
                        <span>{agentreportData.address.address0}, </span>
                        {agentreportData.address.address1 && (
                          <span>{agentreportData.address.address1}</span>
                        )}
                      </div>
                      <div>
                        {agentreportData.address.address2 && (
                          <span>{agentreportData.address.address2}</span>
                        )}
                        {agentreportData.address.address3 && (
                          <span>
                            {agentreportData.address.address2 ? ',' : ''}{' '}
                            {agentreportData.address.address3}
                          </span>
                        )}
                      </div>
                      <div>
                        <span>{agentreportData.address.city}, </span>
                        <span>
                          {globalData.states.find(
                            (item) =>
                              item.name === agentreportData.address.state
                          )?.abbreviation || ''}{' '}
                        </span>
                        <span>{agentreportData.address.zip}</span>
                        {agentreportData.address?.county && (
                          <span>
                            , {agentreportData.address?.county}
                            <TooltipWrapper tooltipText="County">
                              <IconInfoCircle className="w-3.5 h-3.5 relative -right-1 top-0.5 text-gray-400 hover:cursor-pointer hover:text-gray-500" />
                            </TooltipWrapper>
                          </span>
                        )}
                      </div>
                      <div>{agentreportData.address.country}</div>
                    </div>
                    {!confirmStep && (
                      <div
                        className={classNames(
                          'transform transition-all duration-300 ease-out opacity-100 translate-y-0'
                        )}
                      >
                        <div
                          onClick={() => {
                            setEditingAddressAgent(true);
                          }}
                          className="group h-fit flex items-center justify-between top-6 right-7 p-1.5 border rounded-md hover:cursor-pointer"
                        >
                          <BiEditAlt className="w-4 h-4 text-gray-500 group-hover:text-gray-900 transition-all easy-in-out duration-150" />
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </>
  );
};
export default SubmitReviewStep;
