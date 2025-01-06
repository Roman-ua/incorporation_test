import React, { useState } from 'react';
import ButtonWithArrow from '../../components/shared/ButtonWithArrow/ButtonWithArrow';
import ReviewStepsProgress from './reviewReportComponents/ReviewSteps';
import { dockFieldHandler } from '../../utils/helpers';
import SectionHeading from '../company/components/SectionHeading';
import USAddressForm from '../createCompany/components/USAddressForm';
import PeopleList from './components/PeopleList';
import { mockAgent, mockPeople, mockReportData } from '../../mock/mockData';
import SubmitReviewStep from './reviewReportComponents/SubmitReviewStep';
import { USStates } from '../../constants/form/form';
import TooltipWrapper from '../../components/shared/TooltipWrapper';
import { IconInfoCircle } from '@tabler/icons-react';
import logo from '../../images/shared/bluelogo.svg';
import smallLogo from '../../images/shared/round_logo.png';

// const statusBadge = (status: string) => {
//   switch (status) {
//     case 'Filed':
//       return 'bg-green-50 text-green-700 ring-green-600/20';
//     case 'Cancelled':
//       return 'bg-red-50 text-red-700 ring-red-600/20';
//     case 'Declined':
//       return 'bg-gray-50 text-gray-700 ring-gray-600/20';
//     case 'Confirmed':
//       return 'bg-blue-50 text-blue-700 ring-blue-600/20';
//     case 'Waiting for Confirmation':
//       return 'bg-yellow-50 text-yellow-700 ring-yellow-600/20';
//     default:
//       return 'bg-gray-50 text-gray-700 ring-gray-600/20';
//   }
// };

const AnnualReportReview = () => {
  const [dataDuplicate] = useState(mockReportData);
  const [peopleDataDuplicate] = useState(mockPeople);
  const [agentDataDuplicate] = useState(mockAgent);

  const [currentStep, setCurrentStep] = useState<number>(3);
  const [visitedSteps, setVisitedSteps] = useState<number[]>([0, 1, 2]);
  const [editMode, setEditMode] = useState<boolean>(false);

  const submitStepHandler = () => {
    setCurrentStep((prevState) => {
      setVisitedSteps([...visitedSteps, prevState]);
      return prevState + 1;
    });
  };

  const editPersonAction = (id: number) => {
    console.log(id);
  };
  const removePersonAction = (id: number) => {
    console.log(id);
  };
  return (
    <>
      <div className="bg-mainBackground w-full border-b py-4 px-6 flex items-center justify-between max-lg:px-4 max-lg:fixed max-lg:top-0 max-lg:left-0 max-lg:right-0 max-lg:z-10 max-lg:justify-start">
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
        <div className="w-1/2">
          <h1 className="font-bold max-lg:text-xl">
            {currentStep === 0 && 'Details'}
            {currentStep === 1 && 'Address'}
            {currentStep === 2 && 'People'}
            {currentStep === 3 && 'Review'}
            {currentStep === 4 && 'Reviewed'}
          </h1>
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
        <div className="w-1/2 max-xl:w-full max-lg:px-20 max-lg:mt-6 max-sm:px-0 pb-16">
          {currentStep === 0 && (
            <form onSubmit={submitStepHandler}>
              <>
                <SectionHeading title={'Company Information'} />
                <div className="flex items-start justify-start mb-12 max-lg:flex-col">
                  <div className="w-full max-lg:mb-3">
                    <div className="w-full flex items-start justify-between pb-2">
                      <div className="w-1/2 text-sm max-xl:w-1/2 pr-2 text-nowrap text-gray-500">
                        Year
                      </div>
                      <div className="w-full pr-2 text-gray-700 text-sm">
                        {dataDuplicate.year}
                      </div>
                    </div>
                    <div className="w-full flex items-start justify-between pb-2">
                      <div className="w-1/2 text-sm max-xl:w-1/2 pr-2 text-nowrap text-gray-500">
                        Company Name
                      </div>
                      <div className="w-full pr-2 text-gray-700 text-sm">
                        {dataDuplicate.companyName}
                      </div>
                    </div>
                    <div className="w-full flex items-start justify-between pb-2">
                      <div className="w-1/2 text-sm max-xl:w-1/2 pr-2 text-nowrap text-gray-500">
                        State
                      </div>
                      <div className="w-full pr-2 text-gray-700 text-sm">
                        {dataDuplicate.state}
                      </div>
                    </div>
                    <div className="w-full flex items-start justify-between pb-2">
                      <div className="w-1/2 text-sm max-xl:w-1/2 pr-2 text-nowrap text-gray-500">
                        {dockFieldHandler(dataDuplicate.state)}
                      </div>
                      <div className="w-full pr-2 text-gray-700 text-sm">
                        {dataDuplicate.registrationNumber}
                      </div>
                    </div>
                  </div>
                </div>
                <SectionHeading title="Registered Agent" />
                <div className="w-full flex items-start justify-start mb-12 max-lg:flex-col">
                  <div className="w-1/2 flex items-start justify-between pb-2 max-lg:w-full">
                    <div className="pr-1 text-gray-700 text-sm">
                      <div className="text-sm text-gray-500 mb-1">Name</div>
                      <div className="font-bold">{agentDataDuplicate.name}</div>
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
                  <ButtonWithArrow title={'Approve'} />
                </div>
                <div className="w-1/4 pr-2 max-lg:hidden" />
              </div>
            </form>
          )}

          {currentStep === 1 && (
            <form onSubmit={submitStepHandler}>
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
                    Back
                  </button>
                  <ButtonWithArrow title={'Approve'} />
                </div>
                <div className="w-1/4 pr-2 max-lg:hidden" />
              </div>
            </form>
          )}
          {currentStep === 2 && (
            <form onSubmit={submitStepHandler}>
              <PeopleList
                removeAction={removePersonAction}
                editAction={editPersonAction}
                data={peopleDataDuplicate}
                editableList={true}
                disabledRedirect={true}
                hideHeading={true}
              />
              <div className="bg-mainBackground py-3 px-6 fixed left-0 bottom-0 border-t w-full max-lg:left-0 flex items-start justify-between max-lg:px-36 max-sm:px-6">
                <div className="w-1/5 pr-2 max-lg:hidden" />
                <div className="w-1/2 max-xl:w-full flex items-center justify-between">
                  <button
                    type="button"
                    onClick={() => setCurrentStep(1)}
                    className="min-w-28 rounded-md mr-2 bg-mainBackground px-3.5 py-2.5 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
                  >
                    Back
                  </button>
                  <ButtonWithArrow title={'Approve'} />
                </div>
                <div className="w-1/4 pr-2 max-lg:hidden" />
              </div>
            </form>
          )}
          {currentStep === 3 && (
            <form onSubmit={submitStepHandler}>
              <SubmitReviewStep
                reportData={dataDuplicate}
                agentReportData={agentDataDuplicate}
                peopleData={peopleDataDuplicate}
              />
              <div className="bg-mainBackground py-3 px-6 fixed left-0 bottom-0 border-t w-full max-lg:left-0 flex items-start justify-between max-lg:px-36 max-sm:px-6">
                <div className="w-1/5 pr-2 max-lg:hidden" />
                <div className="w-1/2 max-xl:w-full flex items-center justify-between">
                  <button
                    type="button"
                    onClick={() => {
                      setEditMode(true);
                      setCurrentStep(0);
                    }}
                    className="min-w-28 rounded-md mr-2 bg-mainBackground px-3.5 py-2.5 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
                  >
                    Make Changes
                  </button>
                  <ButtonWithArrow title={'Submit'} />
                </div>
                <div className="w-1/4 pr-2 max-lg:hidden" />
              </div>
            </form>
          )}
          {currentStep === 4 && <div>Сongratulations</div>}
        </div>
        <div className="w-1/4" />
      </div>
    </>
  );
};

export default AnnualReportReview;
