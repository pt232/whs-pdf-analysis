import { Request, Response } from "express";

function uploadFiles(req: Request, res: Response): void {
  res.status(200).send("Uploaded Files");
}

export default {
  uploadFiles,
};
