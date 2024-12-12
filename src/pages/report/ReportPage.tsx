import PageSign from '../../components/shared/PageSign';
import { MdOutlineCopyAll } from 'react-icons/md';
import { classNames } from '../../utils/helpers';
import React from 'react';
import { HiOutlineDocumentReport } from 'react-icons/hi';

const mockData = {
  id: 1,
  year: 2021,
  status: 'Need to File',
  filingDate: 'February 12, 2021',
  confirmedBy: 'John Doe',
  relatedOrder: 'ord_12312',
  attachedFiles: true,
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
            links list
          </dd>
        </div>
      </dl>
    </div>
  );
};

export default ReportPage;
