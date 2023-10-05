// pages/api/updateMemberPhoto.js

import connectDatabase from '../../../utils/database';
import Membership from '../../models/Membership';

connectDatabase();

export default async function handler(req, res) {
  if (req.method === 'PATCH') {
    try {
      const { mobile } = req.query; // Get the mobile number from query parameters
      const { photo } = req.body; // Get the new Base64-encoded photo from the request body

      // Search for the member by mobile number
      const member = await Membership.findOne({ mobile });

      if (!member) {
        return res.status(404).json({ error: 'Member not found.' });
      }

      // Update the member's photo with the new Base64-encoded photo if provided
      if (photo) {
        member.photo = photo; // Assuming 'photo' is the field in the database
        await member.save(); // Save the changes to the database
      }

      res.status(200).json({ message: 'Member\'s photo updated successfully.' });
    } catch (error) {
      console.error(error); // Log any errors for debugging
      res.status(500).json({ error: 'Failed to update the member\'s photo.' });
    }
  } else {
    res.status(405).json({ error: 'Method not allowed.' });
  }
}
