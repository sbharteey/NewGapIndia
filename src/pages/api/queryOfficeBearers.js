import { GoogleSpreadsheet } from 'google-spreadsheet';
import { JWT } from 'google-auth-library';


export default async function handler(req, res) {
  try {
    console.log("trying");
    console.log(`${process.env.GOOGLE_APPLICATION_CREDENTIALS}`);
    console.log("?");
    // Load your Google Sheets API credentials from the .env.local file
    const creds = require(`${process.env.GOOGLE_APPLICATION_CREDENTIALS}`);
console.log("credentials loaded");
    // Initialize the Google Sheets API

    const serviceAccountAuth = new JWT({
      email: process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL,
      key: process.env.GOOGLE_PRIVATE_KEY.split(String.raw`\n`).join('\n'),
      scopes: [
          'https://www.googleapis.com/auth/spreadsheets',
      ],
  });


  const doc = new GoogleSpreadsheet(`${process.env.SHEET_ID}`, serviceAccountAuth);

   // const doc = new GoogleSpreadsheet(`${process.env.SHEET_ID}`); // Replace 'YOUR_SPREADSHEET_ID' with your actual Google Sheet ID
   // await doc.useServiceAccountAuth(creds);

    // Load your Google Sheet
    await doc.loadInfo();
console.log("loadInfo done");
    // Access a specific sheet within your Google Sheet by index or title
    const sheet = doc.sheetsByIndex[0]; // Change to the desired sheet index

    // Retrieve all rows from the sheet
    const rows = await sheet.getRows();
console.log('Query parameters:', req.query);





/*
    // Define a function to filter rows based on the selected location
    const filterOfficeBearersByLocation = (location) => {
      return rows.filter((row) => {
        //console.log(row._rawData[0]);
        // Modify these conditions to match your Google Sheet columns and location data
        return (
          row._rawData[0] === location.country &&
          (row._rawData[1] === location.state ? true:true)&&
          (row._rawData[2] === location.lokSabha ? true:true)&&
          (row._rawData[3] === location.vidhanSabha ? true:true)&&
          (row._rawData[25] === "TRUE")
        );
      });
    };
*/


const filterOfficeBearersByLocation = (location) => {
  return rows.filter((row) => {
    if (location.vidhanSabha !== "Not Specified") {
      return row._rawData[3] === location.vidhanSabha;
    } else if (location.lokSabha !== "Not Specified") {
      return row._rawData[2] === location.lokSabha && row._rawData[25] === "LOKSABHA";
    } else if (location.state !== "Not Specified") {
      return row._rawData[1] === location.state && row._rawData[25] === "STATE";
    } else {
      return row._rawData[0] === location.country && row._rawData[25] === "TRUE";
    }
  });
};






    // Parse the selected location from the query parameters
    const { country, state, lokSabha, vidhanSabha } = req.query;

    console.log('Country:', country);
    console.log('State:', state);
    console.log('Lok Sabha:', lokSabha);
    console.log('Vidhan Sabha:', vidhanSabha);


    const selectedLocation = {
      country,
      state,
      lokSabha,
      vidhanSabha,
    };
console.log(selectedLocation);
    // Filter office bearers based on the selected location
    const filteredOfficeBearers = filterOfficeBearersByLocation(selectedLocation);

    console.log("FilteredOfficeBearers:");
console.log(filteredOfficeBearers);
//const officeBearerName = filteredOfficeBearers[0]._rawData[5]; 
    // Respond with the filtered office bearers data




    if (filteredOfficeBearers.length === 0) {
      // If no office bearers found, respond with a custom message or appropriate status code
      res.status(404).json({ message: 'No office bearers found for the selected location' });
    } else {
      // If office bearers found, format the data and send the JSON response
      const officeBearersData = filteredOfficeBearers.map((row) => {
console.log(row._rawData[6]);
        if(row._rawData[6]!==undefined){
          console.log("Executed");
        return {
          officeAddress: row._rawData[4],
          presidentName: row._rawData[5],
          presidentMob: row._rawData[6],
          presidentId: row._rawData[7],
          vpMob: row._rawData[10],
          genSecMob: row._rawData[14],
          itHeadMob: row._rawData[18],
          activeMem1Mob: row._rawData[22],
          activeMem2Mob: row._rawData[26]
          
          // Add other properties you need here
        };
      }
      });
    console.log(officeBearersData[0]);
    if(officeBearersData[0]!==undefined)
      res.status(200).json(officeBearersData);
      res.status(404).json({ message: 'No office bearers found for the selected location' });
    }
  }
  
  catch (error) {
    console.log("Some Error: ")
    console.error('Error:', error);
    res.status(500).json({ message: 'Error querying office bearers' });
  }
}
