import React, { useEffect, useState } from 'react';
import ButtonWithArrow from '../../components/shared/ButtonWithArrow/ButtonWithArrow';
import ReviewStepsProgress from './reviewReportComponents/ReviewSteps';
import { classNames, dockFieldHandler } from '../../utils/helpers';
import SectionHeading from '../company/components/SectionHeading';
import USAddressForm from '../createCompany/components/USAddressForm';
import { mockAgent, mockPeople, mockReportData } from '../../mock/mockData';
import SubmitReviewStep from './reviewReportComponents/SubmitReviewStep';
import { USStates } from '../../constants/form/form';
import TooltipWrapper from '../../components/shared/TooltipWrapper';
import {
  IconCircleCheckFilled,
  IconInfoCircle,
  IconPlus,
  IconSettings,
  IconTrashX,
} from '@tabler/icons-react';
import logo from '../../images/shared/bluelogo.svg';
import smallLogo from '../../images/shared/round_logo.png';
import PageSign from '../../components/shared/PageSign';
import { FaSignature } from 'react-icons/fa6';
import { Person } from '../../interfaces/interfaces';
import ConfettiAp from '../../components/shared/Confetti';
import PersonDataHandling from '../../components/shared/PersonData/PersonDataHandling';
import UnsavedChanges from '../../components/shared/Modals/sharedModals/UnsavedChanges';

const AnnualReportReview = () => {
  const [dataDuplicate] = useState(mockReportData);
  const [peopleDataDuplicate, setPeopleDataDuplicate] =
    useState<Person[]>(mockPeople);
  const [agentDataDuplicate] = useState(mockAgent);
  const [confetti, setConfetti] = React.useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      if (!localStorage.getItem('confetti_success')) {
        setConfetti(true);
        localStorage.setItem('confetti_success', 'true');
      }
    }, 300);

    return () => clearTimeout(timer);
  }, []);

  const [editingPersonId, setEditingPersonId] = useState(-1);
  const [addPersonPressed, setAddPersonPressed] = React.useState(false);
  const [currentStep, setCurrentStep] = useState<number>(3);
  const [visitedSteps, setVisitedSteps] = useState<number[]>([0, 1, 2]);
  const [editMode, setEditMode] = useState<boolean>(false);
  const [discardModal, setDiscardModal] = useState<boolean>(false);
  const [dirtyFlag, setDirtyFlag] = useState(false);

  const submitStepHandler = () => {
    setCurrentStep((prevState) => {
      setVisitedSteps([...visitedSteps, prevState]);
      return prevState + 1;
    });
  };

  const removePersonHandler = (id: number) => {
    setDirtyFlag(true);

    setPeopleDataDuplicate((prevState) => {
      return prevState.filter((item) => item.id !== id);
    });
  };

  const updateExistedPersonHandler = (person: Person) => {
    setPeopleDataDuplicate((prevState) => {
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
      }
      return data;
    });
  };

  const addNewPersonHandler = (person: Person) => {
    setPeopleDataDuplicate((prevState) => {
      const data = [...prevState];

      if (person.signer) {
        const prevSignerIndex = data.findIndex((item) => item.signer);
        if (prevSignerIndex !== -1) {
          data[prevSignerIndex].signer = false;
        }
      }

      data.push(person);

      return data;
    });
  };

  const cancelStepHandler = () => {
    setAddPersonPressed(false);
    setEditingPersonId(-1);
    setCurrentStep(3);

    setPeopleDataDuplicate(mockPeople);
  };

  return (
    <>
      <div className="bg-mainBackground relative w-full border-b py-4 px-6 flex items-center justify-between max-lg:px-4 max-lg:fixed max-lg:top-0 max-lg:left-0 max-lg:right-0 max-lg:z-10 max-lg:justify-start">
        <div className="w-1/5 max-lg:w-fit pr-2">
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
        <div className="w-1/2 flex items-center justify-center font-semibold">
          {`${dataDuplicate.year} Annual Report Filing for ${dataDuplicate.companyName}`}
        </div>
        <div className="w-1/4 pr-2" />
      </div>
      <div className="min-h-[calc(100vh-65px)] bg-mainBackground m-auto flex items-start justify-between w-full max-lg:flex-col px-6 pt-10 max-lg:pt-32 max-lg:pb-20">
        <div className="w-1/5 pr-2 max-lg:w-full max-lg:pr-0 max-lg:mb-6">
          <ReviewStepsProgress
            editMode={editMode}
            currentStep={currentStep}
            visitedSteps={visitedSteps}
            setCurrentStep={setCurrentStep}
          />
        </div>
        <div className="w-1/2 max-xl:w-full max-lg:px-20 max-lg:mt-6 max-sm:px-0 pb-20">
          {currentStep === 0 && (
            <form onSubmit={submitStepHandler}>
              <>
                <div className="mb-5">
                  <PageSign
                    titleSize={'text-2xl font-bold text-gray-900'}
                    title={`Details`}
                    icon={<></>}
                  />
                </div>
                <SectionHeading
                  title={'Company Information'}
                  textSettings={'text-base'}
                />
                <div className="flex items-start justify-start mb-12 max-lg:flex-col">
                  <div className="w-full max-lg:mb-3">
                    <div className="w-full flex items-start justify-between pb-2">
                      <div className="w-3/5 text-sm max-xl:w-1/2 pr-2 text-nowrap text-gray-500">
                        Year
                      </div>
                      <div className="w-full pr-2 text-gray-700 text-sm">
                        {dataDuplicate.year}
                      </div>
                    </div>
                    <div className="w-full flex items-start justify-between pb-2">
                      <div className="w-3/5 text-sm max-xl:w-1/2 pr-2 text-nowrap text-gray-500">
                        Company Name
                      </div>
                      <div className="w-full pr-2 text-gray-700 text-sm">
                        {dataDuplicate.companyName}
                      </div>
                    </div>
                    <div className="w-full flex items-start justify-between pb-2">
                      <div className="w-3/5 text-sm max-xl:w-1/2 pr-2 text-nowrap text-gray-500">
                        State
                      </div>
                      <div className="w-full pr-2 text-gray-700 text-sm">
                        {dataDuplicate.state}
                      </div>
                    </div>
                    <div className="w-full flex items-start justify-between pb-2">
                      <div className="w-3/5 text-sm max-xl:w-1/2 pr-2 text-nowrap text-gray-500">
                        {dockFieldHandler(dataDuplicate.state)}
                      </div>
                      <div className="w-full pr-2 text-gray-700 text-sm">
                        {dataDuplicate.registrationNumber}
                      </div>
                    </div>
                  </div>
                </div>
                <SectionHeading
                  title="Registered Agent"
                  textSettings={'text-base'}
                />
                <div className="w-full flex items-start justify-start mb-12 max-lg:flex-col">
                  <div className="w-3/5 flex items-start justify-between pb-2 max-lg:w-full">
                    <div className="pr-1 text-gray-700 text-sm">
                      <div className="text-sm text-gray-500 mb-1">Name</div>
                      <div className="font-semibold">
                        {agentDataDuplicate.name}
                      </div>
                    </div>
                  </div>
                  <div className="flex items-start justify-start pb-2 w-full">
                    <div className="w-full pr-2 text-gray-700 text-sm">
                      <div className="text-sm text-gray-500 mb-1">Address</div>
                      <div>
                        <span>{agentDataDuplicate.address.address0}, </span>
                        {agentDataDuplicate.address.address1 && (
                          <span>{agentDataDuplicate.address.address1}</span>
                        )}
                      </div>
                      <div>
                        {agentDataDuplicate.address.address2 && (
                          <span>{agentDataDuplicate.address.address2}</span>
                        )}
                        {agentDataDuplicate.address.address3 && (
                          <span>
                            {agentDataDuplicate.address.address2 ? ',' : ''}{' '}
                            {agentDataDuplicate.address.address3}
                          </span>
                        )}
                      </div>
                      <div>
                        <span>{agentDataDuplicate.address.city}, </span>
                        <span>
                          {USStates.find(
                            (item) =>
                              item.title === agentDataDuplicate.address.state
                          )?.value || ''}{' '}
                        </span>
                        <span>{agentDataDuplicate.address.zip}</span>
                        {agentDataDuplicate.address?.county && (
                          <span>
                            , {agentDataDuplicate.address?.county}
                            <TooltipWrapper tooltipText="County">
                              <IconInfoCircle className="w-3.5 h-3.5 relative -right-1 top-0.5 text-gray-400 hover:cursor-pointer hover:text-gray-500" />
                            </TooltipWrapper>
                          </span>
                        )}
                      </div>
                      <div>{agentDataDuplicate.address.country}</div>
                    </div>
                  </div>
                </div>
              </>
              <div className="bg-mainBackground py-3 px-6 fixed left-0 bottom-0 border-t w-full max-lg:left-0 flex items-start justify-between max-lg:px-36 max-sm:px-6">
                <div className="w-1/5 pr-2 max-lg:hidden" />
                <div className="w-1/2 max-xl:w-full flex items-center justify-end">
                  <ButtonWithArrow title={'Save'} />
                </div>
                <div className="w-1/4 pr-2 max-lg:hidden" />
              </div>
            </form>
          )}

          {currentStep === 1 && (
            <form onSubmit={submitStepHandler}>
              <div className="mb-5">
                <PageSign
                  titleSize={'text-2xl font-bold text-gray-900'}
                  title={`Address`}
                  icon={<></>}
                />
              </div>
              <div className="mb-5">
                <USAddressForm
                  disabledFlag={true}
                  setFromState={() => {}}
                  heading={'Main Address'}
                  requiredError={false}
                  value={dataDuplicate.address}
                />
              </div>
              <div className="mb-5">
                <USAddressForm
                  disabledFlag={true}
                  setFromState={() => {}}
                  heading={'Mailing Address'}
                  requiredError={false}
                  value={dataDuplicate.address}
                />
              </div>
              <div className="bg-mainBackground py-3 px-6 fixed left-0 bottom-0 border-t w-full max-lg:left-0 flex items-start justify-between max-lg:px-20 max-sm:px-6">
                <div className="w-1/5 pr-2 max-lg:hidden" />
                <div className="w-1/2 max-xl:w-full flex items-center justify-between">
                  <button
                    type="button"
                    onClick={() => setCurrentStep(0)}
                    className="min-w-28 rounded-md mr-2 bg-mainBackground px-3.5 py-2.5 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
                  >
                    Cancel
                  </button>
                  <ButtonWithArrow title={'Save'} />
                </div>
                <div className="w-1/4 pr-2 max-lg:hidden" />
              </div>
            </form>
          )}
          {currentStep === 2 && (
            <form onSubmit={submitStepHandler}>
              <UnsavedChanges
                open={discardModal}
                setOpen={(value) => setDiscardModal(value)}
                sectionTitle={'People section'}
                discardHandler={cancelStepHandler}
              />
              <div className="mb-5">
                <PageSign
                  titleSize={'text-2xl font-bold text-gray-900'}
                  title={`People`}
                  icon={<></>}
                />
              </div>
              <>
                {peopleDataDuplicate.map((person, rowIndex) => {
                  return editingPersonId !== person.id ? (
                    <div key={rowIndex}>
                      <div className="flex py-3 group transition-all ease-in-out duration-150 items-start justify-start">
                        <div
                          className={classNames(
                            'whitespace-nowrap w-[40%] max-sm:w-1/2 pr-2 flex  text-gray-900 justify-start items-start'
                          )}
                        >
                          <span className="mr-4 min-w-7 min-h-7 text-lg font-bold text-white bg-gray-300 rounded-full flex items-center justify-center">
                            {person.name[0]}
                          </span>
                          <div
                            className={classNames(
                              'text-sm flex flex-col justify-start items-start'
                            )}
                          >
                            <span className="font-bold flex items-center justify-start">
                              {person.name}{' '}
                              {person.signer && (
                                <TooltipWrapper tooltipText="Signer of the Annual Report">
                                  <FaSignature className="w-4 h-4 text-gray-700 ml-2 hover:cursor-pointer" />
                                </TooltipWrapper>
                              )}
                            </span>
                            <span className="text-gray-500 font-semibold">
                              {person.title}
                            </span>
                            <span className="text-gray-400">
                              {person.email}
                            </span>
                          </div>
                        </div>

                        <div className="whitespace-nowrap w-[24%] max-lg:w-[34%] max-sm:w-1/2 px-2 flex items-center justify-start">
                          <div className="w-full pr-2 text-gray-700 text-sm">
                            <div>
                              <span>{person.address.address0}, </span>
                              {person.address.address1 && (
                                <span>{person.address.address1}</span>
                              )}
                            </div>
                            <div>
                              {person.address.address2 && (
                                <span>{person.address.address2}</span>
                              )}
                              {person.address.address3 && (
                                <span>
                                  {person.address.address2 ? ',' : ''}{' '}
                                  {person.address.address3}
                                </span>
                              )}
                            </div>
                            <div>
                              <span>{person.address.city}, </span>
                              <span>
                                {USStates.find(
                                  (item) => item.title === person.address.state
                                )?.value || ''}{' '}
                              </span>
                              <span>{person.address.zip}</span>
                            </div>
                            <div>{person.address.country}</div>
                          </div>
                        </div>
                        <div className="whitespace-nowrap w-[24%] max-lg:hidden px-2 flex items-center justify-start"></div>
                        <div className="pl-2 flex items-center justify-end ml-auto">
                          <IconSettings
                            onClick={() => {
                              setDirtyFlag(true);
                              setAddPersonPressed(false);
                              setEditingPersonId(person.id);
                            }}
                            className="w-5 h-5 text-gray-700 ml-2 hover:text-gray-900 transition-all duration-150 ease-in-out hover:cursor-pointer hover:rotate-180"
                          />
                          <IconTrashX
                            onClick={() => removePersonHandler(person.id)}
                            className="w-5 h-5 text-red-400 ml-2 hover:text-red-700 transition-all duration-150 ease-in-out hover:cursor-pointer hover:rotate-12"
                          />
                        </div>
                      </div>
                    </div>
                  ) : (
                    <PersonDataHandling
                      key={rowIndex}
                      person={person}
                      closeModalHandler={() => {
                        setEditingPersonId(-1);
                      }}
                      removePersonHandler={removePersonHandler}
                      submitProcess={updateExistedPersonHandler}
                      isCreateProcess={false}
                    />
                  );
                })}
                {addPersonPressed && (
                  <PersonDataHandling
                    person={undefined}
                    closeModalHandler={() => setAddPersonPressed(false)}
                    submitProcess={addNewPersonHandler}
                    isCreateProcess={true}
                  />
                )}
                <button
                  type="button"
                  onClick={() => {
                    setDirtyFlag(true);
                    setEditingPersonId(-1);
                    setAddPersonPressed(true);
                  }}
                  className="ml-auto mt-10 flex items-center justify-center rounded-md group bg-mainBlue px-3 py-2 text-center text-sm font-semibold text-white shadow-sm hover:bg-sideBarBlue focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 transition-all duration-150 ease-in-out"
                >
                  Add Person
                  <IconPlus className="w-5 h-5 text-white ml-2 group-hover:rotate-90 transition-all duration-350 ease-in-out" />
                </button>
              </>
              <div className="bg-mainBackground py-3 px-6 fixed left-0 bottom-0 border-t w-full max-lg:left-0 flex items-start justify-between max-lg:px-36 max-sm:px-6">
                <div className="w-1/5 pr-2 max-lg:hidden" />
                <div className="w-1/2 max-xl:w-full flex items-center justify-between">
                  <button
                    type="button"
                    onClick={() => {
                      if (dirtyFlag) {
                        setDiscardModal(true);
                      } else {
                        cancelStepHandler();
                      }
                    }}
                    className="min-w-28 rounded-md mr-2 bg-mainBackground px-3.5 py-2.5 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
                  >
                    Cancel
                  </button>
                  <ButtonWithArrow title={'Save'} />
                </div>
                <div className="w-1/4 pr-2 max-lg:hidden" />
              </div>
            </form>
          )}
          {currentStep === 3 && (
            <form onSubmit={submitStepHandler}>
              <div className="mb-5">
                <PageSign
                  titleSize={'text-2xl font-bold text-gray-900'}
                  title={`Verify company information for Annual Report filing`}
                  icon={<></>}
                />
              </div>
              <SubmitReviewStep
                clickHandler={() => {
                  setEditMode(true);
                  setCurrentStep(2);
                }}
                reportData={dataDuplicate}
                agentReportData={agentDataDuplicate}
                peopleData={peopleDataDuplicate}
              />
              <div className="bg-mainBackground py-3 px-6 fixed left-0 bottom-0 border-t w-full max-lg:left-0 flex items-start justify-between max-lg:px-36 max-sm:px-6">
                <div className="w-1/5 pr-2 max-lg:hidden" />
                <div className="w-1/2 max-xl:w-full flex items-center justify-between">
                  <div />
                  <ButtonWithArrow title={'Confirm'} />
                </div>
                <div className="w-1/4 pr-2 max-lg:hidden" />
              </div>
            </form>
          )}
          {currentStep === 4 && (
            <div className="w-full flex items-center justify-start flex-col pt-32 max-lg:pt-10">
              {confetti && <ConfettiAp />}
              <IconCircleCheckFilled className="w-28 h-28 text-green-500" />
              <div className="text-3xl font-semibold mt-4 text-gray-700">
                Congratulations!
              </div>
              <div className="text-gray-700 mt-2">
                We received your confirmation! Check your email
              </div>
            </div>
          )}
        </div>
        <div className="w-1/4" />
      </div>
    </>
  );
};

export default AnnualReportReview;
