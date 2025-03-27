import React from 'react';
import { IconFileTypeJpg, IconFileTypePdf } from '@tabler/icons-react';
import { TbTrash } from 'react-icons/tb';
import { MdOutlineCloudDownload } from 'react-icons/md';
import { HiOutlineExternalLink } from 'react-icons/hi';

interface FileDownloadProgressProps {
  fileName: string;
  fileSize: string;
  fileFormat: string;
  file?: File; // Accept actual File object
  fileUrl?: string; // Optional URL if already available
  deleteFileHandler: () => void;
  wrapperStyles?: string;
}

function classNames(...classes: (string | boolean)[]) {
  return classes.filter(Boolean).join(' ');
}

const UploadedReportFile: React.FC<FileDownloadProgressProps> = ({
  fileName,
  fileFormat,
  file,
  fileUrl,
  deleteFileHandler,
  wrapperStyles,
}) => {
  const fileIconHandler = (type: string) => {
    switch (type.toLowerCase()) {
      case 'pdf':
        return <IconFileTypePdf className="w-10 h-10 text-gray-500" />;
      case 'jpg':
      case 'jpeg':
      case 'png':
      case 'gif':
      case 'webp':
        return <IconFileTypeJpg className="w-10 h-10 text-gray-500" />;
      default:
        return <IconFileTypeJpg className="w-10 h-10 text-gray-500" />;
    }
  };

  const handleFileClick = () => {
    if (fileUrl) {
      window.open(fileUrl, '_blank');
    } else if (file) {
      const objectUrl = URL.createObjectURL(file);
      window.open(objectUrl, '_blank');
    }
  };

  const handleDownloadFile = (e: React.MouseEvent) => {
    e.stopPropagation(); // Предотвращаем открытие файла в новом окне
    if (fileUrl) {
      const link = document.createElement('a');
      link.href = fileUrl;
      link.download = fileName; // Указываем имя файла
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } else if (file) {
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

  return (
    <>
      <div
        className={classNames(
          'bg-white flex items-center space-x-4 border border-dashed border-gray-500/25 py-3 px-4 rounded-lg w-full hover:border-gray-500/50 transition-all ease-in-out duration-150 cursor-pointer relative',
          wrapperStyles || ''
        )}
      >
        <div className="flex-1">
          <div className="flex flex-col items-center justify-start gap-2 mb-2">
            {fileIconHandler(fileFormat)}

            <div className="flex items-center justify-start">
              <div className="text-gray-900 text-base font-semibold leading-none">
                {fileName}
              </div>
            </div>

            <div className="absolute top-2 right-2 flex items-start justify-end gap-2">
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

export default UploadedReportFile;
