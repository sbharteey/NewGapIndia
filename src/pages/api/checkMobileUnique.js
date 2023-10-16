// pages/api/checkMobileUnique.js
import { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(req, res) {
  if (req.method === 'GET') {
    const { mobile } = req.query;
    const isUnique = true;
    res.status(200).json({ isUnique });
  }
  else {
    res.status(405).end();
  }
}
