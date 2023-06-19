import React from 'react';
import { FileUploader } from '../components/FileUploader';
import { SearchBar } from '../components/SearchBar';
import { FilesList } from '../components/FilesList';
import { FloatButton, message } from 'antd';
import { QuestionCircleOutlined } from '@ant-design/icons';
import { translate } from '../locales/translator';
import { useFileManager } from '../hooks/api/useFileManager';
import { useEffect } from 'react';

const FilesScreen = () => {
  const { error, isLoading, listedFiles, uploadFile, downloadFile, searchFiles, removeFile } = useFileManager()

  useEffect(() => {
    searchFiles()
  }, [])

  useEffect(() => {
    if (error) {
      message.error(error)
    }
  }, [error])

  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100vh', padding: 16, gap: 10, alignItems: 'center' }}>
      <div style={{ flex: 1, width: '100%', maxWidth: '600px' }}>
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
      <FloatButton
        icon={<QuestionCircleOutlined />}
        type="primary"
        tooltip={translate('home.tip')}
        style={{
          right: 24,
        }}
      />
    </div>
  );
};

export default FilesScreen;
