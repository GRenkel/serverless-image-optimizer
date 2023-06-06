import { Avatar, Card, Spin } from "antd"
import { FileOutlined, DeleteOutlined, CloudDownloadOutlined, ContainerTwoTone } from '@ant-design/icons';
import { translate } from "../locales/translator";

export function FileCard({ handleDownload, handleRemove, id, name, size, sizeUnit, isUploading = false }) {
  
  if (isUploading) {
    return (
      <Spin tip={translate("upload.uploading")} size="small">
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
      style={{ width: 250, margin: '10px' }}
      key={id}
    >
      <div style={{ display: 'flex', gap: 5, alignItems: 'center' }}>
        <Avatar icon={<FileOutlined />} />
        <span data-testid="span-name">{name}</span>
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 5, paddingTop: 10 }}>
        <div style={{ display: 'flex', width: '100%', justifyContent: 'space-around' }}>
          <CloudDownloadOutlined onClick={() => handleDownload(name)} style={{ fontSize: 25, color: 'red' }} />
          <DeleteOutlined onClick={() => handleRemove({ id, name })} style={{ fontSize: 25, color: 'red' }} />
        </div>
        <div style={{ alignSelf: 'center' }}>
          <ContainerTwoTone /> {size.toFixed(2)}{' '}{sizeUnit}
        </div>
      </div>
    </Card>
  )
}