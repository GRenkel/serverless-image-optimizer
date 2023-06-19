import { Form, Input, Button } from 'antd';
import { UserOutlined, LockOutlined, MailOutlined } from '@ant-design/icons';

function SignUpForm({ handleSignUp, signupError, isLoading }) {

  const passwordValidator = (_, value, callback) => {
    const errors = [];
    if (value.length < 8) {
      errors.push('Password must be at least 8 characters long');
    }
    if (!/\d/.test(value)) {
      errors.push('Password must contain at least 1 number');
    }

    if (!/[!@#$%^&*]/.test(value)) {
      errors.push('Password must contain at least 1 special character');
    }

    if (!/[A-Z]/.test(value)) {
      errors.push('Password must contain at least 1 uppercase letter');
    }

    if (!/[a-z]/.test(value)) {
      errors.push('Password must contain at least 1 lowercase letter');
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
        rules={[{ required: true, message: 'Your first name!' }]}
      >
        <Input
          placeholder="First Name"
          prefix={<UserOutlined className="site-form-item-icon" />}
        />
      </Form.Item>

      <Form.Item
        name="middle_name"
        rules={[{ required: true, message: 'Your last name!' }]}
      >
        <Input
          placeholder="Last Name"
          prefix={<UserOutlined className="site-form-item-icon" />}
        />
      </Form.Item>

      <Form.Item
        name="email"
        rules={[
          { required: true, message: 'Provide your email!' },
          { type: 'email', message: 'Provide a valid email!' }
        ]}
      >
        <Input
          placeholder="Email"
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
          placeholder="Password"
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
          Create Account
        </Button>
        Or <a href='signin'>Sign In</a>

      </Form.Item>
    </Form>
  )
}
export default SignUpForm;
