import express from "express";
import controller from "../controllers/upload.controller";

const router = express.Router();

router.post("/", controller.uploadFiles);

export default router;
