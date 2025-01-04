import SectionHeading from '../../company/components/SectionHeading';
import { IconLink } from '@tabler/icons-react';
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
  companyName: 'ABC Company Inc',
  registrationNumber: 'L23000056354',
  file: 'rep_2021',
  state: 'Florida',
  confirmFile: 'Confirmation_file',
  stateId: '12323342CC',
  people: [],
  signed: 'John Doe',
};

const dockFieldHandler = (state: string) => {
  if (state === 'Florida') {
    return 'Document #';
  }

  if (state === 'Delaware') {
    return 'File #';
  }

  return 'File #';
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
              Company Name
            </div>
            <div className="w-full pr-2 text-gray-700 text-sm">
              {mockData.companyName}
            </div>
          </div>
          <div className="w-full flex items-start justify-between pb-2">
            <div className="w-1/3 text-sm max-xl:w-1/2 pr-2 text-nowrap text-gray-500">
              State
            </div>
            <div className="w-full pr-2 text-gray-700 text-sm">
              {mockData.state}
            </div>
          </div>
          <div className="w-full flex items-start justify-between pb-2">
            <div className="w-1/3 text-sm max-xl:w-1/2 pr-2 text-nowrap text-gray-500">
              {dockFieldHandler(mockData.state)}
            </div>
            <div className="w-full pr-2 text-gray-700 text-sm">
              {mockData.registrationNumber}
            </div>
          </div>
        </div>
        <div className="w-1/2 max-lg:w-full">
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
              State ID
            </div>
            <div className="w-full pr-2 text-gray-700 text-sm">
              {mockData.stateId}
            </div>
          </div>
          <div className="w-full flex items-start justify-between pb-2">
            <div className="w-1/3 text-sm max-xl:w-1/2 pr-2 text-nowrap text-gray-500">
              Confirmation
            </div>
            <div className="w-full pr-2 text-gray-700 group flex items-center justify-start hover:cursor-pointer text-sm hover:text-blue-500 transition-all ease-in-out duration-150">
              Download
              <MdOutlineCloudDownload className="w-5 h-5 text-gray-700 ml-2 top-0.5 hover:cursor-pointer group-hover:text-blue-500 transition-all ease-in-out duration-150" />
            </div>
          </div>
          <div className="w-full flex items-start justify-between pb-2">
            <div className="w-1/3 text-sm max-xl:w-1/2 pr-2 text-nowrap text-gray-500">
              Review Link
            </div>
            <div className="w-full pr-2 text-gray-700 text-sm">
              {!mockData.confirmationLinks.length ? (
                <div className="flex items-center justify-start hover:cursor-pointer hover:text-blue-500 transition-all duration-150 ease-in-out">
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
