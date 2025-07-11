import {
  AddressFields,
  Agent,
  ReportData,
} from '../../../interfaces/interfaces';
import SectionHeading from '../../company/components/SectionHeading';
import { classNames, dockFieldHandler } from '../../../utils/helpers';
import TooltipWrapper from '../../../components/shared/TooltipWrapper';
import { IconInfoCircle } from '@tabler/icons-react';
import React, { useEffect } from 'react';
import ProcessingReportPeopleSection from '../ProcessingReportPeopleSection';
import DatePicker from '../../../components/shared/Modals/addCompanyFile/datePicker';
import FileDownloadProgress from '../../createCompany/components/UploadedFile';
import DropFileArea from '../../../components/shared/Modals/addCompanyFile/DropFileArea';
import useFileUpload from '../../../utils/hooks/useFileUpload';
import { useRecoilValue } from 'recoil';
import GlobalDataState from '../../../state/atoms/GlobalData';

interface IProps {
  data: ReportData;
  agentdata: Agent;
  hideControls?: boolean;
  setDateValue: (value: string) => void;
  dateValue: string;
  setDocumentNumber: (value: string) => void;
  documentNumber: string;
  setRepFile: (file: File | null) => void;
  hideRemovedPeople?: boolean;
}

const RenderAddress = (removed: boolean, address: AddressFields) => {
  const globalData = useRecoilValue(GlobalDataState);

  return (
    <div className="text-sm">
      <div
        className={classNames(
          removed ? 'line-through text-gray-400' : 'text-gray-800'
        )}
      >
        <span>{address.line1}, </span>
        {address.line2 && <span>{address.line2}</span>}
      </div>
      <div
        className={classNames(
          removed ? 'line-through text-gray-400' : 'text-gray-800'
        )}
      >
        {address.line3 && <span>{address.line3}</span>}
        {address.line4 && (
          <span>
            {address.line3 ? ',' : ''} {address.line4}
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
          {globalData.states.find((item) => item.name === address.state)
            ?.abbreviation || ''}{' '}
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

const AddReportDocShort = ({
  data,
  agentdata,
  hideControls,
  setDateValue,
  dateValue,
  setDocumentNumber,
  documentNumber,
  setRepFile,
  hideRemovedPeople,
}: IProps) => {
  const [file, setFile] = React.useState<File | null>(null);
  console.log(file, 'file');

  const globalData = useRecoilValue(GlobalDataState);

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;
    if (value.length <= 12) {
      setDocumentNumber(value);
    }
  };

  const {
    inputRef,
    selectedFile,
    handleFileInput,
    handleFileDrop,
    deleteFileHandler,
  } = useFileUpload();

  useEffect(() => {
    setRepFile(selectedFile);
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
              <div className="ml-2 w-full pr-2 text-gray-700 text-sm">
                {data.year}
              </div>
            </div>
            <div className="w-full flex items-start justify-between pb-2">
              <div className="w-2/3 text-sm max-xl:w-1/2 pr-2 text-nowrap text-gray-500">
                Company Name
              </div>
              <div className="ml-2 w-full pr-2 text-gray-700 text-sm">
                {data.companyName}
              </div>
            </div>
            <div className="w-full flex items-start justify-between pb-2">
              <div className="w-2/3 text-sm max-xl:w-1/2 pr-2 text-nowrap text-gray-500">
                State
              </div>
              <div className="ml-2 w-full pr-2 text-gray-700 text-sm">
                {data.state}
              </div>
            </div>
            <div className="w-full flex items-start justify-between pb-2">
              <div className="w-2/3 text-sm max-xl:w-1/2 pr-2 text-nowrap text-gray-500">
                {dockFieldHandler(data.state)}
              </div>
              <div className="ml-2 w-full pr-2 text-gray-700 text-sm">
                {data.registrationNumber}
              </div>
            </div>
          </div>
        </div>
        <SectionHeading title={'Address'} textSettings={'text-base'} />
        <div className="flex items-start justify-start mb-6 max-lg:flex-col max-lg:gap-6">
          <div className="w-2/3">
            <div className="mb-1 w-full flex items-center justify-between">
              <span className="text-sm text-gray-500 ">Main Address</span>
            </div>
            <div className="flex items-start justify-start gap-16">
              <div className="w-full">
                {RenderAddress(false, data.updatedAddress || data.address)}
              </div>
            </div>
          </div>
          <div className="ml-2 w-full">
            <div className="mb-1 w-full flex items-center justify-between">
              <span className="text-sm text-gray-500 ">Mailing Address</span>
            </div>
            <div className="flex items-start justify-start gap-12">
              {RenderAddress(
                false,
                data.updatedMailingAddress || data.mailingAddress
              )}
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
                  {globalData.states.find(
                    (item) => item.name === agentdata.address.state
                  )?.abbreviation || ''}{' '}
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
          <ProcessingReportPeopleSection
            disableEdit={true}
            hideRemovedPerson={hideRemovedPeople}
            hideControls={hideControls}
          />
        </div>
        <div className="text-sm text-gray-700 mb-3">
          Provide State ID and Annual Report filing date.
        </div>
        <div className="mb-4">
          <input
            onChange={handleInputChange}
            className={classNames(
              'block rounded-md border w-full  border-gray-200 p-2 text-md mb-2 text-gray-900 disabled:text-opacity-50 placeholder:text-gray-500  hover:cursor-pointer focus:placeholder:opacity-0'
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
        <div>
          {selectedFile?.name ? (
            <div className="w-full">
              <FileDownloadProgress
                deleteFileHandler={deleteFileHandler}
                fileName={selectedFile.name}
                fileSize={`${selectedFile?.size} MB`}
                // fileFormat={selectedFile.format}
                fileFormat={'Jpeg'}
                duration={3}
                wrapperStyles={'bg-white'}
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
