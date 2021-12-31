const path = require("path");
const fs = require("fs");
const validator = require("validator");
const { getFilteredItems, getDataByTemplate } = require("../services/pdfParser");
const { writeToSheet } = require("../services/sheetWriter");
const { removeFilesFromDirectory } = require("../utils/removeFiles");

const fileObjects = [];

function uploadFile(req, res) {
  const { id, template } = req.body;
  const file = req.file;

  if (id == null || template == null || file == null)
    return res.status(401).json({
      success: false,
      message: "",
      error: {
        code: "upload_properties",
        message: "Es fehlen Daten für den Upload.",
      },
      data: null,
    });

  fileObjects.push({
    id,
    template,
    file: req.file,
  });

  return res.status(200).json({
    success: true,
    message: "Alle Dateien wurden hochgeladen.",
    error: null,
    data: null,
  });
}

async function convertFiles(req, res) {
  const rowData = [];
  let fileToBeConverted = null;

  if (fileObjects.length === 0)
    return res.status(401).json({
      success: false,
      message: "",
      error: {
        code: "convert_files",
        message: "Es stehen keine Dateien für die Konvertierung zur Verfügung.",
      },
      data: null,
    });

  try {
    for (fileToBeConverted of fileObjects) {
      if (fileToBeConverted == null) {
        fileObjects.splice(0, fileObjects.length);
        return res.status(401).json({
          success: false,
          message: "",
          error: {
            code: "convert_file",
            message: "Eine Datei konnte für die Konvertierung nicht gefunden werden.",
          },
          data: null,
        });
      }

      const filteredItems = await getFilteredItems(
        fileToBeConverted.file.destination + fileToBeConverted.file.filename
      );

      rowData.push(getDataByTemplate(fileToBeConverted.template, filteredItems));
    }

    const sheetFileData = await writeToSheet(rowData);
    fileObjects.splice(0, fileObjects.length);
    removeFilesFromDirectory("public/uploads");

    return res.status(200).json({
      success: true,
      message: "Die Dateien wurden konvertiert.",
      error: null,
      data: sheetFileData,
    });
  } catch (err) {
    fileObjects.splice(0, fileObjects.length);
    return res.status(500).json({
      success: false,
      message: "",
      error: {
        code: "convert_other",
        message: `${fileToBeConverted.file.filename} : ${err.message}`,
      },
      data: null,
    });
  }
}

function downloadFile(req, res) {
  const { id } = req.params;
  const filePath = path.join(__dirname, "../../public/downloads/");

  if (!validator.isUUID(id, 4))
    return res.status(401).json({
      success: false,
      message: "",
      error: {
        code: "download_id",
        message: "Die übergebene ID stimmt nicht mit dem erwarteten Muster überein.",
      },
      data: null,
    });

  try {
    const fileNames = fs.readdirSync(filePath);
    const targetFile = fileNames.find((fileName) => fileName.includes(id));

    if (targetFile) return res.download(filePath + targetFile, targetFile);
    else
      return res.status(500).json({
        success: false,
        message: "",
        error: {
          code: "download_file",
          message: "Es konnte keine Datei heruntergeladen werden.",
        },
        data: null,
      });
  } catch (err) {
    return res.status(500).json({
      success: false,
      message: "",
      error: {
        code: "download_other",
        message: err.message,
      },
      data: null,
    });
  }
}

module.exports = {
  uploadFile,
  convertFiles,
  downloadFile,
};
