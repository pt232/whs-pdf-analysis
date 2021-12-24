const ExcelJS = require("exceljs");

async function writeToSheet(rowData) {
  const workbook = new ExcelJS.Workbook();
  const id = Date.now();
  const filePath = "./public/downloads/";
  const fileName = `${id} - Thenex Importvorlage.xlsx`;

  workbook.creator = "Thenex";
  workbook.lastModifiedBy = "Thenex";

  const worksheet = workbook.addWorksheet("Importblatt");
  worksheet.columns = [
    { header: "KdArt.Nr:Preis (nicht anfassen)", key: "custProdNoPrice" },
    { header: "Länge (kein Import)", key: "charLength" },
    { header: "Kundenpreis", key: "customerPrice" },
    { header: "Einheit EINFÜGEN AB HIER", key: "reminder" },
    { header: "Kundenartikelnummer (kein Import)", key: "customerProductNo" },
    { header: "thenex Artikelnummer", key: "thenexProductNo" },
    { header: "Bezeichnung", key: "title" },
    { header: "Beschreibung", key: "description" },
    { header: "Gewicht netto", key: "weightNet" },
    { header: "Zolltarifnummer", key: "tariffNo" },
    { header: "Ursprungsland", key: "originCountry" },
    { header: "Hersteller", key: "manufacturer" },
    { header: "Lieferant", key: "supplier" },
    { header: "FT06 Poti", key: "poti" },
    { header: "FT15 Hersteller P/N", key: "supplierPN" },
    { header: "FT16 Dual Use", key: "dualUse" },
    { header: "EK Stück", key: "amount" },
    { header: "EK Währung", key: "currency" },
  ];

  worksheet.addRows(rowData);

  await workbook.xlsx.writeFile(filePath + fileName).catch(() => {
    throw new Error("Beim Erstellen der Excel-Datei ist etwas schiefgelaufen.");
  });

  return {
    id,
    fileName,
  };
}

module.exports = { writeToSheet };
