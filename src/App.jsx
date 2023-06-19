<<<<<<< HEAD
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import AuthContextProvider from './contexts/auth/AuthContextProvider';
import PrivateRoute from './router/PrivateRoute';
import Home from './screens/Home/Home';
import SignUp from './screens/Auth/signup/SignUp';
import Login from './screens/Auth/login/Login';
import AuthContainer from './screens/Auth/AuthContainer';

function App() {
  return (
    <div style={{ width: '100vw', height: '100vh', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
      <AuthContextProvider>
        <BrowserRouter>
          <Routes>
            <Route exact path='/' element={<PrivateRoute />}>
              <Route path="/" element={<Home />} />
            </Route>
            <Route path='/auth' element={<AuthContainer />}>
              <Route path="signin" element={<Login />} />
              <Route path="signup" element={<SignUp />} />
            </Route>
          </Routes>
        </BrowserRouter>
      </AuthContextProvider>
    </div >
  );
}

export default App;
=======
import React from 'react';
import FilesScreen from './screens/FilesScreen';

const App = () => {
  return <FilesScreen/>;
};

export default App;
>>>>>>> 88808e1d583bfc847b64aec8b27698cd756dd570
