import { useContext, useState } from 'react';
import LoginForm from './LoginForm';
import { CognitoAPIHelper } from '../../../services/aws/cognito/CognitoAPIHelper';
import EAuthStatus from '../../../services/aws/cognito/EAuthStatus.json'
import AuthContext from '../../../contexts/auth/AuthContext';
import ConfirmationCodeModal from '../ConfirmationCodeModal';
import { useNavigate } from 'react-router-dom';
import { Form } from 'antd';

const Login = ({ }) => {
  const navigate = useNavigate();
  const [form] = Form.useForm();

  const { createUserSession } = useContext(AuthContext)
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [authenticationError, setAuthenticationError] = useState(null);

  const handleOnAuthentication = async (formValues) => {
    try {
      const { email, password } = formValues
      const { authStatus } = await CognitoAPIHelper.userSignIn(email, password)

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

  const handleAfterConfirmation = () => {
    form.submit()
  }


  return (
    <div style={{ width: '350px' }}>
      <ConfirmationCodeModal
        isOpen={isModalVisible}
        afterConfirmation={handleAfterConfirmation}
      />
      <LoginForm
        formRef = {form}
        authenticationError={authenticationError}
        handleOnAuthentication={handleOnAuthentication}
      />
    </div>
  )
}

export default Login;
