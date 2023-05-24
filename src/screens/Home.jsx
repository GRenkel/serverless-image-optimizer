import React, { useEffect, useState } from 'react';
import { UploadCard } from '../components/UploadCard';
import { SearchBar } from '../components/SearchBar';
import { UserList } from '../components/UserList';
import { message } from 'antd';

const Home = ({ uploadCSV, searchUsers }) => {

  const [usersList, setUsersList] = useState([]);

  useEffect(() => {
    handleSearch('')
  }, [])

  const handleFileUpload = async ({ file, onSuccess, onError }) => {
    const formData = new FormData();
    formData.append('file', file);
    try {
      const response = await uploadCSV(formData);
      setUsersList(current => [...current, ...response]);
      onSuccess()
    } catch (error) {
      onError({ message: error.uiMessage || error.message })
      console.error('Error uploading CSV:', error);
    }
  };

  const handleSearch = async (value) => {
    try {
      const response = await searchUsers(value);
      setUsersList(response);
    } catch (error) {
      message.error(error.uiMessage || error.message)
    }
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100vh', padding: 16, gap: 10}}>
      <div style={{flex: 1}}>
        <UploadCard handleFileUpload={handleFileUpload} />
      </div>
      <div style={{flex: 1, maxHeight: '35px'}}>
        <SearchBar handleSearch={handleSearch} />
      </div>
      <div style={{ flex: 3, overflow: 'auto'}}>
        <UserList userData={usersList} />
      </div>
    </div>
  );
};

export default Home;
