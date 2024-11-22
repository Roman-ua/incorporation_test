import React from 'react';
import SectionHeading from '../../createCompany/components/SectionHeading';

const Buttons = () => {
  return (
    <div className="w-1/2 mb-20">
      <SectionHeading text={'Buttons List'} status={false} hideStatus={true} />
      <div className="flex items-center justify-start gap-x-2">
        <button className="block rounded-md bg-mainBlue px-3 py-2 text-center text-sm font-semibold text-white shadow-sm hover:bg-sideBarBlue focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 transition-all duration-150 ease-in-out">
          Primary
        </button>
        <button className="block rounded-md bg-white px-3 py-2 border text-center text-sm font-semibold shadow-sm text-gray-900 hover:text-white hover:bg-gray-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 transition-all duration-150 ease-in-out">
          Secondary
        </button>
        <button
          disabled
          className="block rounded-md bg-mainBlue px-3 py-2 text-center text-sm font-semibold text-white shadow-sm hover:bg-sideBarBlue focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 transition-all duration-150 ease-in-out disabled:hover:bg-mainBlue disabled:opacity-70"
        >
          Disabled
        </button>
        <button className="block rounded-md bg-white px-3 py-2 border text-center text-sm font-semibold shadow-sm text-gray-900 hover:bg-red-100 hover:border-red-100 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 transition-all duration-150 ease-in-out">
          Danger
        </button>
      </div>
    </div>
  );
};

export default Buttons;
