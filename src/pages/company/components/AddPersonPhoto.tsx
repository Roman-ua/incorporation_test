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
    <div className="flex items-center jusify-start gap-4">
      <div
        className={`relative group cursor-pointer border border-dashed border-gray-200
          ${preview ? 'w-12 h-12' : 'w-12 h-12'}
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
              <Camera className="w-4 h-4 text-gray-700 relative" />
            </div>
          </div>
        )}
      </div>

      <div>
        <div className="flex items-center gap-4 mb-1">
          <span
            onClick={triggerFileInput}
            className="w-fit text-sm font-bold text-gray-700 hover:text-gray-900 hover:cursor-pointer transition-all duration-150 ease-in-out"
          >
            {preview ? 'Change' : 'Select image'}
          </span>

          {preview && (
            <button
              onClick={(e) => {
                e.stopPropagation();
                removeImage();
              }}
              className="text-sm font-bold text-red-700 hover:text-red-900 hover:cursor-pointer transition-all duration-150 ease-in-out"
            >
              Delete
            </button>
          )}
        </div>
        <div className="text-xs text-gray-500">
          Image should be at least 400 x 400 px as a png or jpeg file.
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
