import { Avatar, Button, Card, Spin } from "antd"
import { FileOutlined, DeleteOutlined, DownloadOutlined } from '@ant-design/icons';
import { translate } from "../locales/translator";

export function FileCard({ handleDownload, handleRemove, id, objectKey, name, size, sizeUnit, isProcessing, isUploading = false }) {
  if (isUploading) {
    return (
      <Spin data-testid='spin-comp' tip={translate("upload.uploading")} size="small">
        <Card
          hoverable
          style={{ width: 250, margin: '10px', minHeight: 150 }}
          key={id}
        />
      </Spin>
    )
  }
  return (
    <Card
      hoverable
      style={{ width: 250, margin: '10px', maxWidth: 250 }}
      key={id}
    >
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 5, paddingTop: 10 }}>
        { isProcessing && <Avatar size={"large"} icon={<FileOutlined />} /> }
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
          <span data-testid="span-name" style={{ maxWidth: '220px', fontWeight: 'bold', whiteSpace:'nowrap', textOverflow: 'ellipsis', overflow:'hidden' }}>{name}</span>
          <span data-testid="span-size" style={{ fontWeight: 'lighter', fontSize: '10px' }}>{size.toFixed(2)}{' '}{sizeUnit}</span>
        </div>
        <div style={{ display: 'flex', width: '100%', justifyContent: 'space-around' }}>

          <Button
            size={'large'}
            type="default"
            danger
            icon={<DeleteOutlined />}
            onClick={() => handleRemove({ id, objectKey })}
          />

          <Button
            size={'large'}
            type="primary"
            icon={<DownloadOutlined />}
            onClick={() => handleDownload(objectKey)}
          />
        </div>
      </div>
    </Card>
  )
}