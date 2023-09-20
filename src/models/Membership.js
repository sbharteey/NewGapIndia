// src/models/Membership.js
import mongoose from 'mongoose';

let Membership;

try {
  Membership = mongoose.model('Membership');
} catch (error) {
  // If the model doesn't exist, create it
  const membershipSchema = new mongoose.Schema({
    uniqueId: String,
    mobile: { type: String, unique: true }, // Ensure uniqueness for mobile numbers
    name: String,
    country: String,
    state: String,
    lokSabha: String,
    vidhanSabha: String,
    voterId: String,
    email: { type: String, unique: true, sparse: true }, // Make email unique and optional
    photo: {
      data: Buffer,
      contentType: String,
    },
  });

  Membership = mongoose.model('Membership', membershipSchema);
}

export default Membership;
