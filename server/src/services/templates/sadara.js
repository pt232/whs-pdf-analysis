/**
 * Checks if the keyword 'PROMAN' is present
 */
function checkDocument(items) {
  return items.find((item) => item.str.toUpperCase().indexOf("SADARA CHEMICAL COMPANY") >= 0);
}

/**
 * Check for the item 'EA'. It is in the first row of the table.
 */
function findUnit(items) {
  const indicatorIndex = items.findIndex((item) => item.str.toUpperCase() === "CURR");

  if (indicatorIndex >= 0) {
    const firstItemInLineY = items[indicatorIndex + 1].transform[5];
    const firstLineInTable = items.filter((item) => item.transform[5] === firstItemInLineY);
    return firstLineInTable.find((item) => item.str.toUpperCase() === "EA").str === "EA"
      ? "pc"
      : "";
  }
  return "";
}

/**
 * Check for a number with at least 3 digits in the first
 * row of the table.
 */
function findCustomerProductNo(items) {
  const indicatorIndex = items.findIndex((item) => item.str.toUpperCase() === "CURR");

  if (indicatorIndex >= 0) {
    const numberPattern = /^[0-9]{3,}$/;
    const firstItemInLineY = items[indicatorIndex + 1].transform[5];
    const firstLineInTable = items.filter((item) => item.transform[5] === firstItemInLineY);
    const custProdNumber = firstLineInTable[1].str;
    return numberPattern.test(custProdNumber) ? Number(custProdNumber) : "";
  }
  return "";
}

/**
 * The title comes after the 'EA' indicator and should be in the same column
 * (x-Coordinate) as the 'Description' heading.
 */
function findProductTitle(items) {
  const indicatorIndex = items.findIndex((item) => item.str.toUpperCase() === "EA");
  const descriptionHeadingItem = items.find((item) => item.str.toUpperCase() === "DESCRIPTION");

  if (indicatorIndex >= 0) {
    const titleItem = items[indicatorIndex + 1];

    if (
      titleItem.transform[4] <= descriptionHeadingItem.transform[4] + 5 &&
      titleItem.transform[4] >= descriptionHeadingItem.transform[4] - 5
    )
      return titleItem.str.split(";")[0];
  }
  return "";
}

/**
 * The description starts at the inidicator 'TYPE:' and ends
 * at the delimiter line of hyphens.
 */
function findProductDescription(items) {
  const delimiterPatter = /^[-]+$/;
  const startIndex = items.findIndex((item) => item.str.toUpperCase().indexOf("TYPE:") >= 0);
  const endIndex = items.findIndex((item) => delimiterPatter.test(item.str));
  const descriptionArray = items.slice(startIndex, endIndex);

  if (startIndex >= 0 && endIndex >= 0) {
    const descriptionFirstPart = descriptionArray
      .map((item) => {
        const typeIndicatorIndex = item.str.indexOf("TYPE:");
        if (typeIndicatorIndex >= 0) {
          return item.str.substring(typeIndicatorIndex);
        }
        return item.str;
      })
      .join("\r\n");
    const descriptionSecondPart = findDescriptionDetails(items);

    return descriptionFirstPart + "\r\n" + descriptionSecondPart;
  }
  return "";
}

/**
 * Gets the last two rows of the Description. Starting at the indicator 'MPN code'.
 * Splits the first three whitespaces of the value string, so there will be
 * four values fitting two the four headers.
 */
function findDescriptionDetails(items) {
  const indicatorIndex = items.findIndex((item) => item.str.toUpperCase().indexOf("MPN CODE") >= 0);

  if (indicatorIndex) {
    const headings = items[indicatorIndex].str.split(/\s{2,}/);
    const rawValues = items[indicatorIndex + 1].str;
    const splittedValues = [];
    let whiteSpacePosition = 0;

    for (let i = 0; i < rawValues.length; i++) {
      if (/\s{1}/.test(rawValues.charAt(i))) {
        if (splittedValues.length === 3)
          splittedValues.push(rawValues.substring(whiteSpacePosition, rawValues.length).trim());
        else splittedValues.push(rawValues.substring(whiteSpacePosition, i + 1).trim());
        whiteSpacePosition = i;
      }
    }

    return headings.map((heading, index) => heading + ": " + splittedValues[index]).join("\r\n");
  }
}

/**
 * Based on the previously parsed Description details.
 */
function findProductManufacturer(items) {
  const descriptionDetails = findDescriptionDetails(items);

  if (descriptionDetails.indexOf("Mfr Name") >= 0) {
    return descriptionDetails.split("Mfr Name: ")[1];
  }
  return "";
}

function getDataWithSadara(items) {
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

module.exports = { getDataWithSadara };
