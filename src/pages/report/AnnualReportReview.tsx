import React, { useEffect, useState } from 'react';
import ButtonWithArrow from '../../components/shared/ButtonWithArrow/ButtonWithArrow';
import ReviewStepsProgress from './reviewReportComponents/ReviewSteps';
import { classNames } from '../../utils/helpers';
import { mockAgent, mockPeople, mockReportData } from '../../mock/mockData';
import SubmitReviewStep from './reviewReportComponents/SubmitReviewStep';
import { IconCircleCheckFilled } from '@tabler/icons-react';
import logo from '../../images/shared/bluelogo.svg';
import smallLogo from '../../images/shared/round_logo.png';
import PageSign from '../../components/shared/PageSign';
import { Person, ReportData } from '../../interfaces/interfaces';
import ConfettiAp from '../../components/shared/Confetti';
import ProcessingReport from './components/ProcessingReport';

const AnnualReportReview = () => {
  const [dataDuplicate, setDataDuplicate] =
    useState<ReportData>(mockReportData);
  const [peopleDataDuplicate] = useState<Person[]>(mockPeople);
  const [agentDataDuplicate] = useState(mockAgent);
  const [confetti, setConfetti] = React.useState(false);

  const [currentStep, setCurrentStep] = useState<number>(3);
  const [visitedSteps, setVisitedSteps] = useState<number[]>([]);
  const [editMode, setEditMode] = useState<boolean>(true); // TO DO need to change to false for make steps logic works

  useEffect(() => {
    if (currentStep === 4) {
      const timer = setTimeout(() => setConfetti(true), 300);
      return () => clearTimeout(timer);
    }
  }, [currentStep]);

  const submitStepHandler = () => {
    setCurrentStep((prevState) => {
      setVisitedSteps([...visitedSteps, prevState]);
      return prevState + 1;
    });
  };

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
          {`${dataDuplicate.year} Annual Report Filing for ${dataDuplicate.companyName}`}
        </div>
        <div className="w-[200px] pr-2" />
      </div>
      {confetti && <ConfettiAp />}
      <div
        className={classNames(
          'bg-mainBackground m-auto flex items-start justify-between w-full max-lg:flex-col px-6 pt-10 max-lg:pt-32 max-lg:pb-20 min-h-[calc(100vh-65px)]'
        )}
      >
        <div className="w-[200px] pr-2 max-lg:w-full max-lg:pr-0 max-lg:mb-6">
          <ReviewStepsProgress
            editMode={editMode}
            currentStep={currentStep}
            visitedSteps={visitedSteps}
            setCurrentStep={setCurrentStep}
          />
        </div>
        <div className="w-[870px] max-xl:w-full max-lg:px-20 max-lg:mt-6 max-sm:px-0 pb-20">
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
                clickHandlerPeople={() => {
                  setEditMode(true);
                  setCurrentStep(2);
                }}
                clickHandlerAddress={() => {
                  setEditMode(true);
                  setCurrentStep(1);
                }}
                status={'Confirmation Needed'}
                reportData={dataDuplicate}
                setReportData={setDataDuplicate}
                agentReportData={agentDataDuplicate}
                peopleData={peopleDataDuplicate}
              />
              <div className="bg-mainBackground py-3 px-6 fixed left-0 bottom-0 border-t w-full max-lg:left-0 flex items-start justify-between max-lg:px-36 max-sm:px-6">
                <div className="w-[200px] pr-2 max-lg:hidden" />
                <div className="w-[870px] max-xl:w-full flex items-center justify-between">
                  <div />
                  <ButtonWithArrow title={'Confirm'} />
                </div>
                <div className="w-[200px] pr-2 max-lg:hidden" />
              </div>
            </form>
          )}
          {currentStep === 4 && (
            <div className="w-full relative">
              <div className="w-full flex items-center justify-start flex-col max-lg:pt-10">
                <IconCircleCheckFilled className="w-20 h-20 text-green-500" />
                <div className="text-xl font-semibold mt-4 text-gray-700 mb-4">
                  Thank You for Confirming Annual Report Details! 🎉
                </div>
                <div className="text-base mb-1 text-gray-700">
                  Your order <span className="font-bold">ord_1234</span> has
                  been successfully created.
                </div>
                <div className="text-base mb-4 text-gray-700">
                  Our team will review and process your order within the next
                  few days.
                </div>
                <div className="text-sm mb-1 text-gray-500">
                  If you have any questions or need further assistance, feel
                  free to contact our{' '}
                  <span className="text-blue-400 hover:cursor-pointer">
                    support team.
                  </span>
                </div>
              </div>
              <div className="relative mt-10 max-sm:hidden px-6">
                <div className="absolute -bottom-10 -right-5 -left-5 -top-5 border border-gray-200 rounded-md z-40 bg-transparrent" />
                <div className="relative z-50">
                  <SubmitReviewStep
                    setReportData={setDataDuplicate}
                    reportData={dataDuplicate}
                    status={'In Progress'}
                    agentReportData={agentDataDuplicate}
                    peopleData={peopleDataDuplicate}
                  />
                </div>
              </div>
            </div>
          )}
          {currentStep === 5 && (
            <div className="w-full relative">
              <ProcessingReport data={dataDuplicate} />
              <div className="bg-mainBackground py-3 px-6 fixed left-0 bottom-0 border-t w-full max-lg:left-0 flex items-start justify-between max-lg:px-36 max-sm:px-6">
                <div className="w-[200px] pr-2 max-lg:hidden" />
                <div className="w-[870px] max-xl:w-full flex items-center justify-between">
                  <div />
                  <ButtonWithArrow title={'Submit'} />
                </div>
                <div className="w-[200px] pr-2 max-lg:hidden" />
              </div>
            </div>
          )}
        </div>
        <div className="w-[200px]" />
      </div>
    </>
  );
};

export default AnnualReportReview;
