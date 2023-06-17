import React, { useState } from 'react';
import { Modal, Form, Input, Button } from 'antd';
import { CognitoAPIHelper } from '../../services/aws/cognito/CognitoAPIHelper';

const ConfirmationCodeModal = ({ isOpen, afterConfirmation }) => {
  const [uiFeedback, setUIFeedBack] = useState({ message: '', isError: false })

  const handleConfirmation = async ({ confirmationCode }) => {
    try {
      await CognitoAPIHelper.confirmUserSignUp(confirmationCode)
      afterConfirmation()
    } catch (error) {
      setUIFeedBack({ isError: true, message: error.message })
    }
  };


  const handleCodeResend = async () => {
    try {
      const { CodeDeliveryDetails: { Destination } } = await CognitoAPIHelper.resendConfirmationCode()
      setUIFeedBack({ isError: false, message: `A new code was sent to ${Destination}`})

    } catch (error) {
      setUIFeedBack({ isError: true, message: error.message })
    }
  }

  return (
    <Modal
      title={<label style={{ display: 'flex', justifyContent: 'center' }}>Confirmation Code</label>}
      open={isOpen}
      centered
      closable={false}
      width="400px"
      maskClosable={false}
      footer={null}
    >
      <Form
        onFinish={handleConfirmation}
        layout="vertical"
      >
        <Form.Item
          name="confirmationCode"
          rules={[
            { required: true, message: 'Please enter the confirmation code' },
          ]}
        >
          <Input placeholder="Enter confirmation code" />
        </Form.Item>
        {uiFeedback.message && <label style={{ color: uiFeedback.isError ? 'red' : 'green' }}>{uiFeedback.message}</label>}

        <Form.Item>
          <Button
            type="primary"
            htmlType="submit"
            style={{ width: "100%", background: "#257a3b", borderColor: "#257a3b" }}
          >
            Confirm
          </Button>
          Or <a onClick={handleCodeResend}>Send again</a>

        </Form.Item>
      </Form>
    </Modal>
  );
};


export default ConfirmationCodeModal