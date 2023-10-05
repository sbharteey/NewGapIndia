// src/pages/api/member.js
import connectDatabase from '../../../utils/database';
import Membership from '../../models/Membership';

connectDatabase();

export default async function handler(req, res) {
  if (req.method === 'GET') {
    try {
      const members = await Membership.find({});
      res.status(200).json(members);
    } catch (error) {
      res.status(500).json({ error: 'Failed to fetch membership data.' });
    }
  } else if (req.method === 'POST') {
    try {
      const {
        mobile,
        name,
        country,
        state,
        lokSabha,
        vidhanSabha,
        voterId,
        photo, // Add the Base64-encoded photo
      } = req.body;

      console.log(photo);

      // Generate the unique GAP ID
      const currentYear = new Date().getFullYear();
const currentMonth = (new Date().getMonth() + 1).toString().padStart(2, '0');
//const lastMember = await Membership.findOne({}, {}, { sort: { createdAt: -1 } });
//const lastMember = await Membership.findOne({}, {}, { sort: { createdAt: -1 } }).sort({ createdAt: -1 });
const lastMember = await Membership.findOne({}, {}, { sort: { _id: -1 } });

let sequentialNumber = '00001'; // Default sequential number

if (lastMember) {
  const lastGapId = lastMember.gapId || '';
  const lastYearMonth = lastGapId.substring(9, 15);

  if (lastYearMonth === `${currentYear}${currentMonth}`) {
console.log(lastGapId);
    const lastSequentialNumber = parseInt(lastGapId.substring(15));
    console.log(lastSequentialNumber);
    sequentialNumber = (lastSequentialNumber + 1).toString().padStart(5, '0');
  }
}

const gapId = `GAP ID - ${currentYear}${currentMonth}${sequentialNumber}`;


      // Check if the mobile number is already in the database
      const existingMobile = await Membership.findOne({ mobile });

      if (existingMobile) {
        return res.status(400).json({ error: 'Mobile number already exists.' });
      }

      

console.log(mobile);
console.log(photo);

      
      const newMember = new Membership({
        gapId, // Include the generated GAP ID
        mobile,
        name,
        country,
        state,
        lokSabha,
        vidhanSabha,
        voterId,
        photo, // Include the Base64-encoded photo
      });

      await newMember.save();
      res.status(201).json({ message: 'Member added successfully.' });
    } catch (error) {
      res.status(500).json({ error: 'Failed to add a new member.' });
    }
  } else if (req.method === 'PUT') {
    try {
      // PUT request handling code
      const {
        mobile,
        name,
        country,
        state,
        lokSabha,
        vidhanSabha,
        voterId,
      } = req.body;
      const updatedMember = await Membership.findOneAndUpdate(
        { mobile }, // Update based on mobile (assuming mobile is unique)
        {
          name,
          country,
          state,
          lokSabha,
          vidhanSabha,
          voterId,
        },
        { new: true } // To return the updated document
      );
      if (!updatedMember) {
        return res.status(404).json({ error: 'Member not found.' });
      }
      res.status(200).json({ message: 'Member updated successfully.' });
    } catch (error) {
      res.status(500).json({ error: 'Failed to update a member.' });
    }

  } else if (req.method === 'PATCH') {
    try {
      const { mobile } = req.query; // Get the mobile number from query parameters
      const updatedData = req.body; // Updated member data

      // Search for a member by mobile number and update their data
      const updatedMember = await Membership.findOneAndUpdate(
        { mobile },
        updatedData,
        { new: true } // To return the updated document
      );

      if (!updatedMember) {
        return res.status(404).json({ error: 'Member not found.' });
      }

      res.status(200).json({ message: 'Member updated successfully.' });
    } catch (error) {
      res.status(500).json({ error: 'Failed to update a member.' });
    }


  } else if (req.method === 'DELETE') {
    try {
      const { mobile } = req.query; // Get the mobile number from query parameters

      // Delete the member with the specified mobile number
      const deletedMember = await Membership.findOneAndDelete({ mobile });

      if (!deletedMember) {
        return res.status(404).json({ error: 'Member not found.' });
      }

      res.status(200).json({ message: 'Member deleted successfully.' });
    } catch (error) {
      res.status(500).json({ error: 'Failed to delete a member.' });
    }
  } else {
    res.status(405).json({ error: 'Method not allowed.' });
  }
}
