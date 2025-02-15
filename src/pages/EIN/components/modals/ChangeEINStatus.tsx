import { Dialog, DialogBackdrop, DialogPanel } from '@headlessui/react';
import React, { useState } from 'react';
import ModalLayout from '../../../../components/shared/Modals/ModalLayout';
import { SetterOrUpdater } from 'recoil';
import { IEin } from '../../../../state/atoms/EIN';
import { classNames } from '../../../../utils/helpers';

interface IProps {
  open: boolean;
  setOpen: (value: boolean) => void;
  submitHandler: SetterOrUpdater<IEin>;
  prevStatus: string;
}

const list = ['Confirmation Needed', 'Confirmed', 'Cancelled'];

const btnStyleHandler = (status: string) => {
  switch (status) {
    case 'Confirmation Needed':
      return 'bg-yellow-50 text-yellow-700 ring-yellow-600/20';
    case 'Confirmed':
      return 'bg-green-50 text-green-700 ring-green-600/20';
    case 'Archived':
      return 'bg-grey-50 text-grey-700 ring-grey-600/20';
    case 'Cancelled':
      return 'bg-red-50 text-red-700 ring-red-600/20';
    default:
      return 'bg-grey-50 text-grey-700 ring-grey-600/20';
  }
};

const ChangeEINStatus = ({
  open,
  setOpen,
  submitHandler,
  prevStatus,
}: IProps) => {
  const [currentStatus, setCurrentStatus] = useState(prevStatus);
  const submit = () => {
    submitHandler((prevState) => ({
      ...prevState,
      status: currentStatus,
    }));
    setOpen(false);
  };

  return (
    <Dialog open={open} onClose={setOpen} className="fixed z-30">
      <DialogBackdrop className="fixed inset-0 z-10 bg-gray-500/75 transition-opacity data-[closed]:opacity-0 data-[enter]:duration-300 data-[leave]:duration-200 data-[enter]:ease-out data-[leave]:ease-in">
        <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
          <div className="flex min-h-full items-end justify-center text-center sm:items-center sm:p-0">
            <DialogPanel className="relative transform rounded-lg bg-white text-left shadow-xl transition-all data-[closed]:translate-y-4 data-[closed]:opacity-0 data-[enter]:duration-300 data-[leave]:duration-200 data-[enter]:ease-out data-[leave]:ease-in sm:my-8 sm:w-full sm:max-w-lg data-[closed]:sm:translate-y-0 data-[closed]:sm:scale-95">
              <ModalLayout
                title="Updte EIN Status"
                actionBtnTitle="Update"
                setOpen={setOpen}
                cancelHandler={() => setOpen(false)}
                submitHandler={submit}
              >
                {/*<SimpleSelect*/}
                {/*  list={list}*/}
                {/*  currentItem={currentStatus}*/}
                {/*  valueHandler={setCurrentStatus}*/}
                {/*  mandatoryError={false}*/}
                {/*/>*/}
                <div className="flex items-center justify-start flex-wrap">
                  {list.map((label) => (
                    <div
                      onClick={() => setCurrentStatus(label)}
                      className={classNames(
                        'text-sm font-bold text-gray-700 py-1.5 px-3 border rounded mr-1 mb-1 transition-all duration-150 ease-in-out hover:cursor-pointer',
                        currentStatus === label
                          ? btnStyleHandler(currentStatus)
                          : 'border-gray-300 hover:border-sideBarBlue hover:text-sideBarBlue'
                      )}
                      key={label}
                    >
                      {label}
                    </div>
                  ))}
                </div>
              </ModalLayout>
            </DialogPanel>
          </div>
        </div>
      </DialogBackdrop>
    </Dialog>
  );
};

export default ChangeEINStatus;
