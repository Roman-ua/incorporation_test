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
  {
    name: 'Directors',
    href: '#',
    status: 'upcoming',
    id: 3,
  },

  {
    name: 'Representatives',
    href: '#',
    status: 'upcoming',
    id: 4,
  },
  {
    name: 'Registered Agent',
    href: '#',
    status: 'upcoming',
    id: 5,
  },
  {
    name: 'Review',
    href: '#',
    status: 'upcoming',
    id: 6,
  },
  {
    name: 'Complete',
    href: '#',
    status: 'upcoming',
    id: 7,
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
    <nav aria-label="Progress" className="max-lg:overflow-scroll">
      <ol
        role="list"
        className="bg-white overflow-hidden flex flex-col max-lg:flex-row max-lg:py-3 max-lg:border-b max-lg:px-2 max-lg:fixed max-lg:z-10 max-lg:left-0 max-lg:right-0 max-lg:top-14 max-lg:border-t max-lg:overflow-scroll"
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
                    className="absolute left-3 top-7 h-4 -ml-px mt-0.5 w-0.5 bg-green-500
                      max-lg:-right-4 max-lg:top-3 max-lg:left-auto max-lg:h-0.5 max-lg:w-2"
                    aria-hidden="true"
                  />
                ) : null}
                <a
                  href={step.href}
                  className="group relative flex items-center"
                >
                  <span className="flex h-7 items-center">
                    <span className="relative z-10 flex h-6 w-6 items-center justify-center rounded-full bg-green-500 group-hover:bg-mainBlue">
                      <CheckIcon
                        className="h-4 w-4 text-white"
                        aria-hidden="true"
                      />
                    </span>
                  </span>
                  <span className="ml-2 flex min-w-0 w-fit flex-col">
                    <span className="text-base font-medium text-nowrap">
                      {step.name}
                    </span>
                  </span>
                </a>
              </>
            ) : step.status === 'current' ? (
              <>
                {stepIdx !== steps.length - 1 ? (
                  <div
                    className="absolute left-3 top-7 h-4 -ml-px mt-0.5 w-0.5 bg-gray-300
                      max-lg:-right-4 max-lg:top-3 max-lg:left-auto max-lg:h-0.5 max-lg:w-2"
                    aria-hidden="true"
                  />
                ) : null}
                <a
                  href={step.href}
                  className="group relative flex items-center"
                  aria-current="step"
                >
                  <span className="flex h-7 items-center" aria-hidden="true">
                    <span className="relative z-10 flex h-6 w-6 items-center justify-center rounded-full border-2 border-mainBlue bg-white">
                      <span className="h-3 w-3 rounded-full bg-mainBlue" />
                    </span>
                  </span>
                  <span className="ml-2 flex min-w-0 flex-col">
                    <span className="text-base font-medium text-mainBlue text-nowrap">
                      {step.name}
                    </span>
                  </span>
                </a>
              </>
            ) : (
              <>
                {stepIdx !== steps.length - 1 ? (
                  <div
                    className="absolute left-3 top-7 h-4 -ml-px mt-0.5 w-0.5 bg-gray-300
                      max-lg:-right-4 max-lg:top-3 max-lg:left-auto max-lg:h-0.5 max-lg:w-2"
                    aria-hidden="true"
                  />
                ) : null}
                <a
                  href={step.href}
                  className="group relative flex items-center"
                >
                  <span className="flex h-7 items-center" aria-hidden="true">
                    <span className="relative z-10 flex h-6 w-6 items-center justify-center rounded-full border-2 border-gray-300 bg-white group-hover:border-gray-400">
                      <span className="h-3 w-3 rounded-full bg-transparent group-hover:bg-gray-300" />
                    </span>
                  </span>
                  <span className="ml-2 flex min-w-0 flex-col">
                    <span className="text-base font-medium text-gray-500 text-nowrap">
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
