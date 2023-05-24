import React from 'react';
import { searchUsers, uploadCSV } from './services/api';
import Home from './screens/Home';

const App = () => {
  return <Home uploadCSV={uploadCSV} searchUsers={searchUsers}/>;
};

export default App;