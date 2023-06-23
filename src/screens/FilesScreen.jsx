import React from 'react';
import { FileUploader } from '../components/FileUploader';
import { SearchBar } from '../components/SearchBar';
import { FilesList } from '../components/FilesList';
import { message } from 'antd';
import { useFileManager } from '../hooks/api/useFileManager';
import { useEffect } from 'react';

const FilesScreen = (props) => {

  const {
    error, isLoading,
    listedFiles, uploadFile,
    downloadFile, searchFiles, removeFile } = useFileManager()

  useEffect(() => {
    searchFiles()
  }, [])

  useEffect(() => {
    if (error) {
      message.error(error)
    }
  }, [error])

  return (
    <div style={{
      height: '100%',
      maxWidth: '100%',
      display: 'flex',
      alignItems: 'center',
      flexDirection: 'column',
      padding: 16, gap: 10
    }}>
      <div style={{ flex: 1, width: '100%', maxWidth: '500px' }}>
        <FileUploader disabled={isLoading} handleUpload={uploadFile} />
      </div>
      <div style={{ flex: 1, maxHeight: '35px', width: '100%', maxWidth: '500px' }}>
        <SearchBar isLoading={isLoading} handleOnSearch={searchFiles} />
      </div>
      <div style={{ flex: 3, overflow: 'auto', width: '100%', padding: 5 }}>
        <FilesList
          isLoading={isLoading}
          fileData={listedFiles}
          handleRemove={removeFile}
          handleDownload={downloadFile}
        />
      </div>
    </div>
  );
};

export default FilesScreen;
