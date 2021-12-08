import { createContext, ReactNode, useContext, useReducer } from "react";
import { v4 as uuid } from "uuid";
import { calculateFileSize } from "../utils/calculateFileSize";
import { cropFileName } from "../utils/cropFileName";
import { fileReducer } from "./fileReducer";
import { ADD_FILE, ADD_TEMPLATE, ADD_TEMPLATES, REMOVE_FILE } from "./types";

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
  addTemplate: (fileId: string, template: string) => void;
  addTemplates: (template: string) => void;
  removeFile: (fileId: string) => void;
};

type ProviderProps = {
  children: ReactNode;
};

const FILE_TYPE = "application/pdf";
const MAX_FILE_SIZE_MB = 5;
const FileContext = createContext<ContextProps>({
  addedFiles: [],
  addFiles: () => {},
  addTemplate: () => {},
  addTemplates: () => {},
  removeFile: () => {},
});

export function useFiles() {
  return useContext(FileContext);
}

export default function FileProvider({ children }: ProviderProps) {
  const [state, dispatch] = useReducer(fileReducer, {
    files: [],
  });

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

        dispatch({
          type: ADD_FILE,
          payload: customFileObj,
        });
      }
    });
  }

  function addTemplate(fileId: string, template: string) {
    dispatch({
      type: ADD_TEMPLATE,
      payload: {
        fileId,
        template,
      },
    });
  }

  function addTemplates(template: string) {
    dispatch({
      type: ADD_TEMPLATES,
      payload: template,
    });
  }

  function removeFile(fileId: string) {
    dispatch({
      type: REMOVE_FILE,
      payload: fileId,
    });
  }

  function fileExists(file: File) {
    return state.files.find(
      (f) => f.file.lastModified === file.lastModified && f.file.name === file.name
    );
  }

  function checkFileForProperties(file: File) {
    const fileSizeInMb = file.size / 1024 / 1024;
    return file.type === FILE_TYPE && fileSizeInMb <= MAX_FILE_SIZE_MB;
  }

  const contextValue = {
    addedFiles: state.files,
    addFiles,
    addTemplate,
    addTemplates,
    removeFile,
  };

  return <FileContext.Provider value={contextValue}>{children}</FileContext.Provider>;
}
