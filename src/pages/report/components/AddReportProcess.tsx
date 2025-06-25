import React, { useState, useEffect } from 'react';
import { Dialog, DialogBackdrop, DialogPanel } from '@headlessui/react';
import { X, Upload, FileText } from 'lucide-react';
import { classNames, filterLatinOnly } from '../../../utils/helpers';
import XBtn from '../../../components/shared/buttons/XBtn';
import { CheckIcon } from '@heroicons/react/20/solid';
import DatePicker from '../../../components/shared/Modals/addCompanyFile/datePicker';
import SimpleAddressForm from '../../../components/shared/SimpleAddressForm/SimpleAddressForm';
import { VALIDATORS } from '../../../constants/regexs';

// Mock interfaces to match your original code
interface IFiles {
  name?: string;
  size?: number;
  format?: string;
}

interface AddressFields {
  country: string;
  address0: string;
  address1: string;
  address2: string;
  address3: string;
  city: string;
  zip: string;
  state: string;
}

interface UpdatedState {
  taxId: string;
  companyName: string;
  documentType: string[];
  lastVerifDate: string;
  relatedDocument: IFiles;
  relatedAddress: AddressFields;
}

interface MultiStepModalProps {
  open: boolean;
  setOpen: (value: boolean) => void;
  saveHandler?: (data: UpdatedState) => void;
}

const DOCUMENT_TYPES = [
  'CP575A',
  'Screenshot',
  'CP575G',
  '147C',
  'Faxed SS-4',
  'CP577',
  'CP577E',
];

const AddReportProcess: React.FC<MultiStepModalProps> = ({
  open,
  setOpen,
  saveHandler = () => {},
}) => {
  const [currentStep, setCurrentStep] = useState(1);
  const [einNumber, setEinNumber] = useState('');
  const [companyName, setCompanyName] = useState('');
  const [selectedDocType, setSelectedDocType] = useState('');
  const [dateValue, setDateValue] = useState('');
  const [file, setFile] = useState<IFiles | null>(null);
  const [errors, setErrors] = useState<Record<string, boolean>>({});
  const [languageError, setLanguageError] = useState<boolean>(false);
  console.log('languageError', languageError);
  const [address, setAddress] = useState<AddressFields>({
    country: 'United States',
    address0: '',
    address1: '',
    address2: '',
    address3: '',
    city: '',
    zip: '',
    state: '',
  });

  const totalSteps = 4;
  const stepsTitles = ['EIN', 'Document', 'Details', 'Address'];

  // Reset form when modal closes
  useEffect(() => {
    if (!open) {
      resetForm();
    }
  }, [open]);

  const resetForm = () => {
    setCurrentStep(1);
    setEinNumber('');
    setCompanyName('');
    setSelectedDocType('');
    setDateValue('');
    setFile(null);
    setErrors({});
    setAddress({
      country: 'United States',
      address0: '',
      address1: '',
      address2: '',
      address3: '',
      city: '',
      zip: '',
      state: '',
    });
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let value = e.target.value.replace(/\D/g, '');

    if (value.length > 9) {
      value = value.slice(0, 9);
    }

    if (value.length > 2) {
      value = `${value.slice(0, 2)}-${value.slice(2)}`;
    }

    setEinNumber(value);
  };

  const handleAddressChange = (key: string, value: string) => {
    const isOnlyAllowed = VALIDATORS.LANGUAGE.test(value);
    const hasCyrillic = /[\u0400-\u04FF]/.test(value);

    const filteredResult = filterLatinOnly(value);
    setAddress((prevState) => ({
      ...prevState,
      [key]: filteredResult,
    }));

    if (isOnlyAllowed && !hasCyrillic) {
      setLanguageError(false);
    } else {
      setLanguageError(true);
    }
  };

  const validateStep = (step: number): boolean => {
    const newErrors: Record<string, boolean> = {};

    switch (step) {
      case 1:
        if (!einNumber) newErrors.einNumber = true;
        break;
      case 2:
        if (!file) newErrors.file = true;
        break;
      case 3:
        if (!dateValue) newErrors.dateValue = true;
        if (!companyName) newErrors.companyName = true;
        if (!selectedDocType) newErrors.selectedDocType = true;
        break;
      case 4:
        if (selectedDocType && selectedDocType !== 'Screenshot') {
          if (!address.address1) newErrors.address1 = true;
          if (!address.city) newErrors.city = true;
          if (!address.state) newErrors.state = true;
          if (!address.zip) newErrors.zip = true;
        }
        break;
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const goToNextStep = () => {
    if (validateStep(currentStep)) {
      if (currentStep < totalSteps) {
        setCurrentStep(currentStep + 1);
      } else {
        handleSubmit();
      }
    }
  };

  const goToPreviousStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const goToStep = (step: number) => {
    // Only allow going to a step if all previous steps are valid
    let canProceed = true;
    for (let i = 1; i < step; i++) {
      if (!validateStep(i)) {
        canProceed = false;
        setCurrentStep(i);
        break;
      }
    }

    if (canProceed) {
      setCurrentStep(step);
    }
  };

  const handleSubmit = () => {
    // Validate all steps before submitting
    for (let i = 1; i <= totalSteps; i++) {
      if (!validateStep(i)) {
        setCurrentStep(i);
        return;
      }
    }

    // If all validations pass, submit the form
    saveHandler({
      taxId: einNumber,
      companyName: companyName,
      documentType: [selectedDocType],
      lastVerifDate: dateValue,
      relatedDocument: {
        ...file,
        // dueDate: dateValue,
        // dockType: selectedDocType,
      },
      relatedAddress: address,
    });

    setOpen(false);
    resetForm();
  };

  // Mock file upload handler
  const handleFileUpload = () => {
    // Simulate file upload
    setFile({
      name: 'document.pdf',
      size: 1.2,
      format: 'pdf',
    });
  };

  const removeFile = () => {
    setFile(null);
  };
  const inputCommonClasses =
    'p-2 text-md border-b border-b-gray-200 placeholder:text-gray-500 hover:cursor-pointer focus:ring-0 focus:outline-none focus:border-gray-200';

  const renderStepContent = () => {
    switch (currentStep) {
      case 1:
        return (
          <div className="space-y-4">
            <div className="mt-4">
              <label
                htmlFor="ein"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                EIN (Tax ID) Number
              </label>
              <input
                id="ein"
                type="text"
                value={einNumber}
                onChange={handleInputChange}
                placeholder="XX-XXXXXXX"
                className={`w-full px-4 py-2 border ${errors.einNumber ? 'border-red-500 bg-red-50' : 'border-gray-300'} rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500`}
              />
              {errors.einNumber && (
                <p className="mt-1 text-sm text-red-600">
                  EIN number is required
                </p>
              )}
            </div>
          </div>
        );

      case 2:
        return (
          <div className="space-y-4">
            {file ? (
              <div className="mt-4 p-4 border border-gray-200 rounded-md">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <div className="p-2 bg-blue-100 rounded-md">
                      <FileText className="w-5 h-5 text-blue-600" />
                    </div>
                    <div>
                      <p className="font-medium text-gray-900">{file.name}</p>
                      <p className="text-sm text-gray-500">
                        {file.size} MB • {file.format?.toUpperCase()}
                      </p>
                    </div>
                  </div>
                  <button
                    onClick={removeFile}
                    className="p-1 rounded-full hover:bg-gray-100"
                  >
                    <X className="w-5 h-5 text-gray-500" />
                  </button>
                </div>
                <div className="mt-2 w-full bg-gray-200 rounded-full h-1.5">
                  <div className="bg-blue-600 h-1.5 rounded-full w-full"></div>
                </div>
              </div>
            ) : (
              <div
                onClick={handleFileUpload}
                className={`mt-4 border-2 border-dashed ${errors.file ? 'border-red-400 bg-red-50' : 'border-gray-300'} rounded-lg p-6 text-center cursor-pointer hover:border-blue-500 transition-colors`}
              >
                <Upload className="mx-auto h-12 w-12 text-gray-400" />
                <div className="mt-2">
                  <p className="text-sm font-medium text-gray-900">
                    Click to upload or drag and drop
                  </p>
                  <p className="text-xs text-gray-500">PDF, JPEG (max. 25MB)</p>
                </div>
              </div>
            )}
            {errors.file && (
              <p className="mt-1 text-sm text-red-600">
                Document upload is required
              </p>
            )}
          </div>
        );

      case 3:
        return (
          <div className="space-y-4">
            <div className="mt-4">
              <label
                htmlFor="date"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Document Date
              </label>
              <DatePicker
                mandatoryError={errors.dateValue}
                value={dateValue}
                setValue={setDateValue}
              />
              {errors.dateValue && (
                <p className="mt-1 text-sm text-red-600">
                  Document date is required
                </p>
              )}
            </div>

            <div className="mt-4">
              <label
                htmlFor="companyName"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Company Name on the Document
              </label>
              <input
                id="companyName"
                type="text"
                value={companyName}
                onChange={(e) => setCompanyName(e.target.value)}
                placeholder="Company Name"
                className={`w-full px-4 py-2 border ${errors.companyName ? 'border-red-500 bg-red-50' : 'border-gray-300'} rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500`}
              />
              {errors.companyName && (
                <p className="mt-1 text-sm text-red-600">
                  Company name is required
                </p>
              )}
            </div>

            <div className="mt-4">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Document Type
              </label>
              <div className="flex flex-wrap gap-2">
                {DOCUMENT_TYPES.map((type) => (
                  <button
                    key={type}
                    onClick={() => setSelectedDocType(type)}
                    className={`px-3 py-1.5 text-sm font-medium rounded-md transition-colors ${
                      selectedDocType === type
                        ? 'bg-blue-600 text-white'
                        : 'bg-white text-gray-700 border border-gray-300 hover:border-blue-500 hover:text-blue-600'
                    } ${errors.selectedDocType && !selectedDocType ? 'border-red-500' : ''}`}
                  >
                    {type}
                  </button>
                ))}
              </div>
              {errors.selectedDocType && (
                <p className="mt-1 text-sm text-red-600">
                  Document type is required
                </p>
              )}
            </div>
          </div>
        );

      case 4:
        return (
          <div className="space-y-4">
            {selectedDocType && selectedDocType !== 'Screenshot' ? (
              <SimpleAddressForm
                disabledFlag={false}
                inputCommonClasses={inputCommonClasses}
                requiredError={false}
                data={address}
                countryDisabled={false}
                setData={handleAddressChange}
              />
            ) : (
              <div className="mt-4 p-6 bg-gray-50 rounded-lg text-center">
                <p className="text-gray-600">
                  Address information is not required for the selected document
                  type.
                </p>
              </div>
            )}
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <Dialog open={open} onClose={setOpen} className="fixed z-10">
      <DialogBackdrop className="fixed inset-0 bg-gray-500/75 transition-opacity data-[closed]:opacity-0 data-[enter]:duration-300 data-[leave]:duration-200 data-[enter]:ease-out data-[leave]:ease-in" />

      <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
        <div className="flex min-h-full items-end justify-center text-center sm:items-center sm:p-0">
          <DialogPanel className="relative transform rounded-lg bg-white text-left shadow-xl transition-all data-[closed]:translate-y-4 data-[closed]:opacity-0 data-[enter]:duration-300 data-[leave]:duration-200 data-[enter]:ease-out data-[leave]:ease-in sm:my-8 sm:w-full sm:max-w-lg data-[closed]:sm:translate-y-0 data-[closed]:sm:scale-95">
            <div className="py-5 px-5">
              <div className="flex items-center justify-between mb-7">
                <span className="text-gray-900 text-lg font-bold">
                  Add Report
                </span>
                <XBtn
                  clickHandler={() => {
                    // cleanUpHandler();
                    setOpen(false);
                  }}
                />
              </div>

              {/* Progress bar */}
              <div className="py-4">
                <div className="relative">
                  <div className="overflow-hidden h-2 mb-4 text-xs flex rounded bg-gray-200">
                    <div
                      style={{ width: `${(currentStep / totalSteps) * 100}%` }}
                      className="shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-blue-600 transition-all duration-300"
                    ></div>
                  </div>
                  <div className="flex justify-between">
                    {Array.from({ length: totalSteps }).map((_, index) => {
                      const stepNumber = index + 1;
                      const isActive = stepNumber === currentStep;
                      const isCompleted = stepNumber < currentStep;

                      return (
                        <div
                          key={index}
                          className={`flex items-center justify-center gap-2`}
                        >
                          <span
                            onClick={() => goToStep(stepNumber)}
                            className="flex h-5 items-center hover:cursor-pointer"
                          >
                            <span
                              className={classNames(
                                'relative z-10 flex h-6 w-6 items-center justify-center rounded-full bg-gray-200',
                                isCompleted ? 'bg-green-400' : '',
                                isActive ? 'bg-blue-400' : ''
                              )}
                            >
                              {isCompleted ? (
                                <CheckIcon
                                  className={classNames(
                                    'h-3.5 w-3.5 font-bold',
                                    isCompleted ? 'text-white' : 'text-gray-700'
                                  )}
                                  aria-hidden="true"
                                />
                              ) : (
                                <span
                                  className={classNames(
                                    'text-xs font-bold',
                                    isActive ? 'text-white' : 'text-gray-700'
                                  )}
                                >
                                  {stepNumber}
                                </span>
                              )}
                            </span>
                          </span>
                          <span className="text-xs">{stepsTitles[index]}</span>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>

              <div className="mt-4">{renderStepContent()}</div>
            </div>
            {/*<div className="w-full bg-gray-100 py-3 px-5 rounded-b-lg">*/}
            {/*  <button*/}
            {/*    onClick={() => goToPreviousStep()}*/}
            {/*    disabled={currentStep === 1}*/}
            {/*    className={`flex items-center px-4 py-2 rounded-md ${*/}
            {/*      currentStep === 1*/}
            {/*        ? 'text-gray-400 cursor-not-allowed'*/}
            {/*        : 'text-gray-700 hover:bg-gray-100'*/}
            {/*    }`}*/}
            {/*  >*/}
            {/*    <ChevronLeft className="w-4 h-4 mr-1" />*/}
            {/*    Back*/}
            {/*  </button>*/}
            {/*  <div className="mr-auto flex items-center justify-end">*/}
            {/*    <div*/}
            {/*      onClick={() => setOpen(false)}*/}
            {/*      className="mr-2 block px-3 py-2 text-center text-sm font-semibold text-gray-800 hover:text-gray-900 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 transition-all duration-150 ease-in-out hover:cursor-pointer"*/}
            {/*    >*/}
            {/*      Cancel*/}
            {/*    </div>*/}
            {/*    <div*/}
            {/*      onClick={goToNextStep}*/}
            {/*      className={classNames(*/}
            {/*        ' bg-mainBlue hover:bg-sideBarBlue ml-2 block rounded-md  px-3 py-2 text-center text-sm font-semibold text-white shadow-sm  focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 transition-all duration-150 ease-in-out hover:cursor-pointer'*/}
            {/*        // validationHandler(isNumberOnly)*/}
            {/*        //     ? 'bg-mainBlue hover:bg-sideBarBlue'*/}
            {/*        //     : 'bg-gray-500'*/}
            {/*      )}*/}
            {/*    >*/}
            {/*      {currentStep === totalSteps ? (*/}
            {/*        'Save'*/}
            {/*      ) : (*/}
            {/*        <>*/}
            {/*          Next*/}
            {/*          <ChevronRight className="w-4 h-4 ml-1" />*/}
            {/*        </>*/}
            {/*      )}*/}
            {/*    </div>*/}
            {/*  </div>*/}
            {/*</div>*/}
            <div className="w-full bg-gray-100 py-3 px-5 rounded-b-lg">
              <div className="mr-auto flex items-center justify-end">
                <div
                  onClick={() => goToPreviousStep()}
                  className="mr-auto block px-3 py-2 text-center text-sm font-semibold text-gray-800 hover:text-gray-900 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 transition-all duration-150 ease-in-out hover:cursor-pointer"
                >
                  Back
                </div>
                <div
                  onClick={() => setOpen(false)}
                  className="mr-2 block px-3 py-2 text-center text-sm font-semibold text-gray-800 hover:text-gray-900 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 transition-all duration-150 ease-in-out hover:cursor-pointer"
                >
                  Cancel
                </div>
                <div
                  onClick={goToNextStep}
                  className="block rounded-md bg-mainBlue px-3 py-2 text-center text-sm font-semibold text-white shadow-sm hover:bg-sideBarBlue focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 transition-all duration-150 ease-in-out hover:cursor-pointer"
                >
                  {currentStep === totalSteps ? 'Save' : 'Next'}
                </div>
              </div>
            </div>
          </DialogPanel>
        </div>
      </div>
    </Dialog>
  );
};

export default AddReportProcess;
