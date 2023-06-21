import { Empty } from "antd";
import { translate } from '../locales/translator'
import { FileSkeletonCard } from "./cards/FileSkeletonCard";
import { FileCard } from "./cards/FileCard";

export function FilesList({ fileData, handleDownload, handleRemove, isLoading }) {
  if (isLoading) {
    return (
      <div style={{ display: 'flex', flex: 1, flexWrap: 'wrap', justifyContent: 'center' }}>
        {[...Array(3)].map((_, index) => <FileSkeletonCard key={index} />)}
      </div>
    );
  }

  if (fileData.length === 0) {
    return <Empty description={translate('filesList.empty')} />
  }

  return (
    <div style={{ display: 'flex', flex: 1, flexWrap: 'wrap', justifyContent: 'center' }}>
      {fileData.map((row) => <FileCard key={row.id} handleDownload={handleDownload} handleRemove={handleRemove} file={row} />)}
    </div>
  )
}