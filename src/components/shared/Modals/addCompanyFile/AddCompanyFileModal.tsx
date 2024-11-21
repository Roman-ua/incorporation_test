import React from 'react';
import { Dialog, DialogBackdrop, DialogPanel } from '@headlessui/react';
import DropFileArea from './DropFileArea';
import useFileUpload from '../../../../utils/hooks/useFileUpload';
import { IconX } from '@tabler/icons-react';

interface IProps {
  open: boolean;
  setOpen: (value: boolean) => void;
}

const labels = [
  'CP575A',
  'Screenshot',
  'CP575G',
  '147C',
  'Faxed SS-4',
  'W-9',
  'CP577',
  'CP577E',
];
function classNames(...classes: (string | boolean)[]) {
  return classes.filter(Boolean).join(' ');
}

const AddCompanyFileModal = ({ open, setOpen }: IProps) => {
  const [fileDate, setFileDate] = React.useState('');

  const {
    inputRef,
    // errorState,
    // setErrorState,
    // selectedFiles,
    loaderStatus,
    handleFileInput,
    // handleDownload,
    handleFileDrop,
    // deleteFileHandler
  } = useFileUpload();
  return (
    <Dialog open={open} onClose={setOpen} className="fixed z-10">
      <DialogBackdrop
        // transition
        className="fixed inset-0 bg-gray-500/75 transition-opacity data-[closed]:opacity-0 data-[enter]:duration-300 data-[leave]:duration-200 data-[enter]:ease-out data-[leave]:ease-in"
      />

      <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
        <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
          <DialogPanel
            // transition
            className="relative transform overflow-hidden rounded-lg bg-white px-4 pb-4 pt-5 text-left shadow-xl transition-all data-[closed]:translate-y-4 data-[closed]:opacity-0 data-[enter]:duration-300 data-[leave]:duration-200 data-[enter]:ease-out data-[leave]:ease-in sm:my-8 sm:w-full sm:max-w-xl sm:p-6 data-[closed]:sm:translate-y-0 data-[closed]:sm:scale-95"
          >
            <IconX
              onClick={() => setOpen(false)}
              className="w-5 h-5 text-gray-500 ml-auto hover:cursor-pointer hover:text-gray-700 transition-all ease-in-out duration-150 mb-3"
            />
            <DropFileArea
              loaderStatus={loaderStatus}
              inputRef={inputRef}
              handleFileDrop={handleFileDrop}
              handleFileInput={handleFileInput}
            />
            <div className="w-full mt-8">
              <input
                className="w-full placeholder:text-gray-500 text-sm text-gray-700 border rounded py-2 px-3 focus:outline-none focus:ring-2 focus:ring-mainBlue focus:border-transparent"
                type="text"
                placeholder="File date"
                value={fileDate}
                onChange={(e) => setFileDate(e.target.value)}
              />
            </div>
            <div className="flex items-center justify-start mt-6">
              {labels.map((label) => (
                <div
                  className={classNames(
                    'text-xs text-gray-700 py-1 px-2 border rounded mr-1'
                  )}
                  key={label}
                >
                  {label}
                </div>
              ))}
            </div>
          </DialogPanel>
        </div>
      </div>
    </Dialog>
  );
};

export default AddCompanyFileModal;
