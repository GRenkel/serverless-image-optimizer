import { Button, Card } from "antd"
import { DeleteOutlined, DownloadOutlined } from '@ant-design/icons';
import { translate } from "../../locales/translator";
import { FileThumbnailCard } from "./FileThumbnailCard";
import { ProcessingCard } from "./ProcessingCard";

export function FileCard({ handleDownload, handleRemove, file }) {

  const { id, objectKey, name, size, sizeUnit, isProcessing, isUploading = false, publicObjectURL } = file

  if (isUploading) {
    return (
      <ProcessingCard
        key={id}
        processingLabel={translate("upload.uploading")}
      />
    )
  }

  return (
    <Card
      hoverable
      style={{ width: 250, margin: '10px', maxWidth: 250 }}
      key={id}
    >
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 5, paddingTop: 10 }}>
        {<FileThumbnailCard
          isProcessing={isProcessing}
          thumbnailURL={publicObjectURL}
        />}
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
          <span data-testid="span-name" style={{ maxWidth: '220px', fontWeight: 'bold', whiteSpace: 'nowrap', textOverflow: 'ellipsis', overflow: 'hidden' }}>{name}</span>
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
            title={translate("upload.download-original")}
            icon={<DownloadOutlined />}
            onClick={() => handleDownload({objectKey})}
          />
          <Button
            size={'large'}
            type="primary"
            title={translate("upload.download-thumbnail")}
            icon={<DownloadOutlined />}
            onClick={() => handleDownload({objectKey, url: publicObjectURL})}
          />
        </div>
      </div>
    </Card>
  )
}