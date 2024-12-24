import React from 'react';
import { MdOutlineCopyAll } from 'react-icons/md';
import { classNames } from '../../utils/helpers';
import { IconFileTypePdf, IconProgressCheck } from '@tabler/icons-react';
import SectionHeading from '../company/components/SectionHeading';
import { USStates } from '../../constants/form/form';

const mockData = {
  id: 1,
  year: 2021,
  status: 'Filed',
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
  registrationNumber: 'L23000056354',
  file: 'rep_2021',
  confirmFile: 'Confirmation_file',
  stateId: '12323342CC',
  people: [],
  signed: 'John Doe',
};
const mock = [
  {
    id: 1,
    name: 'John Doe',
    title: 'CEO',
    email: 'example@gmail.com',
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
  },
  {
    id: 2,
    name: 'Philip Moris',
    title: 'Accountant',
    email: 'example@gmail.com',
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
  },
  {
    id: 3,
    name: 'User Admin',
    title: 'Developer',
    email: 'example@gmail.com',
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
  },
];

const mockAgent = {
  name: 'John Doe',
  address: {
    country: 'Broward',
    address0: '1234 Elm St',
    address1: 'Apt 5B',
    address2: '',
    address3: '',
    city: 'Birmingham',
    zip: '35203',
    state: 'Florida',
  },
};

const statusBadge = (status: string) => {
  switch (status) {
    case 'Filed':
      return 'bg-green-50 text-green-700 ring-green-600/20';
    case 'Cancelled':
      return 'bg-red-50 text-red-700 ring-red-600/20';
    case 'Declined':
      return 'bg-gray-50 text-gray-700 ring-gray-600/20';
    case 'Confirmed':
      return 'bg-blue-50 text-blue-700 ring-blue-600/20';
    case 'Waiting for Confirmation':
      return 'bg-yellow-50 text-yellow-700 ring-yellow-600/20';
    default:
      return 'bg-gray-50 text-gray-700 ring-gray-600/20';
  }
};

const AnnualReportReview = () => {
  return (
    <div className="container max-w-7xl mx-auto pl-10 pr-10 pb-8 pt-24">
      <div className="w-full flex items-center justify-between pb-2 pr-2 border-b">
        <span className="text-2xl font-bold text-gray-700">
          Annual Report Filing Order
        </span>
        <span className="p-1 rounded flex items-center text-gray-600 text-sm hover:cursor-pointer hover:bg-gray-100 transition-all duration-150 ease-in-out">
          ord_1v2FG
          <MdOutlineCopyAll className="text-base ml-2" />
        </span>
      </div>
      <dl className="w-full mt-4 mb-12 flex items-start justify-start overflow-x-scroll">
        <div className="flex flex-col gap-y-1 pr-5">
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
          <dt className="text-nowrap text-sm text-gray-500">Type</dt>
          <dd className="text-nowrap text-base font-semibold tracking-tight text-gray-700 relative pr-6">
            Annual Report
          </dd>
        </div>
        <div className="flex flex-col gap-y-1 border-l px-5">
          <dt className="text-nowrap text-sm text-gray-500">Related Company</dt>
          <dd className="text-nowrap text-base font-semibold tracking-tight text-gray-700 relative pr-6">
            {mockData.companyName}
          </dd>
        </div>
        <div className="flex flex-col gap-y-1 border-l px-5">
          <dt className="text-sm text-gray-500">Year</dt>
          <dd className="text-base font-semibold tracking-tight text-gray-700">
            {mockData?.year}
          </dd>
        </div>
        <div className="flex flex-col gap-y-1 border-l px-5">
          <dt className="text-sm text-gray-500">State</dt>
          <dd className="text-base font-semibold tracking-tight text-gray-700">
            {mockData?.address.state}
          </dd>
        </div>
        <div className="flex flex-col gap-y-1 border-l px-5">
          <dt className="text-sm text-gray-500">Related Invoice</dt>
          <dd className="text-base font-semibold tracking-tight text-gray-700">
            inv_4534
          </dd>
        </div>
        <div className="flex flex-col gap-y-1 ml-auto px-6">
          <dt className="text-nowrap text-sm text-gray-500">Process Order</dt>
          <dd className="py-1 px-1.5 rounded-md text-xs w-fit relative text-base group tracking-tight text-white bg-sideBarBlue flex items-center justify-start hover:cursor-pointer">
            Process
            <IconProgressCheck className="w-4 h-4 text-white ml-2" />
          </dd>
        </div>
      </dl>
      <div className="w-full flex items-start justify-center max-lg:flex-col">
        <div className="w-1/2 mr-2 max-lg:w-full">
          <SectionHeading title="Details" />
          <div className="flex items-start justify-start mb-12">
            <div className="w-full max-lg:w-full max-lg:mb-3">
              <div className="w-full flex items-start justify-between pb-2">
                <div className="w-1/3 text-sm max-xl:w-1/2 pr-2 text-nowrap text-gray-500">
                  Company Name
                </div>
                <div className="w-full pr-2 text-gray-700 text-sm">
                  {mockData.companyName}
                </div>
              </div>
              <div className="w-full flex items-start justify-between pb-2">
                <div className="w-1/3 text-sm max-xl:w-1/2 pr-2 text-nowrap text-gray-500">
                  File #
                </div>
                <div className="w-full pr-2 text-gray-700 group flex items-center justify-start hover:cursor-pointer text-sm">
                  <IconFileTypePdf className="w-5 h-5 mr-1" />
                  {mockData.file}
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="w-1/2 ml-2 max-lg:w-full">
          <SectionHeading title="Addresses" />
          <div className="flex items-start gap-24 justify-start mb-12">
            <div className="flex items-start justify-start pb-2">
              <div className="w-full pr-2 text-gray-700 text-sm">
                <div className="text-sm text-gray-500 mb-1">Main Address</div>
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
            <div className="flex items-start justify-between pb-2 ">
              <div className="w-full pr-2 text-gray-700 text-sm">
                <div className="text-sm text-gray-500 mb-1">
                  Mailing Address
                </div>
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
      </div>
      <div>
        <SectionHeading title="Registered Agent" />
        <div className="flex items-start justify-start mb-12 max-lg:flex-col">
          <div className="w-1/2 max-lg:w-full max-lg:mb-3">
            <div className="w-full flex items-start justify-between pb-2">
              <div className="w-1/3 text-sm max-xl:w-1/2 pr-2 text-nowrap text-gray-500">
                Name
              </div>
              <div className="w-full pr-2 text-gray-700 text-sm">
                {mockAgent.name}
              </div>
            </div>
            <div className="w-full flex items-start justify-between pb-2">
              <div className="w-1/3 text-sm max-xl:w-1/2 pr-2 text-nowrap text-gray-500">
                Address
              </div>
              <div className="w-full pr-2">
                <div className="text-gray-700 text-sm">
                  <span>{mockAgent.address.address0}, </span>
                  {mockAgent.address.address1 && (
                    <span>{mockAgent.address.address1}</span>
                  )}
                </div>
                <div className="text-gray-700 text-sm">
                  {mockAgent.address.address2 && (
                    <span>{mockAgent.address.address2}</span>
                  )}
                  {mockAgent.address.address3 && (
                    <span>
                      {mockAgent.address.address2 ? ',' : ''}{' '}
                      {mockAgent.address.address3}
                    </span>
                  )}
                </div>
              </div>
            </div>
          </div>
          <div className="w-1/2 max-lg:w-full">
            <div className="w-full flex items-start justify-between pb-2">
              <div className="w-1/3 text-sm max-xl:w-1/2 pr-2 text-nowrap text-gray-500">
                City
              </div>
              <div className="w-full pr-2 text-gray-700 text-sm">
                {mockAgent.address.city}
              </div>
            </div>
            <div className="w-full flex items-start justify-between pb-2">
              <div className="w-1/3 text-sm max-xl:w-1/2 pr-2 text-nowrap text-gray-500">
                State
              </div>
              <div className="w-full pr-2 text-gray-700 text-sm">
                {mockAgent.address.state}
              </div>
            </div>
            <div className="w-full flex items-start justify-between pb-2">
              <div className="w-1/3 text-sm max-xl:w-1/2 pr-2 text-nowrap text-gray-500">
                Postal Code
              </div>
              <div className="w-full pr-2 text-gray-700 text-sm">
                {mockAgent.address.zip}
              </div>
            </div>
            <div className="w-full flex items-start justify-between pb-2">
              <div className="w-1/3 text-sm max-xl:w-1/2 pr-2 text-nowrap text-gray-500">
                Country
              </div>
              <div className="w-full pr-2 text-gray-700 text-sm">
                {mockAgent.address.country}
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="mb-12">
        <SectionHeading title="People" />
        {mock.map((person, rowIndex) => (
          <div
            key={rowIndex}
            className={`flex py-3 group transition-all ease-in-out duration-150 items-start justify-start`}
          >
            <div className="whitespace-nowrap overflow-hidden w-[20%] pr-2 flex items-center justify-start  text-gray-900">
              <div className="text-sm flex flex-col items-start justify-start">
                <span>{person.name}</span>
              </div>
            </div>
            <div className="whitespace-nowrap overflow-hidden w-[24%] px-2 flex items-center justify-start">
              <div className="w-full pr-2 text-gray-700 text-sm">
                <div>
                  <span>{person.address.address0}, </span>
                  {person.address.address1 && (
                    <span>{person.address.address1}</span>
                  )}
                </div>
                <div>
                  {person.address.address2 && (
                    <span>{person.address.address2}</span>
                  )}
                  {person.address.address3 && (
                    <span>
                      {person.address.address2 ? ',' : ''}{' '}
                      {person.address.address3}
                    </span>
                  )}
                </div>
                <div>
                  <span>{person.address.city}, </span>
                  <span>
                    {USStates.find(
                      (item) => item.title === person.address.state
                    )?.value || ''}{' '}
                  </span>
                  <span>{person.address.zip}</span>
                </div>
                <div>{person.address.country}</div>
              </div>
            </div>
            <div className="text-sm whitespace-nowrap overflow-hidden w-[24%] px-2 flex items-center justify-start">
              {person.title}
            </div>
            <div className="whitespace-nowrap overflow-hidden w-[24%] px-2 flex items-center justify-start"></div>
            <div className="pl-2 flex items-center justify-end ml-auto"></div>
          </div>
        ))}
      </div>
      <div className="w-full flex items-start justify-center max-lg:flex-col">
        <div className="w-1/2 mr-2 max-lg:w-full">
          <SectionHeading title="People List Changes" />
          <div className="flex items-start justify-start mb-12">
            <div className="w-full max-lg:w-full max-lg:mb-3 text-sm">
              {mock.map((person, rowIndex) => (
                <>
                  <div
                    key={rowIndex}
                    className="flex items-center justify-start py-1"
                  >
                    <div
                      className={classNames(
                        'w-1/5',
                        rowIndex % 2 ? 'text-green-600' : 'text-red-600'
                      )}
                    >
                      {rowIndex % 2 ? 'Added' : 'Removed'}
                    </div>
                    <div className="w-1/3">{person.name}</div>
                    <div>{person.title}</div>
                  </div>
                </>
              ))}
            </div>
          </div>
        </div>
        <div className="w-1/2 ml-2 max-lg:w-full">
          <SectionHeading title="Addresses Changes" />
          <div className="flex items-start gap-24 justify-start mb-12">
            <div className="flex items-start justify-start pb-2">
              <div className="w-full pr-2 text-gray-700 text-sm">
                <div className="text-sm text-gray-500 mb-1">
                  Main Address New
                </div>
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
            <div className="flex items-start justify-start pb-2">
              <div className="w-full pr-2 text-gray-500 text-sm">
                <div className="text-sm text-gray-500 mb-1">
                  Main Address Old
                </div>
                <div className="line-through">
                  <span>{mockData.address.address0}, </span>
                  {mockData.address.address1 && (
                    <span>{mockData.address.address1}</span>
                  )}
                </div>
                <div className="line-through">
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
                <div className="line-through">
                  <span>{mockData.address.city}, </span>
                  <span>
                    {USStates.find(
                      (item) => item.title === mockData.address.state
                    )?.value || ''}{' '}
                  </span>
                  <span>{mockData.address.zip}</span>
                </div>
                <div className="line-through">{mockData.address.country}</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AnnualReportReview;
