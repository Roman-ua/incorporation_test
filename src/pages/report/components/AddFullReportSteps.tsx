import React, { useEffect, useState } from 'react';
import { CheckIcon } from '@heroicons/react/20/solid';
import { classNames } from '../../../utils/helpers';

const stepsData = [
  {
    name: 'Details',
    status: 'current',
    id: 1,
  },

  {
    name: 'Review',
    status: 'upcoming',
    id: 2,
  },
];

const AddFullReportSteps = ({
  editMode,
  currentStep,
  visitedSteps,
  setCurrentStep,
  completedSteps,
}: {
  editMode: boolean;
  currentStep: number;
  visitedSteps: number[];
  setCurrentStep: (value: number) => void;
  completedSteps: boolean;
}) => {
  const [steps, setSteps] = useState(stepsData);

  const stepHandler = (visitedSteps: number[]) => {
    const data = [...steps];
    visitedSteps.forEach((step) => {
      const visitedStep = data.findIndex((item) => item.id === step);
      data[visitedStep].status = 'complete';
    });

    const currentStepIndex = data.findIndex((item) => item.id === currentStep);
    data[currentStepIndex].status =
      data[currentStepIndex].id === 2 ? 'complete' : 'current';

    data.forEach((item, index) => {
      if (!visitedSteps.includes(item.id) && item.id !== currentStep) {
        data[index].status = 'upcoming';
      }
    });

    setSteps(data);
  };

  useEffect(() => {
    stepHandler(visitedSteps);
  }, [currentStep]);

  return (
    <nav aria-label="Progress" className="max-lg:overflow-scroll">
      <ol
        role="list"
        className="bg-mainBackground overflow-hidden flex flex-col max-lg:flex-row max-lg:py-3 max-lg:border-b max-lg:px-2 max-lg:fixed max-lg:z-10 max-lg:left-0 max-lg:right-0 max-lg:top-14 max-lg:border-t max-lg:overflow-scroll"
      >
        {steps.map((step, stepIdx) => (
          <li
            key={step.name}
            onClick={() => {
              if (editMode) {
                setCurrentStep(step.id);
              }
            }}
            className={classNames(
              stepIdx !== steps.length - 1 ? 'pb-5' : '',
              !editMode && step.id === 3 && step.status !== 'complete'
                ? 'opacity-50'
                : '',
              'relative max-lg:mr-6 max-lg:pb-0'
            )}
          >
            {step.status === 'complete' ? (
              <>
                {stepIdx !== steps.length - 1 ? (
                  <div
                    className={classNames(
                      'absolute left-2 top-5 h-4 -ml-px mt-0.5 w-0.5 bg-gray-200 max-lg:-right-4 max-lg:top-2 max-lg:left-auto max-lg:h-0.5 max-lg:w-2',
                      currentStep === 2 && completedSteps
                        ? 'bg-green-400'
                        : 'bg-gray-200'
                    )}
                    aria-hidden="true"
                  />
                ) : null}
                <span className="group relative flex items-center hover:cursor-pointer">
                  <span className="flex h-5 items-center">
                    <span
                      className={classNames(
                        'relative z-10 flex h-4 w-4 items-center justify-center rounded-full bg-gray-200',
                        currentStep === 2 && completedSteps
                          ? 'bg-green-400'
                          : 'bg-gray-200'
                      )}
                    >
                      <CheckIcon
                        className={classNames(
                          'h-2.5 w-2.5 font-bold',
                          currentStep === 2 && completedSteps
                            ? 'text-white'
                            : 'text-gray-700'
                        )}
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
                    className="absolute left-2 top-5 h-4 -ml-px mt-0.5 w-0.5 bg-gray-200
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
                    className="absolute left-2 top-5 h-4 -ml-px mt-0.5 w-0.5 bg-gray-200
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
export default AddFullReportSteps;
