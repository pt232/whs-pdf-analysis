import { createContext, ReactNode, useContext, useState } from "react";
import { v4 as uuid } from "uuid";
import { calculateFileSize } from "../utils/calculateFileSize";
import { cropFileName } from "../utils/cropFileName";

export interface IFile {
  id: string;
  croppedName: string;
  template: string;
  loading: boolean;
  converted: boolean;
  calculatedSize: string;
  file: File;
}

type ContextProps = {
  addedFiles: IFile[];
  addFiles: (files: File[]) => void;
};

type ProviderProps = {
  children: ReactNode;
};

const FILE_TYPE = "application/pdf";
const MAX_FILE_SIZE_MB = 5;
const FileContext = createContext<ContextProps>({ addedFiles: [], addFiles: () => {} });

export function useFiles() {
  return useContext(FileContext);
}

export default function FileProvider({ children }: ProviderProps) {
  const [addedFiles, setAddedFiles] = useState<IFile[]>([]);

  function addFiles(files: File[]) {
    if (files.length === 0) return;

    files.forEach((file) => {
      if (!checkFileForProperties(file)) return;

      if (!fileExists(file)) {
        const customFileObj = {
          id: uuid(),
          croppedName: cropFileName(file.name),
          template: "",
          loading: false,
          converted: false,
          calculatedSize: calculateFileSize(file.size),
          file,
        };

        setAddedFiles((prevFiles) => [...prevFiles, customFileObj]);
      }
    });
  }

  function fileExists(file: File) {
    return addedFiles.find(
      (f) => f.file.lastModified === file.lastModified && f.file.name === file.name
    );
  }

  function checkFileForProperties(file: File) {
    const fileSizeInMb = file.size / 1024 / 1024;
    return file.type === FILE_TYPE && fileSizeInMb <= MAX_FILE_SIZE_MB;
  }

  return <FileContext.Provider value={{ addedFiles, addFiles }}>{children}</FileContext.Provider>;
}
