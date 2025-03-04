import {
  AddressFields,
  Agent,
  IFiles,
  ReportData,
} from '../../../interfaces/interfaces';
import SectionHeading from '../../company/components/SectionHeading';
import {
  classNames,
  dockFieldHandler,
  truncateString,
} from '../../../utils/helpers';
import { USStates } from '../../../constants/form/form';
import TooltipWrapper from '../../../components/shared/TooltipWrapper';
import { IconInfoCircle } from '@tabler/icons-react';
import React, { useEffect } from 'react';
import ProcessingReportPeopleSection from '../ProcessingReportPeopleSection';
import DatePicker from '../../../components/shared/Modals/addCompanyFile/datePicker';
import FileDownloadProgress from '../../createCompany/components/UploadedFile';
import DropFileArea from '../../../components/shared/Modals/addCompanyFile/DropFileArea';
import useFileUpload from '../../../utils/hooks/useFileUpload';

interface IProps {
  data: ReportData;
  agentdata: Agent;
}

const RenderAddress = (removed: boolean, address: AddressFields) => {
  return (
    <div className="text-sm">
      <div
        className={classNames(
          removed ? 'line-through text-gray-400' : 'text-gray-800'
        )}
      >
        <span>{address.address0}, </span>
        {address.address1 && <span>{address.address1}</span>}
      </div>
      <div
        className={classNames(
          removed ? 'line-through text-gray-400' : 'text-gray-800'
        )}
      >
        {address.address2 && <span>{address.address2}</span>}
        {address.address3 && (
          <span>
            {address.address2 ? ',' : ''} {address.address3}
          </span>
        )}
      </div>
      <div
        className={classNames(
          removed ? 'line-through text-gray-400' : 'text-gray-800'
        )}
      >
        <span>{address.city}, </span>
        <span>
          {USStates.find((item) => item.title === address.state)?.value || ''}{' '}
        </span>
        <span>{address.zip}</span>
      </div>
      <div
        className={classNames(
          removed ? 'line-through text-gray-400' : 'text-gray-800'
        )}
      >
        {address.country}
      </div>
      <div className="my-4" />
    </div>
  );
};

const today = new Date();

const formattedDate = today.toLocaleDateString('en-US', {
  month: 'long',
  day: '2-digit',
  year: 'numeric',
});

const AddReportDocShort = ({ data, agentdata }: IProps) => {
  const [dateValue, setDateValue] = React.useState<string>(formattedDate || '');
  const [documentNumber, setDocumentNumber] = React.useState<string>('');
  const [file, setFile] = React.useState<IFiles | null>(null);
  console.log(file, 'file');
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
    <div>
      <>
        <SectionHeading
          title={'Company Information'}
          textSettings={'text-base'}
        />
        <div className="flex items-start justify-start mb-6 max-lg:flex-col">
          <div className="w-full max-lg:mb-3">
            <div className="w-full flex items-start justify-between pb-2">
              <div className="w-2/3 text-sm max-xl:w-1/2 pr-2 text-nowrap text-gray-500">
                Year
              </div>
              <div className="w-full pr-2 text-gray-700 text-sm">
                {data.year}
              </div>
            </div>
            <div className="w-full flex items-start justify-between pb-2">
              <div className="w-2/3 text-sm max-xl:w-1/2 pr-2 text-nowrap text-gray-500">
                Company Name
              </div>
              <div className="w-full pr-2 text-gray-700 text-sm">
                {data.companyName}
              </div>
            </div>
            <div className="w-full flex items-start justify-between pb-2">
              <div className="w-2/3 text-sm max-xl:w-1/2 pr-2 text-nowrap text-gray-500">
                State
              </div>
              <div className="w-full pr-2 text-gray-700 text-sm">
                {data.state}
              </div>
            </div>
            <div className="w-full flex items-start justify-between pb-2">
              <div className="w-2/3 text-sm max-xl:w-1/2 pr-2 text-nowrap text-gray-500">
                {dockFieldHandler(data.state)}
              </div>
              <div className="w-full pr-2 text-gray-700 text-sm">
                {data.registrationNumber}
              </div>
            </div>
          </div>
        </div>
        <SectionHeading title={'Address'} textSettings={'text-base'} />
        <div className="flex items-start justify-start mb-6 max-lg:flex-col gap-44 max-lg:gap-6">
          <div>
            <div className="mb-1 w-full flex items-center justify-between">
              <span className="text-sm text-gray-500 ">Main Address</span>
            </div>
            <div className="flex items-start justify-start gap-16">
              <div className="w-full">
                {RenderAddress(false, data.updatedAddress || data.address)}
              </div>
            </div>
          </div>
          <div className="ml-2">
            <div className="mb-1 w-full flex items-center justify-between">
              <span className="text-sm text-gray-500 ">Mailing Address</span>
            </div>
            <div className="flex items-start justify-start gap-12">
              <div className="w-full">
                {RenderAddress(
                  false,
                  data.updatedMailingAddress || data.mailingAddress
                )}
              </div>
              <div>
                {data.updatedMailingAddress &&
                  RenderAddress(
                    !!data.updatedMailingAddress,
                    data.mailingAddress
                  )}
              </div>
            </div>
          </div>
        </div>
        <SectionHeading title="Registered Agent" textSettings={'text-base'} />
        <div className="w-full flex items-start justify-start mb-6 max-lg:flex-col gap-40 max-lg:gap-6">
          <div className="flex items-start justify-between pb-2 max-lg:w-full">
            <div className="pr-1 text-gray-700 text-sm">
              <div className="text-sm text-gray-500 mb-1">Name</div>
              <div className="font-semibold">{agentdata.name}</div>
            </div>
          </div>
          <div className="flex items-start justify-start pb-2 ml-1">
            <div className="w-full pr-2 text-gray-700 text-sm">
              <div className="text-sm text-gray-500 mb-1">Address</div>
              <div>
                <span>{agentdata.address.address0}, </span>
                {agentdata.address.address1 && (
                  <span>{agentdata.address.address1}</span>
                )}
              </div>
              <div>
                {agentdata.address.address2 && (
                  <span>{agentdata.address.address2}</span>
                )}
                {agentdata.address.address3 && (
                  <span>
                    {agentdata.address.address2 ? ',' : ''}{' '}
                    {agentdata.address.address3}
                  </span>
                )}
              </div>
              <div>
                <span>{agentdata.address.city}, </span>
                <span>
                  {USStates.find(
                    (item) => item.title === agentdata.address.state
                  )?.value || ''}{' '}
                </span>
                <span>{agentdata.address.zip}</span>
                {agentdata.address?.county && (
                  <span>
                    , {agentdata.address?.county}
                    <TooltipWrapper tooltipText="County">
                      <IconInfoCircle className="w-3.5 h-3.5 relative -right-1 top-0.5 text-gray-400 hover:cursor-pointer hover:text-gray-500" />
                    </TooltipWrapper>
                  </span>
                )}
              </div>
              <div>{agentdata.address.country}</div>
            </div>
          </div>
        </div>
        <SectionHeading title="People" textSettings={'text-base'} />
        <div className="mb-6">
          <ProcessingReportPeopleSection disableEdit={true} />
        </div>
        <SectionHeading title="Report Details" textSettings={'text-base'} />
        <div className="mb-4">
          <input
            onChange={(e) => setDocumentNumber(e.target.value)}
            className={classNames(
              'block rounded-md border w-full  border-gray-200 p-2 text-md mb-2 text-gray-900 disabled:text-opacity-50 placeholder:text-gray-500  hover:cursor-pointer'
            )}
            type="text"
            placeholder="State ID"
            value={documentNumber}
          />
        </div>
        <div className="mb-4">
          <DatePicker
            mandatoryError={false}
            value={dateValue}
            setValue={setDateValue}
          />
        </div>
        <div className="mb-4">
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
      </>
    </div>
  );
};

export default AddReportDocShort;
