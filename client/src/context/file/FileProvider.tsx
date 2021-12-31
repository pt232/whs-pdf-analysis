import { createContext, ReactNode, useContext, useReducer } from "react";
import { useNavigate } from "react-router-dom";
import { v4 as uuid } from "uuid";
import { useErrorMessage } from "../message/ErrorMessageProvider";
import { calculateFileSize } from "../../utils/calculateFileSize";
import { cropFileName } from "../../utils/cropFileName";
import { fileReducer } from "./fileReducer";
import {
  ADD_DOCUMENT_FILE,
  ADD_EXCEL_FILE,
  ADD_TEMPLATE,
  ADD_TEMPLATES,
  CLEAR_FILES,
  REMOVE_ALL_FILE_LOADING,
  REMOVE_DOCUMENT_FILE,
  SET_FILE_LOADING,
  SET_LOADING,
} from "../types";
import { buildFormDataFromObjects } from "../../utils/buildFormData";
import { get, post } from "../../utils/rest";
import { useHeading } from "../heading/HeadingProvider";

interface IFile {
  id: string;
  name: string;
  croppedName: string;
  loading: boolean;
  calculatedSize: string;
}

export interface IDocumentFile extends IFile {
  template: string;
  file: File;
}

export interface IExcelFile extends IFile {
  file: ExcelFile;
}

type ExcelFile = {
  id: string;
  fileName: string;
};

type ContextProps = {
  loading: boolean;
  documentFiles: IDocumentFile[];
  excelFile: IExcelFile;
  uploadDocumentFiles: () => Promise<boolean>;
  addDocumentFiles: (files: File[]) => void;
  addTemplate: (fileId: string, template: string) => void;
  addTemplates: (template: string) => void;
  removeFile: (fileId: string) => void;
  clearFiles: () => void;
  convertAndAddExcelFiles: () => void;
};

type ProviderProps = {
  children: ReactNode;
};

const FILE_TYPE = "application/pdf";
const MAX_FILE_SIZE_MB = 5;

export const defaultExcelFile = {
  id: uuid(),
  name: "Thenex Importvorlage.xlsx",
  croppedName: "Thenex Importvorlage.xlsx",
  loading: true,
  calculatedSize: "7 KB",
  file: {
    id: "",
    fileName: "Thenex Importvorlage.xlsx",
  },
};

const FileContext = createContext<ContextProps>({
  loading: false,
  documentFiles: [],
  excelFile: defaultExcelFile,
  uploadDocumentFiles: () =>
    new Promise((resolve, reject) => {
      resolve(true);
    }),
  addDocumentFiles: () => {},
  addTemplate: () => {},
  addTemplates: () => {},
  removeFile: () => {},
  clearFiles: () => {},
  convertAndAddExcelFiles: () => {},
});

export function useFiles() {
  return useContext(FileContext);
}

export default function FileProvider({ children }: ProviderProps) {
  const navigate = useNavigate();
  const { setHeading } = useHeading();
  const { addMessage, removeMessage } = useErrorMessage();
  const [state, dispatch] = useReducer(fileReducer, {
    loading: false,
    documentFiles: [],
    excelFile: defaultExcelFile,
  });

  async function uploadDocumentFiles(): Promise<boolean> {
    let statusCodes: number[] = [];

    dispatch({ type: SET_LOADING, payload: true });

    setHeading({
      title: "Lädt hoch",
      paragraph: "Geben Sie uns ein paar Sekunden...",
    });

    await Promise.all(
      state.documentFiles.map(async (f) => {
        try {
          dispatch({ type: SET_FILE_LOADING, payload: f.id });

          const formData = buildFormDataFromObjects(f);
          const { status } = await post("upload", formData);

          statusCodes.push(status);
        } catch {
          dispatch({ type: REMOVE_ALL_FILE_LOADING });
          dispatch({ type: SET_LOADING, payload: false });
          addMessage("Fehler beim Upload!", "Beim Upload ist etwas schiefgelaufen.");
        }
      })
    );

    dispatch({
      type: SET_LOADING,
      payload: false,
    });

    return (
      statusCodes.every((sc) => sc === 200) && statusCodes.length === state.documentFiles.length
    );
  }

  function addDocumentFiles(files: File[]) {
    if (files.length === 0) return;

    removeMessage();

    files.forEach((file) => {
      const croppedFileName = cropFileName(file.name, 3);

      if (!checkFileType(file))
        return addMessage("Fehler beim Upload!", `${croppedFileName} ist keine PDF-Datei.`);

      if (!checkFileSize(file))
        return addMessage("Fehler beim Upload!", `${croppedFileName} ist zu groß.`);

      if (!fileExists(file, state.documentFiles)) {
        const customFileObj = {
          id: uuid(),
          name: file.name,
          croppedName: croppedFileName,
          template: "",
          loading: false,
          calculatedSize: calculateFileSize(file.size),
          file,
        };

        dispatch({
          type: ADD_DOCUMENT_FILE,
          payload: customFileObj,
        });
      } else {
        addMessage("Fehler beim Upload!", `${croppedFileName} wurde bereits hochgeladen.`);
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
      type: REMOVE_DOCUMENT_FILE,
      payload: fileId,
    });
  }

  function clearFiles() {
    dispatch({
      type: CLEAR_FILES,
    });
  }

  async function convertAndAddExcelFiles() {
    dispatch({
      type: SET_LOADING,
      payload: true,
    });

    setHeading({
      title: "Die Dateien werden konvertiert",
      paragraph: "Warten Sie einen Moment. Gleich können Sie die Importvorlage herunterladen...",
    });

    try {
      const { data } = await get("convert");
      const file = data.data;

      dispatch({
        type: ADD_EXCEL_FILE,
        payload: {
          id: uuid(),
          name: file.fileName,
          croppedName: cropFileName(file.fileName, 4),
          loading: false,
          calculatedSize: calculateFileSize(file.fileSize),
          file,
        },
      });

      setHeading({
        title: "Konvertierung abgeschlossen!",
        paragraph: "Laden Sie die konvertierte Datei herunter",
      });
    } catch {
      addMessage("Fehler beim Konvertieren!", "Bei der Konvertierung ist etwas schiefgelaufen.");
      navigate("/");
    }
  }

  const contextValue = {
    loading: state.loading,
    documentFiles: state.documentFiles,
    excelFile: state.excelFile,
    uploadDocumentFiles,
    addDocumentFiles,
    addTemplate,
    addTemplates,
    removeFile,
    clearFiles,
    convertAndAddExcelFiles,
  };

  return <FileContext.Provider value={contextValue}>{children}</FileContext.Provider>;
}

function fileExists(file: File, files: IDocumentFile[]) {
  return files.find((f) => f.file.lastModified === file.lastModified && f.file.name === file.name);
}

function checkFileSize(file: File) {
  const fileSizeInMb = file.size / 1024 / 1024;
  return fileSizeInMb <= MAX_FILE_SIZE_MB;
}

function checkFileType(file: File) {
  return file.type === FILE_TYPE;
}
