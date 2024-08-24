import React, { useEffect } from 'react';
import { fields } from '../../../constants/form/form';
import ConfettiAp from '../../../components/shared/Confetti';

interface IProps {
  stepOneData: { [key: string]: string };
  stepTwoData: { [key: string]: string };
  setCurrentStep: (value: number) => void;
}
//
// function classNames(...classes: (string | boolean)[]) {
//   return classes.filter(Boolean).join(' ');
// }

const ConfirmPage = ({ stepOneData, stepTwoData, setCurrentStep }: IProps) => {
  const [confetti, setConfetti] = React.useState(false);

  useEffect(() => {
    const timeout = setTimeout(() => {
      setConfetti(true);
    }, 100);

    return () => clearTimeout(timeout);
  }, []);

  return (
    <div>
      {confetti && <ConfettiAp />}
      <div className="px-4 sm:px-0">
        <h3 className="text-base font-semibold leading-7 text-gray-900">
          Please review all company details
        </h3>
        <p className="mt-1 max-w-2xl text-sm leading-6 text-gray-500">
          You can jump between steps to make any necessary changes.
        </p>
      </div>
      <div className="mt-6 border-t border-gray-100">
        <dl className="divide-y divide-gray-100">
          {fields.map((field, index) => {
            console.log(stepTwoData, 'stepTwoData[field.key]');
            return (
              <div
                key={index}
                className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0"
              >
                <dt className="text-sm font-medium leading-6 text-gray-900">
                  {field.name}
                </dt>
                <dd className="mt-1 flex text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
                  <span className="flex-grow">
                    {field.step === 0
                      ? stepOneData[field.key]
                      : stepTwoData[field.key]}
                  </span>
                  <span className="ml-4 flex-shrink-0">
                    <button
                      type="button"
                      onClick={() => setCurrentStep(field.step)}
                      className="rounded-md bg-white font-medium text-mainBlue hover:text-indigo-500"
                    >
                      Edit
                    </button>
                  </span>
                </dd>
              </div>
            );
          })}
        </dl>
      </div>
    </div>
  );
};

export default ConfirmPage;
