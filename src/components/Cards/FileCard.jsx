import { Button, Card } from "antd"
import { DeleteOutlined, DownloadOutlined } from '@ant-design/icons';
import { translate } from "../../locales/translator";
import { FileThumbnailCard } from "./FileThumbnailCard";
import { ProcessingCard } from "./ProcessingCard";

export function FileCard({ handleDownload, handleRemove, file }) {

  const { id, objectKey, name, size, sizeUnit, isProcessing, isUploading = false, publicObjectURL } = file

  if (isUploading) {
    return (
      <div
        style={{ width: 300, margin: '10px', maxWidth: 300, height: 320, maxHeight: 320 }}
      >
        <ProcessingCard
          key={id}
          processingLabel={translate("upload.uploading")}
        />
      </div>
    )
  }

  return (
    <Card
      hoverable
      style={{ width: 300, margin: '10px', maxWidth: 300, height: 320, maxHeight: 320 }}
      key={id}
      bodyStyle={{ height: '100%', width: '100%' }}
    >
      <div
        style={{
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'space-between'
        }}
      >
        <FileThumbnailCard
          isProcessing={isProcessing}
          thumbnailURL={publicObjectURL}
        />
        
        <div style={{ display: 'flex', flexDirection: 'column', width: '100%', gap: 10, maxHeight: 70 }}>
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <span
              data-testid="span-name"
              style={{
                maxWidth: '220px',
                fontWeight: 'bold',
                overflow: 'hidden',
                whiteSpace: 'nowrap',
                textOverflow: 'ellipsis',
              }}>
              {name}
            </span>
            <span
              data-testid="span-size"
              style={{
                fontSize: '10px',
                fontWeight: 'lighter',
              }}>
              {size.toFixed(2)}{' '}{sizeUnit}
            </span>
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
              onClick={() => handleDownload({ objectKey })}
            />
            <Button
              size={'large'}
              type="primary"
              title={translate("upload.download-thumbnail")}
              icon={<DownloadOutlined />}
              onClick={() => handleDownload({ objectKey, url: publicObjectURL })}
            />
          </div>
        </div>
      </div>
    </Card>
  )
}