import React, { ChangeEvent, RefObject } from 'react';
import { DragEventHandler } from 'react';
import { IconUpload } from '@tabler/icons-react';
import { classNames } from '../../../../utils/helpers';

interface IProps {
  handleFileDrop: (file: File) => void;
  handleFileInput: (event: ChangeEvent<HTMLInputElement>) => void;
  inputRef: RefObject<HTMLInputElement>;
  loaderStatus: boolean;
  mandatoryError?: boolean;
  wrapperStyles?: string;
}

const FileDropArea = ({
  handleFileDrop,
  handleFileInput,
  inputRef,
  loaderStatus,
  mandatoryError,
  wrapperStyles,
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
      className={classNames(`bg-white rounded-lg`, wrapperStyles || '')}
      onDragOver={handleDragOver}
      onDrop={handleDrop}
    >
      <label
        htmlFor="file-upload"
        className={`relative cursor-pointer rounded-md font-semibold text-gray-900 dark:text-white`}
      >
        <div
          className={classNames(
            `flex justify-center items-center h-full rounded-lg border border-dashed border-gray-500/25 px-2 py-2  hover:border-gray-500/50 transition-all ease-in-out duration-150`,
            mandatoryError ? 'bg-red-50' : ''
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
              <input
                disabled={loaderStatus}
                ref={inputRef}
                id="file-upload"
                name="file-upload"
                type="file"
                className={`sr-only`}
                onChange={(e) => handleFileInput(e)}
              />
              <span className="ml-1 font-semibold underline underline-offset-1">
                choose file
              </span>
            </div>
          </div>
        </div>
      </label>
    </div>
  );
};

export default FileDropArea;
