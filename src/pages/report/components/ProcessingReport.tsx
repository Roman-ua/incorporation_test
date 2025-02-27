import React, { useRef, useState } from 'react';
import {
  Globe,
  Building,
  UserCheck,
  Users,
  DollarSign,
  Save,
  File,
  FileText,
  CheckCircle,
  ChevronRight,
  ChevronDown,
  Upload,
  X,
} from 'lucide-react';
import PageSign from '../../../components/shared/PageSign';

const steps = [
  {
    title: 'Open Government Website',
    description:
      'Navigate to the official government website for business filings and annual reports.',
    icon: <Globe className="w-6 h-6" />,
    details:
      "Access the official government portal for business registrations and filings. Make sure you're using the correct URL for the jurisdiction where the company is registered.",
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
    description:
      'Process payment for the filing fee and save the confirmation.',
    icon: <DollarSign className="w-6 h-6" />,
    details:
      "Complete the payment process for any required government fees. Use the company's preferred payment method. After payment is processed, upload the payment confirmation receipt for record-keeping purposes.",
    hasFileUpload: true,
    fileUploadLabel: 'Upload payment confirmation',
  },
  {
    title: 'Save Annual Report',
    description: 'Download and save a copy of the completed Annual Report.',
    icon: <Save className="w-6 h-6" />,
    details:
      "Once all information has been verified and submitted, download a PDF copy of the completed Annual Report. Upload this document to the company's digital records system with appropriate naming conventions for easy retrieval.",
    hasFileUpload: true,
    fileUploadLabel: 'Upload annual report',
  },
  {
    title: 'Invoice Customer',
    description:
      'Generate and send an invoice to the customer for services rendered.',
    icon: <FileText className="w-6 h-6" />,
    details:
      'Create an invoice for the customer that includes itemized services (filing preparation, government fees, service fees, etc.). Send the invoice to the customer via their preferred communication method and record the invoice in your accounting system.',
    hasFileUpload: false,
  },
];

const ProcessingReport = () => {
  const [activeStep, setActiveStep] = useState<number | null>(null);
  const [completedSteps, setCompletedSteps] = useState<number[]>([]);
  const [uploadedFiles, setUploadedFiles] = useState<{ [key: number]: File[] }>(
    {}
  );

  const fileInputRefs = useRef<{ [key: number]: HTMLInputElement | null }>({});

  const toggleStep = (index: number) => {
    setActiveStep(activeStep === index ? null : index);
  };

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

  const triggerFileInput = (index: number) => {
    if (fileInputRefs.current[index]) {
      fileInputRefs.current[index]?.click();
    }
  };

  return (
    <div className="min-h-screen">
      <div className="mx-auto px-4 pb-12">
        <div className="mb-5">
          <PageSign
            titleSize={'text-2xl font-bold text-gray-900'}
            title={`Admin To-Do Process`}
            icon={<></>}
          />
        </div>
        <div className="mx-auto">
          <div className="bg-white rounded-xl shadow-xl overflow-hidden">
            <div className="bg-gray-100 px-6 py-8 text-gray-900">
              <p className="mt-2 opacity-90">
                Follow these steps to process customer orders and annual reports
              </p>
              <div className="mt-4 flex items-center">
                <div className="bg-gray-700 px-3 py-1 text-white rounded-full text-sm font-medium">
                  {completedSteps.length} of {steps.length} tasks completed
                </div>
                <div className="ml-4 bg-white h-2 flex-1 rounded-full overflow-hidden">
                  <div
                    className="bg-green-400 h-full transition-all duration-500 ease-out"
                    style={{
                      width: `${(completedSteps.length / steps.length) * 100}%`,
                    }}
                  ></div>
                </div>
              </div>
            </div>

            <div className="divide-y divide-gray-200">
              {steps.map((step, index) => (
                <div
                  key={index}
                  className={`transition-all duration-300 ${
                    completedSteps.includes(index) ? '' : 'bg-white'
                  }`}
                >
                  <div
                    className="px-6 py-4 cursor-pointer flex items-center"
                    onClick={() => toggleStep(index)}
                  >
                    <div
                      className={`flex-shrink-0 w-10 h-10 rounded-full flex items-center justify-center mr-4 transition-colors duration-300 ${'bg-gray-100 text-gray-600'}`}
                    >
                      {step.icon}
                    </div>
                    <div className="flex-grow">
                      <h3 className="text-lg font-medium text-gray-900">
                        {step.title}
                      </h3>
                      <p className="text-sm text-gray-500">
                        {step.description}
                      </p>
                    </div>
                    <div className="flex items-center ml-4">
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          markAsCompleted(index);
                        }}
                        className={`mr-3 w-6 h-6 flex-shrink-0 transition-all duration-300 ${
                          completedSteps.includes(index)
                            ? 'text-green-500 hover:text-green-700'
                            : 'text-gray-400 hover:text-gray-600'
                        }`}
                      >
                        <CheckCircle className="w-full h-full" />
                      </button>
                      {activeStep === index ? (
                        <ChevronDown className="w-5 h-5 text-gray-400" />
                      ) : (
                        <ChevronRight className="w-5 h-5 text-gray-400" />
                      )}
                    </div>
                  </div>

                  <div
                    className={`px-6 py-4 bg-gray-50 overflow-hidden transition-all duration-500 ease-in-out ${
                      activeStep === index
                        ? 'max-h-96 opacity-100'
                        : 'max-h-0 opacity-0'
                    }`}
                  >
                    <div className="pl-14">
                      <p className="text-gray-700">{step.details}</p>
                      {step.hasFileUpload && (
                        <div className="mt-4">
                          <input
                            type="file"
                            ref={(el) => (fileInputRefs.current[index] = el)}
                            onChange={(e) => handleFileUpload(index, e)}
                            className="hidden"
                            multiple
                          />

                          <div className="mt-2">
                            {uploadedFiles[index]?.length > 0 ? (
                              <div className="space-y-2">
                                <p className="text-sm font-medium text-gray-700">
                                  Uploaded files:
                                </p>
                                <div className="space-y-2">
                                  {uploadedFiles[index].map(
                                    (file, fileIndex) => (
                                      <div
                                        key={fileIndex}
                                        className="flex items-center p-2 bg-white rounded-md border border-gray-200 group"
                                      >
                                        <File className="w-5 h-5 text-blue-500 mr-2" />
                                        <span className="text-sm text-gray-700 flex-grow truncate">
                                          {file.name}
                                        </span>
                                        <span className="text-xs text-gray-500 mx-2">
                                          {(file.size / 1024).toFixed(1)} KB
                                        </span>
                                        <button
                                          onClick={(e) => {
                                            e.stopPropagation();
                                            removeFile(index, fileIndex);
                                          }}
                                          className="p-1 rounded-full text-gray-400 hover:text-gray-900 transition-colors duration-200"
                                        >
                                          <X className="w-4 h-4" />
                                        </button>
                                      </div>
                                    )
                                  )}
                                </div>
                              </div>
                            ) : null}

                            <button
                              onClick={(e) => {
                                e.stopPropagation();
                                triggerFileInput(index);
                              }}
                              className="mt-3 flex items-center px-4 py-2 bg-white border border-gray-300 rounded-md text-sm text-gray-700 hover:bg-gray-50 transition-colors duration-300"
                            >
                              <Upload className="w-4 h-4 mr-2" />
                              {step.fileUploadLabel || 'Upload File'}
                            </button>
                          </div>
                        </div>
                      )}
                      <div className="mt-4 flex space-x-3">
                        <button
                          className="block rounded-md bg-mainBlue px-3 py-2 text-center text-sm font-semibold text-white shadow-sm hover:bg-sideBarBlue focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 transition-all duration-150 ease-in-out hover:cursor-pointer"
                          onClick={(e) => {
                            e.stopPropagation();
                            if (
                              step.hasFileUpload &&
                              (!uploadedFiles[index] ||
                                uploadedFiles[index].length === 0)
                            ) {
                              return;
                            }
                            if (!completedSteps.includes(index)) {
                              markAsCompleted(index);
                            }
                            if (index < steps.length - 1) {
                              setActiveStep(index + 1);
                            }
                          }}
                        >
                          {completedSteps.includes(index)
                            ? 'Completed'
                            : 'Mark as Complete'}
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="px-6 py-4 bg-gray-50 border-t border-gray-200">
              <div className="flex justify-between items-center">
                <p className="text-sm text-gray-500">
                  {completedSteps.length === steps.length
                    ? 'All tasks completed! 🎉'
                    : `${steps.length - completedSteps.length} tasks remaining`}
                </p>
                <button
                  className={`px-3 py-2 rounded-md text-sm font-semibold transition-all duration-300 ${
                    completedSteps.length === steps.length
                      ? 'bg-green-600 text-white hover:bg-green-700'
                      : 'bg-blue-600 text-white hover:bg-blue-700'
                  }`}
                >
                  {completedSteps.length === steps.length
                    ? 'Process Complete'
                    : 'Save Progress'}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProcessingReport;
