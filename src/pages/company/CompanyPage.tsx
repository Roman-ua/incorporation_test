import React from 'react';
import SectionHeading from './components/SectionHeading';
import { MdOutlineCopyAll } from 'react-icons/md';
import { USStates } from '../../constants/form/form';
import StateIconHandler from '../../components/shared/StateIconHandler';

const statusBadge = (status: string) => {
  switch (status) {
    case 'Active':
      return 'bg-green-50 text-green-700 ring-green-600/20';
    case 'Inactive':
      return 'bg-red-50 text-red-700 ring-red-600/20';
    case 'Dissolved':
      return 'bg-gray-50 text-gray-700 ring-gray-600/20';
    case 'Withdrawn':
      return 'bg-gray-50 text-gray-700 ring-gray-600/20';
    default:
      return 'bg-red-50 text-red-700 ring-red-600/20';
  }
};

function classNames(...classes: (string | boolean)[]) {
  return classes.filter(Boolean).join(' ');
}

const CompanyPage = () => {
  const localData = localStorage.getItem('finalFormData');
  const data = localData ? JSON.parse(localData) : undefined;

  // const rowClass = 'text-sm text-gray-500 mb-1';
  // const rowValueClass = 'text-sm text-gray-700 mb-1';

  return data ? (
    <div className="w-full pl-10 pr-10 pt-8">
      {/*<SectionHeading title="General Information" />*/}
      <div className="w-full flex items-center justify-between pb-3 pr-2">
        <span className="text-lg font-bold text-gray-700">
          {data.companyName}
        </span>
        <span className="flex items-center text-gray-400 text-xs hover:cursor-pointer hover:text-gray-700">
          ci_132FGd3123dasDRD3342s
          <MdOutlineCopyAll className="text-base ml-2" />
        </span>
      </div>
      <dl className="w-full mt-5 mb-12 grid grid-cols-2 gap-x-8 gap-y-12 sm:grid-cols-3 sm:gap-y-16 lg:grid-cols-5">
        <div className="flex flex-col gap-y-1 border-l pl-5">
          <dt className="text-sm text-gray-500">Status</dt>
          <span
            className={classNames(
              'w-fit inline-flex items-center rounded-md  px-2 py-1 text-xs font-medium  ring-1 ring-inset',
              statusBadge(data?.status)
            )}
          >
            {data?.status}
          </span>
        </div>
        <div className="flex flex-col gap-y-1 border-l pl-5">
          <dt className="text-sm text-gray-500">Registration #</dt>
          <dd className="text-base font-semibold tracking-tight text-gray-700">
            {data?.registrationNumber}
          </dd>
        </div>
        <div className="flex flex-col gap-y-1 border-l pl-5">
          <dt className="text-sm text-gray-500">Type</dt>
          <dd className="text-base font-semibold tracking-tight text-gray-700">
            {data?.companyType}
          </dd>
        </div>
        <div className="flex flex-col gap-y-1 border-l pl-5">
          <dt className="text-sm text-gray-500">State</dt>
          <dd className="text-base flex items-center font-semibold tracking-tight text-gray-700">
            {data?.registeredIn.split(' ')[2] || 'Florida'}
            <StateIconHandler
              state={data?.registeredIn.split(' ')[2] || 'Florida'}
            />
          </dd>
        </div>
        <div className="flex flex-col gap-y-1 border-l pl-5">
          <dt className="text-sm text-gray-500">Registration Date</dt>
          <dd className="text-base font-semibold tracking-tight text-gray-700">
            {data?.registrationDate}
          </dd>
        </div>
      </dl>
      <SectionHeading title="Address" />
      <div className="mt-5 w-1/2 gap-4 mb-11 text-gray-700">
        <>
          <div className="text-sm text-gray-500 mb-1">Address type: Main</div>
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
          </div>
          <div>{data.address.country}</div>
        </>
      </div>
    </div>
  ) : (
    <></>
  );
};

export default CompanyPage;
// <div className={rowClass}>Company Name</div>
// <div className={rowClass}>State</div>
// <div className={rowClass}>Registration Date</div>
