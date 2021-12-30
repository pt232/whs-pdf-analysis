const MAX_FILENAME_LENGTH = 20;

export function cropFileName(fileName: string, extLength: number): string {
  if (fileName.length <= MAX_FILENAME_LENGTH) return fileName;

  const fileNameWithoutExt = fileName.slice(0, -(extLength + 1));
  const fileExt = fileName.split(".").pop();
  const fileNameStart = fileNameWithoutExt.substring(0, 7);
  const fileNameEnd = fileNameWithoutExt.substring(
    fileNameWithoutExt.length - 7,
    fileNameWithoutExt.length
  );

  return fileNameStart + "..." + fileNameEnd + "." + fileExt;
}
