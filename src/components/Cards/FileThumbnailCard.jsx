import { Image } from "antd";
import { translator } from "../../locales/translator";
import { ProcessingCard } from "./ProcessingCard";

export function FileThumbnailCard({ isProcessing, thumbnailURL }) {
  if (isProcessing) {
    return (
      <ProcessingCard
        processingLabel={translator.translate("process.optimizing")}
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