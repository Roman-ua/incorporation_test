import React from 'react';
import { CheckIcon } from '@heroicons/react/20/solid';

const SectionStatus = () => {
  return (
    <div className="mb-10">
      <h2 className="mb-4 font-bold">Section status</h2>
      <div className="mb-2">
        <span
          className={
            'inline-flex items-center rounded-md gap-x-1 px-2 py-1 text-xs font-medium  ring-1 ring-inset bg-green-50 text-green-700 ring-green-600/20'
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
        <span className="mx-1" />
        <span
          className={
            'inline-flex items-center rounded-md gap-x-1 px-2 py-1 text-xs font-medium  ring-1 ring-inset bg-red-50 text-red-700 ring-red-600/20'
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
        <span className="mx-1" />
        <span
          className={
            'inline-flex items-center rounded-md gap-x-1 px-2 py-1 text-xs font-medium  ring-1 ring-inset bg-orange-50 text-orange-700 ring-orange-600/20'
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
      </div>
      <div className="mb-3">
        <span
          className={
            'inline-flex items-center rounded-md  px-2 py-1 text-xs font-medium  ring-1 ring-inset bg-green-50 text-green-700 ring-green-600/20'
          }
        >
          Saved
        </span>
        <span className="mx-1" />
        <span
          className={
            'inline-flex items-center rounded-md  px-2 py-1 text-xs font-medium  ring-1 ring-inset bg-red-50 text-red-700 ring-red-600/20'
          }
        >
          Required
        </span>
        <span className="mx-1" />
        <span
          className={
            'inline-flex items-center rounded-md  px-2 py-1 text-xs font-medium  ring-1 ring-inset bg-orange-50 text-orange-700 ring-orange-600/20'
          }
        >
          Optional
        </span>
      </div>
      <div className="mb-2 flex items-center">
        <span
          className={
            'inline-flex items-center rounded-md gap-x-1 px-2 py-1 text-xs font-medium  ring-1 ring-inset bg-green-50 text-green-700 ring-green-600/20'
          }
        >
          <CheckIcon className="w-3 h-3 inline-block" />
          Saved
        </span>
        <span className="mx-1" />
        <span
          className={
            'inline-flex items-center rounded-md gap-x-1 px-2 py-1 text-xs font-medium  ring-1 ring-inset bg-red-50 text-red-700 ring-red-600/20'
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
        <span className="mx-1" />
        <span
          className={
            'inline-flex items-center rounded-md gap-x-1 px-2 py-1 text-xs font-medium  ring-1 ring-inset bg-orange-50 text-orange-700 ring-orange-600/20'
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
      </div>
    </div>
  );
};
export default SectionStatus;
