import { InformationCircleIcon } from '@heroicons/react/20/solid';
import React from 'react';

const InfoDescription = ({ text }: { text: string }) => {
  return (
    <div className="rounded-md bg-blue-50 p-4 mb-8">
      <div className="flex">
        <div className="flex-shrink-0">
          <InformationCircleIcon
            aria-hidden="true"
            className="h-5 w-5 text-blue-400"
          />
        </div>
        <div className="ml-3 flex-1 md:flex md:justify-between">
          <p className="text-sm text-sideBarBlue">{text}</p>
        </div>
      </div>
    </div>
  );
};

export default InfoDescription;
