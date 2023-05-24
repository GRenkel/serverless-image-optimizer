import React, { useEffect, useState } from 'react';
import { UploadCard } from '../components/UploadCard';
import { SearchBar } from '../components/SearchBar';
import { UserList } from '../components/UserList';
import { message } from 'antd';

const Home = ({ uploadCSV, searchUsers }) => {

  const [usersList, setUsersList] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    handleSearch('')
  }, [])

  const handleHideLoading = () => {
    const loadingDelay = 750
    setTimeout(() => setIsLoading(false), loadingDelay)
  }

  const handleFileUpload = async ({ file, onSuccess, onError }) => {
    setIsLoading(true)
    try {
      const formData = new FormData();
      formData.append('file', file);
      const response = await uploadCSV(formData);
      setUsersList(current => [...current, ...response]);
      onSuccess()
    } catch (error) {
      onError({ message: error.message || error.message })
      console.error('Error uploading CSV:', error);
    } finally {
      handleHideLoading()
    }
  };

  const handleSearch = async (value) => {
    setIsLoading(true)
    try {
      const response = await searchUsers(value);
      setUsersList(response);
    } catch (error) {
      message.error(error.uiMessage || error.message)
    } finally {
      handleHideLoading()
    }
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100vh', padding: 16, gap: 10, alignItems: 'center' }}>
      <div style={{ flex: 1, width: '100%', maxWidth: '600px' }}>
        <UploadCard isLoading={isLoading} handleFileUpload={handleFileUpload} />
      </div>
      <div style={{ flex: 1, maxHeight: '35px', width: '100%', maxWidth: '500px' }}>
        <SearchBar isLoading={isLoading} handleSearch={handleSearch} />
      </div>
      <div style={{ flex: 3, overflow: 'auto' }}>
        <UserList isLoading={isLoading} userData={usersList} />
      </div>
    </div>
  );
};

export default Home;
