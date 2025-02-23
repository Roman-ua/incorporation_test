import React, { useState, useRef } from 'react';
import { Camera } from 'lucide-react';

interface AvatarUploadProps {
  onFileSelect?: (file: File) => void;
}

export function AvatarUpload({ onFileSelect }: AvatarUploadProps) {
  const [preview, setPreview] = useState<string | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileSelect = (file: File) => {
    if (!file.type.startsWith('image/')) {
      alert('Пожалуйста, выберите изображение');
      return;
    }

    const reader = new FileReader();
    reader.onload = (e) => {
      setPreview(e.target?.result as string);
      onFileSelect?.(file);
    };
    reader.readAsDataURL(file);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);

    const file = e.dataTransfer.files[0];
    if (file) {
      handleFileSelect(file);
    }
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const triggerFileInput = () => {
    fileInputRef.current?.click();
  };

  const removeImage = () => {
    setPreview(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  return (
    <div className="flex items-center jusify-start gap-6">
      <div
        className={`relative group cursor-pointer border border-dashed border-gray-200
          ${preview ? 'w-24 h-24' : 'w-24 h-24'}
          rounded-full overflow-hidden transition-all duration-500 ease-out
          ${isDragging ? 'scale-102 ring-2 ring-blue-500 ring-offset-4' : ''}
          hover:shadow-sm`}
        onDrop={handleDrop}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onClick={!preview ? triggerFileInput : undefined}
      >
        {preview ? (
          <>
            <img
              src={preview}
              alt="Avatar preview"
              className="w-full h-full object-cover transition-all duration-500 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-20 transition-all duration-300" />
          </>
        ) : (
          <div className="absolute inset-0 flex flex-col items-center justify-center transform transition-all duration-300">
            <div className="relative">
              <div
                className="absolute -inset-4 rounded-full opacity-20
                group-hover:opacity-40 blur-lg transition-opacity duration-300"
              />
              <Camera className="w-8 h-8 text-gray-700 relative" />
            </div>
          </div>
        )}
      </div>

      <div>
        <div className="flex items-center gap-2 mb-2">
          <span
            onClick={triggerFileInput}
            className="w-fit block rounded-md bg-mainBlue px-3 py-2 text-center text-sm font-semibold text-white shadow-sm hover:bg-sideBarBlue focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 transition-all duration-150 ease-in-out hover:cursor-pointer"
          >
            Choose a Photo
          </span>

          {preview && (
            <button
              onClick={(e) => {
                e.stopPropagation();
                removeImage();
              }}
              className="w-fit mr-auto block rounded-md bg-red-50 border-red-50 px-3 py-2 border text-center text-sm font-semibold shadow-sm text-gray-900 hover:bg-red-100 hover:border-red-100 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 transition-all duration-150 ease-in-out hover:cursor-pointer"
            >
              Delete Photo
            </button>
          )}
        </div>
        <div className="text-xs text-gray-500">
          Image should be at least 400 x 400 as a png or jpeg file
        </div>
      </div>

      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        className="hidden"
        onChange={(e) => {
          const file = e.target.files?.[0];
          if (file) {
            handleFileSelect(file);
          }
        }}
      />
    </div>
  );
}
