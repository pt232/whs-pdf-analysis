const { getFilteredItems } = require("../services/pdfParser");

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
  const { id } = req.params;

  if (id == null) return res.status(401).send("No ID was provided");
  if (fileObjects.length === 0) return res.status(401).send("No files were available.");

  const fileToBeConverted = fileObjects.find((f) => f.id === id);

  if (fileToBeConverted == null) return res.status(401).send("The file could not be found.");

  try {
    const filteredItems = await getFilteredItems(
      fileToBeConverted.file.destination + fileToBeConverted.file.filename
    );
    return res.status(200).json(filteredItems);
  } catch (err) {
    return res.status(500).send(err.message);
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
