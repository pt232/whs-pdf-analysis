import { defaultExcelFile, IDocumentFile, IExcelFile } from "./FileProvider";
import {
  ADD_DOCUMENT_FILE,
  ADD_EXCEL_FILE,
  ADD_TEMPLATE,
  ADD_TEMPLATES,
  CLEAR_FILES,
  REMOVE_DOCUMENT_FILE,
  REMOVE_ALL_FILE_LOADING,
  SET_FILE_LOADING,
  SET_LOADING,
} from "../types";

type State = {
  loading: boolean;
  documentFiles: IDocumentFile[];
  excelFile: IExcelFile;
};

type GetFile = {
  readonly type: "GET_FILE";
  readonly payload: string;
};

type AddDocumentFile = {
  readonly type: "ADD_DOCUMENT_FILE";
  readonly payload: IDocumentFile;
};

type AddExcelFile = {
  readonly type: "ADD_EXCEL_FILE";
  readonly payload: IExcelFile;
};

type AddTemplate = {
  readonly type: "ADD_TEMPLATE";
  readonly payload: {
    fileId: string;
    template: string;
  };
};

type AddTemplates = {
  readonly type: "ADD_TEMPLATES";
  readonly payload: string;
};

type RemoveDocumentFile = {
  readonly type: "REMOVE_DOCUMENT_FILE";
  readonly payload: string;
};

type ClearFiles = {
  readonly type: "CLEAR_FILES";
};

type SetFileLoading = {
  readonly type: "SET_FILE_LOADING";
  readonly payload: string;
};

type RemoveAllFileLoading = {
  readonly type: "REMOVE_ALL_FILE_LOADING";
};

type SetLoading = {
  readonly type: "SET_LOADING";
  readonly payload: boolean;
};

type Action =
  | GetFile
  | AddDocumentFile
  | AddExcelFile
  | AddTemplate
  | AddTemplates
  | RemoveDocumentFile
  | ClearFiles
  | SetFileLoading
  | RemoveAllFileLoading
  | SetLoading;

export function fileReducer(state: State, action: Action): State {
  switch (action.type) {
    case ADD_DOCUMENT_FILE:
      return { ...state, documentFiles: [...state.documentFiles, action.payload] };
    case ADD_EXCEL_FILE:
      return { ...state, loading: false, excelFile: action.payload };
    case ADD_TEMPLATE:
      return {
        ...state,
        documentFiles: state.documentFiles.map((f) => {
          if (f.id === action.payload.fileId) {
            return { ...f, template: action.payload.template };
          }
          return f;
        }),
      };
    case ADD_TEMPLATES:
      return {
        ...state,
        documentFiles: state.documentFiles.map((f) => {
          return { ...f, template: action.payload };
        }),
      };
    case REMOVE_DOCUMENT_FILE:
      return {
        ...state,
        documentFiles: state.documentFiles.filter((f) => f.id !== action.payload),
      };
    case CLEAR_FILES:
      return {
        ...state,
        loading: false,
        documentFiles: [],
        excelFile: defaultExcelFile,
      };
    case SET_FILE_LOADING:
      return {
        ...state,
        documentFiles: state.documentFiles.map((f) => {
          if (f.id === action.payload) {
            return { ...f, loading: true };
          }
          return f;
        }),
      };
    case REMOVE_ALL_FILE_LOADING:
      return {
        ...state,
        documentFiles: state.documentFiles.map((f) => {
          return { ...f, loading: false };
        }),
      };
    case SET_LOADING:
      return {
        ...state,
        loading: action.payload,
      };
    default:
      return state;
  }
}
