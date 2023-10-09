// src/pages/api/fetchIndexDataFromGoogleSlide.js
import { google } from 'googleapis';
import { JWT } from 'google-auth-library';

// Function to fetch content from Google Docs
async function fetchIndexDataFromGoogleSlide() {
  console.log("inside fetchIndexDataFromGoogleSlide");
    // Load your Google Docs API credentials from the .env.local file
  const creds = require(`${process.env.GOOGLE_APPLICATION_CREDENTIALS}`);

  // Initialize the Google Docs API
  const serviceAccountAuth = new JWT({
    email: process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL,
    key: process.env.GOOGLE_PRIVATE_KEY.split(String.raw`\n`).join('\n'),
    scopes: ['https://www.googleapis.com/auth/documents.readonly'], // Specify the appropriate scope for reading Google Docs
  });

  const documentId = process.env.SLIDE_ID;

  // Create a Google Docs API instance
  const docs = google.slides({ version: 'v1', auth: serviceAccountAuth });

  
  try {
    // Get the content of the Google Docs document
    const response = await docs.presentations.get({ presentationId: documentId });
    const { title, slides } = response.data;

    

      return {
        title,
        slides,
      };
   
  } catch (error) {
    console.error('Error fetching Google Slides content:', error);
    throw error;
  }
}

module.exports = { fetchIndexDataFromGoogleSlide };




