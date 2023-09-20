// pages/api/submitForm.js
export default async function handler(req, res) {
    if (req.method === 'POST') {
      try {
        // Parse the incoming JSON data from the request body
        const formData = JSON.parse(req.body);
  
        // Handle the form submission, e.g., save data to a database
        // For now, let's log the received form data
        console.log('Received form data:', formData);
  
        // Send a response back to the client
        res.status(200).json({ message: 'Form submitted successfully' });
      } catch (error) {
        console.error('Error handling form submission:', error);
        res.status(500).json({ error: 'Internal server error' });
      }
    } else {
      res.status(405).end(); // Method Not Allowed
    }
  }
  