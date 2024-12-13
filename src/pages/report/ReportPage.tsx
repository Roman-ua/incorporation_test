import PageSign from '../../components/shared/PageSign';
import { MdOutlineCloudDownload, MdOutlineCopyAll } from 'react-icons/md';
import { classNames } from '../../utils/helpers';
import React from 'react';
import { HiOutlineDocumentReport } from 'react-icons/hi';
import { IconFileTypePdf, IconLink } from '@tabler/icons-react';
import SectionHeading from '../company/components/SectionHeading';
import { USStates } from '../../constants/form/form';

const mockData = {
  id: 1,
  year: 2021,
  status: 'Need to File',
  filingDate: 'February 12, 2021',
  confirmedBy: 'John Doe',
  relatedOrder: 'ord_12312',
  attachedFiles: true,
  confirmationLinks: [],
  address: {
    country: 'United States',
    address0: '1234 Elm St',
    address1: 'Apt 5B',
    address2: '',
    address3: '',
    city: 'Birmingham',
    zip: '35203',
    state: 'Alabama',
  },
  mailingAddress: {
    country: 'United States',
    address0: '1234 Elm St',
    address1: 'Apt 5B',
    address2: '',
    address3: '',
    city: 'Birmingham',
    zip: '35203',
    state: 'Alabama',
  },
  companyName: 'ABC Company',
  file: 'rep_2021',
  people: [],
  signed: 'John Doe',
};
const statusBadge = (status: string) => {
  switch (status) {
    case 'Filed':
      return 'bg-green-50 text-green-700 ring-green-600/20';
    case 'Need to File':
      return 'bg-red-50 text-red-700 ring-red-600/20';
    case 'Declined':
      return 'bg-gray-50 text-gray-700 ring-gray-600/20';
    case 'Pending Confirmation':
      return 'bg-gray-50 text-gray-700 ring-gray-600/20';
    default:
      return 'bg-gray-50 text-gray-700 ring-gray-600/20';
  }
};

const ReportPage = () => {
  return (
    <div className="container max-w-7xl mx-auto pl-10 pr-10 pb-8 pt-24">
      <PageSign
        title={'REPORT'}
        icon={
          <HiOutlineDocumentReport className="w-3 h-3 text-gray-400 mr-1" />
        }
      />
      <div className="w-full flex items-center justify-between pb-2 pr-2 border-b">
        <span className="text-2xl font-bold text-gray-700">Annual Report</span>
        <span className="p-1 rounded flex items-center text-gray-600 text-sm hover:cursor-pointer hover:bg-gray-100 transition-all duration-150 ease-in-out">
          rep_1v2FG
          <MdOutlineCopyAll className="text-base ml-2" />
        </span>
      </div>
      <dl className="w-full mt-4 mb-12 flex items-start justify-start overflow-x-scroll">
        <div className="flex flex-col gap-y-1 pr-5">
          <dt className="text-sm text-gray-500">Year</dt>
          <dd className="text-base font-semibold tracking-tight text-gray-700">
            {mockData?.year}
          </dd>
        </div>
        <div className="flex flex-col gap-y-1 border-l px-5">
          <dt className="text-nowrap text-sm text-gray-500">Status</dt>
          <span
            className={classNames(
              'w-fit inline-flex items-center rounded-md  px-2 py-1 text-xs font-medium  ring-1 ring-inset',
              statusBadge(mockData?.status)
            )}
          >
            {mockData?.status}
          </span>
        </div>
        <div className="flex flex-col gap-y-1 border-l px-5">
          <dt className="text-nowrap text-sm text-gray-500">Filling Date</dt>
          <dd className="text-nowrap text-base font-semibold tracking-tight text-gray-700 relative pr-6">
            {mockData.filingDate}
          </dd>
        </div>
        <div className="flex flex-col gap-y-1 border-l px-5">
          <dt className="text-nowrap text-sm text-gray-500">Confirmed by</dt>
          <dd className="text-base font-semibold tracking-tight text-gray-700">
            {mockData?.confirmedBy}
          </dd>
        </div>
        <div className="flex flex-col gap-y-1 border-l px-5">
          <dt className="text-nowrap text-sm text-gray-500">ID</dt>
          <dd className="text-nowrap text-base font-semibold tracking-tight text-gray-700">
            {mockData?.id}
          </dd>
        </div>
        <div className="flex flex-col gap-y-1 ml-auto">
          <dt className="text-nowrap text-sm text-gray-500">
            Confirmation links
          </dt>
          <dd className="text-nowrap text-base font-semibold tracking-tight text-gray-700">
            {!mockData.confirmationLinks.length ? (
              <div className="flex items-center justify-start hover:cursor-pointer hover:underline hover:text-sideBarBlue transition-all duration-150 ease-in-out">
                Create Confirmation Links <IconLink className="w-4 h-4 ml-2" />
              </div>
            ) : (
              <div>links list</div>
            )}
          </dd>
        </div>
      </dl>
      <SectionHeading title="Details" />
      <div className="mt-2 mb-11 text-gray-700 flex items-start justify-start gap-x-14">
        <div>
          <div className="text-sm text-gray-500 mb-1">Company Name</div>
          <div className="text-base font-semibold tracking-tight text-gray-700">
            {mockData.companyName}
          </div>
        </div>
        <div>
          <div className="text-sm text-gray-500 mb-1">File #</div>
          <div className="text-base group font-semibold tracking-tight text-gray-700 flex items-center justify-start hover:text-sideBarBlue hover:cursor-pointer transition-all ease-in-out duration-150 relative">
            <IconFileTypePdf className="w-5 h-5 mr-1" />
            {mockData.file}
            <MdOutlineCloudDownload className="w-5 h-5 text-gray-500 absolute -right-6 top-0.5 opacity-0 hover:cursor-pointer group-hover:opacity-100 transition-all ease-in-out duration-150 hover:text-blue-700" />
          </div>
        </div>
        <div>
          <div className="text-sm text-gray-500 mb-1">Main address</div>
          <div>
            <span>{mockData.address.address0}, </span>
            {mockData.address.address1 && (
              <span>{mockData.address.address1}</span>
            )}
          </div>
          <div>
            {mockData.address.address2 && (
              <span>{mockData.address.address2}</span>
            )}
            {mockData.address.address3 && (
              <span>
                {mockData.address.address2 ? ',' : ''}{' '}
                {mockData.address.address3}
              </span>
            )}
          </div>
          <div>
            <span>{mockData.address.city}, </span>
            <span>
              {USStates.find((item) => item.title === mockData.address.state)
                ?.value || ''}{' '}
            </span>
            <span>{mockData.address.zip}</span>
          </div>
          <div>{mockData.address.country}</div>
        </div>
        <div>
          <div className="text-sm text-gray-500 mb-1">Mailing address</div>
          <div>
            <span>{mockData.address.address0}, </span>
            {mockData.address.address1 && (
              <span>{mockData.address.address1}</span>
            )}
          </div>
          <div>
            {mockData.address.address2 && (
              <span>{mockData.address.address2}</span>
            )}
            {mockData.address.address3 && (
              <span>
                {mockData.address.address2 ? ',' : ''}{' '}
                {mockData.address.address3}
              </span>
            )}
          </div>
          <div>
            <span>{mockData.address.city}, </span>
            <span>
              {USStates.find((item) => item.title === mockData.address.state)
                ?.value || ''}{' '}
            </span>
            <span>{mockData.address.zip}</span>
          </div>
          <div>{mockData.address.country}</div>
        </div>
        <div>
          <div className="text-sm text-gray-500 mb-1">People</div>
          <div className="isolate flex -space-x-2 overflow-hidden">
            <div className="flex text-xs items-center justify-center font-bold relative z-40 inline-block size-6 rounded-full ring-2 ring-white bg-gray-400 text-white">
              U
            </div>
            <img
              alt=""
              src="https://images.unsplash.com/photo-1491528323818-fdd1faba62cc?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
              className="relative z-30 inline-block size-6 rounded-full ring-2 ring-white"
            />
            <img
              alt=""
              src="https://images.unsplash.com/photo-1550525811-e5869dd03032?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
              className="relative z-20 inline-block size-6 rounded-full ring-2 ring-white"
            />
            <div className="flex text-xs items-center justify-center font-bold relative z-10 inline-block size-6 rounded-full ring-2 ring-white bg-gray-400 text-white">
              K
            </div>
            <img
              alt=""
              src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
              className="relative z-0 inline-block size-6 rounded-full ring-2 ring-white"
            />
          </div>
        </div>
        <div className="ml-auto">
          <div className="text-sm text-gray-500 mb-1">Signed</div>
          <div className="text-base font-semibold tracking-tight text-gray-700">
            {mockData.signed}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ReportPage;
