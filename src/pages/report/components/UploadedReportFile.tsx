import React from 'react';
import {
  IconCheck,
  IconFileTypeJpg,
  IconFileTypePdf,
} from '@tabler/icons-react';

interface FileDownloadProgressProps {
  fileName: string;
  fileSize: string;
  fileFormat: string;
  deleteFileHandler: () => void;
  wrapperStyles?: string;
}

function classNames(...classes: (string | boolean)[]) {
  return classes.filter(Boolean).join(' ');
}

const UploadedReportFile: React.FC<FileDownloadProgressProps> = ({
  fileName,
  fileSize,
  fileFormat,
  deleteFileHandler,
  wrapperStyles,
}) => {
  const fileIconHandler = (type: string) => {
    switch (type) {
      case 'pdf':
        return <IconFileTypePdf className="w-10 h-10 text-gray-500" />;
      case 'jpg':
        return <IconFileTypeJpg className="w-10 h-10 text-gray-500" />;
      default:
        return <IconFileTypeJpg className="w-10 h-10 text-gray-500" />;
    }
  };

  return (
    <div
      className={classNames(
        'bg-white flex items-center space-x-4 border border-dashed border-gray-500/25 py-3 px-4 rounded-lg w-full hover:border-gray-500/50 transition-all ease-in-out duration-150',
        wrapperStyles || ''
      )}
    >
      <div className="flex-1">
        <div className="flex flex-col items-center justify-start gap-2 mb-2">
          {fileIconHandler(fileFormat)}

          <div className="flex items-center justify-start">
            <div className="text-gray-900 text-base font-semibold leading-none mr-1">
              {fileName}
            </div>
            <div className="text-sm text-gray-500">{fileSize}</div>
            <IconCheck className="w-3.5 h-3.5 text-green-500 ml-2" />
          </div>

          <div
            onClick={deleteFileHandler}
            className="inline-flex items-center justify-center gap-2 whitespace-nowrap text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 hover:bg-gray-100 hover:text-gray-900 h-9 rounded-md px-3 hover:cursor-pointer"
          >
            Remove
          </div>
        </div>
      </div>
    </div>
  );
};

export default UploadedReportFile;
