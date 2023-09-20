const { google } = require('googleapis');

// Load the credentials from your service account key file
const credentials = require('./secrets.json');

// Initialize the Google Drive API
const drive = google.drive({
  version: 'v3',
  auth: new google.auth.GoogleAuth({
    credentials,
    scopes: ['https://www.googleapis.com/auth/drive'],
  }),
});

// Example: Upload a file from the 'Office Birr' folder in Google Drive
async function uploadFile() {
  const folderId = '1j1-il4qcpi5XK8-u-3BSKQ4baU58XYf4'; // Replace with the folder ID of 'Office Birr'

  const res = await drive.files.create({
    requestBody: {
      name: 'myphoto.jpg', // Change the file name if needed
      parents: [folderId], // Set the parent folder
    },
    media: {
      mimeType: 'image/jpeg', // Specify the MIME type for an image file
      body: 'myphoto.jpg', // Replace 'myphoto.jpg' with the actual photo file path
    },
  });

  console.log('File ID:', res.data.id);
}

// Call the function to upload the file
uploadFile();
