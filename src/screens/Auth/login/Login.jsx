import { useContext, useState } from 'react';
import LoginForm from './LoginForm';
import { CognitoAPIHelper } from '../../../services/aws/cognito/CognitoAPIHelper';
import EAuthStatus from '../../../services/aws/cognito/EAuthStatus.json'
import AuthContext from '../../../contexts/auth/AuthContext';
import { useNavigate } from 'react-router-dom';

const Login = ({ }) => {
  const navigate = useNavigate()
  const { createUserSession } = useContext(AuthContext)
  const [authenticationError, setAuthenticationError] = useState(null);


  const handleOnAuthentication = async (formValues) => {
    try {
      const { email, password } = formValues
      const { authStatus } = await CognitoAPIHelper.userLogin(email, password)

      if (authStatus == EAuthStatus.isLogged) {
        const { jwtToken, userData } = await CognitoAPIHelper.getCurrentUserSession();
        createUserSession(userData, jwtToken)
      }
      navigate('/')
    } catch (error) {
      setAuthenticationError(error.message)
    }
  }

  return (
    <div style={{ width: '350px' }}>
      <LoginForm authenticationError={authenticationError} handleOnAuthentication={handleOnAuthentication} />
    </div>
  )
}

export default Login;
