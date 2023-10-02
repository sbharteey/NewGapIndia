// utils/syncData.js

// Import any necessary modules or dependencies here
const { google } = require('googleapis');
const sheets = google.sheets('v4');
require('dotenv').config(); // Add this line to load environment variables
// Load the service account key JSON file
const key = require('./secrets.json');

// Authenticate with the Google Sheets API
const jwtClient = new google.auth.JWT(
  key.client_email,
  null,
  key.private_key,
  ['https://www.googleapis.com/auth/spreadsheets']
);

jwtClient.authorize(async function (err, tokens) {
  if (err) {
    console.error('Error authorizing with Google Sheets API:', err);
    return;
  }

  // Define the spreadsheet ID for your Membership Data functionality
  const membershipSpreadsheetId = process.env.SHEET_ID_MEMBERSHIP; // Use the correct environment variable

  // Define the range where you want to update data (e.g., 'Sheet1!A1')
  const range = 'Sheet1!A2'; // Modify this range as needed

  // Define the data you want to update (an array of arrays, each representing a row)
  const data = [
    ['gapId', 'mobile', 'name', 'country', 'state', 'lokSabha', 'vidhanSabha', 'voterId', 'photo'],
    // Added your membership data here in the same order as columns
  ];

  try {
    // Use sheets.spreadsheets.values.update to update your Google Sheet with data
    console.log('Membership Spreadsheet ID:', membershipSpreadsheetId);
  
    await sheets.spreadsheets.values.update({
      auth: jwtClient,
      spreadsheetId: membershipSpreadsheetId, // Use the correct spreadsheet ID
      range,
      valueInputOption: 'RAW',
      resource: {
        values: data,
      },
    });
  
    console.log('Data updated successfully in Google Sheets for Membership Data.');
  } catch (error) {
    console.error('Error updating data in Google Sheets:', error.message);
    console.error(error.stack); // Log the full error stack for debugging
  }
});
