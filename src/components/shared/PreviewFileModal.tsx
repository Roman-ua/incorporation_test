import React, { useEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import { IconX } from '@tabler/icons-react';

interface IProps {
  file: File;
  fileUrl: string;
  fileIcon: JSX.Element;
  fileFormat: string;
  fileName: string;
  previewOpen: boolean;
  setPreviewOpen: (value: boolean) => void;
  fileSize: string;
}
const Modal = ({
  isOpen,
  onClose,
  children,
  title,
}: {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
  title: React.ReactNode;
}) => {
  const modalRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };

    // Prevent scrolling on body when modal is open
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleKeyDown);
    }

    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, onClose]);

  const handleBackdropClick = (e: React.MouseEvent) => {
    if (modalRef.current && !modalRef.current.contains(e.target as Node)) {
      onClose();
    }
  };

  if (!isOpen) return null;

  // Use createPortal to render modal at the document body level
  return createPortal(
    <div
      className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4"
      onClick={handleBackdropClick}
    >
      <div
        ref={modalRef}
        className="bg-white rounded-lg shadow-xl max-w-[90vw] w-fit max-h-[90vh] overflow-hidden flex flex-col animate-in fade-in zoom-in-95 duration-200"
      >
        <div className="flex items-center justify-between p-4 border-b relative">
          <div className="font-medium">{title}</div>
          <div
            onClick={onClose}
            className="flex items-center justify-between absolute top-4 right-5 p-1.5 hover:cursor-pointer hover:bg-gray-100 transition-all ease-in-out duration-150 rounded-md"
          >
            <IconX className="w-4 h-4 text-gray-700" />
          </div>
        </div>
        <div className="overflow-auto p-4 flex-1">{children}</div>
      </div>
    </div>,
    document.body
  );
};

const PreviewFileModal = ({
  file,
  fileUrl,
  fileIcon,
  fileFormat,
  fileName,
  previewOpen,
  setPreviewOpen,
  fileSize,
}: IProps) => {
  const [objectUrl, setObjectUrl] = useState<string | null>(null);

  const getFileSource = () => {
    if (objectUrl) return objectUrl;
    if (fileUrl) return fileUrl;
    return null;
  };

  const renderFilePreview = () => {
    const source = getFileSource();

    if (!source) {
      return (
        <div className="flex flex-col items-center justify-center p-8">
          {fileIcon}
          <p className="mt-4 text-gray-700">Preview not available</p>
        </div>
      );
    }

    switch (fileFormat.toLowerCase()) {
      case 'pdf':
        return (
          <iframe src={source} className="w-full h-[70vh]" title={fileName} />
        );
      case 'jpg':
      case 'jpeg':
      case 'png':
      case 'gif':
      case 'webp':
        return (
          <div className="flex items-center justify-center">
            <img
              src={source || '/placeholder.svg'}
              alt={fileName}
              className="max-w-full max-h-[70vh] object-contain rounded-md"
            />
          </div>
        );
      case 'mp4':
      case 'webm':
      case 'ogg':
        return (
          <video src={source} controls className="max-w-full max-h-[70vh]">
            Your browser does not support the video tag.
          </video>
        );
      default:
        return (
          <div className="flex flex-col items-center justify-center p-8">
            {fileIcon}
            <p className="mt-4 text-gray-700">
              Preview not available for this file type
            </p>
            <a
              href={source}
              download={fileName}
              className="mt-4 px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-colors"
            >
              Download File
            </a>
          </div>
        );
    }
  };
  // Handle client-side only rendering for createPortal
  useEffect(() => {
    // Create object URL from File object if provided
    if (file && !objectUrl) {
      const url = URL.createObjectURL(file);
      setObjectUrl(url);
    }

    // Cleanup function to revoke object URL
    return () => {
      if (objectUrl) {
        URL.revokeObjectURL(objectUrl);
      }
    };
  }, [file, objectUrl]);

  return (
    <Modal
      isOpen={previewOpen}
      onClose={() => setPreviewOpen(false)}
      title={
        <div className="flex items-center justify-between w-full gap-4">
          <span>{fileName}</span>
          <span className="text-xs font-normal text-gray-500">{fileSize}</span>
        </div>
      }
    >
      {renderFilePreview()}
    </Modal>
  );
};

export default PreviewFileModal;
