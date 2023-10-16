// utils/googleSpreadsheet.js
const { GoogleSpreadsheet } = require('google-spreadsheet');
const creds = require('./secrets.json'); 

const doc = new GoogleSpreadsheet('1EIjbFfjBPvZzWU9LYiQ90BkLnu-p3XA1LT8FkVdTI2E');

async function accessGoogleSheet() {
  await doc.useServiceAccountAuth(creds);
  await doc.loadInfo();

  // Access the specific sheet you want to work with.
  const sheet = doc.sheetsByIndex[0];

  // Fetch data from the sheet.
  const rows = await sheet.getRows();

  // Process the rows and return the data.
  const officeBearersData = rows.map((row) => ({
    location: row.Location,
    president: row.President,
    vicePresident: row.VicePresident,
    // Add more fields as needed.
  }));

  return officeBearersData;
}

module.exports = { accessGoogleSheet };
