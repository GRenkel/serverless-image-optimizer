import React from 'react';
import { searchUsers, uploadCSV } from './api';
import Home from './Home';

const App = () => {
  return <Home uploadCSV={uploadCSV} searchUsers={searchUsers}/>;
};

export default App;