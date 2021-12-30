const fs = require("fs");

function getFileSizeInBytes(fileName) {
  const filePath = "./public/downloads/";
  const stats = fs.statSync(filePath + fileName);
  return stats.size;
}

module.exports = { getFileSizeInBytes };
