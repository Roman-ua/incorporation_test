import React, { ChangeEvent, useEffect } from 'react';
import DropFileArea from '../../../../components/shared/Modals/addCompanyFile/DropFileArea';
import useFileUpload from '../../../../utils/hooks/useFileUpload';
import DatePicker from '../../../../components/shared/Modals/addCompanyFile/datePicker';
import FileDownloadProgress from '../../../createCompany/components/UploadedFile';
import { AddressFields } from '../../../../interfaces/interfaces';
import SimpleAddressForm from '../../../../components/shared/SimpleAddressForm/SimpleAddressForm';
import {
  bytesToMB,
  getFileExtension,
  truncateString,
} from '../../../../utils/helpers';
import XBtn from '../../../../components/shared/buttons/XBtn';
import ModalWrapperLayout from '../../../../components/shared/Modals/ModalWrapperLayout';
import { inputError } from '../../../../constants/form/form';
import { EinDocumentCreate } from '../../../../state/types/einTypes';
import { useRecoilValue } from 'recoil';
import GlobalDataState from '../../../../state/atoms/GlobalData';
import { LockKeyhole } from 'lucide-react';
import { BiEditAlt } from 'react-icons/bi';
import TooltipWrapper from '../../../../components/root/IconWithTooltipWrapper';

interface IProps {
  isOpen: boolean;
  setOpen: (value: boolean) => void;
  isOnlyNumber: boolean;
  companyName?: string;
  saveHandler: (data: EinDocumentCreate) => void;
  ein?: string;
  docType?: string;
  lastVerifDate?: string;
}

const labels = [
  { type: 'type1', label: 'CP575A' },
  { type: 'type2', label: 'Screenshot' },
  { type: 'type3', label: 'CP575G' },
  { type: 'type4', label: '147C' },
  { type: 'type5', label: 'Faxed SS-4' },
  { type: 'type7', label: 'CP577' },
  { type: 'type8', label: 'CP577E' },
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
  const [file, setFile] = React.useState<File | null>(null);
  const [companyNameOnDock, setCompanyNameOnDock] = React.useState<string>(
    companyName || ''
  );

  const [isCompanyNameDisabled, setIsCompanyNameDisabled] =
    React.useState(!!companyName);
  const [isNumberOnly, setIsNumberOnly] = React.useState(isOnlyNumber);
  const [selectedDocType, setSelectedDocType] = React.useState(docType || '');
  const [mandatoryError, setMandatoryError] = React.useState(false);
  const [dateValue, setDateValue] = React.useState<string>(lastVerifDate || '');
  const [address, setAddress] = React.useState<AddressFields>({
    country: 'United States',
    line1: '',
    line2: '',
    line3: '',
    line4: '',
    city: '',
    zip: '',
    state: '',
  });
  console.log(address, 'address');

  const { states, countryies } = useRecoilValue(GlobalDataState);
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
        address.zip?.length === 5 &&
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

  const clickSaveHandler = () => {
    if (validationHandler(isNumberOnly)) {
      const stateId = states.find((state) => state.name === address.state)?.id;
      const countryId = countryies.find(
        (country) => country.full_name === address.country
      )?.id;
      saveHandler({
        ein_number: einNumber,
        company_name: companyNameOnDock,
        document_type: selectedDocType,
        document_date: dateValue,
        document: file,
        line1: address.line1 || '',
        line2: address?.line2,
        line3: address?.line3,
        line4: address?.line4,
        city: address?.city || '',
        state: stateId || 1,
        zip: address?.zip || '',
        country: countryId || 1,
      });
      cleanUpHandler();
      setOpen(false);
    } else {
      setMandatoryError(true);
    }
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
  console.log(selectedDocType, 'selectedDocType');

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

          <div className="space-y-2 relative">
            <label
              htmlFor="EIN"
              className="block text-sm font-medium text-slate-700"
            >
              EIN (Tax ID) Number
            </label>
            <input
              disabled={!isNumberOnly && !!ein}
              onChange={(e) => handleInputChange(e)}
              className={classNames(
                'w-full px-3 py-2 border rounded-md focus:outline-none',
                mandatoryError && !einNumber ? inputError : '',
                !!ein && 'opacity-50'
              )}
              data-1p-ignore={true}
              type="text"
              placeholder="EIN number"
              value={einNumber}
            />
            {!!ein && (
              <div className="absolute right-2.5 top-[46%]">
                <TooltipWrapper text="EIN number can not be edited">
                  <LockKeyhole className="w-4 h-4 text-gray-700 opacity-50" />
                </TooltipWrapper>
              </div>
            )}
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
                  fileName={truncateString(selectedFile.name, 30)}
                  fileSize={`${bytesToMB(selectedFile?.size)} MB`}
                  fileFormat={getFileExtension(selectedFile)}
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
                disableFuture={true}
                mandatoryError={mandatoryError}
                value={dateValue}
                setValue={setDateValue}
              />
            </div>
            <div className="mt-6 relative">
              <div className="text-gray-700 text-sm mb-2 font-bold">
                Company Name on the Document
              </div>
              <input
                disabled={isCompanyNameDisabled}
                onChange={(e) => setCompanyNameOnDock(e.target.value)}
                className={classNames(
                  'block rounded-md border w-full  border-gray-200 p-2 text-md mb-2 text-gray-900 disabled:text-opacity-50 placeholder:text-gray-500  hover:cursor-pointer',
                  mandatoryError && !companyNameOnDock && 'bg-red-50'
                )}
                type="text"
                placeholder="Company Name"
                value={companyNameOnDock}
              />
              {!!isCompanyNameDisabled && (
                <div className="absolute right-2.5 top-[58%]">
                  <TooltipWrapper text="Edit company name">
                    <BiEditAlt
                      onClick={() => setIsCompanyNameDisabled(false)}
                      className="w-4 h-4 text-gray-700 hover:cursor-pointer opacity-50 hover:opacity-100 transition-all duration-150 ease-in-out"
                    />
                  </TooltipWrapper>
                </div>
              )}
            </div>

            <div className="mt-6">
              <div className="text-gray-700 text-sm mb-2 font-bold">
                Document Type
              </div>
              <div className="flex items-center justify-start flex-wrap">
                {labels.map((type) => (
                  <div
                    onClick={() => setSelectedDocTypeHandler(type.label)}
                    className={classNames(
                      'text-sm font-bold text-gray-700 py-1.5 px-3 border rounded mr-1 mb-1 transition-all duration-150 ease-in-out hover:cursor-pointer',
                      selectedDocType === type.label
                        ? 'bg-sideBarBlue text-white border-sideBarBlue'
                        : 'border-gray-300 hover:border-sideBarBlue hover:text-sideBarBlue',
                      mandatoryError && !selectedDocType && 'bg-red-50'
                    )}
                    key={type.type}
                  >
                    {type.label}
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
                  disableExtraLines={true}
                  extraWrapperClass={
                    'border border-sideBarBlue shadow-[0_0_0_1px_#0277ff]'
                  }
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
              onClick={clickSaveHandler}
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
