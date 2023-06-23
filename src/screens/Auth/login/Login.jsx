import { useContext, useState } from 'react';
import LoginForm from './LoginForm';
import { CognitoAPIHelper } from '../../../services/aws/cognito/CognitoAPIHelper';
import EAuthStatus from '../../../services/aws/cognito/EAuthStatus.json'
import AuthContext from '../../../contexts/auth/AuthContext';
import ConfirmationCodeModal from '../../../components/modals/ConfirmationCodeModal';
import { useNavigate } from 'react-router-dom';
import { Form, message } from 'antd';
import { translator } from '../../../locales/translator';

const Login = (props) => {
  const navigate = useNavigate();
  const [form] = Form.useForm();
  const [messageApi, contextHolder] = message.useMessage()
  const [isLoading, setIsLoading] = useState(false)
  const { createUserSession } = useContext(AuthContext)
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [authenticationError, setAuthenticationError] = useState(null);


  const handleNewPasswordRequest = () => {
    messageApi.open({
      type: 'warning',
      content: translator.translate('login.password-reset'),
    });
  }

  const handleOnAuthentication = async (formValues) => {
    try {
      setIsLoading(true)
      const { email, password } = formValues
      const { authStatus } = await CognitoAPIHelper.userSignIn(email, password)

      if (authStatus === EAuthStatus.isLogged) {
        createUserSession()
      }
      navigate('/')
    } catch (error) {
      setIsLoading(false)
      error.authStatus === EAuthStatus.UserNotConfirmedException
        ? setIsModalVisible(true) : setAuthenticationError(error.message)
    }
  }

  const handleAfterConfirmation = () => {
    form.submit()
  }


  return (
    <div style={{ width: '350px' }}>
      {contextHolder}
      <ConfirmationCodeModal
        isOpen={isModalVisible}
        afterConfirmation={handleAfterConfirmation}
        successMessage={translator.translate('login.confirmation-sucess')}
      />
      <LoginForm
        formRef={form}
        isLoading={isLoading}
        authenticationError={authenticationError}
        handleOnAuthentication={handleOnAuthentication}
        handleNewPasswordRequest={handleNewPasswordRequest}
      />
    </div>
  )
}

export default Login;
