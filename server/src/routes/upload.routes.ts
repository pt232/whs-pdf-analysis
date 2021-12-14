import express from "express";
import controller from "../controllers/upload.controller";
import { upload } from "../services/upload";

const router = express.Router();

router.post("/", upload.single("file"), controller.uploadFiles);

export default router;
