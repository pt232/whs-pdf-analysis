const pdfjs = require("pdfjs-dist/legacy/build/pdf");
const { getDataWithProman } = require("./templates/proman");
const { getDataWithSabic } = require("./templates/sabic");
const { getDataWithSadara } = require("./templates/sadara");

async function getContent(src) {
  const doc = await pdfjs.getDocument(src).promise;
  const page = await doc.getPage(1);
  return await page.getTextContent();
}

async function getItems(src) {
  const content = await getContent(src);
  const filteredItems = getFilteredItems(content.items);
  let lineCount = 0;
  let itemInLineCount = 0;

  return filteredItems.map((item, index, array) => {
    let isFirstInLine = false;

    if (index === 0 || item.transform[5] !== array[index - 1].transform[5]) {
      isFirstInLine = true;
      lineCount++;
      itemInLineCount = 0;
    }

    itemInLineCount++;

    return {
      line: lineCount,
      isFirstInLine,
      itemNumbInLine: itemInLineCount,
      str: item.str.trim(),
      transform: item.transform,
    };
  });
}

function getFilteredItems(items) {
  return items.filter((item) => item.str.trim() !== "");
}

async function getDataByTemplate(src, template) {
  const items = await getItems(src);

  switch (template) {
    case "Proman":
      return getDataWithProman(items);
    case "Sabic":
      return getDataWithSabic(items);
    case "Sadara":
      return getDataWithSadara(items);
    default:
      throw new Error("Ein Template konnte nicht gefunden werden.");
  }
}

module.exports = { getFilteredItems, getDataByTemplate };
