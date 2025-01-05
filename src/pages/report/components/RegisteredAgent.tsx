import SectionHeading from '../../company/components/SectionHeading';
import React from 'react';
import { USStates } from '../../../constants/form/form';
import { IconInfoCircle } from '@tabler/icons-react';
import TooltipWrapper from '../../../components/shared/TooltipWrapper';
import { Agent } from '../../../interfaces/interfaces';

interface IProps {
  data: Agent;
}
const RegisteredAgent = ({ data }: IProps) => {
  return (
    <>
      <SectionHeading title="Registered Agent" />
      <div className="w-full flex items-start justify-start mb-12 max-lg:flex-col">
        <div className="w-[24.5%] flex items-start justify-between pb-2 max-lg:w-full">
          <div className="pr-1 text-gray-700 text-sm">
            <div className="text-sm text-gray-500 mb-1">Name</div>
            <div className="font-bold">{data.name}</div>
          </div>
        </div>
        <div className="flex items-start justify-start pb-2">
          <div className="w-full pr-2 text-gray-700 text-sm">
            <div className="text-sm text-gray-500 mb-1">Address</div>
            <div>
              <span>{data.address.address0}, </span>
              {data.address.address1 && <span>{data.address.address1}</span>}
            </div>
            <div>
              {data.address.address2 && <span>{data.address.address2}</span>}
              {data.address.address3 && (
                <span>
                  {data.address.address2 ? ',' : ''} {data.address.address3}
                </span>
              )}
            </div>
            <div>
              <span>{data.address.city}, </span>
              <span>
                {USStates.find((item) => item.title === data.address.state)
                  ?.value || ''}{' '}
              </span>
              <span>{data.address.zip}</span>
              {data.address?.county && (
                <span>
                  , {data.address?.county}
                  <TooltipWrapper tooltipText="County">
                    <IconInfoCircle className="w-3.5 h-3.5 relative -right-1 top-0.5 text-gray-400 hover:cursor-pointer hover:text-gray-500" />
                  </TooltipWrapper>
                </span>
              )}
            </div>
            <div>{data.address.country}</div>
          </div>
        </div>
      </div>
    </>
  );
};

export default RegisteredAgent;
