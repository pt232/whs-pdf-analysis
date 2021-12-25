const pdfjs = require("pdfjs-dist/legacy/build/pdf");
const { getDataWithSabic } = require("./templates/sabic");

async function getContent(src) {
  const doc = await pdfjs.getDocument(src).promise;
  const page = await doc.getPage(1);
  return await page.getTextContent();
}

async function getItems(src) {
  const content = await getContent(src);
  return content.items.map((item) => item.str.trim());
}

async function getFilteredItems(src) {
  const items = await getItems(src);
  return items.filter((item) => item != null && item !== "");
}

function getDataByTemplate(template, items) {
  switch (template) {
    case "Sabic":
      return getDataWithSabic(items);
    default:
      throw new Error("Ein Template konnte nicht gefunden werden.");
  }
}

module.exports = { getFilteredItems, getDataByTemplate };
