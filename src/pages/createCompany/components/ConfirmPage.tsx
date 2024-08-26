import React from 'react';
import { fields } from '../../../constants/form/form';
// import ConfettiAp from '../../../components/shared/Confetti';

interface IProps {
  stepOneData: { [key: string]: string };
  stepTwoData: { [key: string]: string };
  setCurrentStep: (value: number) => void;
}

const statusBadge = (status: string) => {
  switch (status) {
    case 'Active':
      return 'bg-green-300 text-green-800';
    case 'Inactive':
      return 'bg-red-300 text-red-800';
    case 'Dissolved':
      return 'bg-gray-300 text-gray-800';
    case 'Withdrawn':
      return 'bg-gray-300 text-gray-800';
    default:
      return 'bg-red-300 text-red-800';
  }
};

function classNames(...classes: (string | boolean)[]) {
  return classes.filter(Boolean).join(' ');
}

const ConfirmPage = ({ stepOneData, stepTwoData, setCurrentStep }: IProps) => {
  // const [confetti, setConfetti] = React.useState(false);

  return (
    <div>
      {/*{confetti && <ConfettiAp />}*/}
      <div className="px-4 sm:px-0">
        <h3 className="text-lg font-semibold leading-7 text-gray-900">
          Please review all company details
        </h3>
        <p className="mt-1 max-w-2xl text-md leading-6 text-gray-500">
          You can jump between steps to make any necessary changes.
        </p>
      </div>
      <div className="mt-6 border-t border-gray-100">
        <dl className="divide-y divide-gray-100">
          {fields.map((field, index) => {
            console.log(field, 'field');
            const fieldValue =
              field.step === 0
                ? stepOneData[field.key]
                : stepTwoData[field.key];

            return (
              <div
                key={index}
                className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0"
              >
                <dt className="leading-6 text-md text-gray-600 font-semibold">
                  {field.name}
                </dt>
                <dd className="mt-1 flex leading-6 text-md text-black font-semibold sm:col-span-2 sm:mt-0">
                  {field.key !== 'status' ? (
                    <span className="flex-grow">{fieldValue}</span>
                  ) : (
                    <span className="flex-grow">
                      <span
                        className={classNames(
                          statusBadge(fieldValue),
                          'inline-flex items-center rounded-md px-1.5 py-0.5 text-base font-medium'
                        )}
                      >
                        {fieldValue}
                      </span>
                    </span>
                  )}
                  <span className="ml-4 flex-shrink-0">
                    <button
                      type="button"
                      onClick={() => setCurrentStep(field.step)}
                      className="rounded-md bg-white font-medium text-mainBlue hover:cursor-pointer"
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
