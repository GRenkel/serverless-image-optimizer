const MAXIMUM_FILE_SIZE = 1 //1MB

export function exceedsMaxFileSize(file) {
  const isGtDefined = file.size / 1024 / 1024 > MAXIMUM_FILE_SIZE;
  return isGtDefined;
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