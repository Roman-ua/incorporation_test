import React, { ChangeEvent, useEffect } from 'react';
import { Dialog, DialogBackdrop, DialogPanel } from '@headlessui/react';
import DropFileArea from './DropFileArea';
import useFileUpload from '../../../../utils/hooks/useFileUpload';
import { IconX } from '@tabler/icons-react';
import DatePicker from './datePicker';
import FileDownloadProgress from '../../../../pages/createCompany/components/UploadedFile';
import { IFiles } from '../../../../interfaces/interfaces';

interface IProps {
  open: boolean;
  setOpen: (value: boolean) => void;
  companyName?: string;
  setTaxIdToCompany: (id: string) => void;
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

const AddEinModal = ({
  open,
  setOpen,
  companyName,
  setTaxIdToCompany,
}: IProps) => {
  const [einNumber, setEinNumber] = React.useState<string>('');
  const [file, setFile] = React.useState<IFiles | null>(null);
  const [companyNameOnDock, setCompanyNameOnDock] = React.useState<string>(
    companyName as string
  );
  const [isNumberOnly, setIsNumberOnly] = React.useState(true);
  const [selectedDocType, setSelectedDocType] = React.useState('');
  const [mandatoryError, setMandatoryError] = React.useState(false);

  const setSelectedDocTypeHandler = (label: string) => {
    if (selectedDocType === label) {
      setSelectedDocType('');
    } else {
      setSelectedDocType(label);
    }
  };

  const cleanUpHandler = () => {
    setEinNumber('');
    setCompanyNameOnDock(companyName || '');
    setIsNumberOnly(true);
    setSelectedDocType('');
    setFile(null);
  };

  const validationHandler = (flag: boolean) => {
    if (flag) {
      return !!einNumber;
    } else {
      return (
        !!einNumber && !!selectedDocType && !!companyNameOnDock && !!file?.size
      );
    }
  };

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    let value = e.target.value.replace(/\D/g, '');

    if (value.length > 9) {
      value = value.slice(0, 9);
    }

    if (value.length > 2) {
      value = `${value.slice(0, 2)}-${value.slice(2)}`;
    }

    setEinNumber(value);
  };

  const {
    inputRef,
    selectedFile,
    handleFileInput,
    handleFileDrop,
    deleteFileHandler,
  } = useFileUpload();

  useEffect(() => {
    setFile(selectedFile);
  }, [selectedFile]);

  return (
    <Dialog open={open} onClose={setOpen} className="fixed z-10">
      <DialogBackdrop className="fixed inset-0 bg-gray-500/75 transition-opacity data-[closed]:opacity-0 data-[enter]:duration-300 data-[leave]:duration-200 data-[enter]:ease-out data-[leave]:ease-in" />

      <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
        <div className="flex min-h-full items-end justify-center text-center sm:items-center sm:p-0">
          <DialogPanel className="relative transform rounded-lg bg-white text-left shadow-xl transition-all data-[closed]:translate-y-4 data-[closed]:opacity-0 data-[enter]:duration-300 data-[leave]:duration-200 data-[enter]:ease-out data-[leave]:ease-in sm:my-8 sm:w-full sm:max-w-lg data-[closed]:sm:translate-y-0 data-[closed]:sm:scale-95">
            <>
              <div
                className={classNames(isNumberOnly ? 'p-6' : 'pt-6 pl-6 pr-6')}
              >
                <div className="flex items-center justify-between mb-7">
                  <span className="text-gray-900 text-lg font-bold">
                    Add EIN (Tax ID)
                  </span>
                  <div
                    onClick={() => {
                      cleanUpHandler();
                      setOpen(false);
                    }}
                    className="flex items-center justify-between absolute top-6 right-7 p-1.5 border rounded-md hover:cursor-pointer"
                  >
                    <IconX className="w-4 h-4 text-gray-700" />
                  </div>
                </div>
                <div className="text-gray-700 text-sm mb-2 font-bold">
                  EIN (Tax ID) Number
                </div>
                <input
                  onChange={(e) => handleInputChange(e)}
                  className={classNames(
                    'block rounded-md border w-full  border-gray-200 p-2 text-md mb-2 text-gray-900 disabled:text-opacity-50 placeholder:text-gray-500  hover:cursor-pointer',
                    mandatoryError && !einNumber && 'bg-red-50'
                  )}
                  type="text"
                  placeholder="EIN number"
                  value={einNumber}
                />
                {isNumberOnly && (
                  <div
                    className="text-sm font-semibold mt-4 hover:cursor-pointer hover:text-mainBlue w-full text-right"
                    onClick={() => setIsNumberOnly(false)}
                  >
                    Add verification document
                  </div>
                )}
              </div>
              {!isNumberOnly && (
                <div className="p-6">
                  <div className="flex items-center justify-between">
                    <div className="text-gray-700 text-sm mb-2 font-bold">
                      Upload EIN (Tax ID) Confirmation Document
                    </div>
                  </div>
                  {selectedFile?.name ? (
                    <div className="w-full">
                      <FileDownloadProgress
                        deleteFileHandler={deleteFileHandler}
                        fileName={selectedFile.name}
                        fileSize={`${selectedFile?.size} MB`}
                        fileFormat={selectedFile.format}
                        duration={3}
                      />
                    </div>
                  ) : (
                    <DropFileArea
                      loaderStatus={false}
                      inputRef={inputRef}
                      handleFileDrop={handleFileDrop}
                      handleFileInput={handleFileInput}
                      mandatoryError={mandatoryError}
                    />
                  )}
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
                      Document date
                    </div>
                    <DatePicker />
                  </div>
                  <div className="mt-6">
                    <div className="text-gray-700 text-sm mb-2 font-bold">
                      Company name on the document
                    </div>
                    <input
                      onChange={(e) => setCompanyNameOnDock(e.target.value)}
                      className={classNames(
                        'block rounded-md border w-full  border-gray-200 p-2 text-md mb-2 text-gray-900 disabled:text-opacity-50 placeholder:text-gray-500  hover:cursor-pointer',
                        mandatoryError && !companyNameOnDock && 'bg-red-50'
                      )}
                      type="text"
                      placeholder="Company Name"
                      value={companyNameOnDock}
                    />
                  </div>

                  <div className="mt-6">
                    <div className="text-gray-700 text-sm mb-2 font-bold">
                      Document type
                    </div>
                    <div className="flex items-center justify-start flex-wrap">
                      {labels.map((label) => (
                        <div
                          onClick={() => setSelectedDocTypeHandler(label)}
                          className={classNames(
                            'text-sm font-bold text-gray-700 py-1.5 px-3 border rounded mr-1 mb-1 transition-all duration-150 ease-in-out hover:cursor-pointer',
                            selectedDocType === label
                              ? 'bg-sideBarBlue text-white border-sideBarBlue'
                              : 'border-gray-300 hover:border-sideBarBlue hover:text-sideBarBlue',
                            mandatoryError && !selectedDocType && 'bg-red-50'
                          )}
                          key={label}
                        >
                          {label}
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              <div className="w-full bg-gray-100 py-3 px-5 rounded-b-lg">
                <div className="mr-auto flex items-center justify-end">
                  <div
                    onClick={() => {
                      cleanUpHandler();
                      setOpen(false);
                    }}
                    className="block rounded-md bg-white px-3 py-2 border text-center text-sm font-semibold shadow-sm text-gray-900 hover:text-white hover:bg-gray-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 transition-all duration-150 ease-in-out hover:cursor-pointer"
                  >
                    Cancel
                  </div>
                  <div
                    onClick={() => {
                      if (validationHandler(isNumberOnly)) {
                        setTaxIdToCompany(einNumber);
                        setOpen(false);
                      } else {
                        setMandatoryError(true);
                      }
                    }}
                    className={classNames(
                      'ml-2 block rounded-md  px-3 py-2 text-center text-sm font-semibold text-white shadow-sm  focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 transition-all duration-150 ease-in-out hover:cursor-pointer',
                      validationHandler(isNumberOnly)
                        ? 'bg-mainBlue hover:bg-sideBarBlue'
                        : 'bg-gray-500'
                    )}
                  >
                    Save
                  </div>
                </div>
              </div>
            </>
          </DialogPanel>
        </div>
      </div>
    </Dialog>
  );
};

export default AddEinModal;
