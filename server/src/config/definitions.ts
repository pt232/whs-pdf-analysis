import { Request } from "express";

export interface IFileRequest extends Request {
  id: string;
  template: string;
}
