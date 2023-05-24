import React from 'react';
import { uploadCSV } from './api';
import Home from './Home';

const App = () => {
  return <Home uploadCSV={uploadCSV} />;
};

export default App;