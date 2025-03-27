import React, { useEffect, useState } from 'react';
import {
  IconCheck,
  IconFileTypeJpg,
  IconFileTypePdf,
} from '@tabler/icons-react';
import { TbTrash } from 'react-icons/tb';

interface FileDownloadProgressProps {
  fileName: string;
  fileSize: string;
  duration: number;
  fileFormat: string;
  file?: File;
  deleteFileHandler: () => void;
  wrapperStyles?: string;
  hideProgressBar?: boolean;
}

function classNames(...classes: (string | boolean)[]) {
  return classes.filter(Boolean).join(' ');
}

const FileDownloadProgress: React.FC<FileDownloadProgressProps> = ({
  fileName,
  fileSize,
  duration,
  fileFormat,
  file,
  deleteFileHandler,
  wrapperStyles,
  hideProgressBar,
}) => {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((prev) => {
        const nextProgress = prev + 100 / (duration * 10);
        if (nextProgress >= 100) {
          clearInterval(interval);
          return 100;
        }
        return nextProgress;
      });
    }, 100);

    return () => clearInterval(interval);
  }, [duration]);

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
            className="flex items-center justify-start gap-2"
          >
            {fileIconHandler(fileFormat)}
            <div>
              <div className="text-gray-900 text-sm font-semibold mb-1.5 leading-none	">
                {fileName}
              </div>
              <div className="flex items-center justify-start">
                <div className="text-xs text-gray-500">{fileSize}</div>
                {progress === 100 ? (
                  <IconCheck className="w-3.5 h-3.5 text-green-500 ml-2" />
                ) : (
                  <div className="text-right text-xs text-gray-500 ml-2 relative pl-5">
                    <span className="absolute left-0 top-0">
                      {Math.max(
                        0,
                        parseFloat(
                          (duration - (progress / 100) * duration).toFixed(1)
                        )
                      )}
                    </span>
                    sec left
                  </div>
                )}
              </div>
            </div>
            <TbTrash
              onClick={(e) => {
                e.stopPropagation();
                deleteFileHandler();
              }}
              className="ml-auto mb-auto w-5 h-5 text-gray-500 hover:cursor-pointer transition-all ease-in-out duration-150 hover:text-red-700"
            />
          </div>
          {!hideProgressBar && (
            <div className="w-full bg-gray-300 rounded-full h-1.5 mt-2">
              <div
                className={classNames(
                  'h-1.5 rounded-full transition-all',
                  progress === 100 ? 'bg-green-500' : 'bg-mainBlue'
                )}
                style={{ width: `${progress}%` }}
              ></div>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default FileDownloadProgress;
