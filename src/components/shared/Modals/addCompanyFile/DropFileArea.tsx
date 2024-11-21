import React, { ChangeEvent, RefObject } from 'react';
import { FolderArrowDownIcon } from '@heroicons/react/24/solid';
import { DragEventHandler } from 'react';
import Spinner from '../../Loaders/Spinner';

interface IProps {
  handleFileDrop: (file: File) => void;
  handleFileInput: (event: ChangeEvent<HTMLInputElement>) => void;
  inputRef: RefObject<HTMLInputElement>;
  loaderStatus: boolean;
}

const FileDropArea = ({
  handleFileDrop,
  handleFileInput,
  inputRef,
  loaderStatus,
}: IProps) => {
  const handleDragOver: DragEventHandler<HTMLDivElement> = (e) => {
    e.preventDefault();
  };

  const handleDrop: DragEventHandler<HTMLDivElement> = (e) => {
    e.preventDefault();

    const files = e.dataTransfer.files;
    if (files && files.length > 0 && !loaderStatus) {
      handleFileDrop(files[0]);
    }
  };
  return (
    <div
      className={`bg-white shadow-lg rounded-lg`}
      onDragOver={handleDragOver}
      onDrop={handleDrop}
    >
      <label
        htmlFor="file-upload"
        className={`relative cursor-pointer rounded-md font-semibold text-gray-900 dark:text-white`}
      >
        <div
          className={`flex justify-center rounded-lg border border-dashed border-gray-500/25
          dark:border-white/25 px-6 py-10`}
        >
          <div className={`text-center`}>
            {loaderStatus ? (
              <Spinner />
            ) : (
              <FolderArrowDownIcon
                className={`mx-auto h-10 w-10 text-blue-600/90`}
                aria-hidden="true"
              />
            )}
            <div className={`mt-4 flex text-sm leading-6 text-gray-400`}>
              <span>Upload a file</span>
              <input
                disabled={loaderStatus}
                ref={inputRef}
                id="file-upload"
                name="file-upload"
                type="file"
                className={`sr-only`}
                onChange={(e) => handleFileInput(e)}
              />

              <p className={`pl-1`}>or drag and drop</p>
            </div>
            <p className={`text-xs leading-5 text-gray-400`}>file up to 10MB</p>
          </div>
        </div>
      </label>
    </div>
  );
};

export default FileDropArea;
