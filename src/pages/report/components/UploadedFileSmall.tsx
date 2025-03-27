import React from 'react';
import { IconFileTypeJpg, IconFileTypePdf } from '@tabler/icons-react';
import { TbTrash } from 'react-icons/tb';
import { HiOutlineExternalLink } from 'react-icons/hi';
import { MdOutlineCloudDownload } from 'react-icons/md';

interface FileDownloadProgressProps {
  fileName: string;
  fileSize: string;
  duration: number;
  fileFormat: string;
  file?: File;
  deleteFileHandler: () => void;
  wrapperStyles?: string;
  hideProgressBar?: boolean;
  hideSize?: boolean;
}

function classNames(...classes: (string | boolean)[]) {
  return classes.filter(Boolean).join(' ');
}

const UploadedFileSmall: React.FC<FileDownloadProgressProps> = ({
  fileName,
  fileFormat,
  file,
  deleteFileHandler,
  wrapperStyles,
}) => {
  const fileIconHandler = (type: string) => {
    switch (type) {
      case 'pdf':
        return <IconFileTypePdf className="w-6 h-6 text-gray-500 mr-1.5" />;
      case 'jpg':
        return <IconFileTypeJpg className="w-6 h-6 text-gray-500 mr-1.5" />;
      default:
        return <IconFileTypeJpg className="w-6 h-6 text-gray-500 mr-1.5" />;
    }
  };

  const handleDownloadFile = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (file) {
      const objectUrl = URL.createObjectURL(file);
      const link = document.createElement('a');
      link.href = objectUrl;
      link.download = fileName;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(objectUrl);
    }
  };

  const handleFileClick = () => {
    if (file) {
      const objectUrl = URL.createObjectURL(file);
      window.open(objectUrl, '_blank');
    }
  };

  return (
    <>
      <div
        className={classNames(
          'flex items-center space-x-4 border py-3 px-4 rounded-lg w-full',
          wrapperStyles || ''
        )}
      >
        <div className="flex-1 hover:cursor-pointer">
          <div
            onClick={handleFileClick}
            className="flex items-center justify-between gap-2"
          >
            <div className="flex items-center h-full justify-start gap-2">
              {fileIconHandler(fileFormat)}
              <div className="text-gray-900 text-sm font-semibold leading-none">
                {fileName}
              </div>
            </div>
            <div className="flex items-start justify-end gap-2">
              <div
                onClick={(e) => {
                  e.stopPropagation();
                  handleFileClick();
                }}
                className="p-1 rounded-md bg-transparent  hover:bg-gray-100 transition-all ease-in-out duration-150 group/second"
              >
                <HiOutlineExternalLink className="w-4 h-4 text-gray-500 hover:cursor-pointer transition-all ease-in-out duration-150 group-hover/second:text-gray-700" />
              </div>
              <div
                onClick={(e) => {
                  e.stopPropagation();
                  handleDownloadFile(e);
                }}
                className="p-1 rounded-md bg-transparent  hover:bg-gray-100 transition-all ease-in-out duration-150 group/one"
              >
                <MdOutlineCloudDownload className="w-4 h-4 text-gray-500 hover:cursor-pointer transition-all ease-in-out duration-150 group-hover/one:text-blue-700" />
              </div>
              <div
                onClick={(e) => {
                  e.stopPropagation();
                  deleteFileHandler();
                }}
                className="p-1 rounded-md bg-transparent  hover:bg-gray-100 transition-all ease-in-out duration-150 group/third"
              >
                <TbTrash className="w-4 h-4 text-gray-500 hover:cursor-pointer transition-all ease-in-out duration-150 group-hover/third:text-red-700" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default UploadedFileSmall;
