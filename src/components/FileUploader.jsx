import { message, Upload } from 'antd';
import { InboxOutlined } from '@ant-design/icons';
import { translate } from "../locales/translator";

const { Dragger } = Upload;

export function FileUploader({ isLoading, disabled, handleUpload }) {

  function handleUploadStatus(info) {
    const { status } = info.file;
    if (status === 'done') {
      message.success(`${info.file.name} ${translate('upload.successfully-upload')}`);
    } else if (status === 'error') {
      const errorMessage = info?.file?.error?.message
      if (errorMessage) {
        return message.error(`${errorMessage}`);
      }
      message.error(`${info.file.name} ${translate('upload.failure-upload')}`);
    }
  }

  return (
    <Dragger
      multiple={false}
      disabled={isLoading || disabled}
      showUploadList={false}
      accept='.jpg, .jpeg, .png'
      data-testid="file-input"
      customRequest={handleUpload}
      onChange={handleUploadStatus}
    >
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