import React from 'react';
import { Dialog, DialogBackdrop, DialogPanel } from '@headlessui/react';
import DropFileArea from './DropFileArea';
import useFileUpload from '../../../../utils/hooks/useFileUpload';
import { IconX } from '@tabler/icons-react';
import DatePicker from './datePicker';

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

interface statusItem {
  title: string;
  hoverStyles: string;
  selectedStyles: string;
}
const statuses = [
  {
    title: 'Confirmation Needed',
    hoverStyles: 'hover:text-yellow-700 hover:border-yellow-600',
    selectedStyles: 'bg-yellow-50 text-yellow-700 border-yellow-600',
  },
  {
    title: 'Confirmed',
    hoverStyles: 'hover:text-green-700 hover:border-green-600',
    selectedStyles: 'bg-green-50 text-green-700 border-green-600',
  },
  {
    title: 'Archived',
    hoverStyles: 'hover:text-gray-900 hover:border-gray-900',
    selectedStyles: 'bg-gray-100 text-gray-900 border-gray-900',
  },
];

function classNames(...classes: (string | boolean)[]) {
  return classes.filter(Boolean).join(' ');
}

const AddCompanyFileModal = ({ open, setOpen }: IProps) => {
  const [selectedDocType, setSelectedDocType] = React.useState('');
  const [selectedDocStatus, setSelectedDocStatus] = React.useState<statusItem>({
    title: '',
    hoverStyles: '',
    selectedStyles: '',
  });

  const setSelectedDocTypeHandler = (label: string) => {
    if (selectedDocType === label) {
      setSelectedDocType('');
    } else {
      setSelectedDocType(label);
    }
  };

  const setSelectedDocStatusHandler = (status: statusItem) => {
    if (selectedDocStatus.title === status.title) {
      setSelectedDocStatus({ title: '', hoverStyles: '', selectedStyles: '' });
    } else {
      setSelectedDocStatus(status);
    }
  };

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
        <div className="flex min-h-full items-end justify-center text-center sm:items-center sm:p-0">
          <DialogPanel
            // transition
            className="relative transform rounded-lg bg-white text-left shadow-xl transition-all data-[closed]:translate-y-4 data-[closed]:opacity-0 data-[enter]:duration-300 data-[leave]:duration-200 data-[enter]:ease-out data-[leave]:ease-in sm:my-8 sm:w-full sm:max-w-lg data-[closed]:sm:translate-y-0 data-[closed]:sm:scale-95"
          >
            <div className="p-6">
              <div className="flex items-center justify-between mb-7">
                <span className="text-gray-900 text-lg font-bold">
                  Upload EIN (Tax ID) Confirmation Document
                </span>
                <IconX
                  onClick={() => setOpen(false)}
                  className="w-5 h-5 text-gray-500 ml-auto hover:cursor-pointer hover:text-gray-700 transition-all ease-in-out duration-150"
                />
              </div>
              <DropFileArea
                loaderStatus={loaderStatus}
                inputRef={inputRef}
                handleFileDrop={handleFileDrop}
                handleFileInput={handleFileInput}
              />
              <div className="flex items-center justify-between mt-2">
                <span className="text-xs text-gray-500">
                  Supported formats: PDF, JPEG
                </span>
                <span className="text-xs text-gray-500">
                  Maximum size: 25mb
                </span>
              </div>
              <div className="mt-6">
                <div className="text-gray-700 text-sm mb-2 font-bold">
                  Document date:
                </div>
                <DatePicker />
              </div>
              <div className="mt-6">
                <div className="text-gray-700 text-sm mb-2 font-bold">
                  Document type:
                </div>
                <div className="flex items-center justify-start flex-wrap">
                  {labels.map((label) => (
                    <div
                      onClick={() => setSelectedDocTypeHandler(label)}
                      className={classNames(
                        'text-sm text-gray-700 py-1.5 px-3 border rounded mr-1 mb-1 transition-all duration-150 ease-in-out hover:cursor-pointer',
                        selectedDocType === label
                          ? 'bg-sideBarBlue text-white border-sideBarBlue'
                          : 'border-gray-300 hover:border-sideBarBlue hover:text-sideBarBlue'
                      )}
                      key={label}
                    >
                      {label}
                    </div>
                  ))}
                </div>
              </div>
              <div className="mt-6">
                <div className="text-gray-700 text-sm mb-2 font-bold">
                  EIN (Tax ID) status:
                </div>
                <div className="flex items-center justify-start flex-wrap">
                  {statuses.map((item) => (
                    <div
                      onClick={() => setSelectedDocStatusHandler(item)}
                      className={classNames(
                        'text-sm py-1.5 px-3 border rounded mr-1 transition-all duration-150 ease-in-out hover:cursor-pointer',
                        selectedDocStatus.title === item.title
                          ? item.selectedStyles
                          : item.hoverStyles
                      )}
                      key={item.title}
                    >
                      {item.title}
                    </div>
                  ))}
                </div>
              </div>
            </div>
            {/*//*/}
            <div className="w-full bg-gray-100 py-3 px-5 rounded-b-lg">
              <div className="mr-auto flex items-center justify-end">
                <div className="text-[12px] bg-white mr-2 border text-gray-900 py-2 px-3.5 rounded-lg hover:bg-red-100 transition-all duration-150 ease-in-out hover:cursor-pointer hover:border-red-100">
                  Cancel
                </div>
                <div className="text-[12px] py-2 px-3.5 rounded-lg bg-gray-300 text-gray-500 hover:bg-sideBarBlue hover:text-white transition-all duration-150 ease-in-out hover:cursor-pointer">
                  Upload
                </div>
              </div>
            </div>
          </DialogPanel>
        </div>
      </div>
    </Dialog>
  );
};

export default AddCompanyFileModal;
