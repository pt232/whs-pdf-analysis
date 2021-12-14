import { Request, Response } from "express";

function uploadFiles(req: Request, res: Response): void {
  console.log(req.file);
  console.log(req.body);
  res.status(200).send("Uploaded Files");
}

export default {
  uploadFiles,
};
