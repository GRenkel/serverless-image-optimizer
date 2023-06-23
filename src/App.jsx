import { BrowserRouter, Route, Routes } from 'react-router-dom';
import AuthContextProvider from './contexts/auth/AuthContextProvider';
import PrivateRoute from './router/PrivateRoute';
import SignUp from './screens/Auth/signup/SignUp';
import Login from './screens/Auth/login/Login';
import AuthContainer from './screens/Auth/AuthContainer';
import Home from './screens/Home/Home';
import LanguageSelector from './components/language/LanguageSelector'

function App() {
  return (
    <div style={{ width: '100vw', height: '100vh', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
      <AuthContextProvider>
        <LanguageSelector/>
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
