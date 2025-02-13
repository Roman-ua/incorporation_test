import { Dialog, DialogBackdrop, DialogPanel } from '@headlessui/react';
import React from 'react';
import XBtn from '../../buttons/XBtn';

interface IProps {
  open: boolean;
  setOpen: (value: boolean) => void;
  proceedHandler: () => void;
}

const DeleteEinFileModal = ({ open, setOpen, proceedHandler }: IProps) => {
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
                  Delete Confirmation Document?
                </span>
                <XBtn clickHandler={() => setOpen(false)} />
              </div>

              <div>
                Warning: Confirmation Document may be required for EIN
                verification. Do you still want to proceed?
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
                <div
                  onClick={() => {
                    proceedHandler();
                    setOpen(false);
                  }}
                  className="ml-2 block rounded-md bg-red-500 px-3 py-2 text-center text-sm font-semibold text-white shadow-sm hover:bg-red-600 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 transition-all duration-150 ease-in-out hover:cursor-pointer"
                >
                  Delete
                </div>
              </div>
            </div>
          </DialogPanel>
        </div>
      </div>
    </Dialog>
  );
};

export default DeleteEinFileModal;
