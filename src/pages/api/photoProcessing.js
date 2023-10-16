// src/pages/api/photoProcessing.js
import { NextApiRequest, NextApiResponse } from 'next';
import multer from 'multer';
import sharp from 'sharp';

// Set up Multer for file uploads
const upload = multer({ dest: 'uploads/' }); // Define the upload directory

export const config = {
  api: {
    bodyParser: false, // Disable JSON body parsing
  },
};

const processPhoto = (req, res) => {
  if (req.method === 'POST') {
    try {
      // Use Multer to process the uploaded image
      upload.single('photo')(req, res, (err) => {
        if (err) {
          console.error('Error uploading file:', err);
          return res.status(500).json({ error: 'Error uploading file' });
        }

        // Resize and compress the image using Sharp
        sharp(req.file.path)
          .resize({ width: 200 }) // Adjust the dimensions as needed
          .toFile(`uploads/processed_${req.file.filename}`, (error) => {
            if (error) {
              return res.status(500).json({ error: 'Error processing image' });
            }

            // You can save the processed image path in your database
            const processedImagePath = `uploads/processed_${req.file.filename}`;
            // Now, you can do whatever you want with the processed image

            // Send a success response
            return res.status(200).json({ message: 'Image processed successfully', imagePath: processedImagePath });
          });
      });
    } catch (error) {
      res.status(500).json({ error: 'Error processing image' });
    }
  } else {
    res.status(405).end();
  }
};

export default processPhoto;

