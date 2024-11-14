import React from 'react';
import jpgIcon from '../../../images/formats/jpg.png';
import pdfIcon from '../../../images/formats/pdf.png';
import xlsIcon from '../../../images/formats/xls.png';
import docIcon from '../../../images/formats/doc.png';
import {
  MdOpenInNew,
  MdOutlineCloudDownload,
  MdOutlineDeleteOutline,
} from 'react-icons/md';
import SectionHeading from '../../createCompany/components/SectionHeading';

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

const filesIconHandler = (type: string) => {
  switch (type) {
    case 'pdf':
      return pdfIcon;
    case 'jpg':
      return jpgIcon;
    case 'xls':
      return xlsIcon;
    case 'xlsx':
      return xlsIcon;
    case 'doc':
      return docIcon;
    default:
      return jpgIcon;
  }
};

const fileBgHandler = (type: string) => {
  switch (type) {
    case 'pdf':
      return 'bg-red-100';
    case 'jpg':
      return 'bg-yellow-100';
    case 'xls':
      return 'bg-green-100';
    case 'xlsx':
      return 'bg-green-100';
    case 'doc':
      return 'bg-gray-100';
    default:
      return 'bg-blue-100';
  }
};

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
              <div className="mr-3 shadow-[0px_2px_3px_-1px_rgba(0,0,0,0.1),0px_1px_0px_0px_rgba(25,28,33,0.02),0px_0px_0px_1px_rgba(25,28,33,0.08)] w-[57px] h-[57px] rounded-lg w-fit flex items-center justify-center">
                <div
                  className={classNames(
                    'rounded-md p-2',
                    fileBgHandler(file.type)
                  )}
                >
                  <img
                    src={filesIconHandler(file.type)}
                    alt={file.icon}
                    className="w-8 h-8"
                  />
                </div>
              </div>
              <div>
                <p className="font-semibold mb-1">{file.name}</p>
                <div className="flex items-center">
                  <div
                    className={classNames(
                      'flex items-center text-sm px-2 font-medium rounded ring-1 ring-inset leading-6',
                      labelBadgeHandler(file.label)
                    )}
                  >
                    {file.label}
                  </div>
                  <div className="mx-2 w-[3px] h-[3px] bg-gray-400 rounded-full" />
                  <p className="text-gray-500 text-sm">{file.date}</p>
                </div>
              </div>
              <div className="ml-auto flex items-center justify-end">
                <div className="p-1.5 rounded-md bg-gray-100 border ml-2 group hover:cursor-pointer hover:bg-blue-100">
                  <MdOutlineCloudDownload className="w-5 h-5 text-gray-500 group-hover:text-gray-700 transition-all ease-in-out duration-150" />
                </div>
                <div className="p-1.5 rounded-md bg-gray-100 border ml-2 group hover:cursor-pointer">
                  <MdOpenInNew className="w-5 h-5 text-gray-500 group-hover:text-gray-700 transition-all ease-in-out duration-150" />
                </div>
                <div className="p-1.5 rounded-md bg-gray-100 border ml-2 group hover:cursor-pointer hover:bg-red-100">
                  <MdOutlineDeleteOutline className="w-5 h-5 text-gray-500 group-hover:text-gray-700 transition-all ease-in-out duration-150" />
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
