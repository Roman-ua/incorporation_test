import { X } from 'lucide-react';
import React from 'react';
import { classNames } from '../../../utils/helpers';

const WarningMessage = ({
  message,
  onClose,
  wrapperClass,
}: {
  message: string;
  onClose: () => void;
  wrapperClass?: string;
}) => {
  return (
    <div
      className={classNames(
        'absolute text-sm text-gray-900 bg-yellow-300/30 px-2 py-1 rounded-md flex items-center justify-between',
        wrapperClass || '-bottom-9 left-0 w-full'
      )}
    >
      <div>
        ⚠️ <span className="ml-1">{message}</span>
      </div>
      <button className="hover:cursor-pointer" onClick={onClose}>
        <X className="w-3.5 h-3.5 text-gray-500" />
      </button>
    </div>
  );
};

export default WarningMessage;
