import { X } from 'lucide-react';
import React from 'react';
import { classNames } from '../../../utils/helpers';

const WarningMessage = ({
  message,
  onClose,
  wrapperClass,
  bgSettings,
  contacktLink,
}: {
  message: string;
  onClose: () => void;
  wrapperClass?: string;
  contacktLink?: string;
  bgSettings?: string;
}) => {
  return (
    <div
      className={classNames(
        'absolute text-sm text-gray-900 px-2 py-1 rounded-md flex items-center justify-between',
        bgSettings || 'bg-yellow-300/30',
        wrapperClass || '-bottom-9 left-0 w-full'
      )}
    >
      <div>
        ⚠️{' '}
        <span className="ml-1">
          {message}{' '}
          {contacktLink && (
            <a href={`mailto:${contacktLink}`} className="underline">
              contact us.
            </a>
          )}
        </span>
      </div>
      <button className="hover:cursor-pointer" onClick={onClose}>
        <X className="w-3.5 h-3.5 text-gray-500" />
      </button>
    </div>
  );
};

export default WarningMessage;
