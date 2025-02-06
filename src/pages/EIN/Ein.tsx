import React, { useState } from 'react';
import { MdOpenInNew, MdOutlineCopyAll } from 'react-icons/md';
import SectionHeading from '../company/components/SectionHeading';
import { useNavigate } from 'react-router-dom';
import { ROUTES } from '../../constants/navigation/routes';
import PageSign from '../../components/shared/PageSign';
import { FaHashtag } from 'react-icons/fa';
import { IoMdCheckmark } from 'react-icons/io';
import { copyToClipboard } from '../../utils/helpers';
import AddEinModal from '../../components/shared/Modals/addCompanyFile/AddEinModal';
import { MockData, UpdatedState } from '../../interfaces/interfaces';
import { USStates } from '../../constants/form/form';
import ActionUploadBlock from './components/ActionUploadBlock';
import EinFilesSection from './components/FilesSection';

const mockStatuses = ['Confirmation Needed', 'Confirmed', 'Archived'];

const mockData = {
  taxId: '12-3456789',
  status: 'Confirmation Needed',
  companyName: 'ABC Company Inc.',
  lastVerifDate: '',
  documentType: [],
  relatedAddress: null,
  relatedDocument: null,
};

const statusBadge = (status: string) => {
  switch (status) {
    case 'Confirmation Needed':
      return 'bg-yellow-50 text-yellow-700 ring-yellow-600/20';
    case 'Confirmed':
      return 'bg-green-50 text-green-700 ring-green-600/20';
    case 'Archived':
      return 'bg-grey-50 text-grey-700 ring-grey-600/20';
    default:
      return 'bg-grey-50 text-grey-700 ring-grey-600/20';
  }
};

function classNames(...classes: (string | boolean)[]) {
  return classes.filter(Boolean).join(' ');
}

const Ein = () => {
  const [copied, setCopied] = React.useState('');
  const [open, setOpen] = useState(false);
  const [data, setData] = React.useState<MockData>(mockData);

  const navigate = useNavigate();

  const saveHandler = (updatedState: UpdatedState) => {
    setData((prevData) => {
      const newData = { ...prevData };

      Object.keys(updatedState).forEach((key) => {
        const typedKey = key as keyof MockData;
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-expect-error
        newData[typedKey] = updatedState[typedKey];
      });

      return newData;
    });
  };
  console.log(data, 'data');
  return data ? (
    <div className="container max-w-7xl mx-auto pl-10 pr-10 pb-8 pt-24 text-sm">
      <AddEinModal
        isOnlyNumber={false}
        setOpen={setOpen}
        open={open}
        saveHandler={saveHandler}
        ein={data?.taxId}
        docType={data?.documentType}
        lastVerifDate={data?.lastVerifDate}
        companyName={data?.companyName || ''}
      />
      <PageSign
        title={'EIN (TAX ID)'}
        icon={<FaHashtag className="w-3 h-3 text-gray-400 mr-1" />}
      />
      <div className="w-full flex items-center justify-between pb-2 pr-2 border-b">
        <span
          onClick={(event) => {
            event.stopPropagation();
            setCopied('Copied!');

            const timer = setTimeout(() => {
              clearTimeout(timer);
              setCopied('');
            }, 700);

            copyToClipboard('12-3456789');
          }}
          className="text-2xl font-bold text-gray-700 group hover:cursor-pointer flex items-center relative pr-7"
        >
          {data?.taxId || ''}
          <IoMdCheckmark
            className={classNames(
              'w-5 h-5 text-gray-500 group-hover:text-gray-500 transition-all ease-in-out duration-150 ml-1 absolute right-0 top-1.5',
              copied ? 'opacity-100' : 'opacity-0'
            )}
          />
          <MdOutlineCopyAll
            className={classNames(
              'w-5 h-5 text-gray-500 group-hover:text-gray-500 transition-all ease-in-out duration-150 ml-1 absolute right-0 top-1.5',
              !copied ? 'opacity-0 group-hover:opacity-100' : 'opacity-0'
            )}
          />
        </span>
        <span className="p-1 rounded flex items-center text-gray-600 text-sm hover:cursor-pointer hover:bg-gray-100 transition-all duration-150 ease-in-out">
          ein_1v2FG
          <MdOutlineCopyAll className="text-base ml-2" />
        </span>
      </div>
      <dl className="w-full mt-4 mb-12 flex items-start justify-start overflow-x-scroll">
        <div className="flex flex-col gap-y-1 pr-5">
          <dt className="text-sm text-gray-500">Status</dt>
          <span
            className={classNames(
              'text-nowrap w-fit inline-flex items-center rounded-md  px-2 py-1 text-xs font-medium  ring-1 ring-inset',
              statusBadge(mockStatuses[0])
            )}
          >
            {mockStatuses[0]}
          </span>
        </div>
        <div className="flex flex-col gap-y-1 border-l pl-5 pr-3">
          <dt className="text-sm text-gray-500">Company</dt>
          <span
            onClick={() => navigate(ROUTES.COMPANY)}
            className="text-nowrap flex items-center text-base font-semibold tracking-tight text-gray-700 group hover:cursor-pointer"
          >
            {data?.companyName}
            <MdOpenInNew className="text-gray-500 text-sm ml-2 opacity-0 group-hover:opacity-100 transition-all ease-in-out duration-150" />
          </span>
        </div>
        <div className="flex flex-col gap-y-1 border-l px-5">
          <dt className="text-nowrap text-sm text-gray-500">
            Last verification date
          </dt>
          <dd className="text-nowrap text-base font-semibold tracking-tight text-gray-700">
            {data?.lastVerifDate || '-'}
          </dd>
        </div>
        <div className="flex flex-col gap-y-1 border-l px-5">
          <dt className="text-sm text-gray-500">Document Type</dt>
          <dd className="text-base font-semibold tracking-tight text-gray-700 flex items-center flex-wrap">
            {data?.documentType?.length
              ? data.documentType.map((item) => (
                  <div
                    key={item}
                    className={classNames(
                      'text-nowrap flex items-center text-xs px-2 py-1 font-medium rounded-md ring-1 ring-inset mr-1 mb-1 bg-gray-100 text-gray-700 ring-gray-600/20'
                    )}
                  >
                    {item}
                  </div>
                ))
              : '-'}
          </dd>
        </div>
      </dl>

      {!data?.relatedDocument && (
        <div className="w-full flex items-center justify-center pb-2 pr-2 mt-8">
          <ActionUploadBlock setOpen={() => setOpen(true)} />
        </div>
      )}

      {data.relatedAddress && data.relatedAddress?.address0 && (
        <>
          <SectionHeading title="Related Address" />
          <div className="mt-2 w-1/2 gap-4 mb-11 text-gray-700">
            <>
              <div>
                <span>{data.relatedAddress.address0}, </span>
                {data.relatedAddress.address1 && (
                  <span>{data.relatedAddress.address1}</span>
                )}
              </div>
              <div>
                {data.relatedAddress.address2 && (
                  <span>{data.relatedAddress.address2}</span>
                )}
                {data.relatedAddress.address3 && (
                  <span>
                    {data.relatedAddress.address2 ? ',' : ''}{' '}
                    {data.relatedAddress.address3}
                  </span>
                )}
              </div>
              <div>
                <span>{data.relatedAddress.city}, </span>
                <span>
                  {USStates.find(
                    (item) => item.title === data.relatedAddress?.state
                  )?.value || ''}{' '}
                </span>
                <span>{data.relatedAddress.zip}</span>
              </div>
              <div>{data.relatedAddress.country}</div>
            </>
          </div>
        </>
      )}

      {data?.relatedDocument && (
        <>
          <SectionHeading
            title="Documents"
            btnTitle="Upload Confirmation Document"
            clickHandler={() => setOpen(true)}
          />
          <EinFilesSection
            files={[data.relatedDocument]}
            address={data.relatedAddress}
          />
        </>
      )}
    </div>
  ) : (
    <></>
  );
};

export default Ein;
