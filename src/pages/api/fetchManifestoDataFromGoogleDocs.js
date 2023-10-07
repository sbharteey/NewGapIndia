import { google } from 'googleapis';
import { JWT } from 'google-auth-library';



// Function to fetch content from Google Docs
async function fetchManifestoDataFromGoogleDocs() {
  console.log("inside fetchManifestoDataFromGoogleDocs");
    // Load your Google Docs API credentials from the .env.local file
  const creds = require(`${process.env.GOOGLE_APPLICATION_CREDENTIALS}`);

  // Initialize the Google Docs API
  const serviceAccountAuth = new JWT({
    email: process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL,
    key: process.env.GOOGLE_PRIVATE_KEY.split(String.raw`\n`).join('\n'),
    scopes: ['https://www.googleapis.com/auth/documents.readonly'], // Specify the appropriate scope for reading Google Docs
  });

  const documentId = '12q1A8rL-Xtbp9CNfnfgbEVZmnL9c15n2R1CKEz1KDPs'; // Replace with your actual Google Docs document ID

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

module.exports = { fetchManifestoDataFromGoogleDocs };




