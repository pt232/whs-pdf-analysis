/**
 * Checks if the keyword 'PROMAN' is present
 */
function checkDocument(items) {
  return items.find((item) => item.str.toUpperCase().indexOf("PROMAN") >= 0);
}

/**
 * Check for the item 'EA'. It is in the first row of the table.
 */
function findUnit(items) {
  const indicatorItem = items.find((item) => item.str.toUpperCase() === "DELIVERY DATE");

  if (indicatorItem) {
    const firstLineInTable = items.filter((item) => item.line === indicatorItem.line + 1);
    return firstLineInTable.find((item) => item.str.toUpperCase() === "EA").str === "EA"
      ? "pc"
      : "";
  }
  return "";
}

/**
 * The Number is in the first line of the table. And it is has
 * at least 3 digits.
 */
function findCustomerProductNo(items) {
  const indicatorItem = items.find((item) => item.str.toUpperCase() === "DELIVERY DATE");

  if (indicatorItem) {
    const numberPattern = /^[0-9]{3,}$/;
    const firstLineInTable = items.filter((item) => item.line === indicatorItem.line + 1);
    const custProdNumber = firstLineInTable.find((item) => numberPattern.test(item.str)).str;
    return !isNaN(custProdNumber) ? Number(custProdNumber) : "";
  }
  return "";
}

/**
 * The title stands right behind the indicator 'DESCRIPTION:'.
 */
function findProductTitle(items) {
  const indicatorIndex = items.findIndex(
    (item) => item.str.toUpperCase().indexOf("DESCRIPTION:") >= 0
  );

  if (indicatorIndex >= 0) {
    return items[indicatorIndex].str.split(":")[1].trim();
  }
  return "";
}

/**
 * The Product description is between the indicator 'TYPE:' and the
 * indicator 'Drawing'.
 */
function findProductDescription(items) {
  const startIndex = items.findIndex((item) => item.str.toUpperCase().indexOf("TYPE:") >= 0);
  const endIndex = items.findIndex((item) => item.str.toUpperCase().indexOf("DRAWING #:") >= 0);
  const descriptionArray = items.slice(startIndex, endIndex);

  if (startIndex >= 0 && endIndex >= 0) {
    return descriptionArray.map((item) => item.str).join("\r\n");
  }
  return "";
}

/**
 * The Manufacturer stands right behind the indicator 'MANUFACTURER:'.
 */
function findProductManufacturer(items) {
  const indicatorIndex = items.findIndex(
    (item) => item.str.toUpperCase().indexOf("MANUFACTURER:") >= 0
  );

  if (indicatorIndex >= 0) {
    return items[indicatorIndex].str.split(":")[1].trim();
  }
  return "";
}

function getDataWithProman(items) {
  if (!checkDocument(items)) throw new Error("Das Dokument passt nicht zur gewählten Vorlage.");

  return [
    {
      unit: findUnit(items),
      customerProductNo: findCustomerProductNo(items),
      thenexProductNo: "",
      title: findProductTitle(items),
      description: findProductDescription(items),
      weightNet: "",
      tariffNo: "",
      originCountry: "",
      manufacturer: findProductManufacturer(items),
      supplier: "",
      poti: "",
      supplierPN: "",
      dualUse: "",
      amount: "",
      currency: "",
    },
  ];
}

module.exports = { getDataWithProman };
