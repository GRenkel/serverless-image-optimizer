import axios from 'axios';
const BASE_URL = 'http://localhost:5050/api/files'
export const uploadCSV = async (formData) => {
  try {
    const response = await axios.post(BASE_URL, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });

    return response.data;
  } catch (error) {
    throw new Error('API request failed');
  }
};