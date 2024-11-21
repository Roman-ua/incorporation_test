import { useRef, useState } from 'react';

interface IFiles {
  id: number;
  file: File | { name: string; link: string } | null;
  name: string;
  status: string;
  dueDate: string;
}

const useFileUpload = () => {
  const inputRef = useRef<HTMLInputElement>(null);
  const [loaderStatus, setLoaderStatus] = useState(false);
  const [selectedFiles, setSelectedFiles] = useState<IFiles[]>([]);
  const [errorState, setErrorState] = useState<string>('');

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

  const deleteFileHandler = (id: number) => {
    const updatedFiles = selectedFiles.filter((item) => item.id !== id);
    setSelectedFiles(updatedFiles);
  };

  const convertHandler = async (file: File) => {
    const fileName = file.name.split('.')[0];
    const formData = new FormData();
    formData.append('file', file as File);

    try {
      const response = await fetch('https://ofxapi.nowlab.io/upload', {
        method: 'POST',
        body: formData,
      });

      if (response.ok) {
        const blob = await response.blob();
        const url = window.URL.createObjectURL(blob);

        const timeout = setTimeout(() => {
          setSelectedFiles((prevState) => {
            const lastElement = prevState.at(-1)?.id;
            return [
              ...prevState,
              {
                id: lastElement ? lastElement + 1 : 0,
                file: { name: `${fileName}.ofx`, link: url },
                name: `${fileName}.ofx`,
                status: 'Converted',
                dueDate: dateHandler(),
              },
            ];
          });

          setLoaderStatus(false);
          clearTimeout(timeout);
        }, 1000);
      } else {
        setLoaderStatus(false);
        console.log('Upload failed');
      }
    } catch (e) {
      setLoaderStatus(false);
      console.log(e, 'error');
    }
  };

  const handleFileInput = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (errorState) {
      setErrorState('');
    }

    if (e.target.files) {
      const file = e.target.files[0];
      if (file.type === 'text/csv' || file.name.endsWith('.csv')) {
        setLoaderStatus(true);
        await convertHandler(file);

        if (inputRef.current) {
          inputRef.current.value = '';
        }
      } else {
        setErrorState('Ooops invalid file type. Please select a CSV file.');
      }
    }
  };

  const handleFileDrop = async (file: File) => {
    if (errorState) {
      setErrorState('');
    }

    if (file && (file.type === 'text/csv' || file.name.endsWith('.csv'))) {
      setLoaderStatus(true);
      await convertHandler(file);
    } else {
      setErrorState('Ooops invalid file type. Please select a CSV file.');
    }
  };

  const handleDownload = (id: number) => {
    const convertedFile = selectedFiles.find((item) => item.id === id) as {
      file: { name: string; link: string };
    };

    if (convertedFile) {
      const link = document.createElement('a');
      link.href = convertedFile?.file?.link || '';
      link.download = convertedFile?.file?.name || '';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    }
  };

  return {
    inputRef,
    errorState,
    selectedFiles,
    loaderStatus,
    deleteFileHandler,
    setErrorState,
    handleFileInput,
    handleDownload,
    handleFileDrop,
  };
};

export default useFileUpload;
