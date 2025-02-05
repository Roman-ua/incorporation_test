import { MdOutlineCloudDownload } from 'react-icons/md';
import { TbTrash } from 'react-icons/tb';
import React from 'react';
import {
  IconFileTypeDoc,
  IconFileTypeJpg,
  IconFileTypePdf,
  IconFileTypeXls,
} from '@tabler/icons-react';
import { classNames } from '../../../utils/helpers';
import { IFiles } from '../../../interfaces/interfaces';

const fileIconHandler = (type: string) => {
  switch (type) {
    case 'pdf':
      return <IconFileTypePdf className="w-5 h-5 text-gray-500 mr-2" />;
    case 'jpg':
      return <IconFileTypeJpg className="w-5 h-5 text-gray-500 mr-2" />;
    case 'xls':
      return <IconFileTypeXls className="w-5 h-5 text-gray-500 mr-2" />;
    default:
      return <IconFileTypeDoc className="w-5 h-5 text-gray-500 mr-2" />;
  }
};
const replaceSpaces = (str: string) => {
  const result = str.replace(/ /g, '_');
  if (result.length > 10) {
    return result.slice(0, 25) + '...';
  }
  return result;
};

interface IProps {
  files: IFiles[];
}
const EinFilesSection = ({ files }: IProps) => {
  return (
    <div className="w-full mb-20">
      {files.map((file, index) => {
        return (
          <div
            key={index}
            className="flex items-center justify-start py-6 border-b"
          >
            {fileIconHandler(file?.format || '')}
            <div className="flex items-center justify-between w-full group">
              <div className="flex min-w-0 items-center flex-1 gap-3">
                <div className="flex flex-col align-middle justify-start">
                  <span className="truncate text-sm hover:cursor-pointer mb-1">
                    {replaceSpaces(file.name)}
                  </span>
                  <span className="shrink-0 text-xs text-gray-400">
                    Document date: {file.dueDate}
                  </span>
                </div>
                <MdOutlineCloudDownload className="w-5 h-5 text-gray-500 opacity-0 hover:cursor-pointer group-hover:opacity-100 transition-all ease-in-out duration-150 hover:text-blue-700" />
              </div>
              <div
                className={classNames(
                  'text-nowrap flex items-center text-xs px-2 font-medium rounded ring-1 ring-inset leading-5 mr-1',
                  'bg-gray-100 text-gray-700 ring-gray-600/20'
                )}
              >
                {file.dockType}
              </div>
            </div>
            <div className="ml-auto flex items-center justify-end group px-4 py-2">
              <TbTrash className="w-4 h-4 text-gray-500 opacity-0 hover:cursor-pointer group-hover:opacity-100 transition-all ease-in-out duration-150 hover:text-red-700" />
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default EinFilesSection;
