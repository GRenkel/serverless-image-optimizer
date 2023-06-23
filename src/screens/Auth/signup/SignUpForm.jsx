import { Form, Input, Button } from 'antd';
import { UserOutlined, LockOutlined, MailOutlined } from '@ant-design/icons';
import { translator } from '../../../locales/translator';

function SignUpForm({ handleSignUp, signupError, isLoading }) {

  const passwordValidator = (_, value, callback) => {
    const errors = [];
    if (value.length < 8) {
      errors.push(translator.translate("signup.password-error-length"));
      
    }
    if (!/\d/.test(value)) {
      errors.push(translator.translate("signup.password-error-number"));
    }

    if (!/[!@#$%^&*]/.test(value)) {
      errors.push(translator.translate("signup.password-error-special-char"));
    }

    if (!/[A-Z]/.test(value)) {
      errors.push(translator.translate("signup.password-error-uppercase"));
    }

    if (!/[a-z]/.test(value)) {
      errors.push(translator.translate("signup.password-error-lowercase"));
    }
    errors.length > 0 ? callback(errors) : callback()
  };

  return (
    <Form
      name="sign_up"
      onFinish={handleSignUp}
      initialValues={{ remember: false }}
      style={{ textAlign: 'center' }}
    >
      <Form.Item
        name="given_name"
        rules={[{ required: true, message: translator.translate("signup.firstName-required") }]}
      >
        <Input
          placeholder={translator.translate("signup.firstName-label")}
          prefix={<UserOutlined className="site-form-item-icon" />}
        />
      </Form.Item>

      <Form.Item
        name="middle_name"
        rules={[{ required: true, message: translator.translate("signup.lastName-required") }]}
      >
        <Input
          placeholder={translator.translate("signup.lastName-label")}
          prefix={<UserOutlined className="site-form-item-icon" />}
        />
      </Form.Item>

      <Form.Item
        name="email"
        rules={[
          { required: true, message: translator.translate("signup.email-required") },
          { type: 'email', message:  translator.translate("signup.valid-email-required")  }
        ]}
      >
        <Input
          placeholder={translator.translate("signup.email-label")}
          prefix={<MailOutlined className="site-form-item-icon" />}

        />
      </Form.Item>

      <Form.Item
        name="password"
        hasFeedback
        rules={[{ validator: passwordValidator }]}
      >
        <Input.Password
          prefix={<LockOutlined className="site-form-item-icon" />}
          placeholder={translator.translate("signup.password-label")}
        />
      </Form.Item>

      {signupError && <label style={{ color: 'red' }}>{signupError}</label>}

      <Form.Item>
        <Button
          type="primary"
          htmlType="submit"
          loading={isLoading}
          style={{ width: "100%"}}
        >
          {translator.translate("signup.button-submit")}
        </Button>
        {translator.translate("general.or")} <a href='signin'>{translator.translate("signup.redirect-signin")}</a>

      </Form.Item>
    </Form>
  )
}
export default SignUpForm;
