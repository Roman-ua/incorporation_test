import React from 'react';
import SectionHeading from '../../company/components/SectionHeading';
import { classNames } from '../../../utils/helpers';
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

const RenderAddress = (removed: boolean, address: AddressFields) => {
  return (
    <>
      <div
        className={classNames(
          removed ? 'line-through text-gray-400' : 'text-gray-800'
        )}
      >
        <span>{address.address0}, </span>
        {address.address1 && <span>{address.address1}</span>}
      </div>
      <div
        className={classNames(
          removed ? 'line-through text-gray-400' : 'text-gray-800'
        )}
      >
        {address.address2 && <span>{address.address2}</span>}
        {address.address3 && (
          <span>
            {address.address2 ? ',' : ''} {address.address3}
          </span>
        )}
      </div>
      <div
        className={classNames(
          removed ? 'line-through text-gray-400' : 'text-gray-800'
        )}
      >
        <span>{address.city}, </span>
        <span>
          {USStates.find((item) => item.title === address.state)?.value || ''}{' '}
        </span>
        <span>{address.zip}</span>
      </div>
      <div
        className={classNames(
          removed ? 'line-through text-gray-400' : 'text-gray-800'
        )}
      >
        {address.country}
      </div>
      <div className="my-4" />
    </>
  );
};

export function AddressSection({ address }: AddressSectionProps) {
  return (
    <div className="space-y-3">
      <SectionHeading title="Main Address" />
      <div>{RenderAddress(false, address)}</div>
    </div>
  );
}
