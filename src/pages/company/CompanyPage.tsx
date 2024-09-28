import React from 'react';
import SectionHeading from './components/SectionHeading';
const CompanyPage = () => {
  const localData = localStorage.getItem('finalFormData');
  const data = localData ? JSON.parse(localData) : undefined;

  const rowClass = 'text-sm text-gray-500 mb-1';
  const rowValueClass = 'text-sm text-gray-700 mb-1';

  return data ? (
    <div className="w-full pl-10 pr-10 pt-5">
      <SectionHeading title="General Information" />
      <div className="grid grid-cols-2 w-1/2 gap-4 mb-11">
        <div>
          <div className={rowClass}>Company Name</div>
          <div className={rowClass}>Status</div>
          <div className={rowClass}>Company Type</div>
          <div className={rowClass}>State</div>
          <div className={rowClass}>Registration Date</div>
          <div className={rowClass}>Registration Number</div>
        </div>
        <div>
          <div className={rowValueClass}>{data.companyName}</div>
          <div className={rowValueClass}>{data.status}</div>
          <div className={rowValueClass}>{data.companyType}</div>
          <div className={rowValueClass}>{data.registeredIn}</div>
          <div className={rowValueClass}>{data.registrationDate}</div>
          <div className={rowValueClass}>{data.registrationNumber}</div>
        </div>
      </div>
      <SectionHeading title="Primary Address" />
      <div className="grid grid-cols-2 w-1/2 gap-4 mb-11">
        <div>
          <div className={rowClass}>Street</div>
          <div className={rowClass}>Unit</div>
          <div className={rowClass}>City</div>
          <div className={rowClass}>State</div>
          <div className={rowClass}>Country</div>
          <div className={rowClass}>Zip</div>
        </div>
        <div>
          <div className={rowValueClass}>{data.address.address0}</div>
          <div className={rowValueClass}>{data.address.address1}</div>
          <div className={rowValueClass}>{data.address.city}</div>
          <div className={rowValueClass}>{data.address.state}</div>
          <div className={rowValueClass}>{data.address.country}</div>
          <div className={rowValueClass}>{data.address.zip}</div>
        </div>
      </div>
    </div>
  ) : (
    <></>
  );
};

export default CompanyPage;
