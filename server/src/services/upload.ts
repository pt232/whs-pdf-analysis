import { Request } from "express";
import multer from "multer";
import { IFileRequest } from "../config/definitions";

const UPLOAD_DESTINATION = "./public/uploads/";

const fileStorageEngine = multer.diskStorage({
  destination: (req: Request, file, callback) => {
    callback(null, UPLOAD_DESTINATION);
  },
  filename: (req: IFileRequest, file, callback) => {
    const { id } = req.body;
    callback(null, id + "--" + file.originalname);
  },
});

export const upload = multer({ storage: fileStorageEngine });
