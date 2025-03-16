import React, { useEffect, useRef, useState } from 'react';
import {
  Globe,
  Building,
  UserCheck,
  Users,
  DollarSign,
  Save,
  FileText,
  X,
  FileIcon,
} from 'lucide-react';
import PageSign from '../../../components/shared/PageSign';
import {
  AddressFields,
  IFiles,
  ReportData,
} from '../../../interfaces/interfaces';
import { mockAgent } from '../../../mock/mockData';
import ProcessingReportPeopleSection from '../ProcessingReportPeopleSection';
import AddReportDocShort from './AddReportDocShort';
import {
  copyAddressToClipboard,
  dockFieldHandler,
  truncateString,
} from '../../../utils/helpers';
import AddressAsTable from '../../../components/shared/AddressRender/AddressAsTable';
import { MdCheck, MdOutlineCopyAll } from 'react-icons/md';
import { USStates } from '../../../constants/form/form';
import TooltipWrapper from '../../../components/shared/TooltipWrapper';
import { IconInfoCircle } from '@tabler/icons-react';
import useFileUpload from '../../../utils/hooks/useFileUpload';
import FileDownloadProgress from '../../createCompany/components/UploadedFile';
import DropFileArea from '../../../components/shared/Modals/addCompanyFile/DropFileArea';
import { LuArrowUpRight } from 'react-icons/lu';
import { Checkbox } from '../../../components/shared/Checkboxes/CheckBoxSq';

const steps = [
  {
    title: 'Company Details',
    description: '',
    icon: <Globe className="w-6 h-6" />,
    details: '',
    hasFileUpload: false,
  },
  {
    title: 'Check Company Address',
    description:
      "Verify the company's registered address and make any necessary updates.",
    icon: <Building className="w-6 h-6" />,
    details:
      "Review the current registered address on file. Ensure it matches the company's actual physical location. If there are discrepancies, update the address using the government portal's editing tools.",
    hasFileUpload: false,
  },
  {
    title: 'Check Registered Agent',
    description:
      "Verify the company's Registered Agent information and update if needed.",
    icon: <UserCheck className="w-6 h-6" />,
    details:
      "Confirm that the Registered Agent information is current and accurate. The Registered Agent is responsible for receiving legal documents on behalf of the company. If changes are needed, follow the portal's process for updating agent information.",
    hasFileUpload: false,
  },
  {
    title: 'Check Company Representatives',
    description:
      'Review all company representatives and make updates as necessary.',
    icon: <Users className="w-6 h-6" />,
    details:
      "Verify all officers, directors, managers, or other representatives listed for the company. Ensure their names, titles, and contact information are accurate and up-to-date. Add or remove representatives as needed according to the company's current structure.",
    hasFileUpload: false,
  },
  {
    title: 'Pay Government Fee',
    description: 'Pay government fee and upload confirmation document.',
    icon: <DollarSign className="w-6 h-6" />,
    details:
      "Complete the payment process for any required government fees. Use the company's preferred payment method. After payment is processed, upload the payment confirmation receipt for record-keeping purposes.",
    hasFileUpload: false,
  },
  {
    title: 'Save Annual Report',
    description: 'Download and save a copy of the completed Annual Report.',
    icon: <Save className="w-6 h-6" />,
    details: '',
    hasFileUpload: false,
  },
  {
    title: 'Invoice Customer',
    description:
      'Generate and send an invoice to the customer for services rendered.',
    icon: <FileText className="w-6 h-6" />,
    details: '',
    hasFileUpload: false,
  },
];

interface IProps {
  data: ReportData;
}

const ProcessingReport = ({ data }: IProps) => {
  const [copied, setCopied] = useState<number>(-1);

  const [completedSteps, setCompletedSteps] = useState<number[]>([]);
  const [uploadedFiles, setUploadedFiles] = useState<{ [key: number]: File[] }>(
    {}
  );
  const [file, setFile] = useState<IFiles | null>(null);
  console.log(file, 'file');
  const fileInputRefs = useRef<{ [key: number]: HTMLInputElement | null }>({});

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

  const markAsCompleted = (index: number) => {
    if (completedSteps.includes(index)) {
      setCompletedSteps(completedSteps.filter((step) => step !== index));
    } else {
      setCompletedSteps([...completedSteps, index]);
    }
  };

  const handleFileUpload = (
    index: number,
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const files = event.target.files;
    if (files && files.length > 0) {
      const newFiles = Array.from(files);
      setUploadedFiles((prev) => ({
        ...prev,
        [index]: [...(prev[index] || []), ...newFiles],
      }));
    }
  };

  const removeFile = (stepIndex: number, fileIndex: number) => {
    setUploadedFiles((prev) => ({
      ...prev,
      [stepIndex]: prev[stepIndex].filter((_, idx) => idx !== fileIndex),
    }));
  };

  const handleCopy = (value: AddressFields, index: number) => {
    copyAddressToClipboard(value);
    setCopied(index);

    setTimeout(() => {
      setCopied(-1);
    }, 1000);
  };

  return (
    <div className="min-h-screen">
      <div className="mx-auto pb-12">
        <div className="mb-5">
          <PageSign
            titleSize={'text-2xl font-bold text-gray-900'}
            title={`Admin To-Do Process`}
            icon={<></>}
          />
        </div>
        <div className="space-y-4 mb-8">
          {steps.map((step, index) => (
            <div key={index} className="border border-gray-200 rounded-md">
              {/* Task header */}
              <div
                onClick={() => markAsCompleted(index)}
                className="px-6 py-4 flex items-center cursor-pointer bg-white rounded-md"
              >
                <Checkbox
                  wrapperClass={'h-5 w-5 min-w-5 min-h-5'}
                  iconClass={'h-3 w-3'}
                  id={`Send invitation`}
                  title={''}
                  mandatoryError={false}
                  underInput={true}
                  checked={completedSteps.includes(index)}
                  onChange={() => markAsCompleted(index)}
                />
                <div className="flex-grow">
                  <h3 className="text font-medium text-gray-700">
                    {step.title}
                  </h3>
                  {step.title === 'Save Annual Report' ? (
                    <p className="text-sm text-gray-500 mt-0.5">
                      Download and save {data.year} Annual Report for{' '}
                      {data.companyName}
                    </p>
                  ) : (
                    <p className="text-sm text-gray-500 mt-0.5">
                      {step.description}
                    </p>
                  )}
                </div>

                <div className="flex-shrink-0 ml-2 text-gray-400 flex items-center justify-end">
                  {step.title === 'Company Details' && (
                    <a
                      href="https://services.sunbiz.org/Filings/AnnualReport/FilingStart"
                      target="_blank"
                      rel="noreferrer"
                      className="bg-gray-200/50 hover:bg-gray-200/70 mr-4 py-1 px-2 rounded-md flex items-center justify-center gap-2 text-gray-700 hover:cursor-pointer hover:text-gray-900 transition-all ease-in-out duration-150"
                    >
                      <span className="font-semibold">dos.fl.gov</span>
                      <LuArrowUpRight className="w-4 h-4 font-semibold" />
                    </a>
                  )}
                  <span className="text-gray-700 font-bold">{index + 1}</span>
                </div>
              </div>

              {/* Task details */}
              <div
                className={`transition-all duration-300 ${
                  !completedSteps.includes(index)
                    ? 'border-t border-gray-200'
                    : 'max-h-0 hidden'
                }`}
              >
                <div className="px-6 py-4 bg-gray-50 rounded-b-md">
                  <p className="text-sm text-gray-700 mb-4">{step.details}</p>

                  {step.title === 'Company Details' && (
                    <div className="w-full max-w-2xl mb-6">
                      <div className="grid grid-cols-3 gap-0.5 text-gray-900">
                        <div className="contents pb-2">
                          <div className="w-2/3 text-sm max-xl:w-1/2 pr-2 text-nowrap text-gray-400">
                            Year
                          </div>
                          <div className="col-span-2 pr-2 text-gray-700 text-sm">
                            {data.year}
                          </div>
                        </div>
                        <div className="contents pb-2">
                          <div className="w-2/3 text-sm max-xl:w-1/2 pr-2 text-nowrap text-gray-400">
                            Company Name
                          </div>
                          <div className="col-span-2 pr-2 text-gray-700 text-sm">
                            {data.companyName}
                          </div>
                        </div>
                        <div className="contents pb-2">
                          <div className="w-2/3 text-sm max-xl:w-1/2 pr-2 text-nowrap text-gray-400">
                            State
                          </div>
                          <div className="col-span-2 pr-2 text-gray-700 text-sm">
                            {data.state}
                          </div>
                        </div>
                        <div className="contents pb-2">
                          <div className="w-2/3 text-sm max-xl:w-1/2 pr-2 text-nowrap text-gray-400">
                            {dockFieldHandler(data.state)}
                          </div>
                          <div className="col-span-2 pr-2 text-gray-700 text-sm">
                            {data.registrationNumber}
                          </div>
                        </div>
                      </div>
                    </div>
                  )}
                  {step.title === 'Check Company Address' && (
                    <div className="mt-3">
                      <div className="mt-3">
                        <div
                          onClick={() => handleCopy(data.address || {}, 1)}
                          className="group text-gray-700 text-sm mb-2 font-bold relative flex items-center justify-start gap-1 hover:cursor-pointer"
                        >
                          <span>Main Address</span>
                          {copied === 1 ? (
                            <span className="absolute left-0 -top-8 bg-green-100 text-green-800 text-xs font-medium px-2.5 py-1 rounded-md shadow-sm flex items-center gap-1 animate-fade-in-out">
                              <MdCheck className="h-3.5 w-3.5" />
                              Copied!
                            </span>
                          ) : (
                            <MdOutlineCopyAll className="h-4 w-4 opacity-0 group-hover:opacity-100 transition-all duration-150 ease-in-out" />
                          )}
                        </div>
                        <AddressAsTable data={data.address} />
                      </div>
                      <div className="mt-3">
                        <div
                          onClick={() =>
                            handleCopy(data.mailingAddress || {}, 2)
                          }
                          className="group text-gray-700 text-sm mb-2 font-bold relative flex items-center justify-start gap-1 hover:cursor-pointer"
                        >
                          <span>Mailing Address</span>
                          {copied === 2 ? (
                            <span className="absolute left-0 -top-8 bg-green-100 text-green-800 text-xs font-medium px-2.5 py-1 rounded-md shadow-sm flex items-center gap-1 animate-fade-in-out">
                              <MdCheck className="h-3.5 w-3.5" />
                              Copied!
                            </span>
                          ) : (
                            <MdOutlineCopyAll className="h-4 w-4 opacity-0 group-hover:opacity-100 transition-all duration-150 ease-in-out" />
                          )}
                        </div>
                        <AddressAsTable data={data.mailingAddress} />
                      </div>
                    </div>
                  )}
                  {step.title === 'Check Registered Agent' && (
                    <div className="w-full flex items-start justify-between mt-3 max-lg:flex-col">
                      <div className="w-2/3 flex items-start justify-between pb-2 max-lg:w-full">
                        <div className="pr-1 text-gray-700 text-sm">
                          <div className="text-sm text-gray-500 mb-1">Name</div>
                          <div className="font-semibold text-gray-800">
                            {mockAgent.name}
                          </div>
                        </div>
                      </div>
                      <div className="w-full flex items-start justify-end pb-2">
                        <div className="w-full pr-2 text-gray-800 text-sm">
                          <div className="text-sm text-gray-500 mb-1">
                            Address
                          </div>
                          <div className="flex items-start justify-between">
                            <div>
                              <div>
                                <span>{mockAgent.address.address0}, </span>
                                {mockAgent.address.address1 && (
                                  <span>{mockAgent.address.address1}</span>
                                )}
                              </div>
                              <div>
                                {mockAgent.address.address2 && (
                                  <span>{mockAgent.address.address2}</span>
                                )}
                                {mockAgent.address.address3 && (
                                  <span>
                                    {mockAgent.address.address2 ? ',' : ''}{' '}
                                    {mockAgent.address.address3}
                                  </span>
                                )}
                              </div>
                              <div>
                                <span>{mockAgent.address.city}, </span>
                                <span>
                                  {USStates.find(
                                    (item) =>
                                      item.title === mockAgent.address.state
                                  )?.value || ''}{' '}
                                </span>
                                <span>{mockAgent.address.zip}</span>
                                {mockAgent.address?.county && (
                                  <span>
                                    , {mockAgent.address?.county}
                                    <TooltipWrapper tooltipText="County">
                                      <IconInfoCircle className="w-3.5 h-3.5 relative -right-1 top-0.5 text-gray-400 hover:cursor-pointer hover:text-gray-500" />
                                    </TooltipWrapper>
                                  </span>
                                )}
                              </div>
                              <div>{mockAgent.address.country}</div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}
                  {step.title === 'Check Company Representatives' && (
                    <div className="mt-3">
                      <ProcessingReportPeopleSection disableEdit={false} />
                    </div>
                  )}
                  {step.title === 'Pay Government Fee' && (
                    <div className="mt-3">
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
                          mandatoryError={false}
                        />
                      )}
                    </div>
                  )}
                  {step.title === 'Save Annual Report' && (
                    <div className="mt-3">
                      <AddReportDocShort data={data} agentdata={mockAgent} />
                    </div>
                  )}
                  {/* File upload section */}
                  {step.hasFileUpload && (
                    <div className="mt-3">
                      <input
                        type="file"
                        ref={(el) => (fileInputRefs.current[index] = el)}
                        onChange={(e) => handleFileUpload(index, e)}
                        className="hidden"
                        multiple
                      />

                      {/* Uploaded files list */}
                      {uploadedFiles[index]?.length > 0 && (
                        <div className="mb-3">
                          <p className="text-xs font-medium text-gray-500 mb-2">
                            Files:
                          </p>
                          <div className="space-y-1">
                            {uploadedFiles[index].map((file, fileIndex) => (
                              <div
                                key={fileIndex}
                                className="flex items-center py-1 px-2 bg-white rounded border border-gray-200 text-sm"
                              >
                                <FileIcon className="w-3.5 h-3.5 text-gray-500 mr-2" />
                                <span className="text-xs text-gray-700 flex-grow truncate">
                                  {file.name}
                                </span>
                                <span className="text-xs text-gray-500 mx-2">
                                  {(file.size / 1024).toFixed(0)} KB
                                </span>
                                <button
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    removeFile(index, fileIndex);
                                  }}
                                  className="p-1 text-gray-400 hover:text-gray-700"
                                >
                                  <X className="w-3 h-3" />
                                </button>
                              </div>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ProcessingReport;
