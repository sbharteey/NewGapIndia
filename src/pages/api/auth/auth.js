// src/pages/api/auth/auth.js

import passport from 'passport'; // Assuming you've set up Passport.js
import User from '../../../models/User'; // Import your User model or user database functions here

// Initialize Passport.js
passport.initialize();

// Assuming you are using Passport.js with sessions
export function destroySession(req, res) {
  req.logout();
  res.status(200).json({ message: 'Logged out successfully.' });
}

export async function createUser(req, res) {
  try {
    const { username, password, ...otherUserData } = req.body;

    // Add your database logic to create a new user
    // Example: Create a new user document in MongoDB
    const newUser = new User({
      username,
      password, // Make sure to hash the password before storing it.
      ...otherUserData,
    });

    await newUser.save();

    res.status(201).json({ message: 'User created successfully.' });
  } catch (error) {
    res.status(500).json({ error: 'Failed to create user.' });
  }
}

// Export Passport.js for use in your routes or middleware
export { passport };

}
