import React from 'react';
import { MdOpenInNew, MdOutlineCopyAll } from 'react-icons/md';
import SectionHeading from '../company/components/SectionHeading';
import { USStates } from '../../constants/form/form';
import { useNavigate } from 'react-router-dom';
import { ROUTES } from '../../constants/navigation/routes';
import PageSign from '../../components/shared/PageSign';
import { FaHashtag } from 'react-icons/fa';

const mockStatuses = ['Confirmation Needed', 'Confirmed', 'Archived'];
const mockFiles = [
  {
    id: 1,
    icon: 'pdf',
    name: 'File One',
    label: 'CP575A',
    type: 'pdf',
    date: '2021-05-23',
  },
  {
    id: 2,
    icon: 'Screenshot',
    name: 'File Two',
    label: 'Screenshot',
    type: 'jpg',
    date: '2021-05-23',
  },
  {
    id: 3,
    icon: 'CP575G',
    name: 'File Three',
    label: 'CP575G',
    type: 'xls',
    date: '2021-05-23',
  },
  {
    id: 4,
    icon: '147C',
    name: 'File Four',
    label: '147C',
    type: 'xlsx',
    date: '2021-05-23',
  },
  {
    id: 5,
    icon: 'Faxed SS-4',
    name: 'File Five',
    label: 'Faxed SS-4',
    type: 'xls',
    date: '2021-05-23',
  },
  {
    id: 6,
    icon: 'W-9',
    name: 'File Six',
    label: 'W-9',
    type: 'pdf',
    date: '2021-05-23',
  },
  {
    id: 7,
    icon: 'CP577',
    name: 'File Seven',
    label: 'CP577',
    type: 'jpg',
    date: '2021-05-23',
  },
  {
    id: 8,
    icon: 'CP577E',
    name: 'File Eight',
    label: 'CP577E',
    type: 'pdf',
    date: '2021-05-23',
  },
];

const labelBadgeHandler = (label: string) => {
  switch (label) {
    case 'CP575A':
      return 'bg-red-100 text-red-700 ring-red-600/20';
    case 'Screenshot':
      return 'bg-yellow-100 text-yellow-700 ring-yellow-600/20';
    case 'CP575G':
      return 'bg-blue-100 text-blue-700 ring-blue-600/20';
    case '147C':
      return 'bg-purple-100 text-purple-700 ring-purple-600/20';
    case 'Faxed SS-4':
      return 'bg-green-100 text-green-700 ring-green-600/20';
    case 'W-9':
      return 'bg-red-100 text-red-700 ring-red-600/20';
    case 'CP577':
      return 'bg-yellow-100 text-yellow-700 ring-yellow-600/20';
    case 'CP577E':
      return 'bg-red-100 text-red-700 ring-red-600/20';
    default:
      return 'bg-blue-100 text-blue-700 ring-blue-600/20';
  }
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
  const localData = localStorage.getItem('finalFormData');
  const data = localData ? JSON.parse(localData) : undefined;
  const navigate = useNavigate();

  return data ? (
    <div className="container max-w-7xl mx-auto pl-10 pr-10 pb-8 pt-24">
      <PageSign
        title={'EIN (Tax ID)'}
        icon={<FaHashtag className="w-4 h-4 text-gray-400 mr-1" />}
      />
      <div className="w-full flex items-center justify-between pb-2 pr-2 border-b">
        <span className="text-2xl font-bold text-gray-700">12-3456789</span>
        <span className="p-1 rounded flex items-center text-gray-600 text-sm hover:cursor-pointer hover:bg-gray-100 transition-all duration-150 ease-in-out">
          ein_1v2FG
          <MdOutlineCopyAll className="text-base ml-2" />
        </span>
      </div>
      <dl className="w-full mt-4 mb-12 flex items-center justify-start">
        <div className="flex flex-col gap-y-1 pr-5">
          <dt className="text-sm text-gray-500">Status</dt>
          <span
            className={classNames(
              'w-fit inline-flex items-center rounded-md  px-2 py-1 text-xs font-medium  ring-1 ring-inset',
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
            className="flex items-center text-base font-semibold tracking-tight text-gray-700 group hover:cursor-pointer"
          >
            {data?.companyName}
            <MdOpenInNew className="text-gray-500 text-sm ml-2 opacity-0 group-hover:opacity-100 transition-all ease-in-out duration-150" />
          </span>
        </div>
        <div className="flex flex-col gap-y-1 border-l px-5">
          <dt className="text-sm text-gray-500">Last verification date</dt>
          <dd className="text-base font-semibold tracking-tight text-gray-700">
            {data?.registrationDate}
          </dd>
        </div>
        <div className="flex flex-col gap-y-1 border-l px-5">
          <dt className="text-sm text-gray-500">Document Type</dt>
          <dd className="text-base font-semibold tracking-tight text-gray-700 flex items-center">
            {mockFiles.map((file) => {
              return (
                <div
                  key={file.id}
                  className={classNames(
                    'flex items-center text-xs px-2 font-medium rounded ring-1 ring-inset leading-5 mr-1',
                    labelBadgeHandler(file.label)
                  )}
                >
                  {file.label}
                </div>
              );
            })}
          </dd>
        </div>
      </dl>
      <SectionHeading title="Related Address" />
      <div className="mt-2 w-1/2 gap-4 mb-11 text-gray-700">
        <>
          <div>
            <span>{data.address.address0}, </span>
            {data.address.address1 && <span>{data.address.address1}</span>}
          </div>
          <div>
            {data.address.address2 && <span>{data.address.address2}</span>}
            {data.address.address3 && (
              <span>
                {data.address.address2 ? ',' : ''} {data.address.address3}
              </span>
            )}
          </div>
          <div>
            <span>{data.address.city}, </span>
            <span>
              {USStates.find((item) => item.title === data.address.state)
                ?.value || ''}{' '}
            </span>
            <span>{data.address.zip}</span>
          </div>
          <div>{data.address.country}</div>
        </>
      </div>
      <SectionHeading title="Documents" />
    </div>
  ) : (
    <></>
  );
};

export default Ein;
