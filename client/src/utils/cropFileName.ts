const MAX_FILENAME_LENGTH = 20;

export function cropFileName(fileName: string): string {
  if (fileName.length <= MAX_FILENAME_LENGTH) return fileName;

  const fileNameWithoutExt = fileName.slice(0, -4);

  return fileNameWithoutExt.substr(0, MAX_FILENAME_LENGTH) + "...pdf";
}
