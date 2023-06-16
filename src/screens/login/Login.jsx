
import { useState } from 'react';
import LoginForm from './LoginForm';
import { CognitoAPIHelper } from '../../services/aws/cognito/CognitoAPIHelper';

const Login = ({ }) => {
  const [authenticationError, setAuthenticationError] = useState(null);

  const handleOnAuthentication = async (formValues) => {
    try {
      const { email, password } = formValues
      CognitoAPIHelper.userLogin(email, password)
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
