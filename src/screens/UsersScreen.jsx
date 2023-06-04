import React, { useState } from 'react';
import { FileUploader } from '../components/FileUploader';
import { SearchBar } from '../components/SearchBar';
import { UserList } from '../components/UserList';
import { FloatButton } from 'antd';
import { QuestionCircleOutlined } from '@ant-design/icons';
import { translate } from '../locales/translator';
import { useSearchUsers } from '../hooks/api/useSearchUsers';
import { useEffect } from 'react';

const UsersScreen = () => {
  const { error, isLoading, listedUsers, updatedUsersList, searchUsers } = useSearchUsers()

  useEffect(() => {
    searchUsers()
  }, [])

  const handleOnUpdateListedUsers = (users) => {
    updatedUsersList(users)
  }

  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100vh', padding: 16, gap: 10, alignItems: 'center' }}>
      <div style={{ flex: 1, width: '100%', maxWidth: '600px' }}>
        <FileUploader disabled={isLoading} afterUpload={handleOnUpdateListedUsers} />
      </div>
      <div style={{ flex: 1, maxHeight: '35px', width: '100%', maxWidth: '500px' }}>
        <SearchBar isLoading={isLoading} handleOnSearch={searchUsers} />
      </div>
      <div style={{ flex: 3, overflow: 'auto', width: '100%' }}>
        <UserList isLoading={isLoading} userData={listedUsers} />
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

export default UsersScreen;
