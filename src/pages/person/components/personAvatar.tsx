import React, { useState, useRef, useEffect } from 'react';

import { Check } from 'lucide-react';
import ReactCrop, { type Crop } from 'react-image-crop';
import 'react-image-crop/dist/ReactCrop.css';
import { classNames } from '../../../utils/helpers';
import XBtn from '../../../components/shared/buttons/XBtn';

export default function PersonAvatar() {
  const [image, setImage] = useState<string | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [isHovering, setIsHovering] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [crop, setCrop] = useState<Crop>({
    unit: '%',
    width: 50,
    height: 50,
    x: 25,
    y: 25,
  });
  const [croppedImage, setCroppedImage] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const imageRef = useRef<HTMLImageElement>(null);
  const modalRef = useRef<HTMLDivElement>(null);

  // Close modal when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        modalRef.current &&
        !modalRef.current.contains(event.target as Node)
      ) {
        setIsModalOpen(false);
      }
    }

    if (isModalOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isModalOpen]);

  // Prevent scrolling when modal is open
  useEffect(() => {
    if (isModalOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }
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
    if (!file.type.match('image.*')) {
      alert('Please select an image file');
      return;
    }

    const reader = new FileReader();
    reader.onload = (e) => {
      if (e.target?.result) {
        // Always reset both image states when uploading a new file
        setCroppedImage(null);
        setImage(e.target.result as string);

        // Reset crop to default when opening modal
        setCrop({
          unit: '%',
          width: 50,
          height: 50,
          x: 25,
          y: 25,
        });

        // Open crop modal immediately
        setIsModalOpen(true);
      }
    };
    reader.readAsDataURL(file);
  };

  const handleCropComplete = () => {
    if (!imageRef.current || !crop.width || !crop.height) return;

    const canvas = document.createElement('canvas');
    const scaleX = imageRef.current.naturalWidth / imageRef.current.width;
    const scaleY = imageRef.current.naturalHeight / imageRef.current.height;
    const ctx = canvas.getContext('2d');

    const pixelRatio = window.devicePixelRatio;
    canvas.width = crop.width * scaleX;
    canvas.height = crop.height * scaleY;

    if (ctx) {
      ctx.setTransform(pixelRatio, 0, 0, pixelRatio, 0, 0);
      ctx.imageSmoothingQuality = 'high';

      ctx.drawImage(
        imageRef.current,
        crop.x * scaleX,
        crop.y * scaleY,
        crop.width * scaleX,
        crop.height * scaleY,
        0,
        0,
        crop.width * scaleX,
        crop.height * scaleY
      );

      const base64Image = canvas.toDataURL('image/jpeg');
      setCroppedImage(base64Image);
      setIsModalOpen(false);
      setImage(null); // Clear the original image after cropping
    }
  };

  // Trigger file input click programmatically
  const triggerFileInput = () => {
    if (fileInputRef.current) {
      // Reset the file input value to ensure onChange fires even if selecting the same file
      if (fileInputRef.current.value) {
        fileInputRef.current.value = '';
      }
      fileInputRef.current.click();
    }
  };

  return (
    <div>
      <div
        className={classNames(
          'relative aspect-square w-[98px] h-[98px] border-2 border-dashed rounded-md flex flex-col items-center justify-center transition-colors hover:cursor-pointer',
          isDragging ? 'border-blue-600 bg-blue-50' : 'border-gray-300',
          image || croppedImage ? 'border-none p-0' : ''
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
              <div className="text-sm font-medium">
                <span
                  className={`${image || croppedImage ? 'text-white' : 'text-black'}`}
                >
                  Click to upload
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
            className="bg-white rounded-md p-4 max-w-3xl max-h-[90vh] flex flex-col relative"
          >
            <div className="flex justify-between items-center mb-12">
              <XBtn clickHandler={() => setIsModalOpen(false)} />
            </div>

            <div className="flex-1 overflow-auto">
              <ReactCrop
                crop={crop}
                onChange={(c) => setCrop(c)}
                aspect={1}
                className="max-h-full"
              >
                <img
                  ref={imageRef}
                  src={image || '/placeholder.svg'}
                  alt="Upload preview"
                  className="max-w-full max-h-[60vh] object-contain mx-auto"
                />
              </ReactCrop>
            </div>

            <div className="flex justify-end gap-2 mt-4">
              <div
                className="mr-2 block px-3 py-2 text-center text-sm font-semibold text-gray-800 hover:text-gray-900 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 transition-all duration-150 ease-in-out hover:cursor-pointer"
                onClick={() => setIsModalOpen(false)}
              >
                Cancel
              </div>
              <div
                className="flex items-center justify-center rounded-md bg-mainBlue px-3 py-2 text-center text-sm font-semibold text-white shadow-sm hover:bg-sideBarBlue focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 transition-all duration-150 ease-in-out hover:cursor-pointer"
                onClick={handleCropComplete}
              >
                <Check className="h-4 w-4 mr-2" />
                Save
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
