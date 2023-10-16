// utils/database.js
import mongoose from 'mongoose';
import Membership from '../src/models/Membership'; // Import the Membership model

let isConnected = false;

const connectDatabase = async () => {
  if (isConnected) {
    return;
  }

  try {
    const uri = process.env.MONGODB_URI;
    await mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true });
    isConnected = true;
    console.log('Connected to MongoDB');
  } catch (error) {
    console.error('Error connecting to MongoDB:', error);
    throw error;
  }
};

export const getMembershipDataByMobile = async (mobile) => {

  try {
    await connectDatabase();
    const membershipData = await Membership.findOne({ mobile });
    console.log("membershipData");
    console.log("completed getMembershipDataByMobile");
    return membershipData;
  } catch (error) {
    // console.log(error);
    console.error('Error fetching membership data by mobile:', error);
    return null;
  }
};

export default connectDatabase;

