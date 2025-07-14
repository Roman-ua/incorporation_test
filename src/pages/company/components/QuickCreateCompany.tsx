import React, { useState } from 'react';
import { classNames } from '../../../utils/helpers';

import XBtn from '../../../components/shared/buttons/XBtn';

import ModalWrapperLayout from '../../../components/shared/Modals/ModalWrapperLayout';

import WarningMessage from '../../../components/shared/WarningMessage/WarningMessage';

interface AddPersonModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function QuickCreateCompany({ isOpen, onClose }: AddPersonModalProps) {
  const [mandatoryError, setMandatoryError] = useState<boolean>(false);

  const [companyName, setCompanyName] = useState<string>('');
  const [companyNameError, setCompanyNameError] = React.useState<string>('');

  //   const [error, setError] = React.useState<string>('');
  //   const [isNotValidEmail, setIsNotValidEmail] = React.useState<boolean>(false);
  //   const [phoneError, setPhoneError] = React.useState<string>('');

  const cleanFormHandler = () => {
    // setError('');
    // setPhoneError('');
    setMandatoryError(false);
    // setIsNotValidEmail(false);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!companyName || companyNameError) {
      setMandatoryError(true);
      return;
    }

    cleanFormHandler();
    onClose();
  };

  const disabledButtonFlag = () => {
    return !companyName || companyNameError;
  };

  //   const inputCommonClasses =
  //     'p-2 text-md border-b border-b-gray-200 placeholder:text-gray-500 hover:cursor-pointer focus:ring-0 focus:outline-none focus:border-gray-200';

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

        <form>
          <div className="flex gap-6 mb-6">
            <div className="flex-1 space-y-8">
              <div className="relative w-full">
                <input
                  onChange={(e) => setCompanyName(e.target.value)}
                  className={classNames(
                    'block rounded-md border w-full border-gray-200 p-2 text-md ring-0 text-gray-900 disabled:text-opacity-50 placeholder:text-gray-500  hover:cursor-pointer focus:placeholder:text-transparent',
                    companyNameError &&
                      'ring-1 ring-red-400 focus:ring-red-400 border-red-400 focus:border-red-400',
                    mandatoryError && !companyName
                      ? 'bg-red-50 focus:ring-red-400 focus:border-red-400'
                      : 'focus:ring-mainBlue'
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
