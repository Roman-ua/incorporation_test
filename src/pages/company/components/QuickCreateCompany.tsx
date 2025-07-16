import React, { useState } from 'react';
import { classNames } from '../../../utils/helpers';

import XBtn from '../../../components/shared/buttons/XBtn';

import ModalWrapperLayout from '../../../components/shared/Modals/ModalWrapperLayout';

import WarningMessage from '../../../components/shared/WarningMessage/WarningMessage';
import {
  companyTypes,
  registrationStates,
  statuses,
} from '../../createCompany/CreateCompany';
import { Checkbox } from '../../../components/shared/Checkboxes/CheckBoxSq';
import DatePicker from '../../../components/shared/Modals/addCompanyFile/datePicker';
import useCompany from '../../../utils/hooks/Company/useCompany';
import { useRecoilValue } from 'recoil';
import GlobalDataState from '../../../state/atoms/GlobalData';

interface AddPersonModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function QuickCreateCompany({ isOpen, onClose }: AddPersonModalProps) {
  const globalData = useRecoilValue(GlobalDataState);
  const [mandatoryError, setMandatoryError] = useState<boolean>(false);

  const [companyName, setCompanyName] = useState<string>('');
  const [companyNameError, setCompanyNameError] = React.useState<string>('');
  const [registrationNumber, setRegistrationNumber] = useState<string>('');
  const [registrationDate, setRegistrationDate] = useState<string>('');

  const [companyType, setCompanyType] = useState<string>('');
  const [companyState, setCompanyState] = useState<string>('');
  const [companyStatus, setCompanyStatus] = useState<string>('');

  const { createCompanyHandler } = useCompany();

  const cleanFormHandler = () => {
    setMandatoryError(false);
    setCompanyName('');
    setCompanyNameError('');
    setRegistrationNumber('');
    setRegistrationDate('');
    setCompanyType('');
    setCompanyState('');
    setCompanyStatus('');
  };
  console.log(globalData, 'globalData');
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (
      !companyName ||
      !companyType ||
      !companyState ||
      !registrationNumber ||
      !registrationDate ||
      !companyStatus
    ) {
      setMandatoryError(true);
      return;
    }

    const state = globalData?.states.find(
      (item) => item.abbreviation === companyState
    );
    const type = globalData?.types.find((item) => item.name === companyType);
    const status = globalData?.statuses.find(
      (item) => item.name === companyStatus
    );

    await createCompanyHandler({
      name: companyName,
      type_name: type?.name || '',
      state_name: state?.abbreviation || '',
      registration_number: registrationNumber,
      registration_date: registrationDate,
      status_name: status?.name || '',
    });
    cleanFormHandler();
    onClose();
  };

  const disabledButtonFlag = () => {
    return (
      !companyName ||
      !companyType ||
      !companyState ||
      !registrationNumber ||
      !registrationDate ||
      !companyStatus
    );
  };

  return (
    <ModalWrapperLayout
      closeModal={() => {
        cleanFormHandler();
        onClose();
      }}
      isOpen={isOpen}
    >
      <div className="p-6">
        <div className="mb-6">
          <h2 className="text-xl font-medium  ">
            <span>Quick Add Company</span>
            <XBtn
              clickHandler={() => {
                cleanFormHandler();
                onClose();
              }}
            />
          </h2>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="flex-1 space-y-8 mb-8">
            {/* Company Name */}
            <div className="relative w-full">
              <input
                onChange={(e) => setCompanyName(e.target.value)}
                className={classNames(
                  'block rounded-md border w-full border-gray-200 p-2 text-md ring-0 text-gray-900 disabled:text-opacity-50 placeholder:text-gray-500  hover:cursor-pointer focus:placeholder:text-transparent',
                  companyNameError &&
                    'ring-1 ring-red-400 focus:ring-red-400 border-red-400 focus:border-red-400',
                  mandatoryError && !companyName
                    ? 'bg-red-50 focus:ring-red-400 focus:border-red-400'
                    : 'focus:ring-black focus:border-black'
                )}
                type="text"
                placeholder="Company Name"
                data-1p-ignore={true}
                value={companyName}
              />
              {companyNameError && (
                <WarningMessage
                  message={companyNameError}
                  onClose={() => setCompanyNameError('')}
                  wrapperClass="absolute -bottom-7 right-0 w-[270px] text-xs"
                />
              )}
            </div>

            {/* Company Type */}
            <div className="relative w-full">
              <div className="text-gray-700 text-sm mb-2 font-bold">
                Company Type
              </div>
              <div className="flex items-center gap-2">
                {companyTypes.map((type, index) => (
                  <Checkbox
                    key={index}
                    id={`${index}`}
                    title={type.shortName}
                    underInput={false}
                    wrapperClass={'h-5 w-5 min-w-5 min-h-5'}
                    iconClass={'h-3 w-3'}
                    mandatoryError={mandatoryError && !companyType}
                    checked={companyType === type.shortName}
                    onChange={(value) => {
                      setCompanyType(value ? type.shortName : '');
                    }}
                  />
                ))}
              </div>
            </div>

            {/* Registration State */}
            <div className="relative w-full">
              <div className="text-gray-700 text-sm mb-2 font-bold">
                Registration State
              </div>
              <div className="flex items-center justify-start gap-4">
                {registrationStates.map((state) => (
                  <Checkbox
                    key={state.shortName}
                    id={`${state.shortName}`}
                    title={state.title}
                    underInput={false}
                    wrapperClass={'h-5 w-5 min-w-5 min-h-5'}
                    iconClass={'h-3 w-3'}
                    mandatoryError={mandatoryError && !companyState}
                    checked={companyState === state.shortName}
                    onChange={(value) => {
                      setCompanyState(value ? state.shortName : '');
                    }}
                  />
                ))}
              </div>
            </div>

            {/* Registration Number */}
            <div className="relative w-full">
              <input
                onChange={(e) => setRegistrationNumber(e.target.value)}
                className={classNames(
                  'block rounded-md border w-full border-gray-200 p-2 text-md ring-0 text-gray-900 disabled:text-opacity-50 placeholder:text-gray-500  hover:cursor-pointer focus:placeholder:text-transparent',
                  companyNameError &&
                    'ring-1 ring-red-400 focus:ring-red-400 border-red-400 focus:border-red-400',
                  mandatoryError && !registrationNumber
                    ? 'bg-red-50 focus:ring-red-400 focus:border-red-400'
                    : 'focus:ring-black focus:border-black'
                )}
                type="text"
                placeholder="Registration Number"
                data-1p-ignore={true}
                value={registrationNumber}
              />
              {companyNameError && (
                <WarningMessage
                  message={companyNameError}
                  onClose={() => setCompanyNameError('')}
                  wrapperClass="absolute -bottom-7 right-0 w-[270px] text-xs"
                />
              )}
            </div>

            {/* Registration Date */}
            <div className="relative w-full">
              <div className="text-gray-700 text-sm mb-2 font-bold">
                Registration Date
              </div>

              <DatePicker
                extraStyles="placeholder:text-gray-500 font-bold focus:ring-black focus:border-black text-base font-normal "
                mandatoryError={false}
                value={registrationDate}
                setValue={setRegistrationDate}
              />
            </div>

            {/* Company Status */}
            <div className="relative w-full">
              <div className="text-gray-700 text-sm mb-2 font-bold">
                Company Status
              </div>
              <div className="flex items-center gap-2 flex-wrap">
                {statuses.map((status) => (
                  <Checkbox
                    key={status}
                    id={`${status}`}
                    title={status}
                    underInput={false}
                    wrapperClass={'h-5 w-5 min-w-5 min-h-5'}
                    iconClass={'h-3 w-3'}
                    mandatoryError={mandatoryError && !companyStatus}
                    checked={companyStatus === status}
                    onChange={(value) => {
                      setCompanyStatus(value ? status : '');
                    }}
                  />
                ))}
              </div>
            </div>
          </div>

          <div className="mr-auto flex items-center justify-end pt-1">
            <div className="w-1/2" />
            <div
              onClick={() => {
                cleanFormHandler();
                onClose();
              }}
              className="mr-2 block px-3 py-2 text-center text-sm font-semibold text-gray-800 hover:text-gray-900 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 transition-all duration-150 ease-in-out hover:cursor-pointer"
            >
              Cancel
            </div>
            <div
              onClick={handleSubmit}
              className={classNames(
                !disabledButtonFlag()
                  ? 'bg-mainBlue hover:bg-sideBarBlue '
                  : 'bg-gray-500',
                'block rounded-md px-3 py-2 text-center text-sm font-semibold text-white shadow-sm  focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 transition-all duration-150 ease-in-out hover:cursor-pointer'
              )}
            >
              Submit
            </div>
          </div>
        </form>
      </div>
    </ModalWrapperLayout>
  );
}
