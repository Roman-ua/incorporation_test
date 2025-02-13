import React from 'react';
import { classNames } from '../../../utils/helpers';
import { AddressFields, IFiles } from '../../../interfaces/interfaces';
import { USStates } from '../../../constants/form/form';
import {
  // IconFileTypeDoc,
  // IconFileTypeJpg,
  // IconFileTypePdf,
  // IconFileTypeXls,
  IconTrashX,
} from '@tabler/icons-react';
import { MdOutlineFileDownload } from 'react-icons/md';

// const fileIconHandler = (type: string) => {
//   switch (type) {
//     case 'pdf':
//       return <IconFileTypePdf className="w-5 h-5 text-gray-500 ml-2" />;
//     case 'jpg':
//       return <IconFileTypeJpg className="w-5 h-5 text-gray-500 mr-2" />;
//     case 'xls':
//       return <IconFileTypeXls className="w-5 h-5 text-gray-500 mr-2" />;
//     default:
//       return <IconFileTypeDoc className="w-5 h-5 text-gray-500 mr-2" />;
//   }
// };
//
// const replaceSpaces = (str: string) => {
//   const result = str.replace(/ /g, '_');
//   if (result.length > 10) {
//     return result.slice(0, 20) + '...';
//   }
//   return result;
// };

interface IProps {
  files: IFiles[];
  address: AddressFields | null;
  removeFileHandler: () => void;
  companyName: string;
}

const EinFilesSection = ({
  files,
  address,
  companyName,
  removeFileHandler,
}: IProps) => {
  return (
    <div className="w-full mb-20">
      <div className="flex pt-2 text-sm text-gray-500">
        <div className="w-[20%] pr-2">Document Date</div>
        <div className="w-[15%] px-2">Document Type</div>
        <div className="w-[60%] px-2">Address on the Document</div>
        <div className="pl-2 w-[72px] ml-auto" />
      </div>
      {files.map((file, index) => {
        return (
          <div
            key={index}
            className={`flex py-2.5 group hover:cursor-pointer transition-all ease-in-out duration-150 border-b border-gray-100`}
          >
            <div className="w-[20%] pr-2 flex flex-col items-start justify-start font-bold text-gray-900">
              {file.dueDate}
              <span className="font-normal text-gray-700 text-xs">
                {companyName}
              </span>
            </div>
            <div className="w-[15%] px-2 flex items-center justify-start">
              <span
                className={classNames(
                  'text-nowrap flex items-center text-xs px-2 py-1 font-medium rounded-md ring-1 ring-inset bg-gray-100 text-gray-700 ring-gray-600/20'
                )}
              >
                {file.dockType}
              </span>
            </div>
            <div className="w-[60%] px-2 text-gray-900 flex items-center justify-start">
              {address && address.address0 && (
                <div>
                  <span>{address.address0}, </span>
                  {address.address1 && <span>{address.address1}, </span>}
                  {address.address2 && <span>{address.address2}</span>}
                  {address.address3 && (
                    <span>
                      {address.address2 ? ',' : ''} {address.address3}
                    </span>
                  )}
                  <span>{address.city}, </span>
                  <span>
                    {USStates.find((item) => item.title === address.state)
                      ?.value || ''}{' '}
                  </span>
                  <span>{address.zip}, </span>
                  <span>{address.country}</span>
                </div>
              )}
            </div>
            <div className="pl-2 flex items-center justify-end ml-auto transition-all duration-150 ease-in-out">
              <div
                onClick={() => {}}
                className="group/download h-fit flex items-center justify-between top-6 right-7 p-1.5 border rounded-md hover:cursor-pointer"
              >
                <MdOutlineFileDownload className="w-4 h-4 text-gray-500 group-hover/download:text-gray-900 transition-all easy-in-out duration-150" />
              </div>
              <div
                onClick={removeFileHandler}
                className="ml-1 group/remove h-fit flex items-center justify-between top-6 right-7 p-1.5 border rounded-md hover:cursor-pointer"
              >
                <IconTrashX className="w-4 h-4 text-red-500 group-hover/remove:text-red-700 transition-all easy-in-out duration-150" />
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default EinFilesSection;
