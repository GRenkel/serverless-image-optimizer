import { Form, Input, Button } from 'antd';
import { LockOutlined, MailOutlined } from '@ant-design/icons';
import { translator } from '../../../locales/translator';

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
        rules={[{ required: true, message: translator.translate("login.email-required") }, { type: 'email', message: 'Provide a valid email!' }]}
      >
        <Input
          prefix={<MailOutlined className="site-form-item-icon" />}
          placeholder={translator.translate("login.email-label")}
        />
      </Form.Item>

      <Form.Item
        name="password"
        rules={[{ required: true, message: translator.translate("login.password-required") }]}
      >
        <div>
          <Input.Password
            prefix={<LockOutlined className="site-form-item-icon" />}
            placeholder="Senha"
          />
          <span style={{ fontSize: 12, display: 'flex', justifyContent: 'flex-end' }}>
            <a onClick={handleNewPasswordRequest}>{translator.translate("login.forgot-password")}</a>
          </span>
        </div>
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
          {translator.translate("login.button-submit")}

        </Button>
        <span style={{ fontSize: 12 }}>
          {translator.translate("general.or")}  <a href='signup'>{translator.translate("login.redirect-signup")}</a>
        </span>
      </Form.Item>

    </Form>
  )
}

export default LoginForm;
