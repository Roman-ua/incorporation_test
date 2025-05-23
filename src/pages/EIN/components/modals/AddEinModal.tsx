import React, { ChangeEvent, useEffect } from 'react';
import DropFileArea from '../../../../components/shared/Modals/addCompanyFile/DropFileArea';
import useFileUpload from '../../../../utils/hooks/useFileUpload';
import DatePicker from '../../../../components/shared/Modals/addCompanyFile/datePicker';
import FileDownloadProgress from '../../../createCompany/components/UploadedFile';
import {
  AddressFields,
  IFiles,
  UpdatedState,
} from '../../../../interfaces/interfaces';
import SimpleAddressForm from '../../../../components/shared/SimpleAddressForm/SimpleAddressForm';
import { truncateString } from '../../../../utils/helpers';
import XBtn from '../../../../components/shared/buttons/XBtn';
import ModalWrapperLayout from '../../../../components/shared/Modals/ModalWrapperLayout';
import { inputError } from '../../../../constants/form/form';
import { inputSimpleFocus } from '../../../../constants/form/form';

interface IProps {
  isOpen: boolean;
  setOpen: (value: boolean) => void;
  isOnlyNumber: boolean;
  companyName?: string;
  saveHandler: (data: UpdatedState) => void;
  ein?: string;
  docType?: string[];
  lastVerifDate?: string;
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
  isOpen,
  setOpen,
  saveHandler,
  isOnlyNumber,
  companyName,
  lastVerifDate,
  docType,
  ein,
}: IProps) => {
  const [einNumber, setEinNumber] = React.useState<string>(ein || '');
  const [file, setFile] = React.useState<IFiles | null>(null);
  const [companyNameOnDock, setCompanyNameOnDock] = React.useState<string>(
    companyName || ''
  );
  const [isNumberOnly, setIsNumberOnly] = React.useState(isOnlyNumber);
  const [selectedDocType, setSelectedDocType] = React.useState('');
  const [mandatoryError, setMandatoryError] = React.useState(false);
  const [dateValue, setDateValue] = React.useState<string>(lastVerifDate || '');
  const [address, setAddress] = React.useState<AddressFields>({
    country: 'United States',
    address0: '',
    address1: '',
    address2: '',
    address3: '',
    city: '',
    zip: '',
    state: '',
  });
  const setSelectedDocTypeHandler = (label: string) => {
    if (selectedDocType === label) {
      setSelectedDocType('');
    } else {
      setSelectedDocType(label);
    }
  };

  const validationHandler = (flag: boolean) => {
    if (flag) {
      return !!einNumber;
    } else {
      return (
        !!einNumber &&
        !!selectedDocType &&
        !!companyNameOnDock &&
        !!file?.size &&
        !!dateValue
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

  const addressHandler = (key: string, value: string) => {
    setAddress((prevState) => ({
      ...prevState,
      [key]: value,
    }));
  };

  const {
    inputRef,
    selectedFile,
    handleFileInput,
    handleFileDrop,
    cancelState,
    deleteFileHandler,
  } = useFileUpload();

  useEffect(() => {
    setFile(selectedFile);
  }, [selectedFile]);

  const cleanUpHandler = () => {
    setCompanyNameOnDock(companyName || '');
    setIsNumberOnly(isOnlyNumber);
    setSelectedDocType('');
    setMandatoryError(false);
    cancelState();
    setFile(null);
  };

  const inputCommonClasses =
    'p-2 text-md border-b border-b-gray-200 placeholder:text-gray-500 hover:cursor-pointer focus:ring-0 focus:outline-none focus:border-gray-200';

  return (
    <ModalWrapperLayout closeModal={() => setOpen(false)} isOpen={isOpen}>
      <>
        <div className={classNames(isNumberOnly ? 'p-6' : 'pt-6 pl-6 pr-6')}>
          <div className="mb-6">
            <h2 className="text-xl font-medium tracking-tight">
              <span>Add EIN (Tax ID)</span>
              <XBtn
                clickHandler={() => {
                  cleanUpHandler();
                  setOpen(false);
                }}
              />
            </h2>
          </div>

          <div className="space-y-2">
            <label
              htmlFor="EIN"
              className="block text-sm font-medium text-slate-700"
            >
              EIN (Tax ID) Number
            </label>
            <input
              disabled={!isNumberOnly && !!einNumber}
              onChange={(e) => handleInputChange(e)}
              className={classNames(
                'w-full px-3 py-2 border rounded-md focus:outline-none',
                mandatoryError && !einNumber ? inputError : inputSimpleFocus
              )}
              data-1p-ignore={true}
              type="text"
              placeholder="EIN number"
              value={einNumber}
            />
          </div>
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
                  fileName={truncateString(selectedFile.name, 15)}
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
              <span className="text-xs text-gray-500">Maximum size: 25mb</span>
            </div>
            <div className="mt-6">
              <div className="text-gray-700 text-sm mb-2 font-bold">
                Document Date
              </div>
              <DatePicker
                mandatoryError={mandatoryError}
                value={dateValue}
                setValue={setDateValue}
              />
            </div>
            <div className="mt-6">
              <div className="text-gray-700 text-sm mb-2 font-bold">
                Company Name on the Document
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
                Document Type
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

            {selectedDocType && selectedDocType !== 'Screenshot' && (
              <div className="mt-6">
                <div className="text-gray-700 text-sm mb-2 font-bold">
                  Address on the Document
                </div>
                <SimpleAddressForm
                  disabledFlag={false}
                  inputCommonClasses={inputCommonClasses}
                  requiredError={mandatoryError}
                  data={address}
                  countryDisabled={true}
                  setData={addressHandler}
                />
              </div>
            )}
          </div>
        )}

        <div className="w-full gap-2 px-6 py-4 bg-slate-100 rounded-b-lg">
          <div className="mr-auto flex items-center justify-end">
            <div
              onClick={() => {
                cleanUpHandler();
                setOpen(false);
              }}
              className="mr-2 block px-3 py-2 text-center text-sm font-semibold text-gray-800 hover:text-gray-900 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 transition-all duration-150 ease-in-out hover:cursor-pointer"
            >
              Cancel
            </div>
            <div
              onClick={() => {
                if (validationHandler(isNumberOnly)) {
                  saveHandler({
                    taxId: einNumber,
                    companyName: companyNameOnDock,
                    documentType: docType
                      ? [...(docType as string[]), selectedDocType]
                      : [selectedDocType],
                    lastVerifDate: dateValue,
                    relatedDocument: {
                      ...selectedFile,
                      dueDate: dateValue,
                      dockType: selectedDocType,
                    },
                    relatedAddress: address,
                  });
                  cleanUpHandler();
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
    </ModalWrapperLayout>
  );
};

export default AddEinModal;
