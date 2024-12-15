import PageSign from '../../components/shared/PageSign';
import { MdOutlineCloudDownload, MdOutlineCopyAll } from 'react-icons/md';
import { classNames } from '../../utils/helpers';
import React from 'react';
import { HiOutlineDocumentReport } from 'react-icons/hi';
import { IconFileTypePdf, IconLink } from '@tabler/icons-react';
import SectionHeading from '../company/components/SectionHeading';
import { USStates } from '../../constants/form/form';
import RelatedOrders from './components/RelatedOrders';
import PeopleList from './components/PeopleList';

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
  companyId: 'c_1v2FG',
  file: 'rep_2021',
  confirmFile: 'Confirmation_file',
  stateId: '12323342CC',
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
          <dt className="text-nowrap text-sm text-gray-500">Company name</dt>
          <dd className="text-nowrap text-base font-semibold tracking-tight text-gray-700 relative pr-6">
            {mockData.companyName}
          </dd>
        </div>
        <div className="flex flex-col gap-y-1 border-l px-5">
          <dt className="text-nowrap text-sm text-gray-500">Filling Date</dt>
          <dd className="text-nowrap text-base font-semibold tracking-tight text-gray-700 relative pr-6">
            {mockData.filingDate}
          </dd>
        </div>
        <div className="flex flex-col gap-y-1 border-l px-5">
          <dt className="text-nowrap text-sm text-gray-500">Confirmation</dt>
          <dd className="relative text-base group font-semibold tracking-tight text-gray-700 flex items-center justify-start hover:cursor-pointer">
            <IconFileTypePdf className="w-5 h-5 mr-1" />
            {mockData.confirmFile}
            <MdOutlineCloudDownload className="w-5 h-5 text-gray-500 absolute -right-6 top-0.5 opacity-0 hover:cursor-pointer group-hover:opacity-100 transition-all ease-in-out duration-150 hover:text-blue-700" />
          </dd>
        </div>
        <div className="flex flex-col gap-y-1 ml-auto">
          <dt className="text-nowrap text-sm text-gray-500">
            Confirmation link
          </dt>
          <dd className="text-nowrap text-base font-semibold tracking-tight text-gray-700">
            {!mockData.confirmationLinks.length ? (
              <div className="flex items-center justify-start hover:cursor-pointer hover:underline hover:text-sideBarBlue transition-all duration-150 ease-in-out">
                Create Confirmation Link <IconLink className="w-4 h-4 ml-2" />
              </div>
            ) : (
              <div>links list</div>
            )}
          </dd>
        </div>
      </dl>
      <SectionHeading title="Details" />
      <div className="flex items-start justify-start mb-12 max-lg:flex-col">
        <div className="w-1/2 max-lg:w-full max-lg:mb-3">
          <div className="w-full flex items-start justify-between pb-2">
            <div className="w-1/3 max-xl:w-1/2 pr-2 text-nowrap text-gray-500">
              Year
            </div>
            <div className="w-full pr-2 text-gray-700">{mockData.year}</div>
          </div>
          <div className="w-full flex items-start justify-between pb-2">
            <div className="w-1/3 max-xl:w-1/2 pr-2 text-nowrap text-gray-500">
              Status
            </div>
            <div className="w-full pr-2 text-gray-700">{mockData.status}</div>
          </div>
          <div className="w-full flex items-start justify-between pb-2">
            <div className="w-1/3 max-xl:w-1/2 pr-2 text-nowrap text-gray-500">
              Company Name
            </div>
            <div className="w-full pr-2 text-gray-700">
              {mockData.companyName}
            </div>
          </div>
          <div className="w-full flex items-start justify-between pb-2">
            <div className="w-1/3 max-xl:w-1/2 pr-2 text-nowrap text-gray-500">
              Company ID
            </div>
            <div className="w-full pr-2 text-gray-700">
              {mockData.companyId}
            </div>
          </div>
        </div>
        <div className="w-1/2 max-lg:w-full">
          <div className="w-full flex items-start justify-between pb-2">
            <div className="w-1/3 max-xl:w-1/2 pr-2 text-nowrap text-gray-500">
              State ID
            </div>
            <div className="w-full pr-2 text-gray-700">{mockData.stateId}</div>
          </div>
          <div className="w-full flex items-start justify-between pb-2">
            <div className="w-1/3 max-xl:w-1/2 pr-2 text-nowrap text-gray-500">
              Attached file
            </div>
            <div className="w-full pr-2 text-gray-700 group flex items-center justify-start hover:cursor-pointer">
              <IconFileTypePdf className="w-5 h-5 mr-1" />
              {mockData.confirmFile}
              <MdOutlineCloudDownload className="w-5 h-5 ml-1 text-gray-500 opacity-0 hover:cursor-pointer group-hover:opacity-100 transition-all ease-in-out duration-150 hover:text-blue-700" />
            </div>
          </div>
        </div>
      </div>

      <SectionHeading title="Addresses and Agents" />
      <div className="flex items-start justify-start mb-12 max-lg:flex-col">
        <div className="w-1/2 max-lg:w-full max-lg:mb-3">
          <div className="w-full flex items-start justify-between pb-2">
            <div className="w-1/3 max-xl:w-1/2 pr-2 text-nowrap text-gray-500">
              Main address
            </div>
            <div className="w-full pr-2 text-gray-700">
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
                  {USStates.find(
                    (item) => item.title === mockData.address.state
                  )?.value || ''}{' '}
                </span>
                <span>{mockData.address.zip}</span>
              </div>
              <div>{mockData.address.country}</div>
            </div>
          </div>
          <div className="w-full flex items-start justify-between pb-2">
            <div className="w-1/3 max-xl:w-1/2 pr-2 text-nowrap text-gray-500">
              Mailing address
            </div>
            <div className="w-full pr-2 text-gray-700">
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
                  {USStates.find(
                    (item) => item.title === mockData.address.state
                  )?.value || ''}{' '}
                </span>
                <span>{mockData.address.zip}</span>
              </div>
              <div>{mockData.address.country}</div>
            </div>
          </div>
        </div>
        <div className="w-1/2 max-lg:w-full">
          <div className="w-full flex items-start justify-between pb-2">
            <div className="w-1/3 max-xl:w-1/2 pr-2 text-nowrap text-gray-500">
              Registered Agent
            </div>
            <div className="w-full pr-2 text-gray-700">
              <div className="uppercase">John Doe,</div>
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
                  {USStates.find(
                    (item) => item.title === mockData.address.state
                  )?.value || ''}{' '}
                </span>
                <span>{mockData.address.zip}</span>
              </div>
              <div>{mockData.address.country}</div>
            </div>
          </div>
        </div>
      </div>
      <PeopleList />
      <RelatedOrders />
    </div>
  );
};

export default ReportPage;
