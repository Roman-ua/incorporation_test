import React, { useEffect } from 'react';
import DropFileArea from '../../../components/shared/Modals/addCompanyFile/DropFileArea';
import FileDownloadProgress from '../../createCompany/components/UploadedFile';
import useFileUpload from '../../../utils/hooks/useFileUpload';

interface IProps {
  setFile: (file: File | null) => void;
}

const FeeFile = ({ setFile }: IProps) => {
  const {
    inputRef,
    selectedFile,
    handleFileInput,
    handleFileDrop,
    deleteFileHandler,
  } = useFileUpload();

  useEffect(() => {
    setFile(selectedFile);
  }, [selectedFile]);

  return (
    <div className="mt-3">
      {selectedFile?.name ? (
        <div className="w-full">
          <FileDownloadProgress
            deleteFileHandler={deleteFileHandler}
            fileName={selectedFile.name}
            fileSize={`${selectedFile?.size} MB`}
            // fileFormat={selectedFile?.format}
            fileFormat={'Jpeg'}
            duration={3}
            wrapperStyles={'bg-white'}
          />
        </div>
      ) : (
        <DropFileArea
          loaderStatus={false}
          inputRef={inputRef}
          handleFileDrop={handleFileDrop}
          handleFileInput={handleFileInput}
          mandatoryError={false}
        />
      )}
    </div>
  );
};

export default FeeFile;
