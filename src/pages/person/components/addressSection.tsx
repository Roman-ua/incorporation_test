import React from 'react';
import SectionHeading from '../../company/components/SectionHeading';

import { USStates } from '../../../constants/form/form';
import { AddressFields } from '../../../interfaces/interfaces';

interface AddressSectionProps {
  address: {
    address0?: string;
    address1?: string;
    address2?: string;
    address3?: string;
    city?: string;
    state?: string;
    zip?: string;
    country?: string;
  };
}

const RenderAddress = (address: AddressFields) => {
  return (
    <div className="mt-2 w-1/2 gap-4 mb-11 text-gray-700">
      <>
        <div className="text-sm text-gray-500 mb-1">Main</div>
        <div>
          <span>{address.address0}, </span>
          {address.address1 && <span>{address.address1}</span>}
        </div>
        <div>
          {address.address2 && <span>{address.address2}</span>}
          {address.address3 && (
            <span>
              {address.address2 ? ',' : ''} {address.address3}
            </span>
          )}
        </div>
        <div>
          <span>{address.city}, </span>
          <span>
            {USStates.find((item) => item.title === address.state)?.value || ''}{' '}
          </span>
          <span>{address.zip}</span>
        </div>
        <div>{address.country}</div>
      </>
    </div>
  );
};

export function AddressSection({ address }: AddressSectionProps) {
  return (
    <div className="space-y-3 mb-12">
      <SectionHeading title="Address" />
      <div>{RenderAddress(address)}</div>
    </div>
  );
}
