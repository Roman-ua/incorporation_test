import { useRef, useState } from 'react';
import { IFiles } from '../../interfaces/interfaces';

const defaultFileStructure = {
  id: 0,
  file: null,
  name: '',
  status: '',
  dueDate: '',
  size: 0,
  format: '',
};

const useFileUpload = (file?: IFiles) => {
  const inputRef = useRef<HTMLInputElement>(null);
  const [selectedFile, setSelectedFile] = useState<IFiles>(
    file || defaultFileStructure
  );
  const [errorState, setErrorState] = useState<string>('');

  const cancelState = () => {
    setSelectedFile(defaultFileStructure);
  };

  const dateHandler = () => {
    const date = new Date();
    const options = {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    };
    return date.toLocaleDateString(
      'en-US',
      options as Intl.DateTimeFormatOptions
    );
  };

  const deleteFileHandler = () => {
    setSelectedFile(defaultFileStructure);
  };

  const convertHandler = async (file: File) => {
    const fileName = file.name.split('.')[0];
    const fileFormat = file.type.split('/')[1];
    const formData = new FormData();
    formData.append('file', file as File);
    setSelectedFile({
      id: 1,
      file: file,
      name: `${fileName.replace(/ /g, '_')}`,
      status: '',
      dueDate: dateHandler(),
      format: fileFormat,
      size: parseFloat((file?.size / (1024 * 1024)).toFixed(2)),
    });
  };

  const handleFileInput = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (errorState) {
      setErrorState('');
    }
    console.log(e.target.files, 'e.target.files');
    if (e.target.files) {
      const file = e.target.files[0];
      await convertHandler(file);
    }
  };

  const handleFileDrop = async (file: File) => {
    if (errorState) {
      setErrorState('');
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
