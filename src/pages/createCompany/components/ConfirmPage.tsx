import React from 'react';
import { fieldsFullName } from '../../../constants/form/form';

interface IProps {
  stepOneData: { [key: string]: string };
  stepTwoData: { [key: string]: string };
}

function classNames(...classes: (string | boolean)[]) {
  return classes.filter(Boolean).join(' ');
}

const ConfirmPage = ({ stepOneData, stepTwoData }: IProps) => {
  return (
    <div>
      <div className="px-4 sm:px-0">
        <h3 className="text-base font-semibold leading-7 text-gray-900">
          Company Information
        </h3>
        <p className="mt-1 max-w-2xl text-sm leading-6 text-gray-500">
          Registration details.
        </p>
      </div>
      <div className="mt-6 border-t border-gray-100">
        <dl className="divide-y divide-gray-100">
          {Object.keys(stepOneData).map((key: string, index) => {
            return (
              <div
                key={index}
                className={classNames(
                  'px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-3',
                  index % 2 === 0 ? 'bg-white' : 'bg-gray-50'
                )}
              >
                <dt className="text-sm font-medium leading-6 text-gray-900">
                  {fieldsFullName[key]}
                </dt>
                <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
                  {stepOneData[key] || ''}
                </dd>
              </div>
            );
          })}
          {Object.keys(stepTwoData).map((key: string, index) => {
            return (
              <div
                key={index}
                className={classNames(
                  'px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-3',
                  index % 2 !== 0 ? 'bg-white' : 'bg-gray-50'
                )}
              >
                <dt className="text-sm font-medium leading-6 text-gray-900">
                  {fieldsFullName[key]}
                </dt>
                <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
                  {stepTwoData[key] || ''}
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
