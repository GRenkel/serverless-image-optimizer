import { useContext, useState } from 'react';
import LoginForm from './LoginForm';
import { CognitoAPIHelper } from '../../../services/aws/cognito/CognitoAPIHelper';
import EAuthStatus from '../../../services/aws/cognito/EAuthStatus.json'
import AuthContext from '../../../contexts/auth/AuthContext';
import { useNavigate } from 'react-router-dom';
import ConfirmationCodeModal from '../ConfirmationCodeModal';

const Login = ({ }) => {
  const navigate = useNavigate();
  const { createUserSession } = useContext(AuthContext)
  const [authenticationError, setAuthenticationError] = useState(null);
  const [isModalVisible, setIsModalVisible] = useState(false);

  const handleOnAuthentication = async (formValues) => {
    try {
      const { email, password } = formValues
      const { authStatus } = await CognitoAPIHelper.userLogin(email, password)

      if (authStatus == EAuthStatus.isLogged) {
        createUserSession()
      }
      navigate('/')
    } catch (error) {
      if (error.authStatus === EAuthStatus.UserNotConfirmedException) {
        return setIsModalVisible(true)
      }
      setAuthenticationError(error.message)
    }
  }

  const handleConfirmation = async ({ confirmationCode }) => {
    try {
      await CognitoAPIHelper.confirmUserSignUp(confirmationCode)
      navigate('/auth/login')
    } catch (error) {
      console.log(error)
    }
  };


  return (
    <div style={{ width: '350px' }}>
      <ConfirmationCodeModal
        isOpen={isModalVisible}
        handleConfirmation={handleConfirmation}
      />
      <LoginForm authenticationError={authenticationError} handleOnAuthentication={handleOnAuthentication} />
    </div>
  )
}

export default Login;
