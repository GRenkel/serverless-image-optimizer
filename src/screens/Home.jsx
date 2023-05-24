import React, { useEffect, useState } from 'react';
import { UploadCard } from '../components/UploadCard';
import { SearchBar } from '../components/SearchBar';
import { UserList } from '../components/UserList';


const Home = ({ uploadCSV, searchUsers }) => {

  const [filteredData, setFilteredData] = useState([]);

  useEffect(() => {
    handleSearch('')
  }, [])

  const handleFileUpload = async ({ file, onSuccess, onError}) => {
    const formData = new FormData();
    formData.append('file', file);
    try {
      const response = await uploadCSV(formData);
      setFilteredData(current => [...current, ...response]);
      onSuccess()
    } catch (error) {
      onError({ message: error.uiMessage || error.message})
      console.error('Error uploading CSV:', error);
    }
  };

  const handleSearch = async (value) => {
    try {
      const response = await searchUsers(value);
      setFilteredData(response);
    } catch (error) {
      console.error('Error searching users:', error);
    }
  };

  return (
    <div>
      <UploadCard handleFileUpload={handleFileUpload} />
      <br />
      <SearchBar handleSearch={handleSearch} />
      <br />
      <UserList userData={filteredData} />
    </div>
  );
};

export default Home;
