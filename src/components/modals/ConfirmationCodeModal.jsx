import React, { useState } from 'react';
import { Modal, Form, Input, Button } from 'antd';
import { CognitoAPIHelper } from '../../services/aws/cognito/CognitoAPIHelper';

const ConfirmationCodeModal = ({ isOpen, afterConfirmation }) => {
  const [isLoading, setIsLoading] = useState(false)
  const [uiFeedback, setUIFeedBack] = useState({ message: '', isError: false })

  const handleConfirmation = async ({ confirmationCode }) => {
    try {
      setIsLoading(true)
      await CognitoAPIHelper.confirmUserSignUp(confirmationCode)
      afterConfirmation()
    } catch (error) {
      setUIFeedBack({ isError: true, message: error.message })
    } finally {
      setTimeout(()=>setIsLoading(false), 300)
    }
  };


  const handleCodeResend = async () => {
    try {
      const { CodeDeliveryDetails: { Destination } } = await CognitoAPIHelper.resendConfirmationCode()
      setUIFeedBack({ isError: false, message: `A new code was sent to ${Destination}` })

    } catch (error) {
      setUIFeedBack({ isError: true, message: error.message })
    }
  }

  return (
    <Modal
      title={<label style={{ display: 'flex', justifyContent: 'center' }}>Confirmation Code</label>}
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
            { required: true, message: 'Please enter the confirmation code' },
          ]}
        >
          <Input placeholder="Enter confirmation code" />
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
            style={{ width: "100%"}}
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