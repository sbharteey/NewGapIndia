// pages/api/updateOfficeBearers.js
import { GoogleSpreadsheet } from 'google-spreadsheet';

export default async function handler(req, res) {
  try {
    // Load your Google Sheets API credentials from the .env.local file
    const creds = require(`../../${process.env.GOOGLE_SHEETS_API_CREDENTIALS}`);

    // Initialize the Google Sheets API
    const doc = new GoogleSpreadsheet('YOUR_SPREADSHEET_ID');
    await doc.useServiceAccountAuth(creds);

    // Load your Google Sheet
    await doc.loadInfo();

    // Access a specific sheet within your Google Sheet by index or title
    const sheet = doc.sheetsByIndex[0]; // Change to the desired sheet index

    // Example: Add a new row with data
    const newRow = {
      columnName1: 'Value1',
      columnName2: 'Value2',
      // Add more columns and values as needed
    };

    // Append the new row to the sheet
    await sheet.addRow(newRow);

    // Respond with a success message or appropriate status code
    res.status(200).json({ message: 'Data written to Google Sheet successfully' });
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ message: 'Error writing data to Google Sheet' });
  }
}

