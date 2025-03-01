import React, { useRef, useState } from 'react';
import {
  Globe,
  Building,
  UserCheck,
  Users,
  DollarSign,
  Save,
  FileText,
  Upload,
  X,
  FileIcon,
} from 'lucide-react';
import PageSign from '../../../components/shared/PageSign';
import { Checkbox } from '../../../components/shared/Checkboxes/CheckBoxSq';

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
  const [completedSteps, setCompletedSteps] = useState<number[]>([]);
  const [uploadedFiles, setUploadedFiles] = useState<{ [key: number]: File[] }>(
    {}
  );

  const fileInputRefs = useRef<{ [key: number]: HTMLInputElement | null }>({});

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
        <div className="space-y-4 mb-8">
          {steps.map((step, index) => (
            <div
              key={index}
              className="border border-gray-200 rounded-md overflow-hidden"
            >
              {/* Task header */}
              <div className="px-4 py-3 flex items-center cursor-pointer bg-white">
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

                <div className="flex-grow ml-1">
                  <h3 className="text font-medium text-gray-700">
                    {step.title}
                  </h3>
                  <p className="text-sm text-gray-500 mt-0.5">
                    {step.description}
                  </p>
                </div>

                <div className="flex-shrink-0 ml-2 text-gray-400">
                  <span className="text-gray-700 font-bold">{index + 1}</span>
                </div>
              </div>

              {/* Task details */}
              <div
                className={`overflow-hidden transition-all duration-300 ${
                  !completedSteps.includes(index)
                    ? 'max-h-96 border-t border-gray-200'
                    : 'max-h-0'
                }`}
              >
                <div className="px-4 py-3 bg-gray-50">
                  <p className="text-sm text-gray-700 mb-4">{step.details}</p>

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

                      {/* Upload button */}
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          triggerFileInput(index);
                        }}
                        className="inline-flex px-3 py-2 hover:bg-gray-100 rounded-md items-center text-xs font-medium text-blue-500 hover:text-blue-600 transition-all duration-200 ease-in-out"
                      >
                        <Upload className="w-3.5 h-3.5 mr-1" />
                        {step.fileUploadLabel || 'Upload file'}
                      </button>
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
