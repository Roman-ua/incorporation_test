import React from 'react';
import SectionHeading from '../../company/components/SectionHeading';
import { useRecoilValue } from 'recoil';
import GlobalDataState from '../../../state/atoms/GlobalData';
import { IUser } from '../../../state/atoms/UserProfile';

const RenderAddress = (address: IUser) => {
  const globalData = useRecoilValue(GlobalDataState);

  return (
    <div className="mt-2 w-1/2 gap-4 mb-11 text-gray-700">
      <>
        <div className="text-sm text-gray-500 mb-1">Main</div>
        <div>
          <span>{address.line1}, </span>
          {address.line2 && <span>{address.line2}</span>}
        </div>
        <div>
          {address.line3 && <span>{address.line3}</span>}
          {address.line4 && (
            <span>
              {address.line3 ? ',' : ''} {address.line4}
            </span>
          )}
        </div>
        <div>
          <span>{address.city}, </span>
          <span>
            {globalData.states.find((item) => item.id === address.state)
              ?.abbreviation || ''}{' '}
          </span>
          <span>{address.zip}</span>
        </div>
        <div>{address?.country}</div>
      </>
    </div>
  );
};

export function AddressSection({ data }: { data: IUser }) {
  return (
    <div className="space-y-3 mb-12">
      <SectionHeading title="Address" />
      <div>{data?.line1 ? RenderAddress(data) : '-'}</div>
    </div>
  );
}
