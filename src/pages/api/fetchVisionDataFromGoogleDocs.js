import { google } from 'googleapis';
import { JWT } from 'google-auth-library';



// Function to fetch content from Google Docs
async function fetchVisionDataFromGoogleDocs() {
  console.log("inside fetchVisionDataFromGoogleDocs");
    // Load your Google Docs API credentials from the .env.local file
  const creds = require(`${process.env.GOOGLE_APPLICATION_CREDENTIALS}`);

  // Initialize the Google Docs API
  const serviceAccountAuth = new JWT({
    email: process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL,
    key: process.env.GOOGLE_PRIVATE_KEY.split(String.raw`\n`).join('\n'),
    scopes: ['https://www.googleapis.com/auth/documents.readonly'], // Specify the appropriate scope for reading Google Docs
  });

  const documentId = process.env.DOCS_ID_VISION; // Replace with your actual Google Docs document ID

  // Create a Google Docs API instance
  const docs = google.docs({ version: 'v1', auth: serviceAccountAuth });

  
  try {
    // Get the content of the Google Docs document
    const response = await docs.documents.get({ documentId });
    const { title, body } = response.data;

    // Check if the 'body' and 'content' properties exist
    if (body && body.content) {
      // Extract the content from the document body
      const content = body.content
        .map((item) => item.paragraph?.elements[0]?.textRun?.content || '') // Use optional chaining to handle possible undefined values
        .join('\n');

      return {
        title,
        content,
      };
    } else {
      console.error('Error fetching Google Docs content: Invalid response structure');
      throw new Error('Invalid response structure');
    }
  } catch (error) {
    console.error('Error fetching Google Docs content:', error);
    throw error;
  }
}

module.exports = { fetchVisionDataFromGoogleDocs };




