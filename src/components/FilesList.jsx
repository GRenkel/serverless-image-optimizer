import { Empty } from "antd";
import { translate } from '../locales/translator'
import { FileSkeletonCard } from "./FileSkeletonCard";
import { FileCard } from "./FileCard";

export function FilesList({ fileData, isLoading }) {

  if (isLoading) {
    return (
      <div style={{ display: 'flex', flex: 1, flexWrap: 'wrap', justifyContent: 'center' }}>
        {[...Array(10)].map((_, index) => <FileSkeletonCard key={index} />)}
      </div>
    );
  }

  if (fileData.length === 0) {
    return <Empty description={translate('usersList.empty')} />
  }

  return (
    <div style={{ display: 'flex', flex: 1, flexWrap: 'wrap', justifyContent: 'center' }}>
      {fileData.map((row) => <FileCard  {...row}/>)}
    </div>
  )
}