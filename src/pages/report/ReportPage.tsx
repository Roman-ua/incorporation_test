import PageSign from '../../components/shared/PageSign';
import { MdOutlineCloudDownload, MdOutlineCopyAll } from 'react-icons/md';
import { classNames } from '../../utils/helpers';
import React from 'react';
import { HiOutlineDocumentReport } from 'react-icons/hi';
import RelatedOrders from './components/RelatedOrders';
import PeopleList from './components/PeopleList';
import Details from './components/Details';
import Addresses from './components/Addresses';
import RegisteredAgent from './components/RegisteredAgent';
import StateSolidIconHandler from '../../components/shared/StateSolidIconHandler';
import { mockAgent, mockPeople } from '../../mock/mockData';

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
  companyName: 'ABC Company Inc',
  registrationNumber: 'L23000056354',
  file: 'rep_2021',
  confirmFile: 'Confirmation_file',
  stateId: '12323342CC',
  state: 'Florida',
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
          ar_1v2FG
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
          <dt className="text-nowrap text-sm text-gray-500">Company Name</dt>
          <dd className="text-nowrap text-base font-semibold tracking-tight text-gray-700 relative pr-6">
            {mockData.companyName}
          </dd>
        </div>
        <div className="flex flex-col gap-y-1 border-l px-5">
          <dt className="text-nowrap text-sm text-gray-500">State</dt>
          <dd className="text-nowrap text-base font-semibold tracking-tight text-gray-700 relative pr-6 flex items-center justify-start">
            <StateSolidIconHandler
              simpleIcon={true}
              selectedState={mockData.state || 'Florida'}
              state={mockData.state || 'Florida'}
            />
            {mockData.state}
          </dd>
        </div>
        <div className="flex flex-col gap-y-1 ml-auto px-6">
          <dt className="text-nowrap text-sm text-gray-500">Confirmation</dt>
          <dd className="w-full pr-2 text-gray-700 group flex items-center justify-start hover:cursor-pointer text-sm hover:text-blue-500 transition-all ease-in-out duration-150">
            Download
            <MdOutlineCloudDownload className="w-5 h-5 text-gray-700 ml-2 top-0.5 hover:cursor-pointer group-hover:text-blue-500 transition-all ease-in-out duration-150" />
          </dd>
        </div>
      </dl>
      <Details />
      <Addresses />
      <PeopleList data={mockPeople} />
      <RegisteredAgent data={mockAgent} />
      <RelatedOrders />
    </div>
  );
};

export default ReportPage;
