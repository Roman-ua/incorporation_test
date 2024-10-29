import React from 'react';
import { RiInformationFill } from 'react-icons/ri';
const BioBlock = () => {
  return (
    <div className="rounded shadow-[0px_2px_3px_-1px_rgba(0,0,0,0.1),0px_1px_0px_0px_rgba(25,28,33,0.02),0px_0px_0px_1px_rgba(25,28,33,0.08)] mb-8">
      <div className="px-4 py-3 border-b font-semibold text-gray-700 flex items-center">
        <RiInformationFill className="text-gray-700 mr-2" />
        BIO
      </div>
      <div className="px-4 py-6">BIO info</div>
    </div>
  );
};

export default BioBlock;
