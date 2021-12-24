const express = require("express");
const controller = require("../controllers/file.controller");
const upload = require("../services/upload");

const router = express.Router();

router.post("/upload", upload.single("file"), controller.uploadFile);

router.get("/convert", controller.convertFiles);

router.get("/download/:id", controller.downloadFile);

module.exports = router;
