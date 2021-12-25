const { getFilteredItems, getDataByTemplate } = require("../services/pdfParser");
const { writeToSheet } = require("../services/sheetWriter");

const fileObjects = [];

function uploadFile(req, res) {
  const { id, template } = req.body;
  const file = req.file;

  if (id == null || template == null || file == null)
    return res.status(401).send("The expected properties could not be found.");

  fileObjects.push({
    id,
    template,
    file: req.file,
  });

  return res.status(200).send("Uploaded Files");
}

async function convertFiles(req, res) {
  const rowData = [];
  let fileToBeConverted = null;

  if (fileObjects.length === 0) return res.status(401).send("No files were available.");

  try {
    for (fileToBeConverted of fileObjects) {
      if (fileToBeConverted == null) return res.status(401).send("The file could not be found.");

      const filteredItems = await getFilteredItems(
        fileToBeConverted.file.destination + fileToBeConverted.file.filename
      );

      rowData.push(getDataByTemplate(fileToBeConverted.template, filteredItems));
    }

    const sheetFileName = await writeToSheet(rowData);

    return res.status(200).json(sheetFileName);
  } catch (err) {
    return res.status(500).send(`${fileToBeConverted.file.filename} : ${err.message}`);
  }
}

function downloadFile(req, res) {
  const { id } = req.params;
  res.status(200).send(`Downloaded file with the ID: ${id}`);
}

module.exports = {
  uploadFile,
  convertFiles,
  downloadFile,
};
