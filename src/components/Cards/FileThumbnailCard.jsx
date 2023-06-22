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
  debugger
  console.log(thumbnailURL)
  return (
    <Image
      // width={'100%'}
      height={200}
      src={thumbnailURL}
    >
    </Image>
  )
}