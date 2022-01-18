/**
 * Checks if the keyword 'TRINIDAD GENERATION UNLIMITED' is present
 */
function checkDocument(items) {
  return items.find((item) => item.str.toUpperCase().indexOf("TRINIDAD GENERATION UNLIMITED") >= 0);
}

/**
 * Check for the item 'EA' in the given row.
 */
function findUnit(row) {
  return row.find((item) => item.str === "EA").str === "EA" ? "pc" : "";
}

/**
 * The title is part of the description and consists only of uppercase words.
 */
function findProductTitle(row) {
  const indicatorIndex = row.findIndex((item) => item.str === "EA");

  if (indicatorIndex >= 0) {
    const firstDescriptionLine = row[indicatorIndex + 1].str;
    const firstLineItems = firstDescriptionLine.split(" ");
    const uppercaseTitlePattern = /\b[A-Z]{2,}\b/;
    let productTitle = "";

    firstLineItems.forEach((item) => {
      if (uppercaseTitlePattern.test(item)) productTitle += item + " ";
    });

    return productTitle;
  }
  return "";
}

/**
 * Cutting out the title and then concat the rest with the
 * first line (where the title is).
 */
function findProductDescription(row) {
  const indicatorIndex = row.findIndex((item) => item.str === "EA");

  if (indicatorIndex >= 0) {
    const firstDescriptionLine = row[indicatorIndex + 1].str;
    const otherDescriptionLines = row.slice(indicatorIndex + 2);
    const firstLineItems = firstDescriptionLine.split(" ");
    const uppercaseTitlePattern = /\b[A-Z]{2,}\b/;
    let titleEndingWord = firstLineItems.find((item) => !uppercaseTitlePattern.test(item));

    return (
      firstDescriptionLine.slice(firstDescriptionLine.indexOf(titleEndingWord)) +
      otherDescriptionLines.map((item) => item.str).join(" ")
    );
  }
  return "";
}

/**
 * The manufacturer is in the description. Its name can be found
 * after the indicator 'Manufacturer -'.
 */
function findProductManufacturer(row) {
  const indicatorIndex = row.findIndex((item) => item.str === "EA");

  if (indicatorIndex >= 0) {
    const descriptionLines = row.slice(indicatorIndex + 1);
    const manufactuererIndex = descriptionLines.findIndex(
      (item) => item.str.toUpperCase().indexOf("MANUFACTURER –") >= 0
    );

    if (manufactuererIndex >= 0) {
      let manufacturerName = "";

      for (let i = manufactuererIndex; i < descriptionLines.length; i++) {
        const currentLine = descriptionLines[i].str;
        if (i === manufactuererIndex) {
          manufacturerName +=
            currentLine.slice(currentLine.toUpperCase().indexOf("MANUFACTURER –") + 14) + " ";
          continue;
        }
        manufacturerName += currentLine;
      }

      return manufacturerName.trim();
    }
  }
  return "";
}

/**
 * Check if all descriptions ar equal.
 */
function isEveryRowEqual(tableRows) {
  const descriptions = [];

  tableRows.forEach((rowContent) => {
    const rowDescription = rowContent.slice(3);
    descriptions.push(rowDescription.map((item) => item.str).join(" "));
  });

  return descriptions.every((desc) => desc === descriptions[0]);
}

/**
 * The indicators 'Amount' and 'Special Instructions' mark the beginning and
 * the end of the table content. A row is defined by starting with a single
 * digit number and being the first item in the line.
 */
function getTableRows(items) {
  const startIndex = items.findIndex((item) => item.str.toUpperCase() === "AMOUNT");
  const endIndex = items.findIndex(
    (item) => item.str.toUpperCase().indexOf("SPECIAL INSTRUCTIONS:") >= 0
  );

  if (startIndex >= 0 && endIndex >= 0) {
    const tableArray = items.slice(startIndex + 1, endIndex);
    const tableRows = new Map();
    const itemNumberPattern = /^[1-9]{1}$/;
    let rowArray = [];
    let rowCount = 0;

    tableArray.forEach((item) => {
      if (item.isFirstInLine && itemNumberPattern.test(item.str)) {
        rowCount++;
        rowArray = [];
      }
      rowArray.push(item);
      tableRows.set(rowCount, rowArray);
    });

    return tableRows;
  }
  return null;
}

function getDataWithTgu(items) {
  if (!checkDocument(items)) throw new Error("Das Dokument passt nicht zur gewählten Vorlage.");

  const tableRows = getTableRows(items);
  const sheetRows = [];

  if (tableRows.size === 1 || isEveryRowEqual(tableRows)) {
    return [
      {
        unit: findUnit(tableRows.get(1)),
        customerProductNo: "",
        thenexProductNo: "",
        title: findProductTitle(tableRows.get(1)),
        description: findProductDescription(tableRows.get(1)),
        weightNet: "",
        tariffNo: "",
        originCountry: "",
        manufacturer: findProductManufacturer(tableRows.get(1)),
        supplier: "",
        poti: "",
        supplierPN: "",
        dualUse: "",
        amount: "",
        currency: "",
      },
    ];
  } else {
    tableRows.forEach((row) => {
      sheetRows.push({
        unit: findUnit(row),
        customerProductNo: "",
        thenexProductNo: "",
        title: findProductTitle(row),
        description: findProductDescription(row),
        weightNet: "",
        tariffNo: "",
        originCountry: "",
        manufacturer: findProductManufacturer(row),
        supplier: "",
        poti: "",
        supplierPN: "",
        dualUse: "",
        amount: "",
        currency: "",
      });
    });

    return sheetRows;
  }
}

module.exports = { getDataWithTgu };
