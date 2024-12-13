const { google } = require("googleapis");
const fs = require("fs");
const path = require("path");

const SERVICE_ACCOUNT_FILE = "./service-account-key.json";
const SPREADSHEET_ID = "1tS61wrjle6v42e5GDkOKfodOGPnpWuq3JXM94iqq9fo";
const PRODUCTS_SHEET_NAME = "productslist";
const REVIEWS_SHEET_NAME = "reviewData";

const auth = new google.auth.GoogleAuth({
  keyFile: SERVICE_ACCOUNT_FILE,
  scopes: ["https://www.googleapis.com/auth/spreadsheets.readonly"],
});

const sheets = google.sheets({ version: "v4", auth });

async function fetchSheetData(sheetName) {
  try {
    const response = await sheets.spreadsheets.values.get({
      spreadsheetId: SPREADSHEET_ID,
      range: sheetName,
    });

    const rows = response.data.values;
    if (!rows || rows.length === 0) {
      console.log(`No data found in sheet ${sheetName}.`);
      return [];
    }

    const [headers, ...dataRows] = rows;
    return dataRows.map((row) => {
      return headers.reduce((obj, header, index) => {
        obj[header] = row[index] || "";
        return obj;
      }, {});
    });
  } catch (err) {
    console.error(`Error fetching data from ${sheetName}:`, err);
    return [];
  }
}

async function fetchAndSaveData() {
  try {
    const productData = await fetchSheetData(PRODUCTS_SHEET_NAME);
    const reviewData = await fetchSheetData(REVIEWS_SHEET_NAME);

    const outputFolder = path.join(__dirname, "../db");

    if (!fs.existsSync(outputFolder)) {
      fs.mkdirSync(outputFolder);
    }

    const productFile = path.join(outputFolder, "product.json");
    fs.writeFileSync(productFile, JSON.stringify(productData, null, 2));
    console.log(`Product data successfully written to ${productFile}`);

    const reviewFile = path.join(outputFolder, "reviews.json");
    fs.writeFileSync(reviewFile, JSON.stringify(reviewData, null, 2));
    console.log(`Review data successfully written to ${reviewFile}`);
    
  } catch (err) {
    console.error("Error fetching and saving data:", err);
  }
}

fetchAndSaveData();