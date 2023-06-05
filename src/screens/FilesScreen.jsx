import React from 'react';
import { FileUploader } from '../components/FileUploader';
import { SearchBar } from '../components/SearchBar';
import { FilesList } from '../components/FilesList';
import { FloatButton } from 'antd';
import { QuestionCircleOutlined } from '@ant-design/icons';
import { translate } from '../locales/translator';
import { useSearchFiles } from '../hooks/api/useSearchFiles';
import { useEffect } from 'react';

const FilesScreen = () => {
  const { error, isLoading, listedFiles, updateFilesList, searchFiles } = useSearchFiles()

  useEffect(() => {
    searchFiles()
  }, [])

  const handleUpdateListedFiles = (files) => {
    updateFilesList(files)
  }

  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100vh', padding: 16, gap: 10, alignItems: 'center' }}>
      <div style={{ flex: 1, width: '100%', maxWidth: '600px' }}>
        <FileUploader disabled={isLoading} afterUpload={handleUpdateListedFiles} />
      </div>
      <div style={{ flex: 1, maxHeight: '35px', width: '100%', maxWidth: '500px' }}>
        <SearchBar isLoading={isLoading} handleOnSearch={searchFiles} />
      </div>
      <div style={{ flex: 3, overflow: 'auto', width: '100%' }}>
        <FilesList isLoading={isLoading} fileData={listedFiles} />
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
