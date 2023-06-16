
import { useContext, useState } from 'react';
import LoginForm from './LoginForm';
import { CognitoAPIHelper } from '../../services/aws/cognito/CognitoAPIHelper';
import EAuthStatus from '../../services/aws/cognito/EAuthStatus.json'
import AuthContext from '../../contexts/auth/AuthContext';

const Login = ({ }) => {
  const [authenticationError, setAuthenticationError] = useState(null);
  const { createUserSession } = useContext(AuthContext)
  const handleOnAuthentication = async (formValues) => {
    try {
      const { email, password } = formValues
      const { authStatus, jwtToken } = await CognitoAPIHelper.userLogin(email, password)

      if (authStatus == EAuthStatus.isLogged) {
        const userData = await CognitoAPIHelper.getCurrentUserAttributes();
        debugger
        createUserSession(jwtToken)
        
      }

      console.log(authStatus)
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
