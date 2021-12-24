function checkDocument(items) {
  return items.find((item) => item.toUpperCase().indexOf("SABIC") >= 0);
}

function findCustomerProductNo(items) {
  const indicatorIndex = items.findIndex((item) => item.toUpperCase() === "MATERIAL");
  if (indicatorIndex >= 0) return items[indicatorIndex + 2];
  return "";
}

function findProductTitle(items) {
  const indicatorIndex = items.findIndex((item) => item.toUpperCase() === "POSITIONSLANGTEXT:");
  if (indicatorIndex >= 0) return items[indicatorIndex + 1];
  return "";
}

function findProductDescription(items) {
  const startIndex = items.findIndex((item) => item.toUpperCase() === "POSITIONSLANGTEXT:") + 2;
  const endIndex = items.findIndex((item) => item.toUpperCase() === "ANLAGEN:");
  const descriptionArray = items.slice(startIndex, endIndex);

  if (startIndex >= 0 && endIndex >= 0) return descriptionArray.join(" ");
  return "";
}

function findProductQuantity(items) {
  const indicatorIndex = items.findIndex((item) => item.toUpperCase() === "UOM");
  if (indicatorIndex >= 0) return items[indicatorIndex + 7];
  return "";
}

function getDataWithSabic(items) {
  if (!checkDocument(items)) throw new Error("Das Dokument passt nicht zur gewählten Vorlage.");

  return [
    { "KdArt.Nr:Preis (nicht anfassen)": "" },
    { "Länge (kein Import)": "" },
    { Kundenpreis: "" },
    { "Einheit EINFÜGEN AB HIER": "" },
    { "Kundenartikelnummer (kein Import)": findCustomerProductNo(items) },
    { "thenex Artikelnummer": "" },
    { Bezeichnung: findProductTitle(items) },
    { Beschreibung: findProductDescription(items) },
    { "Gewicht netto": "" },
    { Zolltarifnummer: "" },
    { Ursprungsland: "" },
    { Hersteller: "" },
    { Lieferant: "" },
    { "FT06 Poti": "" },
    { "FT15 Hersteller P/N": "" },
    { "FT16 Dual Use": "" },
    { "EK Stück": findProductQuantity(items) },
    { "EK Währung": "" },
  ];
}

module.exports = { getDataWithSabic };
