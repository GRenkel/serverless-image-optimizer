
import { useState } from 'react';
import LoginForm from './LoginForm';

const Login = ({ }) => {
  const [authenticationError, setAuthenticationError] = useState(null);

  const handleOnAuthentication = async (formValues) => {
    try {
      console.log(formValues)
    } catch (error) {
      setAuthenticationError(error.message)
    }
  }

  return (
    <LoginForm authenticationError={authenticationError} handleOnAuthentication={handleOnAuthentication} />
  )
}

export default Login;
