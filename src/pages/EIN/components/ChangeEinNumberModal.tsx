import { Dialog, DialogBackdrop, DialogPanel } from '@headlessui/react';
import React, { ChangeEvent } from 'react';
import XBtn from '../../../components/shared/buttons/XBtn';
import { classNames } from '../../../utils/helpers';

interface IProps {
  open: boolean;
  value: string;
  setOpen: (value: boolean) => void;
  proceedHandler: (newValue: string) => void;
}

const UpdateEinNumberModal = ({
  open,
  setOpen,
  value,
  proceedHandler,
}: IProps) => {
  const [einValue, setEinValue] = React.useState(value);

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    let value = e.target.value.replace(/\D/g, '');

    if (value.length > 9) {
      value = value.slice(0, 9);
    }

    if (value.length > 2) {
      value = `${value.slice(0, 2)}-${value.slice(2)}`;
    }

    setEinValue(value);
  };
  return (
    <Dialog open={open} onClose={setOpen} className="fixed z-30">
      <DialogBackdrop
        // transition
        className="fixed inset-0 z-10 bg-gray-500/75 transition-opacity data-[closed]:opacity-0 data-[enter]:duration-300 data-[leave]:duration-200 data-[enter]:ease-out data-[leave]:ease-in"
      />

      <div className="fixed inset-0 z-30 w-screen overflow-y-auto">
        <div className="flex min-h-full items-end justify-center text-center sm:items-center sm:p-0">
          <DialogPanel
            // transition
            className="relative transform rounded-lg bg-white text-left shadow-xl transition-all data-[closed]:translate-y-4 data-[closed]:opacity-0 data-[enter]:duration-300 data-[leave]:duration-200 data-[enter]:ease-out data-[leave]:ease-in sm:my-8 sm:w-full sm:max-w-lg data-[closed]:sm:translate-y-0 data-[closed]:sm:scale-95"
          >
            <div className="p-6">
              <div className="flex items-center justify-between mb-7">
                <span className="text-gray-900 text-lg font-bold">
                  Edit EIN (Tax ID)?
                </span>
                <XBtn clickHandler={() => setOpen(false)} />
              </div>

              <input
                onChange={handleInputChange}
                className={classNames(
                  'block rounded-md border w-full  border-gray-200 p-2 text-md mb-2 text-gray-900 disabled:text-opacity-50 placeholder:text-gray-500  hover:cursor-pointer'
                  // mandatoryError && !einNumber && 'bg-red-50'
                )}
                type="text"
                placeholder="EIN number"
                value={einValue}
              />
              <div className="mt-7">
                Warning: The EIN (Tax ID) is assigned by the IRS once and never
                changes. Only edit EIN if there was an error when adding it to
                the company record.
              </div>
            </div>
            <div className="w-full bg-gray-100 py-3 px-5 rounded-b-lg">
              <div className="mr-auto flex items-center justify-end">
                <div
                  onClick={() => setOpen(false)}
                  className="mr-2 block px-3 py-2 text-center text-sm font-semibold text-gray-800 hover:text-gray-900 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 transition-all duration-150 ease-in-out hover:cursor-pointer"
                >
                  Cancel
                </div>
                <button
                  disabled={!einValue || einValue === value}
                  onClick={() => {
                    proceedHandler(einValue);
                    setOpen(false);
                  }}
                  className="ml-2 block rounded-md bg-red-500 px-3 py-2 text-center text-sm font-semibold text-white shadow-sm hover:bg-red-600 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 transition-all duration-150 ease-in-out hover:cursor-pointer disabled:bg-red-400"
                >
                  Save Changes
                </button>
              </div>
            </div>
          </DialogPanel>
        </div>
      </div>
    </Dialog>
  );
};

export default UpdateEinNumberModal;
