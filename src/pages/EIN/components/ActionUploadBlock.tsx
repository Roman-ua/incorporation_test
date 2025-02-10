import React from 'react';
import { IconUpload } from '@tabler/icons-react';

interface IProps {
  setOpen: () => void;
}

function classNames(...classes: (string | boolean)[]) {
  return classes.filter(Boolean).join(' ');
}

const ActionUploadBlock = ({ setOpen }: IProps) => {
  return (
    <div
      onClick={setOpen}
      className="relative transform rounded-lg bg-white text-left shadow-[0_3px_10px_rgb(0,0,0,0.1)] border border-gray-200 transition-all data-[closed]:translate-y-4 data-[closed]:opacity-0 data-[enter]:duration-300 data-[leave]:duration-200 data-[enter]:ease-out data-[leave]:ease-in sm:my-8 sm:w-full sm:max-w-lg data-[closed]:sm:translate-y-0 data-[closed]:sm:scale-95 hover:cursor-pointer"
    >
      <div className={'pt-6 pl-6 pr-6'}>
        <div className="flex items-center justify-between">
          <span className="text-gray-900 text-lg font-bold">
            Upload EIN (Tax ID) Confirmation Document
          </span>
        </div>
      </div>
      <div className="p-6">
        <div
          className={`bg-white rounded-lg hover:bg-blue-50 transition-all duration-150 ease-in-out`}
        >
          <label
            htmlFor="file-upload"
            className={`relative cursor-pointer rounded-md font-semibold text-gray-900 dark:text-white`}
          >
            <div
              className={classNames(
                `flex justify-center rounded-lg border border-dashed border-gray-500/25 px-2 py-2`
              )}
            >
              <div className={`text-center flex flex-col items-center`}>
                <div className="rounded-full bg-gray-900 w-fit p-2 mt-0.5">
                  <IconUpload
                    className={`mx-auto h-3 w-3 text-white`}
                    aria-hidden="true"
                  />
                </div>
                <div
                  className={`mt-1 flex text-sm font-light leading-6 text-gray-900`}
                >
                  <span>Drag and Drop file here or</span>
                  <span className="ml-1 font-semibold underline underline-offset-1">
                    choose file
                  </span>
                </div>
              </div>
            </div>
          </label>
        </div>
        <div className="flex items-center justify-between mt-2">
          <span className="text-xs text-gray-500">
            Supported formats: PDF, JPEG
          </span>
          <span className="text-xs text-gray-500">Maximum size: 25mb</span>
        </div>
      </div>
    </div>
  );
};

export default ActionUploadBlock;
