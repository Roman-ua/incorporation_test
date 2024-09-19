import React from 'react';
import { fields, USStates } from '../../../constants/form/form';
// import ConfettiAp from '../../../components/shared/Confetti';

interface IProps {
  stepOneData: { [key: string]: string };
  stepTwoData: { [key: string]: string };
  stepThreeData: { address: { [key: string]: string } };
  setCurrentStep: (value: number) => void;
}

const statusBadge = (status: string) => {
  switch (status) {
    case 'Active':
      return 'bg-green-50 text-green-700 ring-green-600/20';
    case 'Inactive':
      return 'bg-red-50 text-red-700 ring-red-600/20';
    case 'Dissolved':
      return 'bg-gray-50 text-gray-700 ring-gray-600/20';
    case 'Withdrawn':
      return 'bg-gray-50 text-gray-700 ring-gray-600/20';
    default:
      return 'bg-red-50 text-red-700 ring-red-600/20';
  }
};

function classNames(...classes: (string | boolean)[]) {
  return classes.filter(Boolean).join(' ');
}

const ConfirmPage = ({
  stepOneData,
  stepTwoData,
  stepThreeData,
  setCurrentStep,
}: IProps) => {
  const fieldsData = {
    0: stepOneData,
    1: stepTwoData,
    2: stepThreeData,
  };
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
            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
            // @ts-expect-error
            const fieldValue = fieldsData[field.step][field.key];
            const stateHandler =
              field.key === 'address' ? fieldValue.address0 : fieldValue;
            if (field.key === 'status') return;

            return (
              <div
                key={index}
                className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0"
              >
                <dt className="leading-6 text-md text-gray-600 font-semibold">
                  {field.name}
                </dt>
                <dd className="mt-1 flex leading-6 text-md text-black font-semibold sm:col-span-2 sm:mt-0">
                  {stateHandler ? (
                    <span className="flex-grow items-center">
                      {field.key === 'address' && stateHandler && (
                        <>
                          <div>
                            <span>{fieldValue.address0}, </span>
                            {fieldValue.address1 && (
                              <span>{fieldValue.address1}</span>
                            )}
                          </div>
                          <div>
                            {fieldValue.address2 && (
                              <span>{fieldValue.address2}</span>
                            )}
                            {fieldValue.address3 && (
                              <span>
                                {fieldValue.address2 ? ',' : ''}{' '}
                                {fieldValue.address3}
                              </span>
                            )}
                          </div>
                          <div>
                            <span>{fieldValue.city}, </span>
                            <span>
                              {USStates.find(
                                (item) => item.title === fieldValue.state
                              )?.value || ''}{' '}
                            </span>
                            <span>{fieldValue.zip}</span>
                          </div>
                          <div>{fieldValue.country}</div>
                        </>
                      )}
                      {field.key !== 'address' && fieldValue}
                      {index === 0 && stepTwoData?.status && (
                        <span
                          className={classNames(
                            'ml-6 w-fit inline-flex items-center rounded-md  px-2 py-1 text-xs font-medium  ring-1 ring-inset',
                            statusBadge(stepTwoData?.status)
                          )}
                        >
                          {stepTwoData?.status}
                        </span>
                      )}
                    </span>
                  ) : (
                    <span className="flex-grow items-start">
                      <button
                        type="button"
                        onClick={() => setCurrentStep(field.step)}
                        className={classNames(
                          'w-fit inline-flex items-center rounded-md  px-2 py-1 text-xs font-medium  ring-1 ring-inset',
                          field.key === 'address'
                            ? 'bg-gray-50 text-gray-700 ring-gray-600/20'
                            : 'bg-red-50 text-red-700 ring-red-600/20'
                        )}
                      >
                        {field.name} is missing
                      </button>
                    </span>
                  )}
                  <span className="ml-4 flex-shrink-0">
                    <button
                      type="button"
                      onClick={() => setCurrentStep(field.step)}
                      className={classNames(
                        'rounded-md bg-white font-medium hover:cursor-pointer',
                        stateHandler ? 'text-mainBlue' : 'text-red-700'
                      )}
                    >
                      {stateHandler ? 'Edit' : 'Provide'}
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
