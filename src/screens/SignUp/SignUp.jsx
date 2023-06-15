import { Form, Input, Button } from 'antd';
import { UserOutlined, LockOutlined, MailOutlined } from '@ant-design/icons';
import React, { useState } from 'react';
import CognitoUserPool from '../../services/aws/cognito/CognitoUserPool';
import { CognitoUserAttribute } from 'amazon-cognito-identity-js';
import { CognitoAPI } from '../../services/aws/cognito/CognitoAPI';

function SignUp(props) {
  const [isLogin, setIsLogin] = useState(true);
  const [errorLogin, setErrorLogin] = useState(null);

  function getCognitoAttributesArray(attributesObject) {
    let cognitoAttributes = []
    let { password, confirmation_password, ...allowedAttributes } = attributesObject
    for (const attribute in allowedAttributes) {
      cognitoAttributes.push(
        new CognitoUserAttribute({
          Name: attribute,
          Value: attributesObject[attribute]
        })
      )
    }
    return cognitoAttributes
  }

  const onFinishSignUP = async (values) => {
    try {

      const { email, password } = values
      const attributes = getCognitoAttributesArray(values)
      await CognitoAPI.userSignUp(email, password, attributes)

    } catch (e) {
      console.log('Erro ao realizar login: ', e)
    }
  }


  const signUpStyle = {
    display: 'flex',
    flexDirection: 'column',
    overFlowY: 'scroll',
    height: '100%',
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center'
  }


  return (
    <>
      <div style={signUpStyle}>
        <Form
          name="sign_up"
          initialValues={{ remember: false }}
          onFinish={onFinishSignUP}
          style={{ textAlign: 'center', width: '90%' }}
        >
          <Form.Item
            name="given_name"
            rules={[{ required: true, message: 'Your first name!' }]}
            style={{ width: '100%' }}
          >
            <Input style={{ width: '100%', maxWidth: '225px' }} prefix={<UserOutlined className="site-form-item-icon" />} placeholder="First Name" />
          </Form.Item>

          <Form.Item
            name="middle_name"
            rules={[{ required: true, message: 'Your last name!' }]}
            style={{ width: '100%' }}
          >
            <Input style={{ width: '100%', maxWidth: '225px' }} prefix={<UserOutlined className="site-form-item-icon" />} placeholder="Last Name" />
          </Form.Item>

          <Form.Item
            name="email"
            rules={[{ required: true, message: 'Informe seu email!' }, { type: 'email', message: 'Informe um e-mail válido!' }]}
          >
            <Input style={{ width: '100%', maxWidth: '225px' }} prefix={<MailOutlined className="site-form-item-icon" />} placeholder="Email" />
          </Form.Item>

          <Form.Item
            name="password"
            hasFeedback
            rules={[{ required: true, message: 'Informe sua senha!' }]}
          >
            <Input.Password
              prefix={<LockOutlined className="site-form-item-icon" />}
              placeholder="Senha"
              style={{ width: '100%', maxWidth: '225px' }}
            />

          </Form.Item>
          <Form.Item
            name="confirmation_password"
            hasFeedback
            rules={[
              { required: true, message: 'Confirme sua senha!' },
              ({ getFieldValue }) => ({
                validator(_, value) {
                  if (!value || getFieldValue('password') === value) {
                    return Promise.resolve();
                  }
                  return Promise.reject(new Error('As senhas não correspondem!'));
                },
              }),
            ]}
          >
            <Input.Password
              prefix={<LockOutlined className="site-form-item-icon" />}
              placeholder="Confirmação da Senha"
              style={{ width: '100%', maxWidth: '225px' }}
            />

          </Form.Item>
          <Form.Item  >
            <Button
              type="primary"
              htmlType="submit"
              style={{ width: "100%", maxWidth: '185px', background: "#257a3b", borderColor: "#257a3b" }}

            >
              Criar Conta
            </Button>
          </Form.Item>
        </Form>
      </div>
    </>

  )
}
export default SignUp;
