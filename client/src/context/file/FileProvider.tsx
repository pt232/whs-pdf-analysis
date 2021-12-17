import { createContext, ReactNode, useContext, useReducer } from "react";
import { v4 as uuid } from "uuid";
import { useErrorMessage } from "../message/ErrorMessageProvider";
import { calculateFileSize } from "../../utils/calculateFileSize";
import { cropFileName } from "../../utils/cropFileName";
import { fileReducer } from "./fileReducer";
import {
  ADD_FILE,
  ADD_TEMPLATE,
  ADD_TEMPLATES,
  REMOVE_FILE,
  SET_FILE_LOADING,
  SET_LOADING,
} from "../types";
import { buildFormDataFromObjects } from "../../utils/buildFormData";
import { post } from "../../utils/rest";

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
  loading: boolean;
  addedFiles: IFile[];
  uploadFiles: () => Promise<boolean>;
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
  loading: false,
  addedFiles: [],
  uploadFiles: () =>
    new Promise((resolve, reject) => {
      resolve(true);
    }),
  addFiles: () => {},
  addTemplate: () => {},
  addTemplates: () => {},
  removeFile: () => {},
});

export function useFiles() {
  return useContext(FileContext);
}

export default function FileProvider({ children }: ProviderProps) {
  const { addMessage, removeMessage } = useErrorMessage();
  const [state, dispatch] = useReducer(fileReducer, {
    loading: false,
    files: [],
  });

  async function uploadFiles(): Promise<boolean> {
    let statusCodes: number[] = [];

    dispatch({ type: SET_LOADING });

    await Promise.all(
      state.files.map(async (f) => {
        try {
          dispatch({ type: SET_FILE_LOADING, payload: f.id });

          const formData = buildFormDataFromObjects(f);
          const { status } = await post("api/file/upload", formData);

          statusCodes.push(status);
        } catch {
          addMessage("Beim Upload ist etwas schiefgelaufen.");
        }
      })
    );

    return statusCodes.every((sc) => sc === 200) && statusCodes.length === state.files.length;
  }

  function addFiles(files: File[]) {
    if (files.length === 0) return;

    removeMessage();

    files.forEach((file) => {
      const croppedFileName = cropFileName(file.name);

      if (!checkFileType(file)) return addMessage(`${croppedFileName} ist keine PDF-Datei.`);

      if (!checkFileSize(file)) return addMessage(`${croppedFileName} ist zu groß.`);

      if (!fileExists(file, state.files)) {
        const customFileObj = {
          id: uuid(),
          croppedName: croppedFileName,
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
      } else {
        addMessage(`${croppedFileName} wurde bereits hochgeladen.`);
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

  const contextValue = {
    loading: state.loading,
    addedFiles: state.files,
    uploadFiles,
    addFiles,
    addTemplate,
    addTemplates,
    removeFile,
  };

  return <FileContext.Provider value={contextValue}>{children}</FileContext.Provider>;
}

function fileExists(file: File, files: IFile[]) {
  return files.find((f) => f.file.lastModified === file.lastModified && f.file.name === file.name);
}

function checkFileSize(file: File) {
  const fileSizeInMb = file.size / 1024 / 1024;
  return fileSizeInMb <= MAX_FILE_SIZE_MB;
}

function checkFileType(file: File) {
  return file.type === FILE_TYPE;
}
