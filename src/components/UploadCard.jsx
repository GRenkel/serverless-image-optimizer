import { message, Upload } from 'antd';
import { InboxOutlined } from '@ant-design/icons';
const { Dragger } = Upload;

export function UploadCard({isLoading, handleFileUpload }) {

  function handleUploadStatus(info) {
    const { status } = info.file;
    if (status === 'done') {
      message.success(`${info.file.name} file uploaded successfully.`);
    } else if (status === 'error') {
      const errorMessage = info?.file?.error?.message
      if (errorMessage) {
        return message.error(`${errorMessage}`);
      }
      message.error(`${info.file.name} file upload failed.`);
    }
  }
  return (
    <Dragger data-testid="file-input" disabled={isLoading} showUploadList={false} accept="text/csv" customRequest={handleFileUpload} multiple={false} onChange={handleUploadStatus}>
      <p className="ant-upload-drag-icon">
        <InboxOutlined />
      </p>
      <p className="ant-upload-text">Click or drag your csv file to this area to upload</p>
      <p className="ant-upload-hint">
        Listed below are all your imported data. Use the search bar for searches.
      </p>
    </Dragger>

  )
}