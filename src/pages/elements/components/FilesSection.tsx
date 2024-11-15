import React from 'react';
import SectionHeading from '../../createCompany/components/SectionHeading';
import { PaperClipIcon } from '@heroicons/react/20/solid';
import { TbTrash } from 'react-icons/tb';
import { MdOutlineCloudDownload } from 'react-icons/md';

const mockFiles = [
  {
    id: 1,
    icon: 'pdf',
    name: 'File One',
    label: 'CP575A',
    type: 'pdf',
    date: '2021-05-23',
  },
  {
    id: 2,
    icon: 'Screenshot',
    name: 'File Two',
    label: 'Screenshot',
    type: 'jpg',
    date: '2021-05-23',
  },
  {
    id: 3,
    icon: 'CP575G',
    name: 'File Three',
    label: 'CP575G',
    type: 'xls',
    date: '2021-05-23',
  },
  {
    id: 4,
    icon: '147C',
    name: 'File Four',
    label: '147C',
    type: 'xlsx',
    date: '2021-05-23',
  },
  {
    id: 5,
    icon: 'Faxed SS-4',
    name: 'File Five',
    label: 'Faxed SS-4',
    type: 'xls',
    date: '2021-05-23',
  },
  {
    id: 6,
    icon: 'W-9',
    name: 'File Six',
    label: 'W-9',
    type: 'pdf',
    date: '2021-05-23',
  },
  {
    id: 7,
    icon: 'CP577',
    name: 'File Seven',
    label: 'CP577',
    type: 'jpg',
    date: '2021-05-23',
  },
  {
    id: 8,
    icon: 'CP577E',
    name: 'File Eight',
    label: 'CP577E',
    type: 'pdf',
    date: '2021-05-23',
  },
];
const replaceSpaces = (str: string) => str.replace(/ /g, '_');

const labelBadgeHandler = (label: string) => {
  switch (label) {
    case 'CP575A':
      return 'bg-red-100 text-red-700 ring-red-600/20';
    case 'Screenshot':
      return 'bg-yellow-100 text-yellow-700 ring-yellow-600/20';
    case 'CP575G':
      return 'bg-blue-100 text-blue-700 ring-blue-600/20';
    case '147C':
      return 'bg-purple-100 text-purple-700 ring-purple-600/20';
    case 'Faxed SS-4':
      return 'bg-green-100 text-green-700 ring-green-600/20';
    case 'W-9':
      return 'bg-red-100 text-red-700 ring-red-600/20';
    case 'CP577':
      return 'bg-yellow-100 text-yellow-700 ring-yellow-600/20';
    case 'CP577E':
      return 'bg-red-100 text-red-700 ring-red-600/20';
    default:
      return 'bg-blue-100 text-blue-700 ring-blue-600/20';
  }
};
function classNames(...classes: (string | boolean)[]) {
  return classes.filter(Boolean).join(' ');
}

const FilesSection = () => {
  return (
    <>
      <SectionHeading text="Files list" status={false} hideStatus={true} />
      <div className="w-1/2 mb-20">
        {mockFiles.map((file) => {
          return (
            <div
              key={file.id}
              className="flex items-center justify-start py-4 px-2 border-b"
            >
              <PaperClipIcon
                aria-hidden="true"
                className="mr-3 size-5 shrink-0 text-gray-400"
              />
              <div className="flex items-center justify-between w-full pr-4 mr-4 border-r group">
                <div className="flex min-w-0 items-center flex-1 gap-3">
                  <span className="truncate font-semibold hover:cursor-pointer">
                    {replaceSpaces(file.name)}
                  </span>
                  <span className="shrink-0 text-gray-400">{file.date}</span>
                  <MdOutlineCloudDownload className="w-5 h-5 text-gray-500 opacity-0 hover:cursor-pointer group-hover:opacity-100 transition-all ease-in-out duration-150" />
                </div>
                <div
                  className={classNames(
                    'flex items-center text-sm px-2 font-medium rounded ring-1 ring-inset leading-6',
                    labelBadgeHandler(file.label)
                  )}
                >
                  {file.label}
                </div>
              </div>
              <div className="ml-auto flex items-center justify-end">
                <div className="px-1.5 py-1 rounded bg-gray-100 border group hover:cursor-pointer hover:bg-red-100">
                  <TbTrash className="w-4 h-4 text-gray-500 group-hover:text-gray-700 transition-all ease-in-out duration-150" />
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </>
  );
};

export default FilesSection;
