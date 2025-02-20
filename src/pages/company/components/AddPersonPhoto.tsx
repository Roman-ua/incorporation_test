import React, { useState, useRef } from 'react';
import { X, Camera } from 'lucide-react';

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
    <div className="flex flex-col items-center gap-6">
      <div
        className={`relative group cursor-pointer border border-dashed border-gray-200
          ${preview ? 'w-36 h-32' : 'w-36 h-32'}
          rounded-lg overflow-hidden transition-all duration-500 ease-out
          ${isDragging ? 'scale-102 ring-2 ring-blue-500 ring-offset-4' : ''}
          hover:shadow-lg`}
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
            <button
              onClick={(e) => {
                e.stopPropagation();
                removeImage();
              }}
              className="absolute top-3 right-3 p-1 bg-white/90 backdrop-blur-sm text-gray-700 rounded-lg opacity-0
                group-hover:opacity-100 transition-all duration-300 hover:bg-red-500 hover:text-white
                transform translate-x-2 group-hover:translate-x-0"
            >
              <X size={14} />
            </button>
          </>
        ) : (
          <div className="absolute inset-0 flex flex-col items-center justify-center transform transition-all duration-300">
            <div className="relative">
              <div
                className="absolute -inset-4 rounded-full opacity-20
                group-hover:opacity-40 blur-lg transition-opacity duration-300"
              />
              <Camera className="w-8 h-8 text-gray-900 relative" />
            </div>
            <span className="mt-3 text-sm text-gray-900 py-1 px-1.5 bg-gray-200 rounded-md hover:bg-gray-300 hover:cursor-pointer transition-all duration-150 ease-in-out">
              Choose a Photo
            </span>
            <div className="mt-3 flex items-center gap-2 text-xs text-gray-500">
              <span>or drag it here</span>
            </div>
          </div>
        )}
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
