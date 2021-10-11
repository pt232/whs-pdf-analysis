import express from "express";
import controller from "../controllers/index.controller";

const router = express.Router();

router.get("/", controller.getIndex);

export default router;
