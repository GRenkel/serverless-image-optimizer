import { Form, Input, Button, Alert } from 'antd';
import { LockOutlined, MailOutlined } from '@ant-design/icons';

const LoginForm = ({ handleOnAuthentication, handleNewPasswordRequest, authenticationError, formRef, isLoading }) => {

  return (
    <Form
      form={formRef}
      name="signin"
      initialValues={{ remember: false }}
      onFinish={handleOnAuthentication}
      style={{ textAlign: 'center' }}
    >

      <Form.Item
        name="email"
        rules={[{ required: true, message: 'Provide your email!' }, { type: 'email', message: 'Provide a valid email!' }]}
      >
        <Input
          prefix={<MailOutlined className="site-form-item-icon" />}
          placeholder="Email"
        />
      </Form.Item>

      <Form.Item
        name="password"
        rules={[{ required: true, message: 'Provide your password!' }]}
      >
        <Input.Password
          prefix={<LockOutlined className="site-form-item-icon" />}
          placeholder="Senha"
        />
        <span style={{ fontSize: 12, display: 'flex', justifyContent: 'flex-end' }}>
          <a onClick={handleNewPasswordRequest}>Forgot your password?</a>
        </span>
      </Form.Item>

      {authenticationError && <label style={{ color: 'red' }}>{authenticationError}</label>}

      <Form.Item
        hasFeedback
      >
        <Button
          type="primary"
          htmlType="submit"
          loading={isLoading}
          style={{ width: "100%" }}
        >
          Sign In
        </Button>
        <span style={{ fontSize: 12 }}>
          Or <a href='signup'>Sign Up</a>
        </span>
      </Form.Item>

    </Form>
  )
}

export default LoginForm;
