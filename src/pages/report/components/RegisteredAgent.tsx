import SectionHeading from '../../company/components/SectionHeading';
import React from 'react';
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

const RegisteredAgent = () => {
  return (
    <>
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
    </>
  );
};

export default RegisteredAgent;
