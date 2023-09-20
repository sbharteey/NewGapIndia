// pages/api/checkMobileUnique.js
import { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(req, res) {
  if (req.method === 'GET') {
    const { mobile } = req.query;

    // Implement your logic to check the database for the uniqueness of the mobile number.
    // Example: You can query your database and check if the mobile number already exists.

    const isUnique = true; // Replace with your actual logic.

    res.status(200).json({ isUnique });
  } else {
    res.status(405).end(); // Method not allowed
  }
}
