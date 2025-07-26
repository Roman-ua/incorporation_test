import { useRef, useState } from 'react';

import classNames from 'classnames';
import React from 'react';
import { IconX } from '@tabler/icons-react';
import ReactCrop, {
  convertToPixelCrop,
  type Crop,
  centerCrop,
  makeAspectCrop,
} from 'react-image-crop';
import 'react-image-crop/dist/ReactCrop.css';
import { base64ToFile } from '../../../utils/helpers';
interface UploadAvatarProps {
  fileInputRef: React.RefObject<HTMLInputElement>;
  uploadedImage: string;
  deleteAvatar: () => void;
  userId: string;
  saveImageToServer: (image: File) => void;
}

const UploadAvatar = ({
  fileInputRef,
  uploadedImage,
  deleteAvatar,
  userId,
  saveImageToServer,
}: UploadAvatarProps) => {
  const [isUpdateModalOpen, setIsUpdateModalOpen] = useState(false);
  const [crop, setCrop] = useState<Crop | undefined>(undefined);

  const [image, setImage] = useState<string | null>(null);

  //   const fileInputRef = useRef<HTMLInputElement>(null);
  const imageRef = useRef<HTMLImageElement>(null);

  const cancelModalHandler = () => {
    setIsUpdateModalOpen(false);
    setImage(null);
    setCrop(undefined);
  };

  const handleImageLoad = (e: React.SyntheticEvent<HTMLImageElement>) => {
    const { width, height } = e.currentTarget;
    const cropValue = centerCrop(
      makeAspectCrop({ unit: '%', width: 100 }, 1, width, height),
      width,
      height
    );
    if (crop === undefined) {
      setCrop(cropValue);
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
        setImage(e.target.result as string);
        setIsUpdateModalOpen(true);
      }
    };
    reader.readAsDataURL(file);
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      handleFile(e.target.files[0]);
    }
  };

  const triggerFileInput = () => {
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
      fileInputRef.current.click();
    }
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
      const file = base64ToFile(base64Image, `${userId || 'cropped'}.jpg`);

      saveImageToServer?.(file);
      cancelModalHandler();
    }
  };

  const RenderUploadedImage = () => {
    return (
      <div className="relative w-full h-full group">
        <img
          draggable={false}
          src={uploadedImage || '/placeholder.svg'}
          alt="Upload preview"
          className="w-full h-full object-cover rounded-md"
        />

        <div
          className={classNames(
            'absolute inset-0 w-full h-full z-10 rounded-md ',
            uploadedImage
              ? 'bg-black bg-opacity-0 group-hover:bg-opacity-50 transition-colors duration-200'
              : ''
          )}
        >
          <div className="flex flex-col items-center justify-center h-full gap-2 text-center transition-opacity duration-200">
            <div
              onClick={() => setIsUpdateModalOpen(true)}
              className="w-[59px] text-sm font-medium flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-200"
            >
              <span className="w-full text-gray-700 bg-gray-50 px-1 py-0.5 rounded-sm">
                Change
              </span>
            </div>
          </div>
        </div>
      </div>
    );
  };

  const handleDeleteAvatar = () => {
    deleteAvatar();
    cancelModalHandler();
  };

  return (
    <div
      style={{ WebkitUserSelect: 'none', userSelect: 'none' }}
      className={classNames(
        'relative aspect-square rounded-md flex flex-col items-center justify-center transition-colors hover:cursor-pointer',
        !uploadedImage ? 'w-0 h-0' : 'w-[98px] h-[98px]'
      )}
    >
      <input
        ref={fileInputRef}
        type="file"
        className="hidden" // Hide the input but keep it accessible
        onChange={handleFileChange}
        accept="image/jpeg,image/png,image/gif,image/webp"
      />
      {uploadedImage && <RenderUploadedImage />}

      {isUpdateModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div
            style={{
              WebkitUserSelect: 'none',
              userSelect: 'none',
            }}
            className="bg-white rounded-md pt-2 max-w-sm max-h-[90vh] min-w-[350px] flex flex-col items-center relative"
          >
            <div className="flex items-center justify-between w-full mb-2 px-4">
              <span className="text-md font-medium">Update Avatar</span>
              <div
                onClick={cancelModalHandler}
                className="flex items-center justify-center p-1.5 hover:cursor-pointer hover:bg-gray-100 transition-all ease-in-out duration-150 rounded-md"
              >
                <IconX className="w-4 h-4 text-gray-700" />
              </div>
            </div>
            <div className="flex flex-col items-center justify-center w-full h-full px-4">
              {!image ? (
                // render uploaded image
                <img
                  draggable={false}
                  src={uploadedImage || '/placeholder.svg'}
                  alt="Upload preview"
                  className="w-full h-full object-cover rounded-md"
                />
              ) : (
                // render crop image
                <div className="flex-1 overflow-auto rounded-md">
                  <ReactCrop
                    crop={crop || undefined}
                    onChange={(c) => setCrop(c)}
                    aspect={1}
                    className="max-h-full w-[352px] h-[352px] rounded-md"
                  >
                    <img
                      ref={imageRef}
                      src={image || ''}
                      onLoad={handleImageLoad}
                      className="max-w-full max-h-[90vh] object-cover mx-auto rounded-md"
                      draggable={false}
                      style={{
                        WebkitUserSelect: 'none',
                        userSelect: 'none',
                      }}
                      alt="crop source"
                    />
                  </ReactCrop>
                </div>
              )}
            </div>

            {!image ? (
              // render buttons for uploaded image
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
                    onClick={handleDeleteAvatar}
                  >
                    Delete
                  </button>

                  <button
                    className="rounded-md bg-mainBlue px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-sideBarBlue focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 transition-all duration-150 hover:cursor-pointer"
                    onClick={triggerFileInput}
                  >
                    Change
                  </button>
                </div>
              </div>
            ) : (
              // render buttons for crop image
              <div className="flex justify-between items-center gap-2 mt-4 w-full bg-gray-100 py-3 px-5 rounded-b-lg">
                <button
                  className="block px-3 py-2 text-sm font-semibold text-gray-800 hover:text-gray-900 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 transition-all duration-150 ease-in-out hover:cursor-pointer"
                  onClick={cancelModalHandler}
                >
                  Cancel
                </button>

                <div className="flex gap-4">
                  <button
                    className="rounded-md bg-mainBlue px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-sideBarBlue focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 transition-all duration-150 hover:cursor-pointer"
                    onClick={handleCropComplete}
                  >
                    Save
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default UploadAvatar;
