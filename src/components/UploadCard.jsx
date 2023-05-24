import { Upload } from "antd";

export function UploadCard({ handleFileUpload }) {
  return (
    <Upload customRequest={handleFileUpload} showUploadList={false}>
      <button>Upload CSV</button>
    </Upload>
  )
}