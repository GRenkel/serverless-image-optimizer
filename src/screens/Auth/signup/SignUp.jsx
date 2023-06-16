import { CognitoAPIHelper } from '../../../services/aws/cognito/CognitoAPIHelper';
import SignUpForm from './SignUpForm'

function SignUp(props) {

  const handleSignUp = async (values) => {
    try {
      let { email, password, ...allowedAttributes } = values
      const attributes = CognitoAPIHelper.getCognitoAttributesArrayFromObject(allowedAttributes)
      await CognitoAPIHelper.userSignUp(email, password, attributes)
    } catch (e) {
      console.log('Erro ao cadastrar usuário: ', e)
    }
  }

  return (
    <div style={{width: '350px'}}>
      <SignUpForm handleSignUp={handleSignUp} />
    </div>
  )
}
export default SignUp;
