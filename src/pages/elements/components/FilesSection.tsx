import React, { useState } from 'react';
import SectionHeading from '../../createCompany/components/SectionHeading';
// import { PaperClipIcon } from '@heroicons/react/20/solid';
import { TbTrash } from 'react-icons/tb';
import { MdOutlineCloudDownload } from 'react-icons/md';
import {
  IconFileTypeDoc,
  IconFileTypeJpg,
  IconFileTypePdf,
  IconFileTypeXls,
} from '@tabler/icons-react';
import AddCompanyFileModal from '../../../components/shared/Modals/addCompanyFile/AddCompanyFileModal';

const mockFiles = [
  {
    id: 1,
    icon: 'pdf',
    name: 'File One long name example',
    label: 'CP575A',
    type: 'pdf',
    date: 'November 23, 2021',
  },
  {
    id: 2,
    icon: 'Screenshot',
    name: 'File Two',
    label: 'Screenshot',
    type: 'jpg',
    date: 'November 23, 2021',
  },
  {
    id: 3,
    icon: 'CP575G',
    name: 'File Three',
    label: 'CP575G',
    type: 'xls',
    date: 'November 23, 2021',
  },
  {
    id: 4,
    icon: '147C',
    name: 'File Four',
    label: '147C',
    type: 'xlsx',
    date: 'November 23, 2021',
  },
  {
    id: 5,
    icon: 'Faxed SS-4',
    name: 'File Five',
    label: 'Faxed SS-4',
    type: 'xls',
    date: 'November 23, 2021',
  },
  {
    id: 6,
    icon: 'W-9',
    name: 'File Six',
    label: 'W-9',
    type: 'pdf',
    date: 'November 23, 2021',
  },
  {
    id: 7,
    icon: 'CP577',
    name: 'File Seven',
    label: 'CP577',
    type: 'jpg',
    date: 'November 23, 2021',
  },
  {
    id: 8,
    icon: 'CP577E',
    name: 'File Eight',
    label: 'CP577E',
    type: 'pdf',
    date: 'November 23, 2021',
  },
];

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

function classNames(...classes: (string | boolean)[]) {
  return classes.filter(Boolean).join(' ');
}

const FilesSection = () => {
  const [open, setOpen] = useState(false);

  return (
    <>
      <SectionHeading text="Files list" status={false} hideStatus={true} />
      <AddCompanyFileModal setOpen={setOpen} open={open} />
      <div className="w-1/2 mb-20">
        <div
          onClick={() => setOpen(true)}
          className="ml-auto bg-mainBlue py-1.5 px-2 rounded w-fit text-white mb-4 hover:cursor-pointer"
        >
          + Add new file
        </div>
        {mockFiles.map((file) => {
          return (
            <div
              key={file.id}
              className="flex items-center justify-start py-2 px-2 border-b"
            >
              {fileIconHandler(file.type)}
              <div className="flex items-center justify-between w-full group">
                <div className="flex min-w-0 items-center flex-1 gap-3">
                  <div className="flex flex-col align-middle justify-start">
                    <span className="truncate text-sm hover:cursor-pointer mb-1">
                      {replaceSpaces(file.name)}
                    </span>
                    <span className="shrink-0 text-xs text-gray-400">
                      Document date: {file.date}
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
                  {file.label}
                </div>
              </div>
              <div className="ml-auto flex items-center justify-end group px-4 py-2">
                <TbTrash className="w-4 h-4 text-gray-500 opacity-0 hover:cursor-pointer group-hover:opacity-100 transition-all ease-in-out duration-150 hover:text-red-700" />
              </div>
            </div>
          );
        })}
      </div>
    </>
  );
};

export default FilesSection;
