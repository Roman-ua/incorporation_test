import React, { useEffect } from 'react';
import DropFileArea from '../../../components/shared/Modals/addCompanyFile/DropFileArea';
import FileDownloadProgress from '../../createCompany/components/UploadedFile';
import useFileUpload from '../../../utils/hooks/useFileUpload';
import { truncateString } from '../../../utils/helpers';
import { IFiles } from '../../../interfaces/interfaces';

interface IProps {
  setFile: (file: IFiles) => void;
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
            fileName={truncateString(selectedFile.name, 15)}
            fileSize={`${selectedFile?.size} MB`}
            fileFormat={selectedFile.format}
            duration={3}
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
