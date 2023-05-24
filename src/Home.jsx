import React, { useState } from 'react';
import { Upload, Card, Input } from 'antd';
import Papa from 'papaparse';
import axios from 'axios';

const { Search } = Input;

const Home = ({ uploadCSV }) => {
  const [data, setData] = useState([]); 
  const [filteredData, setFilteredData] = useState([]); 

  const handleFileUpload = async (file) => {
    const formData = new FormData();
    formData.append('file', file);

    try {
      const response = await uploadCSV(formData);
      const parsedData = Papa.parse(response.data, {
        header: true,
      });

      const { data: rows, meta: { fields: headers } } = parsedData;
      const formattedData = rows.map((row) => {
        return headers.reduce((obj, header) => {
          obj[header] = row[header];
          return obj;
        }, {});
      });

      setData(formattedData);
      setFilteredData(formattedData);
    } catch (error) {
      console.error('Error uploading CSV:', error);
    }
  };

  const handleSearch = (value) => {
    const filteredRows = data.filter((row) =>
      Object.values(row).some((cellValue) =>
        cellValue.toLowerCase().includes(value.toLowerCase())
      )
    );
    setFilteredData(filteredRows);
  };

  return (
    <div>
      <Upload beforeUpload={handleFileUpload} showUploadList={false}>
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
