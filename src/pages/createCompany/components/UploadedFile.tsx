import React, { useEffect, useState } from 'react';
import { IconCheck, IconFileUpload, IconX } from '@tabler/icons-react';

interface FileDownloadProgressProps {
  fileName: string;
  fileSize: string;
  duration: number;
}

const FileDownloadProgress: React.FC<FileDownloadProgressProps> = ({
  fileName,
  fileSize,
  duration,
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

  return (
    <div className="flex items-center space-x-4 border py-3 px-1.5 rounded-lg w-full">
      <div className="flex-1">
        <div className="flex items-center justify-start gap-2 mb-2">
          <IconFileUpload className="font-light w-6 h-6 text-mainBlue" />
          <div>
            <div className="text-gray-900 text-sm font-semibold mb-1.5 leading-none	">
              {fileName}
            </div>
            <div className="flex items-center justify-start">
              <div className="text-xs text-gray-500">{fileSize}</div>
              {progress === 100 ? (
                <IconCheck className="w-3.5 h-3.5 text-mainBlue ml-2" />
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
          <IconX className="w-4 h-4 text-gray-500 hover:text-gray-900 ml-auto mb-auto hover:cursor-pointer transition-all ease-in-out duration-150" />
        </div>
        <div className="w-full bg-gray-300 rounded-full h-1.5 mt-2">
          <div
            className="bg-mainBlue h-1.5 rounded-full transition-all"
            style={{ width: `${progress}%` }}
          ></div>
        </div>
      </div>
    </div>
  );
};

export default FileDownloadProgress;
