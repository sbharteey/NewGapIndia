// src/models/Membership.js
import mongoose from 'mongoose';

let Membership;

try {
  Membership = mongoose.model('Membership');
} catch (error) {
  // If the model doesn't exist, create it
  const membershipSchema = new mongoose.Schema({
    gapId: { type: String, unique: true }, // Ensure uniqueness for GAP ID
    name: String,
    mobile: { type: String, unique: true }, // Ensure uniqueness for mobile numbers
    country: String,
    state: String,
    lokSabha: String,
    vidhanSabha: String,
    voterId: String,
    photo: String, // Store the photo in Base64 format
  });

  Membership = mongoose.model('Membership', membershipSchema);
}

export default Membership;