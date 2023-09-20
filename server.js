// server.js (your server file)
const express = require('express');
const passport = require('passport');
const session = require('express-session');

const app = express();

// Set up Express middleware for session management
app.use(
  session({
    secret: 'your-secret-key', // Replace with a strong secret
    resave: false,
    saveUninitialized: false,
  })
);

// Initialize Passport.js
app.use(passport.initialize());
app.use(passport.session());

// Define your routes and API endpoints here

// Example route for testing authentication
app.get('/profile', (req, res) => {
  if (req.isAuthenticated()) {
    // If the user is authenticated, render their profile
    res.send('Welcome to your profile!');
  } else {
    // If not authenticated, redirect to login
    res.redirect('/login');
  }
});

// Example login route
app.post('/login', passport.authenticate('local', {
  successRedirect: '/profile',
  failureRedirect: '/login',
}));

// Example logout route
app.get('/logout', (req, res) => {
  req.logout();
  res.redirect('/');
});

// Start your server
app.listen(3000, () => {
  console.log('Server is running on port 3000');
});

