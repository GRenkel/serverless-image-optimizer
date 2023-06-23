import { message, Upload } from 'antd';
import { InboxOutlined } from '@ant-design/icons';
import { translator } from "../locales/translator";
import { awsConstants } from '../services/aws/constants/awsConstants';
const { Dragger } = Upload;

export function FileUploader({ isLoading, disabled, handleUpload }) {

  function handleUploadStatus(info) {
    const { status } = info.file;
    if (status === 'done') {
      message.success(`${info.file.name} ${translator.translate('upload.successfully-upload')}`);
    } else if (status === 'error') {
      const errorMessage = info?.file?.error?.message
      if (errorMessage) {
        return message.error(`${errorMessage}`);
      }
      message.error(`${info.file.name} ${translator.translate('upload.failure-upload')}`);
    }
  }

  function validateFileType(file) {
    const isValid = awsConstants.ALLOWED_FILES.includes(file.type);
    if (!isValid) {
      message.error(translator.translate('upload.invalid-file'));
    }
    return isValid;
  }

  return (
    <Dragger
      multiple={false}
      disabled={isLoading || disabled}
      showUploadList={false}
      accept='.jpg, .jpeg, .png'
      data-testid="file-input"
      customRequest={handleUpload}
      beforeUpload={validateFileType}
      onChange={handleUploadStatus}
      style={{ maxWidth: 500 }}
    >
      <p className="ant-upload-drag-icon">
        <InboxOutlined />
      </p>
      <p className="ant-upload-text">{translator.translate('upload.instruction')}</p>
      <p className="ant-upload-hint">
        {translator.translate('upload.hint')}
      </p>
    </Dragger>

  )
}