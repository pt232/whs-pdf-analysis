export function fileListToArray(fileList: FileList): File[] {
  let fileArray: File[] = [];
  for (let i = 0; i < fileList.length; i++) {
    fileArray.push(fileList[i]);
  }
  return fileArray;
}
