import React from 'react';
import { CheckIcon } from '@heroicons/react/20/solid';
import { XMarkIcon } from '@heroicons/react/24/outline';

const SectionStatus = () => {
  return (
    <div className="mb-10">
      <h2 className="mb-4 font-bold">Status Labels</h2>
      <div className="flex gap-3">
        <div className="flex flex-col gap-2 mr-2">
          <span
            className={
              'w-fit inline-flex items-center rounded-md gap-x-1 px-2 py-1 text-xs font-medium  ring-1 ring-inset bg-green-50 text-green-700 ring-green-600/20'
            }
          >
            <svg
              viewBox="0 0 6 6"
              aria-hidden="true"
              className="h-1.5 w-1.5 fill-green-400"
            >
              <circle r={3} cx={3} cy={3} />
            </svg>
            Saved
          </span>
          <span
            className={
              'w-fit inline-flex items-center rounded-md  px-2 py-1 text-xs font-medium  ring-1 ring-inset bg-green-50 text-green-700 ring-green-600/20'
            }
          >
            Saved
          </span>
          <span
            className={
              'w-fit inline-flex items-center rounded-md gap-x-1 px-2 py-1 text-xs font-medium  ring-1 ring-inset bg-green-50 text-green-700 ring-green-600/20'
            }
          >
            <CheckIcon className="w-3 h-3 inline-block" />
            Saved
          </span>
        </div>
        <div className="flex flex-col gap-2 mr-2">
          <span
            className={
              'w-fit inline-flex items-center rounded-md gap-x-1 px-2 py-1 text-xs font-medium  ring-1 ring-inset bg-red-50 text-red-700 ring-red-600/20'
            }
          >
            <svg
              viewBox="0 0 6 6"
              aria-hidden="true"
              className="h-1.5 w-1.5 fill-red-400"
            >
              <circle r={3} cx={3} cy={3} />
            </svg>
            Required
          </span>
          <span
            className={
              'w-fit inline-flex items-center rounded-md  px-2 py-1 text-xs font-medium  ring-1 ring-inset bg-red-50 text-red-700 ring-red-600/20'
            }
          >
            Required
          </span>
          <span
            className={
              'w-fit inline-flex items-center rounded-md gap-x-1 px-2 py-1 text-xs font-medium  ring-1 ring-inset bg-red-50 text-red-700 ring-red-600/20'
            }
          >
            <XMarkIcon className="w-3 h-3 inline-block" />
            Canceled
          </span>
        </div>
        <div className="flex flex-col gap-2 mr-2">
          <span
            className={
              'w-fit inline-flex items-center rounded-md gap-x-1 px-2 py-1 text-xs font-medium  ring-1 ring-inset bg-orange-50 text-orange-700 ring-orange-600/20'
            }
          >
            <svg
              viewBox="0 0 6 6"
              aria-hidden="true"
              className="h-1.5 w-1.5 fill-orange-400"
            >
              <circle r={3} cx={3} cy={3} />
            </svg>
            Optional
          </span>
          <span
            className={
              'w-fit inline-flex items-center rounded-md  px-2 py-1 text-xs font-medium  ring-1 ring-inset bg-orange-50 text-orange-700 ring-orange-600/20'
            }
          >
            Optional
          </span>
        </div>
      </div>
    </div>
  );
};
export default SectionStatus;
