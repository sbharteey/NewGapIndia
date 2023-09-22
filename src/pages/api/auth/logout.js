// src/pages/api/auth/logout.js
import { destroySession } from '../../api/auth/auth';

export default function handler(req, res) {
  destroySession(req);
  res.status(200).json({ message: 'Logged out successfully' });
}
