import React, { useState } from 'react';
import { Modal, Form, Input, Button } from 'antd';
import { CognitoAPIHelper } from '../../services/aws/cognito/CognitoAPIHelper';
import { message } from 'antd';
import { translator } from '../../locales/translator';

const ConfirmationCodeModal = ({ isOpen, afterConfirmation, successMessage }) => {
  const [messageApi, contextHolder] = message.useMessage()
  const [isLoading, setIsLoading] = useState(false)
  const [uiFeedback, setUIFeedBack] = useState({ message: '', isError: false })

  const handleConfirmation = async ({ confirmationCode }) => {
    try {
      setIsLoading(true)
      await CognitoAPIHelper.confirmUserSignUp(confirmationCode)
      showSucessMessage()
      setTimeout(afterConfirmation, 1200)
    } catch (error) {
      setUIFeedBack({ isError: true, message: error.message })
    } finally {
      setTimeout(() => setIsLoading(false), 300)
    }
  };

  const showSucessMessage = () => {
    messageApi.open({
      type: 'success',
      content: successMessage,
    });
  }

  const handleCodeResend = async () => {
    try {
      const { CodeDeliveryDetails: { Destination } } = await CognitoAPIHelper.resendConfirmationCode()
      setUIFeedBack({ isError: false, message: `${translator.translate('confirmation.code-receiver')}${Destination}` })

    } catch (error) {
      setUIFeedBack({ isError: true, message: error.message })
    }
  }

  return (
    <>
      {contextHolder}
      <Modal
        title={<label style={{ display: 'flex', justifyContent: 'center' }}>{translator.translate('confirmation.modal-title')}</label>}
        centered
        width="400px"
        open={isOpen}
        footer={null}
        closable={false}
        maskClosable={false}
        bodyStyle={{ height: "150px", minWidth: "350px", maxWidth: "400px" }}
      >
        <Form
          onFinish={handleConfirmation}
          layout="vertical"
        >
          <Form.Item
            name="confirmationCode"
            rules={[
              { required: true, message: translator.translate('confirmation.code-required')},
            ]}
          >
            <Input placeholder={translator.translate('confirmation.input-label')}/>
          </Form.Item>

          {
            uiFeedback.message && <div style={{ margin: 5, textAlign: 'center' }}>
              {<label style={{ color: uiFeedback.isError ? 'red' : 'green' }}>{uiFeedback.message}</label>}
            </div>
          }

          <Form.Item>
            <Button
              loading={isLoading}
              type="primary"
              htmlType="submit"
              style={{ width: "100%" }}
            >
              {translator.translate('confirmation.button-submit')}
            </Button>
            {translator.translate('general.or')} <a onClick={handleCodeResend}>{translator.translate('confirmation.send-again')}</a>

          </Form.Item>
        </Form>
      </Modal>
    </>
  );
};


export default ConfirmationCodeModal