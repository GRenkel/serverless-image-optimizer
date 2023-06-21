import { translate } from "../../locales/translator";
import { ProcessingCard } from "./ProcessingCard";

export function FileThumbnailCard({ isProcessing }) {
  if (isProcessing) {
    return (
      <ProcessingCard
        processingLabel={translate("process.optimizing")}
      />

    )
  }
}