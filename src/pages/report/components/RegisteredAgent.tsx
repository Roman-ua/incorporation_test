import SectionHeading from '../../company/components/SectionHeading';
import React from 'react';
import { USStates } from '../../../constants/form/form';
import { IconInfoCircle } from '@tabler/icons-react';
import TooltipWrapper from '../../../components/shared/TooltipWrapper';
const mockAgent = {
  name: 'A Registered Agents Inc.',
  address: {
    country: 'United States',
    county: 'Jefferson',
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
      <div className="w-full flex items-start justify-start mb-12 max-lg:flex-col">
        <div className="w-[24.5%] flex items-start justify-between pb-2 max-lg:w-full">
          <div className="pr-1 text-gray-700 text-sm">
            <div className="text-sm text-gray-500 mb-1">Name</div>
            <div className="font-bold">{mockAgent.name}</div>
          </div>
        </div>
        <div className="flex items-start justify-start pb-2">
          <div className="w-full pr-2 text-gray-700 text-sm">
            <div className="text-sm text-gray-500 mb-1">Address</div>
            <div>
              <span>{mockAgent.address.address0}, </span>
              {mockAgent.address.address1 && (
                <span>{mockAgent.address.address1}</span>
              )}
            </div>
            <div>
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
            <div>
              <span>{mockAgent.address.city}, </span>
              <span>
                {USStates.find((item) => item.title === mockAgent.address.state)
                  ?.value || ''}{' '}
              </span>
              <span>{mockAgent.address.zip}</span>
              {mockAgent.address.county && (
                <span>
                  , {mockAgent.address.county}
                  <TooltipWrapper tooltipText="text">
                    <IconInfoCircle className="w-3.5 h-3.5 relative -right-1 top-0.5 text-gray-400 hover:cursor-pointer hover:text-gray-500" />
                  </TooltipWrapper>
                </span>
              )}
            </div>
            <div>{mockAgent.address.country}</div>
          </div>
        </div>
      </div>
    </>
  );
};

export default RegisteredAgent;
