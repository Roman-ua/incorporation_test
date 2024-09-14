import React, { useEffect, useState } from 'react';
import { CheckIcon } from '@heroicons/react/20/solid';

const stepsData = [
  {
    name: 'Company Details',
    status: 'current',
    id: 0,
  },
  {
    name: 'Registration Information',
    status: 'upcoming',
    id: 1,
  },
  {
    name: 'Addresses',
    status: 'upcoming',
    id: 2,
  },
  {
    name: 'Review',
    status: 'upcoming',
    id: 3,
  },
];

function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(' ');
}

const StepsProgress = ({
  currentStep,
  setCurrentStep,
  firstStepData,
  secondStepData,
  thirdStepData,
}: {
  currentStep: number;
  setCurrentStep: (value: number) => void;
  firstStepData: string[];
  secondStepData: string[];
  thirdStepData: string[];
}) => {
  const [steps, setSteps] = useState(stepsData);

  const stepHandler = (currentStep: number) => {
    const data = [...steps];

    data.forEach((step, index) => {
      if (step.id === currentStep && step.status !== 'complete') {
        data[index] = { ...step, status: 'current' };
        return;
      }

      if (step.id !== currentStep && step.status !== 'complete') {
        data[index] = { ...step, status: 'upcoming' };
        return;
      }

      if (step.status === 'complete') {
        data[index] = { ...step, status: 'complete' };
        return;
      }

      data[index] = { ...step, status: 'upcoming' };
    });

    setSteps(data);
  };

  useEffect(() => {
    stepHandler(currentStep);
  }, [currentStep]);

  useEffect(() => {
    setSteps((prevState) => {
      const existsEmptyFieldFirstStep = firstStepData.findIndex(
        (item) => item === ''
      );
      const existsEmptyFieldSecondStep = secondStepData.findIndex(
        (item) => item === ''
      );
      const existsEmptyFieldThirdStep = thirdStepData.findIndex(
        (item) => item === ''
      );

      if (existsEmptyFieldFirstStep === -1 && currentStep !== 0) {
        prevState[0].status = 'complete';
      }
      if (existsEmptyFieldFirstStep > -1 && currentStep === 0) {
        prevState[0].status = 'current';
      }

      if (existsEmptyFieldSecondStep === -1 && currentStep !== 1) {
        prevState[1].status = 'complete';
      }
      if (existsEmptyFieldSecondStep > -1 && currentStep === 1) {
        prevState[1].status = 'current';
      }

      if (existsEmptyFieldThirdStep === -1 && currentStep !== 2) {
        prevState[2].status = 'complete';
      }
      if (existsEmptyFieldThirdStep > -1 && currentStep === 2) {
        prevState[2].status = 'current';
      }

      return prevState;
    });
  }, [firstStepData, secondStepData, thirdStepData]);

  return (
    <nav aria-label="Progress" className="max-lg:overflow-scroll">
      <ol
        role="list"
        className="bg-white overflow-hidden flex flex-col max-lg:flex-row max-lg:py-3 max-lg:border-b max-lg:px-2 max-lg:fixed max-lg:z-10 max-lg:left-0 max-lg:right-0 max-lg:top-14 max-lg:border-t max-lg:overflow-scroll"
      >
        {steps.map((step, stepIdx) => (
          <li
            key={step.name}
            onClick={() => setCurrentStep(step.id)}
            className={classNames(
              stepIdx !== steps.length - 1 ? 'pb-5' : '',
              'relative max-lg:mr-6 max-lg:pb-0'
            )}
          >
            {step.status === 'complete' ? (
              <>
                {stepIdx !== steps.length - 1 ? (
                  <div
                    className="absolute left-2 top-5 h-4 -ml-px mt-0.5 w-0.5 bg-green-500
                      max-lg:-right-4 max-lg:top-2 max-lg:left-auto max-lg:h-0.5 max-lg:w-2"
                    aria-hidden="true"
                  />
                ) : null}
                <span className="group relative flex items-center hover:cursor-pointer">
                  <span className="flex h-5 items-center">
                    <span className="relative z-10 flex h-4 w-4 items-center justify-center rounded-full bg-green-500">
                      <CheckIcon
                        className="h-2 w-2 text-white"
                        aria-hidden="true"
                      />
                    </span>
                  </span>
                  <span className="ml-2 flex min-w-0 w-fit flex-col">
                    <span className="text-sm font-medium text-nowrap">
                      {step.name}
                    </span>
                  </span>
                </span>
              </>
            ) : step.status === 'current' ? (
              <>
                {stepIdx !== steps.length - 1 ? (
                  <div
                    className="absolute left-2 top-5 h-4 -ml-px mt-0.5 w-0.5 bg-gray-300
                      max-lg:-right-4 max-lg:top-2 max-lg:left-auto max-lg:h-0.5 max-lg:w-2"
                    aria-hidden="true"
                  />
                ) : null}
                <span
                  className="group relative flex items-center hover:cursor-pointer"
                  aria-current="step"
                >
                  <span className="flex h-5 items-center" aria-hidden="true">
                    <span className="relative z-10 flex h-4 w-4 items-center justify-center rounded-full border-2 border-mainBlue bg-white">
                      <span className="h-2 w-2 rounded-full bg-mainBlue" />
                    </span>
                  </span>
                  <span className="ml-2 flex min-w-0 flex-col">
                    <span className="text-sm font-medium text-mainBlue text-nowrap">
                      {step.name}
                    </span>
                  </span>
                </span>
              </>
            ) : (
              <>
                {stepIdx !== steps.length - 1 ? (
                  <div
                    className="absolute left-2 top-5 h-4 -ml-px mt-0.5 w-0.5 bg-gray-300
                      max-lg:-right-4 max-lg:top-2 max-lg:left-auto max-lg:h-0.5 max-lg:w-2"
                    aria-hidden="true"
                  />
                ) : null}
                <span className="group relative flex items-center hover:cursor-pointer">
                  <span className="flex h-5 items-center" aria-hidden="true">
                    <span className="relative z-10 flex h-4 w-4 items-center justify-center rounded-full border-2 border-gray-300 bg-white group-hover:border-gray-400">
                      <span className="h-2 w-2 rounded-full bg-transparent group-hover:bg-gray-300" />
                    </span>
                  </span>
                  <span className="ml-2 flex min-w-0 flex-col">
                    <span className="text-sm font-medium text-gray-500 text-nowrap">
                      {step.name}
                    </span>
                  </span>
                </span>
              </>
            )}
          </li>
        ))}
      </ol>
    </nav>
  );
};
export default StepsProgress;
