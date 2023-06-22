import { awsConstants } from "../services/aws/constants/awsConstants";

export function exceedsMaxFileSize(file) {
  const isGtDefined = file.size / 1024 / 1024 > awsConstants.MAXIMUM_FILE_SIZE;
  return isGtDefined;
}
export function replacesKeyParamsWithOptimizedObjectParams(string){
  return string
  .replace(awsConstants.UPLOAD_OBJECT_PREFIX,awsConstants.OPTIMIZED_OBJECT_PREFIX)
  .replace(/(?:\.([^.]+))?$/,awsConstants.DEFAULT_OPTIMIZED_EXTENSION)
}

export function removesWhiteSpaces(string){
  return string.replace(/\s/g,'')
}
export function formatFileSize(size) {
  let sizeUnit = 'B';

  if (size >= 1024) {
    size /= 1024;
    sizeUnit = 'KB';
  }

  if (size >= 1024) {
    size /= 1024;
    sizeUnit = 'MB';
  }

  if (size >= 1024) {
    size /= 1024;
    sizeUnit = 'GB';
  }

  return {
    size: Math.round(size),
    sizeUnit
  };
}