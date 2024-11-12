import React from 'react';
import { MdOutlineCopyAll } from 'react-icons/md';
import SectionHeading from '../company/components/SectionHeading';
import { USStates } from '../../constants/form/form';

// function classNames(...classes: (string | boolean)[]) {
//   return classes.filter(Boolean).join(' ');
// }
const Ein = () => {
  const localData = localStorage.getItem('finalFormData');
  const data = localData ? JSON.parse(localData) : undefined;

  return data ? (
    <div className="container max-w-7xl mx-auto pl-10 pr-10 pb-8 pt-24">
      <div className="w-full flex items-center justify-between pb-7 pr-2 border-b">
        <span className="text-2xl font-bold text-gray-700">
          EIN: 12-3456789
        </span>
        <span className="p-1 rounded flex items-center text-gray-600 text-sm hover:cursor-pointer hover:bg-gray-100 transition-all duration-150 ease-in-out">
          c_1v2FG
          <MdOutlineCopyAll className="text-base ml-2" />
        </span>
      </div>
      <dl className="w-full mt-4 mb-12 flex items-center justify-start">
        <div className="flex flex-col gap-y-1 pr-5">
          <dt className="text-sm text-gray-500">Company</dt>
          <span className="text-base font-semibold tracking-tight text-gray-700">
            {data?.companyName}
          </span>
        </div>
        <div className="flex flex-col gap-y-1 border-l px-5">
          <dt className="text-sm text-gray-500">Last verification date</dt>
          <dd className="text-base font-semibold tracking-tight text-gray-700">
            {data?.registrationDate}
          </dd>
        </div>
      </dl>
      <SectionHeading title="Related Address" />
      <div className="mt-2 w-1/2 gap-4 mb-11 text-gray-700">
        <>
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
      <SectionHeading title="Documents" />
    </div>
  ) : (
    <></>
  );
};

export default Ein;
