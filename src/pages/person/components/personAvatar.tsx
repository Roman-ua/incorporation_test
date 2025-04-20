import React, { useState, useRef, useEffect } from 'react';

import ReactCrop, {
  convertToPixelCrop,
  type Crop,
  centerCrop,
  makeAspectCrop,
} from 'react-image-crop';
import 'react-image-crop/dist/ReactCrop.css';
import { classNames } from '../../../utils/helpers';
import XBtn from '../../../components/shared/buttons/XBtn';

interface PersonAvatarProps {
  fileInputRef: React.RefObject<HTMLInputElement>;
  image: string | null;
  setImage: (image: string | null) => void;
  croppedImage: string | null;
  setCroppedImage: (image: string | null) => void;
  addPictureHandler: (data: string) => void;
  prevImage: string | null;
}

export default function PersonAvatar({
  fileInputRef,
  image,
  setImage,
  croppedImage,
  setCroppedImage,
  addPictureHandler,
  prevImage,
}: PersonAvatarProps) {
  const [isDragging, setIsDragging] = useState(false);
  const [isHovering, setIsHovering] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [crop, setCrop] = useState<Crop>();

  const imageRef = useRef<HTMLImageElement>(null);
  const modalRef = useRef<HTMLDivElement>(null);

  // Close modal when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        modalRef.current &&
        !modalRef.current.contains(event.target as Node)
      ) {
        console.log(croppedImage, image, 'clicked outside');
        setIsModalOpen(false);
        if (prevImage) {
          setCroppedImage(prevImage);
        }
        setImage(null);
      }
    }
    if (isModalOpen) document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [isModalOpen]);

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
    if (!file.type.match('image.*'))
      return alert('Please select an image file');

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
    <div>
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
          accept="image/*"
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
              src={image || '/placeholder.svg'}
              alt="Upload preview"
              className="w-full h-full object-cover rounded-md"
            />
          </div>
        )}

        {croppedImage && (
          <div className="relative w-full h-full">
            <img
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
            className="bg-white rounded-md p-4 max-w-sm max-h-[90vh] flex flex-col relative"
          >
            <XBtn clickHandler={() => setIsModalOpen(false)} />
            <div className="flex-1 overflow-auto">
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
                  alt="crop source"
                />
              </ReactCrop>
            </div>
            {!croppedImage ? (
              <div className="flex justify-end gap-2 mt-4">
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
              <div className="flex justify-between items-center gap-2 mt-4">
                <button
                  className="block px-3 py-2 text-sm font-semibold text-gray-800 hover:text-gray-900 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 transition-all duration-150 ease-in-out hover:cursor-pointer"
                  onClick={cancelModalHandler}
                >
                  Cancel
                </button>

                <div className="flex gap-4">
                  <button
                    className=" block rounded-md bg-red-50 border-red-50 px-3 py-2 border text-center text-sm font-semibold shadow-sm text-gray-900 hover:bg-red-100 hover:border-red-100 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 transition-all duration-150 ease-in-out hover:cursor-pointer"
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
