import { useState } from 'react';
import { CognitoAPIHelper } from '../../../services/aws/cognito/CognitoAPIHelper';
import SignUpForm from './SignUpForm'
import ConfirmationCodeModal from '../../../components/modals/ConfirmationCodeModal';
import { useNavigate } from 'react-router-dom';

function SignUp(props) {
  const navigate = useNavigate();

  const [isLoading, setIsLoading] = useState(false)
  const [signupError, setSignupErrorError] = useState(null);
  const [isModalVisible, setIsModalVisible] = useState(false);

  const handleSignUp = async (values) => {
    try {
      setIsLoading(true)
      let { email, password, ...allowedAttributes } = values
      const attributes = CognitoAPIHelper.getCognitoAttributesArrayFromObject(allowedAttributes)
      await CognitoAPIHelper.userSignUp(email, password, attributes)
      setIsModalVisible(true)
    } catch (error) {
      setSignupErrorError(error.message)
      setIsLoading(false)
    } 
  }

  const handleAfterConfirmation = () => {
    navigate('/auth/signin')
  }


  return (
    <div style={{ width: '350px' }}>
      <ConfirmationCodeModal
        isOpen={isModalVisible}
        afterConfirmation={handleAfterConfirmation}
      />
      <SignUpForm
        isLoading={isLoading}
        signupError={signupError}
        handleSignUp={handleSignUp}
      />
    </div>
  )
}
export default SignUp;
