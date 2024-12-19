import SectionHeading from '../../company/components/SectionHeading';
import { classNames } from '../../../utils/helpers';
import { IconFileTypePdf, IconLink } from '@tabler/icons-react';
import { MdOutlineCloudDownload } from 'react-icons/md';
import React from 'react';
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
  registrationNumber: 'L23000056354',
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

const Details = () => {
  return (
    <>
      <SectionHeading title="Details" />
      <div className="flex items-start justify-start mb-12 max-lg:flex-col">
        <div className="w-1/2 max-lg:w-full max-lg:mb-3">
          <div className="w-full flex items-start justify-between pb-2">
            <div className="w-1/3 text-sm max-xl:w-1/2 pr-2 text-nowrap text-gray-500">
              Year
            </div>
            <div className="w-full pr-2 text-gray-700 text-sm">
              {mockData.year}
            </div>
          </div>
          <div className="w-full flex items-start justify-between pb-2">
            <div className="w-1/3 text-sm max-xl:w-1/2 pr-2 text-nowrap text-gray-500">
              Status
            </div>
            <div className="w-full pr-2">
              <span
                className={classNames(
                  'w-fit inline-flex items-center rounded-md  px-2 py-1 text-xs font-medium  ring-1 ring-inset',
                  statusBadge(mockData?.status)
                )}
              >
                {mockData?.status}
              </span>
            </div>
          </div>
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
              Registration #
            </div>
            <div className="w-full pr-2 text-gray-700 text-sm">
              {mockData.registrationNumber}
            </div>
          </div>
        </div>
        <div className="w-1/2 max-lg:w-full">
          <div className="w-full flex items-start justify-between pb-2">
            <div className="w-1/3 text-sm max-xl:w-1/2 pr-2 text-nowrap text-gray-500">
              State ID
            </div>
            <div className="w-full pr-2 text-gray-700 text-sm">
              {mockData.stateId}
            </div>
          </div>
          <div className="w-full flex items-start justify-between pb-2">
            <div className="w-1/3 text-sm max-xl:w-1/2 pr-2 text-nowrap text-gray-500">
              Filing Date
            </div>
            <div className="w-full pr-2 text-gray-700 text-sm">
              {mockData.filingDate}
            </div>
          </div>
          <div className="w-full flex items-start justify-between pb-2">
            <div className="w-1/3 text-sm max-xl:w-1/2 pr-2 text-nowrap text-gray-500">
              Confirmation
            </div>
            <div className="w-full pr-2 text-gray-700 group flex items-center justify-start hover:cursor-pointer text-sm">
              <IconFileTypePdf className="w-5 h-5 mr-1" />
              Download
              <MdOutlineCloudDownload className="w-5 h-5 text-gray-500 ml-1 top-0.5 opacity-0 hover:cursor-pointer group-hover:opacity-100 transition-all ease-in-out duration-150 hover:text-blue-700" />
            </div>
          </div>
          <div className="w-full flex items-start justify-between pb-2">
            <div className="w-1/3 text-sm max-xl:w-1/2 pr-2 text-nowrap text-gray-500">
              Review Link
            </div>
            <div className="w-full pr-2 text-gray-700 text-sm">
              {!mockData.confirmationLinks.length ? (
                <div className="flex items-center justify-start hover:cursor-pointer hover:underline hover:text-sideBarBlue transition-all duration-150 ease-in-out">
                  Create Confirmation Link <IconLink className="w-4 h-4 ml-2" />
                </div>
              ) : (
                <div>links list</div>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Details;
