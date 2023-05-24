import axios from 'axios';
const BASE_URL = 'http://localhost:5050/'

const paths = {
  files: 'api/files',
  users: 'api/users'
}

export async function uploadCSV (formData) {
  try {
    const response = await axios.post(`${BASE_URL}${paths.files}`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });

    return response.data;
  } catch (error) {
    throw new Error('API request failed');
  }
};

export async function searchUsers(params) {
  try {
    const response = await axios.get(`${BASE_URL}${paths.users}`, params);
    return response.data;
  } catch (error) {
    throw new Error('API request failed');
  }
}