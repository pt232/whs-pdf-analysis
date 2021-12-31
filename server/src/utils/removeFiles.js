const path = require("path");
const fs = require("fs");

function removeFilesFromDirectory(directoryName) {
  const pathToDir = path.join(__dirname, "../../", directoryName);

  try {
    const files = fs.readdirSync(pathToDir);

    for (const file of files) {
      fs.unlinkSync(path.join(pathToDir, file));
    }
  } catch (err) {
    throw new Error(err.message);
  }
}

module.exports = { removeFilesFromDirectory };
