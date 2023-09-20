// src/pages/api/auth/register.js
import passport from 'passport';
import { createUser } from '../../../models/User';

export default function handler(req, res) {
  passport.authenticate('local-register', (err, user, info) => {
    if (err) {
      return res.status(500).json({ error: 'Internal Server Error' });
    }
    if (!user) {
      return res.status(400).json({ error: 'Registration failed' });
    }

    req.login(user, (err) => {
      if (err) {
        return res.status(500).json({ error: 'Internal Server Error' });
      }

      return res.status(201).json({ message: 'Registration successful' });
    });
  })(req, res);
}
