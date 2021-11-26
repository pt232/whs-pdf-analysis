import { createContext, ReactNode, useContext, useState } from "react";

type ContextProps = {
  addedFiles: File[];
  addFiles: (files: File[]) => void;
};

type ProviderProps = {
  children: ReactNode;
};

const defaultState = {
  addedFiles: [],
  addFiles: () => {},
};

const FILE_TYPE = "application/pdf";
const MAX_FILE_SIZE_MB = 5;
const FileContext = createContext<ContextProps>(defaultState);

export function useFiles() {
  return useContext(FileContext);
}

export default function FileProvider({ children }: ProviderProps) {
  const [addedFiles, setAddedFiles] = useState<File[]>([]);

  function addFiles(files: File[]) {
    if (files.length === 0) return;

    files.forEach((file) => {
      if (!checkFileForProperties(file)) return;

      if (!fileExists(file)) setAddedFiles((prevFiles) => [...prevFiles, file]);
    });
  }

  function fileExists(file: File) {
    return addedFiles.find((f) => f.lastModified === file.lastModified && f.name === file.name);
  }

  function checkFileForProperties(file: File) {
    const fileSizeInMb = file.size / 1024 / 1024;
    return file.type === FILE_TYPE && fileSizeInMb <= MAX_FILE_SIZE_MB;
  }

  return <FileContext.Provider value={{ addedFiles, addFiles }}>{children}</FileContext.Provider>;
}
