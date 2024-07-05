import React, { useEffect, useState } from 'react';
import { CheckIcon } from '@heroicons/react/20/solid';

const stepsData = [
  {
    name: 'General Info',
    href: '#',
    status: 'current',
    id: 0,
  },
  {
    name: 'Registration Info',
    href: '#',
    status: 'upcoming',
    id: 1,
  },
  {
    name: 'Address',
    href: '#',
    status: 'upcoming',
    id: 2,
  },
];

function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(' ');
}

const StepsProgress = ({ currentStep }: { currentStep: number }) => {
  const [steps, setSteps] = useState(stepsData);

  const stepHandler = () => {
    const data = [...steps];

    const currentItem = data.findIndex((item) => item.id === currentStep);
    const prevItem = data.findIndex((item) => item.id === currentStep - 1);
    const nextItem = data.findIndex((item) => item.id === currentStep + 1);

    if (currentItem !== -1) {
      data[currentItem].status = 'current';
    }
    if (prevItem !== -1) {
      data[prevItem].status = 'complete';
    }
    if (nextItem !== -1) {
      data[nextItem].status = 'upcoming';
    }

    setSteps(data);
  };

  useEffect(() => {
    stepHandler();
  }, [currentStep]);

  return (
    <nav aria-label="Progress">
      <ol
        role="list"
        className="overflow-hidden flex flex-col max-lg:flex-row max-lg:py-3 max-lg:border-b max-lg:px-2"
      >
        {steps.map((step, stepIdx) => (
          <li
            key={step.name}
            className={classNames(
              stepIdx !== steps.length - 1 ? 'pb-5' : '',
              'relative max-lg:mr-6 max-lg:pb-0'
            )}
          >
            {step.status === 'complete' ? (
              <>
                {stepIdx !== steps.length - 1 ? (
                  <div
                    className="absolute left-2 top-5 h-4 -ml-px mt-0.5 w-0.5 bg-mainBlue
                      max-lg:-right-4 max-lg:top-2 max-lg:left-auto max-lg:h-0.5 max-lg:w-2"
                    aria-hidden="true"
                  />
                ) : null}
                <a
                  href={step.href}
                  className="group relative flex items-center"
                >
                  <span className="flex h-5 items-center">
                    <span className="relative z-10 flex h-4 w-4 items-center justify-center rounded-full bg-mainBlue group-hover:bg-mainBlue">
                      <CheckIcon
                        className="h-2 w-2 text-white"
                        aria-hidden="true"
                      />
                    </span>
                  </span>
                  <span className="ml-2 flex min-w-0 flex-col">
                    <span className="text-xs font-medium">{step.name}</span>
                  </span>
                </a>
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
                <a
                  href={step.href}
                  className="group relative flex items-center"
                  aria-current="step"
                >
                  <span className="flex h-5 items-center" aria-hidden="true">
                    <span className="relative z-10 flex h-4 w-4 items-center justify-center rounded-full border-2 border-mainBlue bg-white">
                      <span className="h-1 w-1 rounded-full bg-mainBlue" />
                    </span>
                  </span>
                  <span className="ml-2 flex min-w-0 flex-col">
                    <span className="text-xs font-medium text-mainBlue">
                      {step.name}
                    </span>
                  </span>
                </a>
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
                <a
                  href={step.href}
                  className="group relative flex items-center"
                >
                  <span className="flex h-5 items-center" aria-hidden="true">
                    <span className="relative z-10 flex h-4 w-4 items-center justify-center rounded-full border-2 border-gray-300 bg-white group-hover:border-gray-400">
                      <span className="h-1 w-1 rounded-full bg-transparent group-hover:bg-gray-300" />
                    </span>
                  </span>
                  <span className="ml-2 flex min-w-0 flex-col">
                    <span className="text-xs font-medium text-gray-500">
                      {step.name}
                    </span>
                  </span>
                </a>
              </>
            )}
          </li>
        ))}
      </ol>
    </nav>
  );
};
export default StepsProgress;
