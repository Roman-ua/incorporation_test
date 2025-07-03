import React, { useState, useRef, useEffect } from 'react';

import ReactCrop, {
  convertToPixelCrop,
  type Crop,
  centerCrop,
  makeAspectCrop,
} from 'react-image-crop';
import 'react-image-crop/dist/ReactCrop.css';
import { classNames } from '../../../utils/helpers';
import { IconX } from '@tabler/icons-react';

interface CompanyLogoUploadProps {
  fileInputRef: React.RefObject<HTMLInputElement>;
  image: string | null;
  setImage: (image: string | null) => void;
  croppedImage: string | null;
  setCroppedImage: (image: string | null) => void;
  addPictureHandler: (data: string) => void;
  prevImage: string | null;
}

export default function CompanyLogoUpload({
  fileInputRef,
  image,
  setImage,
  croppedImage,
  setCroppedImage,
  addPictureHandler,
  prevImage,
}: CompanyLogoUploadProps) {
  const [isDragging, setIsDragging] = useState(false);
  const [isHovering, setIsHovering] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [crop, setCrop] = useState<Crop>();

  const imageRef = useRef<HTMLImageElement>(null);
  const modalRef = useRef<HTMLDivElement>(null);

  // Prevent scrolling when modal is open
  useEffect(() => {
    document.body.style.overflow = isModalOpen ? 'hidden' : 'auto';
    return () => {
      document.body.style.overflow = 'auto';
    };
  }, [isModalOpen]);

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(false);

    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFile(e.dataTransfer.files[0]);
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      handleFile(e.target.files[0]);
    }
  };

  const handleFile = (file: File) => {
    // Allow only specific image formats: JPEG, PNG, GIF, and WebP
    const allowedTypes = ['image/jpeg', 'image/png', 'image/gif', 'image/webp'];
    if (!allowedTypes.includes(file.type)) {
      return alert(
        `Invalid file type: ${file.type}\nPlease select a valid image file (JPEG, PNG, GIF, or WebP)`
      );
    }

    const reader = new FileReader();
    reader.onload = (e) => {
      if (e.target?.result) {
        setCroppedImage(null);
        setImage(e.target.result as string);
        setIsModalOpen(true);
      }
    };
    reader.readAsDataURL(file);
  };

  const handleCropComplete = () => {
    if (!imageRef.current || !crop?.width || !crop?.height) return;

    const canvas = document.createElement('canvas');
    const scaleX = imageRef.current.naturalWidth / imageRef.current.width;
    const scaleY = imageRef.current.naturalHeight / imageRef.current.height;
    const ctx = canvas.getContext('2d');

    const pixelCrop = convertToPixelCrop(
      crop,
      imageRef.current.width,
      imageRef.current.height
    );

    canvas.width = pixelCrop.width * scaleX;
    canvas.height = pixelCrop.height * scaleY;

    if (ctx) {
      ctx.drawImage(
        imageRef.current,
        pixelCrop.x * scaleX,
        pixelCrop.y * scaleY,
        pixelCrop.width * scaleX,
        pixelCrop.height * scaleY,
        0,
        0,
        pixelCrop.width * scaleX,
        pixelCrop.height * scaleY
      );

      const base64Image = canvas.toDataURL('image/jpeg');
      setCroppedImage(base64Image);
      addPictureHandler(base64Image);
      setIsModalOpen(false);
      setImage(null);
    }
  };

  const handleImageLoad = (e: React.SyntheticEvent<HTMLImageElement>) => {
    const { width, height } = e.currentTarget;
    const crop = centerCrop(
      makeAspectCrop({ unit: '%', width: 100 }, 1, width, height),
      width,
      height
    );
    setCrop(crop);
  };

  // Trigger file input click programmatically
  const triggerFileInput = () => {
    if (fileInputRef.current) {
      if (croppedImage) {
        setImage(croppedImage);
        setIsModalOpen(true);
        return;
      }

      // если нет картинки — просто открываем выбор файла
      if (fileInputRef.current) {
        fileInputRef.current.value = '';
        fileInputRef.current.click();
      }
    }
  };

  const cancelModalHandler = () => {
    setIsModalOpen(false);
    if (prevImage) {
      setCroppedImage(prevImage);
    }
    setImage(null);
  };

  return (
    <div style={{ WebkitUserSelect: 'none', userSelect: 'none' }}>
      <div
        className={classNames(
          'relative aspect-square w-[98px] h-[98px] border-2 border-dashed rounded-md flex flex-col items-center justify-center transition-colors hover:cursor-pointer',
          isDragging ? 'border-blue-600 bg-blue-50' : 'border-gray-300',
          image || croppedImage ? 'border-none p-0' : '',
          !croppedImage && !image ? 'hidden' : ''
        )}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        onMouseEnter={() => setIsHovering(true)}
        onMouseLeave={() => setIsHovering(false)}
        onClick={triggerFileInput} // Add click handler to the container
      >
        {/* Hidden file input */}
        <input
          ref={fileInputRef}
          type="file"
          className="hidden" // Hide the input but keep it accessible
          onChange={handleFileChange}
          accept="image/jpeg,image/png,image/gif,image/webp"
        />

        {/* Upload interface - shown when no image or on hover over existing image */}
        {(!image && !croppedImage) || isHovering ? (
          <div
            className={`absolute inset-0 w-full h-full z-10 ${
              image || croppedImage ? 'bg-black bg-opacity-50 rounded-md' : ''
            }`}
          >
            <div className="flex flex-col items-center justify-center h-full gap-2 text-center">
              <div className="text-sm font-medium flex items-center justify-center">
                <span className="text-gray-700 bg-gray-50 px-1 py-0.5 rounded-sm">
                  Change
                </span>
              </div>
            </div>
          </div>
        ) : null}

        {image && !croppedImage && (
          <div className="relative w-full h-full">
            <img
              draggable={false}
              src={image || '/placeholder.svg'}
              alt="Upload preview"
              className="w-full h-full object-cover rounded-md"
            />
          </div>
        )}

        {croppedImage && (
          <div className="relative w-full h-full">
            <img
              draggable={false}
              style={{
                WebkitUserSelect: 'none',
                userSelect: 'none',
              }}
              src={croppedImage || '/placeholder.svg'}
              alt="Cropped preview"
              className="w-full h-full object-cover rounded-md"
            />
          </div>
        )}
      </div>

      {/* Crop Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div
            ref={modalRef}
            style={{
              WebkitUserSelect: 'none',
              userSelect: 'none',
            }}
            className="bg-white rounded-md pt-2 max-w-sm max-h-[90vh] min-w-[350px] flex flex-col items-center relative"
          >
            <div className="flex items-center justify-end w-full mb-2 px-4">
              <div
                onClick={() => setIsModalOpen(false)}
                className="flex items-center justify-center p-1.5 hover:cursor-pointer hover:bg-gray-100 transition-all ease-in-out duration-150 rounded-md"
              >
                <IconX className="w-4 h-4 text-gray-700" />
              </div>
            </div>
            <div className="flex-1 overflow-auto px-4">
              <ReactCrop
                crop={crop}
                onChange={(c) => setCrop(c)}
                aspect={1}
                className="max-h-full"
              >
                <img
                  ref={imageRef}
                  src={image || ''}
                  onLoad={handleImageLoad}
                  className="max-w-full max-h-[60vh] object-contain mx-auto"
                  draggable={false}
                  style={{
                    WebkitUserSelect: 'none',
                    userSelect: 'none',
                  }}
                  alt="crop source"
                />
              </ReactCrop>
            </div>
            {!croppedImage ? (
              <div className="flex justify-end gap-2 mt-4 w-full bg-gray-100 py-3 px-5 rounded-b-lg">
                <button
                  className="mr-2 block px-3 py-2 text-center text-sm font-semibold text-gray-800 hover:text-gray-900 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 transition-all duration-150 ease-in-out hover:cursor-pointer"
                  onClick={cancelModalHandler}
                >
                  Cancel
                </button>
                <button
                  className="block rounded-md bg-mainBlue px-3 py-2 text-center text-sm font-semibold text-white shadow-sm hover:bg-sideBarBlue focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 transition-all duration-150 ease-in-out hover:cursor-pointer"
                  onClick={handleCropComplete}
                >
                  Save
                </button>
              </div>
            ) : (
              <div className="flex justify-between items-center gap-2 mt-4 w-full bg-gray-100 py-3 px-5 rounded-b-lg">
                <button
                  className="block px-3 py-2 text-sm font-semibold text-gray-800 hover:text-gray-900 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 transition-all duration-150 ease-in-out hover:cursor-pointer"
                  onClick={cancelModalHandler}
                >
                  Cancel
                </button>

                <div className="flex gap-4">
                  <button
                    className="block rounded-md px-3 py-2 text-center text-sm font-semibold text-red-700 hover:text-red-800  focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 transition-all duration-150 ease-in-out hover:cursor-pointer"
                    onClick={() => {
                      setCroppedImage(null);
                      setImage(null);
                      setIsModalOpen(false);
                    }}
                  >
                    Delete
                  </button>

                  <button
                    className="rounded-md bg-mainBlue px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-sideBarBlue focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 transition-all duration-150 hover:cursor-pointer"
                    onClick={() => {
                      setIsModalOpen(false);
                      if (fileInputRef.current) {
                        fileInputRef.current.value = '';
                        fileInputRef.current.click();
                      }
                    }}
                  >
                    Change
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
