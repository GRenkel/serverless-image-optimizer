import { Form, Input, Button, Modal, Divider } from 'antd';
import { LockOutlined, MailOutlined } from '@ant-design/icons';
import { useState } from 'react';

const LoginForm = (handleOnAuthentication) => {
  const [errorLogin, setErrorLogin] = useState(null);

  const onFinish = async (values) => {
    try {

    } catch (e) {
      setErrorLogin(e?.response?.data?.error ? e?.response?.data?.error : "Login inválido")
    }
  }

  return (
    <Form
      name="login"
      initialValues={{ remember: false }}
      onFinish={onFinish}
    >
      <Form.Item
        name="email"
        rules={[{ required: true, message: 'Informe seu email!' }, { type: 'email', message: 'Informe um e-mail válido!' }]}
      >
        <Input
          style={{ width: '100%', maxWidth: '225px' }}
          prefix={<MailOutlined className="site-form-item-icon" />}
          placeholder="Email" />
      </Form.Item>
      <Form.Item
        name="password"
        rules={[{ required: true, message: 'Informe sua senha!' }]}
      >
        <Input
          prefix={<LockOutlined className="site-form-item-icon" />}
          type="password"
          placeholder="Senha"
          style={{ maxWidth: '225px' }}
        />
      </Form.Item>
      {errorLogin && <label style={{ color: 'red' }}>{errorLogin}</label>}

      <Form.Item
        hasFeedback
      >
        <Button type="primary"
          style={{ width: "100%", background: "#d83018", borderColor: "#d83018" }}
          htmlType="submit">
          Entrar
        </Button>
      </Form.Item>
    </Form>
  )
}

export default LoginForm;
