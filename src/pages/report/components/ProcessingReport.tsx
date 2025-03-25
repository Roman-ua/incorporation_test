import React from 'react';
import { useEffect, useRef, useState } from 'react';
import {
  Building,
  UserCheck,
  Users,
  DollarSign,
  Save,
  FileText,
  X,
  FileIcon,
  ChevronDown,
} from 'lucide-react';
import PageSign from '../../../components/shared/PageSign';
import type {
  AddressFields,
  IFiles,
  ReportData,
} from '../../../interfaces/interfaces';
import { mockAgent } from '../../../mock/mockData';
import ProcessingReportPeopleSection from '../ProcessingReportPeopleSection';
import AddReportDocShort from './AddReportDocShort';
import {
  classNames,
  copyAddressToClipboard,
  dockFieldHandler,
} from '../../../utils/helpers';
import AddressAsTable from '../../../components/shared/AddressRender/AddressAsTable';
import { USStates } from '../../../constants/form/form';
import TooltipWrapper from '../../../components/shared/TooltipWrapper';
import { IconInfoCircle } from '@tabler/icons-react';
import { LuArrowUpRight } from 'react-icons/lu';
import { Checkbox } from '../../../components/shared/Checkboxes/CheckBoxSq';
import CopyButton from '../../../components/shared/CopyBtn/CopyButton';
import FeeFile from './FeeFile';
import StateSolidIconHandler from '../../../components/shared/StateSolidIconHandler';

const steps = [
  // {
  //   title: 'Company Details',
  //   description: '',
  //   icon: <Globe className="w-6 h-6" />,
  //   details: '',
  //   hasFileUpload: false,
  // },
  {
    title: 'Check Company Address',
    description: '',
    icon: <Building className="w-6 h-6" />,
    details: '',
    hasFileUpload: false,
  },
  {
    title: 'Check Registered Agent',
    description: '',
    icon: <UserCheck className="w-6 h-6" />,
    details: '',
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
    description: '',
    icon: <DollarSign className="w-6 h-6" />,
    details: 'Pay government fee and upload confirmation document.',
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
    description: '',
    icon: <FileText className="w-6 h-6" />,
    details: '',
    hasFileUpload: false,
  },
];

const today = new Date();

const formattedDate = today.toLocaleDateString('en-US', {
  month: 'long',
  day: '2-digit',
  year: 'numeric',
});

const freeSteps = [0, 1, 2, 5];
interface IProps {
  data: ReportData;
  setLastStepSubmitDisabled: (value: boolean) => void;
}

const ProcessingReport = ({ data, setLastStepSubmitDisabled }: IProps) => {
  const [copied, setCopied] = useState<number>(-1);
  const [expandedSteps, setExpandedSteps] = useState<number[]>([]);
  const [completedSteps, setCompletedSteps] = useState<number[]>([]);
  const [uploadedFiles, setUploadedFiles] = useState<{ [key: number]: File[] }>(
    {}
  );

  const [feeFile, setFeeFile] = useState<IFiles | null>(null);
  const [repFile, setRepFile] = useState<IFiles | null>(null);

  const [dateValue, setDateValue] = React.useState<string>(formattedDate || '');
  const [documentNumber, setDocumentNumber] = React.useState<string>('');

  const fileInputRefs = useRef<{ [key: number]: HTMLInputElement | null }>({});
  const detailsRefs = useRef<{ [key: number]: HTMLDivElement | null }>({});
  const detailsHeightRefs = useRef<{ [key: number]: number }>({});

  useEffect(() => {
    if (completedSteps.length > 4) {
      setLastStepSubmitDisabled(false);
    } else {
      setLastStepSubmitDisabled(true);
    }
  }, [completedSteps]);

  // Initialize all steps as expanded by default if not completed
  useEffect(() => {
    const initialExpanded = steps
      .map((_, index) => index)
      .filter((index) => !completedSteps.includes(index));
    setExpandedSteps(initialExpanded);

    // Calculate and store heights of all detail sections
    steps.forEach((_, index) => {
      if (detailsRefs.current[index]) {
        detailsHeightRefs.current[index] =
          detailsRefs.current[index]?.scrollHeight || 0;
      }
    });
  }, []);

  // Recalculate heights when window resizes
  useEffect(() => {
    const handleResize = () => {
      steps.forEach((_, index) => {
        if (detailsRefs.current[index]) {
          detailsHeightRefs.current[index] =
            detailsRefs.current[index]?.scrollHeight || 0;
        }
      });
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const toggleStep = (index: number) => {
    setExpandedSteps((prev) =>
      prev.includes(index) ? prev.filter((i) => i !== index) : [...prev, index]
    );
  };

  const markAsCompleted = (index: number) => {
    if (completedSteps.includes(index)) {
      setCompletedSteps(completedSteps.filter((step) => step !== index));
      // Expand the step when uncompleted
      if (!expandedSteps.includes(index)) {
        setExpandedSteps([...expandedSteps, index]);
      }
    } else {
      setCompletedSteps([...completedSteps, index]);
      // Collapse the step when completed
      setExpandedSteps(expandedSteps.filter((step) => step !== index));
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

  const toggleHandler = (index: number) => {
    toggleStep(index);

    if (freeSteps.includes(index)) {
      markAsCompleted(index);
      return;
    }
    if (index === 4 && !!feeFile?.file) {
      markAsCompleted(index);
      return;
    }
    if (index === 5 && !!repFile?.file && !!dateValue && !!documentNumber) {
      markAsCompleted(index);
      return;
    }
    // markAsCompleted(index);
  };

  const checkHandler = (index: number, title: string) => {
    if (freeSteps.includes(index)) {
      return completedSteps.includes(index);
    }

    if (title === 'Pay Government Fee') {
      return completedSteps.includes(index) && !!feeFile?.file;
    }

    if (title === 'Save Annual Report') {
      return (
        completedSteps.includes(index) &&
        !!repFile?.file &&
        !!dateValue &&
        !!documentNumber
      );
    }

    return false;
  };

  const mandatoryCheckHandler = (index: number) => {
    if (index === 3 && !expandedSteps.includes(index) && !feeFile?.file) {
      return 'border-red-500 border-2';
    }

    if (
      index === 4 &&
      !expandedSteps.includes(index) &&
      !repFile?.file &&
      !documentNumber
    ) {
      return 'border-red-500 border-2';
    }
    return '';
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
          <div className="w-full flex items-start justify-center border border-gray-200 rounded-md px-6 py-4 bg-white">
            <dl className="w-full flex items-start justify-start overflow-x-scroll pb-1">
              <div className="flex flex-col gap-y-1 pr-5">
                <dt className="text-sm text-gray-500">Year</dt>
                <dd className="text-sm font-semibold tracking-tight text-gray-800">
                  {data.year}
                </dd>
              </div>
              <div className="flex flex-col gap-y-1 border-l px-5">
                <dt className="text-nowrap text-sm text-gray-500">
                  Company Name
                </dt>
                <dd className="text-nowrap text-sm font-semibold tracking-tight text-gray-800 relative">
                  {data.companyName}
                </dd>
              </div>
              <div className="flex flex-col gap-y-1 border-l px-5">
                <dt className="text-nowrap text-sm text-gray-500">
                  Filing Date
                </dt>
                <dd className="text-nowrap text-sm font-semibold tracking-tight text-gray-800 relative">
                  {data.filingDate}
                </dd>
              </div>
              <div className="flex flex-col gap-y-1 border-l px-5">
                <dt className="text-nowrap text-sm text-gray-500">State</dt>
                <dd className="text-nowrap text-sm font-semibold tracking-tight text-gray-800 relative flex items-center justify-start">
                  <StateSolidIconHandler
                    simpleIcon={true}
                    selectedState={data.state || 'Florida'}
                    state={data.state || 'Florida'}
                  />
                  {data.state}
                </dd>
              </div>

              <div className="flex flex-col gap-y-1 border-l px-5">
                <dt className="text-nowrap text-sm text-gray-500">
                  {dockFieldHandler(data.state)}
                </dt>
                <dd className="text-nowrap text-sm font-semibold tracking-tight text-gray-800 relative">
                  {data.registrationNumber}
                </dd>
              </div>
              <div className="ml-auto">
                <a
                  href="https://services.sunbiz.org/Filings/AnnualReport/FilingStart"
                  target="_blank"
                  rel="noreferrer"
                  className=" hover:bg-gray-200/50 py-1 px-2 rounded-md flex items-center justify-center gap-2 text-gray-700 hover:cursor-pointer transition-all ease-in-out duration-150"
                >
                  <span className="font-semibold">dos.fl.gov</span>
                  <LuArrowUpRight className="w-4 h-4 font-semibold" />
                </a>
              </div>
            </dl>
          </div>
          {steps.map((step, index) => (
            <div key={index} className="border border-gray-200 rounded-md">
              {/* Task header */}
              <div
                onClick={() => toggleHandler(index)}
                className={classNames(
                  'cursor-pointer bg-white rounded-md',
                  'px-6 py-4 '
                )}
              >
                <div className={classNames('flex items-center')}>
                  {step.title !== 'Company Details' && (
                    <Checkbox
                      wrapperClass={`h-5 w-5 min-w-5 min-h-5 ${mandatoryCheckHandler(index)}`}
                      iconClass={'h-3 w-3'}
                      id={`step-${index}`}
                      title={''}
                      mandatoryError={false}
                      underInput={true}
                      checked={checkHandler(index, step.title)}
                      onChange={() => toggleHandler(index)}
                    />
                  )}

                  <div className="flex-grow">
                    <h3 className="text text-gray-700 font-semibold">
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
                    <span className="text-gray-700 font-bold mr-2">
                      {index + 1}
                    </span>
                    {index !== 5 && (
                      <ChevronDown
                        className={`w-5 h-5 transition-transform duration-300 ${
                          expandedSteps.includes(index)
                            ? 'rotate-0'
                            : '-rotate-90'
                        }`}
                        onClick={() => toggleHandler(index)}
                      />
                    )}
                  </div>
                </div>
              </div>

              {/* Task details with smooth animation */}
              <div
                ref={(el) => (detailsRefs.current[index] = el)}
                className={`transition-all duration-300 ease-in-out border-t border-gray-200 bg-gray-50 rounded-b-md`}
                style={{
                  display: index === 5 ? 'none' : '',
                  maxHeight: expandedSteps.includes(index)
                    ? `${detailsHeightRefs.current[index] || 1000}px`
                    : '0px',
                  opacity: expandedSteps.includes(index) ? 1 : 0,
                  visibility: expandedSteps.includes(index)
                    ? 'visible'
                    : 'hidden',
                  transform: expandedSteps.includes(index)
                    ? 'translateY(0)'
                    : 'translateY(-10px)',
                  pointerEvents: expandedSteps.includes(index)
                    ? 'auto'
                    : 'none',
                }}
              >
                <div className="px-6 py-4">
                  {step.details && (
                    <p className="text-sm text-gray-700 mb-3">{step.details}</p>
                  )}
                  {step.title === 'Company Details' && (
                    <div className="w-full max-w-2xl">
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
                    <>
                      <div>
                        <div
                          onClick={() => handleCopy(data.address || {}, 1)}
                          className="group text-gray-700 text-sm mb-2 font-bold relative flex items-center justify-start gap-1 hover:cursor-pointer"
                        >
                          <span>Main Address</span>
                          <div className="opacity-0 group-hover:opacity-100 transition-all duration-150 ease-in-out">
                            <CopyButton
                              wrapperClass="w-4 h-4"
                              iconClass="w-4 h-4"
                              copied={copied === 1}
                            />
                          </div>
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
                          <div className="opacity-0 group-hover:opacity-100 transition-all duration-150 ease-in-out">
                            <CopyButton
                              wrapperClass="w-4 h-4"
                              iconClass="w-4 h-4"
                              copied={copied === 2}
                            />
                          </div>
                        </div>
                        <AddressAsTable data={data.mailingAddress} />
                      </div>
                    </>
                  )}
                  {step.title === 'Check Registered Agent' && (
                    <div className="w-full flex items-start justify-between max-lg:flex-col">
                      <div className="w-2/3 flex items-start justify-between max-lg:w-full">
                        <div className="pr-1 text-gray-700 text-sm">
                          <div className="text-sm text-gray-500 mb-1">Name</div>
                          <div className="font-semibold text-gray-800">
                            {mockAgent.name}
                          </div>
                        </div>
                      </div>
                      <div className="w-full flex items-start justify-end">
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
                      <ProcessingReportPeopleSection
                        disableEdit={false}
                        hideControls={true}
                      />
                    </div>
                  )}
                  {step.title === 'Pay Government Fee' && (
                    <FeeFile setFile={setFeeFile} />
                  )}
                  {step.title === 'Save Annual Report' && (
                    <AddReportDocShort
                      data={data}
                      dateValue={dateValue}
                      setDateValue={setDateValue}
                      agentdata={mockAgent}
                      hideControls={true}
                      setDocumentNumber={setDocumentNumber}
                      documentNumber={documentNumber}
                      setRepFile={setRepFile}
                    />
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
