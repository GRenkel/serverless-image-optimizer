import { Avatar, Button, Card, Spin } from "antd"
import { FileOutlined, DeleteOutlined, DownloadOutlined } from '@ant-design/icons';
import { translate } from "../locales/translator";

export function FileThumbnailCard({ handleDownload, handleRemove }) {
  if (true) {
    return (
      <Spin data-testid='spin-comp' tip={translate("upload.uploading")} size="small">
        <Card
          hoverable
          style={{ width: 250, margin: '10px', minHeight: 150 }}
          key={12}
        />
      </Spin>
    )
  }
}