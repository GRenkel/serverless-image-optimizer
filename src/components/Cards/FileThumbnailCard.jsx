import { Image } from "antd";
import { translate } from "../../locales/translator";
import { ProcessingCard } from "./ProcessingCard";

export function FileThumbnailCard({ isProcessing, thumbnailURL }) {
  if (isProcessing) {
    return (
      <ProcessingCard
        processingLabel={translate("process.optimizing")}
      />

    )
  }
  return (
    <Image
      // width={'100%'}
      height={200}
      src={thumbnailURL}
    >
    </Image>
  )
}