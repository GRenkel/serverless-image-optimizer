import React from 'react';
import { Modal, Form, Input, Button } from 'antd';

const ConfirmationCodeModal = ({ isOpen, handleConfirmation }) => {

  const handleCodeResend = () => {

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