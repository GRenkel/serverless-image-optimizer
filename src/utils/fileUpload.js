const MAXIMUM_FILE_SIZE = 1 //1MB

export function exceedsMaxFileSize(file) {
  const isGtDefined = file.size / 1024 / 1024 > MAXIMUM_FILE_SIZE;
  return isGtDefined;
}
