import React from 'react';
import { fields } from '../../../constants/form/form';
import { useRecoilValue } from 'recoil';
import GlobalDataState from '../../../state/atoms/GlobalData';
import { formatDateToLongForm } from '../../../utils/helpers';
// import ConfettiAp from '../../../components/shared/Confetti';

interface IProps {
  stepOneData: { [key: string]: string };
  stepTwoData: { [key: string]: string };
  stepThreeData: { address: { [key: string]: string } };
  setCurrentStep: (value: number) => void;
}

interface AddressData {
  line1: string;
  line2?: string;
  line3?: string;
  line4?: string;
  city: string;
  state: string;
  zip: string;
  country: string;
}

type FieldData = string | AddressData;

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
  const globalData = useRecoilValue(GlobalDataState);

  const fieldsData = {
    0: stepOneData,
    1: stepTwoData,
    2: stepThreeData,
  };

  const fieldsContentHandler = (
    field: string,
    data: FieldData
  ): React.ReactNode => {
    const addressData = data as AddressData;

    switch (field) {
      case 'registration_date':
        return formatDateToLongForm(data as string);
      case 'status_name':
        return (
          <span
            className={classNames(
              'ml-6 w-fit inline-flex items-center rounded-md  px-2 py-1 text-xs font-medium  ring-1 ring-inset',
              statusBadge(data as string)
            )}
          >
            {data as string}
          </span>
        );
      case 'address':
        return (
          <>
            <div>
              <span>{addressData.line1}, </span>
              {addressData.line2 && <span>{addressData.line2}</span>}
            </div>
            <div>
              {addressData.line3 && <span>{addressData.line3}</span>}
              {addressData.line4 && (
                <span>
                  {addressData.line3 ? ',' : ''} {addressData.line4}
                </span>
              )}
            </div>
            <div>
              <span>{addressData.city}, </span>
              <span>
                {globalData.states.find(
                  (item) => item.name === addressData.state
                )?.abbreviation || ''}{' '}
              </span>
              <span>{addressData.zip}</span>
            </div>
            <div>
              {globalData.countryies.find(
                (item) => item.id === addressData.country
              )?.full_name || '-'}
            </div>
          </>
        );
      default:
        return data as string;
    }
  };
  return (
    <div>
      <div className="px-4 sm:px-0">
        <h3 className="text-lg font-semibold leading-7 text-gray-900">
          Please review all company details
        </h3>
        <p className="mt-1 max-w-2xl text-md leading-6 text-gray-500">
          You can jump between steps to make any necessary changes.
        </p>
      </div>
      <div className="mt-6 border-t">
        <dl className="divide-y divide-gray-100">
          {fields.map((field, index) => {
            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
            // @ts-expect-error
            const fieldValue = fieldsData[field.step][field.key];
            const stateHandler =
              field.key === 'address' ? fieldValue.line1 : fieldValue;
            if (field.key === 'status_name') return;

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
                      {fieldsContentHandler(field.key, fieldValue)}
                      {index === 0 && stepTwoData?.status_name && (
                        <span
                          className={classNames(
                            'ml-6 w-fit inline-flex items-center rounded-md  px-2 py-1 text-xs font-medium  ring-1 ring-inset',
                            statusBadge(stepTwoData?.status_name)
                          )}
                        >
                          {stepTwoData?.status_name}
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
                      {stateHandler ? 'Edit' : 'Add'}
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
