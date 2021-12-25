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
  if (indicatorIndex >= 0) {
    return items[indicatorIndex + 1].replace(":", "");
  }
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
  if (indicatorIndex >= 0) return parseInt(items[indicatorIndex + 7]);
  return "";
}

function getDataWithSabic(items) {
  if (!checkDocument(items)) throw new Error("Das Dokument passt nicht zur gewählten Vorlage.");

  return {
    reminder: "",
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
    amount: findProductQuantity(items),
    currency: "",
  };
}

module.exports = { getDataWithSabic };
