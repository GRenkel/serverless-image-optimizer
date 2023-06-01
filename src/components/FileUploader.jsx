import { message, Upload } from 'antd';
import { InboxOutlined } from '@ant-design/icons';
import { translate } from "../locales/translator";
import { useAPIFileUpload } from '../hooks/api/useAPIFileUpload';
import { useEffect } from 'react';

const { Dragger } = Upload;

export function FileUploader({ disabled, afterUpload }) {

  const { error, isLoading, uploadResponse, uploadFileToAPI, validateFile } = useAPIFileUpload()

  useEffect(() => {
    if(uploadResponse.length){
      afterUpload(uploadResponse)
    }
  }, [uploadResponse]);

  function handleFileValidation(file) {
    const { isValid, reason } = validateFile(file)
    if (!isValid) {
      message.error(reason);
    }
    return isValid
  }

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
      accept="text/csv"
      disabled={isLoading || disabled}
      showUploadList={false}
      data-testid="file-input"
      beforeUpload={handleFileValidation}
      customRequest={uploadFileToAPI}
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