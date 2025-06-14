import { useRef, useState } from 'react';

const allowedTypes = [
  'image/jpeg',
  'image/png',
  'image/webp',
  'image/gif',
  'application/pdf',
];

const useFileUpload = (file?: File | null) => {
  const inputRef = useRef<HTMLInputElement>(null);
  const [selectedFile, setSelectedFile] = useState<File | null>(file || null);
  const [errorState, setErrorState] = useState<string>('');

  const cancelState = () => {
    setSelectedFile(null);
  };

  // const dateHandler = () => {
  //   const date = new Date();
  //   const options = {
  //     year: 'numeric',
  //     month: 'long',
  //     day: 'numeric',
  //     hour: '2-digit',
  //     minute: '2-digit',
  //   };
  //   return date.toLocaleDateString(
  //     'en-US',
  //     options as Intl.DateTimeFormatOptions
  //   );
  // };

  const deleteFileHandler = () => {
    setSelectedFile(null);
  };

  const convertHandler = async (file: File) => {
    // const fileName = file.name.split('.')[0];
    // const fileFormat = file.type.split('/')[1];
    const formData = new FormData();
    formData.append('file', file as File);
    setSelectedFile(file);
  };

  const handleFileInput = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (errorState) setErrorState('');

    if (e.target.files) {
      const file = e.target.files[0];

      if (!allowedTypes.includes(file.type)) {
        setErrorState('Only image or PDF files are allowed');
        return;
      }

      await convertHandler(file);
    }
  };

  const handleFileDrop = async (file: File) => {
    if (errorState) setErrorState('');

    if (!allowedTypes.includes(file.type)) {
      setErrorState('Only image or PDF files are allowed');
      return;
    }

    await convertHandler(file);
  };

  return {
    inputRef,
    errorState,
    selectedFile,
    cancelState,
    deleteFileHandler,
    setErrorState,
    handleFileInput,
    handleFileDrop,
  };
};

export default useFileUpload;
