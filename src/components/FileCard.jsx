import { Avatar, Card } from "antd"
import { FileOutlined, DeleteOutlined, CloudDownloadOutlined, ContainerTwoTone } from '@ant-design/icons';

export function FileCard({ handleDownload, handleRemove, id, name, size, sizeUnit }) {
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
          <CloudDownloadOutlined onClick={() => handleDownload({id, name})} style={{ fontSize: 25, color: 'red' }} />
          <DeleteOutlined onClick={() => handleRemove({id, name})} style={{ fontSize: 25, color: 'red'}} />
        </div>
        <div style={{ alignSelf: 'center' }}>
          <ContainerTwoTone /> {size.toFixed(2)}{' '}{sizeUnit}
        </div>
      </div>
    </Card>
  )
}