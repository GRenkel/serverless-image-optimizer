import { message, Upload } from 'antd';
import { InboxOutlined } from '@ant-design/icons';
import { translate } from "../locales/i18n";
const MAXIMUM_FILE_SIZE = 1 //1MB

const { Dragger } = Upload;

export function UploadCard({ isLoading, handleFileUpload }) {

  function handleUploadStatus(info) {
    const { status } = info.file;
    if (status === 'done') {
      message.success(`${info.file.name}${translate('upload.successfully-upload')}`);
    } else if (status === 'error') {
      const errorMessage = info?.file?.error?.message
      if (errorMessage) {
        return message.error(`${errorMessage}`);
      }
      message.error(`${info.file.name}${translate('upload.failure-upload')}`);
    }
  }
  function validateSize(file) {
    const isLt2M = file.size / 1024 / 1024 < MAXIMUM_FILE_SIZE;
    if (!isLt2M) {
      message.error(translate('upload.file-too-large'));
    }
    return isLt2M;
  }
  return (
    <Dragger beforeUpload={validateSize} data-testid="file-input" disabled={isLoading} showUploadList={false} accept="text/csv" customRequest={handleFileUpload} multiple={false} onChange={handleUploadStatus}>
      <p className="ant-upload-drag-icon">
        <InboxOutlined />
      </p>
      <p className="ant-upload-text">{translate('upload.instruction')}</p>
      <p className="ant-upload-hint">
        {translate('upload.hint')}
      </p>
    </Dragger>

  )
}