import { IDocumentFile } from "../context/file/FileProvider";

export function buildFormDataFromObjects(fileObj: IDocumentFile): FormData {
  const formData = new FormData();

  formData.append("id", fileObj.id);
  formData.append("template", fileObj.template);
  formData.append("file", fileObj.file);

  return formData;
}
