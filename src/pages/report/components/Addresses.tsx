import { useRecoilValue } from 'recoil';
import SectionHeading from '../../company/components/SectionHeading';
import React from 'react';
import GlobalDataState from '../../../state/atoms/GlobalData';
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
  people: [],
  signed: 'John Doe',
};
const Addresses = () => {
  const globalData = useRecoilValue(GlobalDataState);

  return (
    <>
      <SectionHeading title="Address" />
      <div className="w-full flex items-start justify-start mb-12 max-lg:flex-col">
        <div className="w-[24.5%] flex items-start justify-start pb-2 max-lg:w-full">
          <div className="pr-2 text-gray-700 text-sm">
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
                {globalData.states.find(
                  (item) => item.name === mockData.address.state
                )?.abbreviation || ''}{' '}
              </span>
              <span>{mockData.address.zip}</span>
            </div>
            <div>{mockData.address.country}</div>
          </div>
        </div>
        <div className="flex items-start justify-between pb-2 ">
          <div className="w-full pr-2 text-gray-700 text-sm">
            <div className="text-sm text-gray-500 mb-1">Mailing Address</div>
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
                {globalData.states.find(
                  (item) => item.name === mockData.address.state
                )?.abbreviation || ''}{' '}
              </span>
              <span>{mockData.address.zip}</span>
            </div>
            <div>{mockData.address.country}</div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Addresses;
