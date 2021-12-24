const XLSX = require("xlsx");

function writeToSheet(rowData) {
  const wb = XLSX.utils.book_new();
  const ws = XLSX.utils.json_to_sheet(rowData);
  const id = Date.now();
  const filePath = "./public/downloads/";
  const fileName = `${id} - Thenex Importvorlage.xlsx`;

  XLSX.utils.book_append_sheet(wb, ws, "Importblatt");

  XLSX.writeFile(wb, filePath + fileName, {
    Props: {
      Author: "Thenex",
    },
  });

  return {
    id,
    fileName,
  };
}

module.exports = { writeToSheet };
