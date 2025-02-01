import React from 'react';
import { Dialog, DialogBackdrop, DialogPanel } from '@headlessui/react';
import DropFileArea from './DropFileArea';
import useFileUpload from '../../../../utils/hooks/useFileUpload';
import { IconX } from '@tabler/icons-react';
import DatePicker from './datePicker';
import FileDownloadProgress from '../../../../pages/createCompany/components/UploadedFile';
// import { useNavigate } from 'react-router-dom';
// import { ROUTES } from '../../../../constants/navigation/routes';
// import { SelectCompany } from '../../SelectCompany/SelectCompany';

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
//
// interface Option {
//   value: string;
//   label: string;
// }

// const options: Option[] = [
//   { value: '1', label: 'ABC Company Inc' },
//   { value: '2', label: 'DM Company Inc' },
//   { value: '3', label: 'Some Company Inc' },
// ];

// interface statusItem {
//   title: string;
//   hoverStyles: string;
//   selectedStyles: string;
// }
// const statuses = [
//   {
//     title: 'Confirmation Needed',
//     hoverStyles: 'hover:text-yellow-700 hover:border-yellow-600',
//     selectedStyles: 'bg-yellow-100 text-yellow-700 border-yellow-600',
//   },
//   {
//     title: 'Confirmed',
//     hoverStyles: 'hover:text-green-700 hover:border-green-600',
//     selectedStyles: 'bg-green-100 text-green-700 border-green-600',
//   },
//   {
//     title: 'Archived',
//     hoverStyles: 'hover:text-gray-900 hover:border-gray-900',
//     selectedStyles: 'bg-gray-200 text-gray-900 border-gray-900',
//   },
// ];

function classNames(...classes: (string | boolean)[]) {
  return classes.filter(Boolean).join(' ');
}

const AddEinModal = ({
  open,
  setOpen,
  companyName,
  setTaxIdToCompany,
}: IProps) => {
  // const navigate = useNavigate();

  const [einNumber, setEinNumber] = React.useState<string>('');
  // const [selectedCompany, setSelectedCompany] = React.useState<Option | null>(
  //   null
  // );
  const [companyNameOnDock, setCompanyNameOnDock] = React.useState<string>(
    companyName as string
  );

  const [isNumberOnly, setIsNumberOnly] = React.useState(true);
  const [selectedDocType, setSelectedDocType] = React.useState('');
  // const [selectedDocStatus, setSelectedDocStatus] = React.useState<statusItem>({
  //   title: '',
  //   hoverStyles: '',
  //   selectedStyles: '',
  // });

  const setSelectedDocTypeHandler = (label: string) => {
    if (selectedDocType === label) {
      setSelectedDocType('');
    } else {
      setSelectedDocType(label);
    }
  };

  // const setSelectedDocStatusHandler = (status: statusItem) => {
  //   if (selectedDocStatus.title === status.title) {
  //     setSelectedDocStatus({ title: '', hoverStyles: '', selectedStyles: '' });
  //   } else {
  //     setSelectedDocStatus(status);
  //   }
  // };

  const {
    inputRef,
    selectedFile,
    handleFileInput,
    handleFileDrop,
    deleteFileHandler,
  } = useFileUpload();
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
                    onClick={() => setOpen(false)}
                    className="flex items-center justify-between absolute top-6 right-7 p-1.5 border rounded-md hover:cursor-pointer"
                  >
                    <IconX className="w-4 h-4 text-gray-700" />
                  </div>
                </div>
                <div className="text-gray-700 text-sm mb-2 font-bold">
                  EIN (Tax ID) Number
                </div>
                <input
                  onChange={(e) => setEinNumber(e.target.value)}
                  className={classNames(
                    'block rounded-md border w-full  border-gray-200 p-2 text-md mb-2 text-gray-900 disabled:text-opacity-50 placeholder:text-gray-500  hover:cursor-pointer'
                  )}
                  type="text"
                  placeholder="EIN number"
                  value={einNumber}
                />
                {/*{!isNumberOnly && (*/}
                {/*  <div className="mt-6">*/}
                {/*    <div className="text-gray-700 text-sm mb-2 font-bold">*/}
                {/*      List of companies:*/}
                {/*    </div>*/}
                {/*    <SelectCompany*/}
                {/*      options={options}*/}
                {/*      value={selectedCompany}*/}
                {/*      onChange={setSelectedCompany}*/}
                {/*      placeholder="Choose company"*/}
                {/*      onButtonClick={() => navigate(ROUTES.CREATE_COMPANY)}*/}
                {/*      buttonText="+ Add Company"*/}
                {/*    />*/}
                {/*  </div>*/}
                {/*)}*/}
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
                        'block rounded-md border w-full  border-gray-200 p-2 text-md mb-2 text-gray-900 disabled:text-opacity-50 placeholder:text-gray-500  hover:cursor-pointer'
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
                              : 'border-gray-300 hover:border-sideBarBlue hover:text-sideBarBlue'
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
                      setOpen(false);
                    }}
                    className="block rounded-md bg-white px-3 py-2 border text-center text-sm font-semibold shadow-sm text-gray-900 hover:text-white hover:bg-gray-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 transition-all duration-150 ease-in-out hover:cursor-pointer"
                  >
                    Cancel
                  </div>
                  <div
                    onClick={() => {
                      if (isNumberOnly) {
                        setTaxIdToCompany(einNumber);
                        setOpen(false);
                      }
                    }}
                    className="ml-2 block rounded-md bg-mainBlue px-3 py-2 text-center text-sm font-semibold text-white shadow-sm hover:bg-sideBarBlue focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 transition-all duration-150 ease-in-out hover:cursor-pointer"
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
