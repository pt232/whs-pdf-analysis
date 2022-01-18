/**
 * Checks if the keyword 'SABIC' is present
 */
function checkDocument(items) {
  return items.find((item) => item.str.toUpperCase().indexOf("SABIC") >= 0);
}

/**
 * The Unit for Sabic is pc (pieces)
 */
function findUnit() {
  return "pc";
}

/**
 * Gets the item with 'Positionslangtext'. Then searches for the item
 * that is in the previous line at the first position. This is the
 * CustomerProductNo.
 */
function findCustomerProductNo(items) {
  const indicatorIndex = items.findIndex((item) => item.str.toUpperCase() === "POSITIONSLANGTEXT:");

  if (indicatorIndex >= 0) {
    const targetItemIndex = items.findIndex(
      (item) => item.isFirstInLine === true && items[indicatorIndex].line - item.line === 1
    );

    return !isNaN(items[targetItemIndex].str) ? Number(items[targetItemIndex].str) : "";
  }
  return "";
}

/**
 * The searched Item is in the line after 'Positionslangtext'. It
 * is separated by a comma.
 */
function findProductTitle(items) {
  const indicatorIndex = items.findIndex((item) => item.str.toUpperCase() === "POSITIONSLANGTEXT:");
  if (indicatorIndex >= 0) {
    return items[indicatorIndex + 1].str.split(",")[0];
  }
  return "";
}

/**
 * The Product description is between the Item 'Positionslangtext'
 * and 'Anlagen'. The delimiter is currently just a line break.
 */
function findProductDescription(items) {
  const startIndex = items.findIndex((item) => item.str.toUpperCase() === "POSITIONSLANGTEXT:");
  const endIndex = items.findIndex((item) => item.str.toUpperCase() === "ANLAGEN:");

  if (startIndex >= 0 && endIndex >= 0) {
    const descriptionArray = items.slice(startIndex + 2, endIndex);
    return descriptionArray.map((item) => item.str).join("\r\n");
  }
  return "";
}

function getDataWithSabic(items) {
  if (!checkDocument(items)) throw new Error("Das Dokument passt nicht zur gewählten Vorlage.");

  return [
    {
      unit: findUnit(),
      customerProductNo: findCustomerProductNo(items),
      thenexProductNo: "",
      title: findProductTitle(items),
      description: findProductDescription(items),
      weightNet: "",
      tariffNo: "",
      originCountry: "",
      manufacturer: "",
      supplier: "",
      poti: "",
      supplierPN: "",
      dualUse: "",
      amount: "",
      currency: "",
    },
  ];
}

module.exports = { getDataWithSabic };
