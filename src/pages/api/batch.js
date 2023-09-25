// pages/api/batch.js

import connectDatabase from '../../../utils/database';
import Membership from '../../models/Membership';

connectDatabase();

export default async function handler(req, res) {
  // Check if the user is authenticated and has admin privileges.
  // Implement your authentication and authorization logic here.
  if (!userIsAdmin) {
    return res.status(403).json({ error: 'Unauthorized' });
  }

  switch (req.method) {
    case 'GET':
      try {
        const members = await Membership.find({});
        res.status(200).json(members);
      } catch (error) {
        res.status(500).json({ error: 'Failed to fetch membership data.' });
      }
      break;

    case 'POST':
      try {
        const {
          mobile,
          name,
          country,
          state,
          lokSabha,
          vidhanSabha,
          voterId,
        } = req.body;

        // Check if the mobile number is already in the database
        const existingMobile = await Membership.findOne({ mobile });

        if (existingMobile) {
          return res.status(400).json({ error: 'Mobile number already exists.' });
        }

        const newMember = new Membership({
          mobile,
          name,
          country,
          state,
          lokSabha,
          vidhanSabha,
          voterId,
        });

        await newMember.save();
        res.status(201).json({ message: 'Member added successfully.' });
      } catch (error) {
        res.status(500).json({ error: 'Failed to add a new member.' });
      }
      break;

    case 'PUT':
      try {
        // PUT request handling code
        // Similar to what you had for individual member updates
        // You can use the same code here if it suits your needs
      } catch (error) {
        res.status(500).json({ error: 'Failed to update members.' });
      }
      break;

    case 'DELETE':
      try {
        if (req.body && Array.isArray(req.body.itemIds)) {
          const { itemIds } = req.body;

          // Loop through the list of item IDs and delete each item
          for (const itemId of itemIds) {
            const deletedMember = await Membership.findByIdAndDelete(itemId);
            if (!deletedMember) {
              console.error(`Member with ID ${itemId} not found.`);
            } else {
              console.log(`Member with ID ${itemId} deleted successfully.`);
            }
          }

          res.status(200).json({ message: 'Members deleted successfully.' });
        } else {
          res.status(400).json({ error: 'Invalid request body.' });
        }
      } catch (error) {
        res.status(500).json({ error: 'Failed to delete members.' });
      }
      break;

    default:
      res.status(405).json({ error: 'Method not allowed.' });
      break;
  }
}
