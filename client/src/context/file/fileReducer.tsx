import { IFile } from "./FileProvider";
import { ADD_FILE, ADD_TEMPLATE, ADD_TEMPLATES, REMOVE_FILE } from "../types";

type State = {
  files: IFile[];
};

type GetFile = {
  readonly type: "GET_FILE";
  readonly payload: string;
};

type AddFile = {
  readonly type: "ADD_FILE";
  readonly payload: IFile;
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

type RemoveFile = {
  readonly type: "REMOVE_FILE";
  readonly payload: string;
};

type Action = GetFile | AddFile | AddTemplate | AddTemplates | RemoveFile;

export function fileReducer(state: State, action: Action): State {
  switch (action.type) {
    case ADD_FILE:
      return { ...state, files: [...state.files, action.payload] };
    case ADD_TEMPLATE:
      return {
        ...state,
        files: state.files.map((f) => {
          if (f.id === action.payload.fileId) {
            return { ...f, template: action.payload.template };
          }
          return f;
        }),
      };
    case ADD_TEMPLATES:
      return {
        ...state,
        files: state.files.map((f) => {
          return { ...f, template: action.payload };
        }),
      };
    case REMOVE_FILE:
      return {
        ...state,
        files: state.files.filter((f) => f.id !== action.payload),
      };
    default:
      return state;
  }
}
