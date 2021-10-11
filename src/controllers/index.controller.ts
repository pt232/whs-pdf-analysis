import { Request, Response } from "express";

function getIndex(req: Request, res: Response): void {
  res.render("index");
}

export default {
  getIndex,
};
