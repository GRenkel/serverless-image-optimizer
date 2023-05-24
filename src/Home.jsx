import React, { useState } from 'react';
import { Upload, Card, Input } from 'antd';
import Papa from 'papaparse';
import axios from 'axios';

const { Search } = Input;

const Home = ({ uploadCSV, searchUsers }) => {
  const [filteredData, setFilteredData] = useState([]); 

  const handleFileUpload = async ({file}) => {
    const formData = new FormData();
    formData.append('file', file);
    try {
      const response = await uploadCSV(formData);
      setFilteredData(response);
    } catch (error) {
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
      <Upload customRequest={handleFileUpload} showUploadList={false}>
        <button>Upload CSV</button>
      </Upload>
      <br />
      <Search placeholder="Search" onSearch={handleSearch} />
      <br />
      <div style={{ display: 'flex', flexWrap: 'wrap' }}>
        {filteredData.map((row, index) => (
          <Card key={index} style={{ width: 300, margin: '10px' }}>
            <p>Name: {row.name}</p>
            <p>City: {row.city}</p>
            <p>Country: {row.country}</p>
            <p>Favorite Sport: {row.favorite_sport}</p>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default Home;
