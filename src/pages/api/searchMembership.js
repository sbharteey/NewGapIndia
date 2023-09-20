// src/pages/api/searchMembership.js
import { getMembershipDataByMobile } from '../../../utils/database';

export default async function handler(req, res) {
  const { mobile } = req.query;

  let membershipData;

  if (mobile) {
    membershipData = await getMembershipDataByMobile(mobile);
  }

  if (!membershipData) {
    return res.status(404).json({ error: 'Membership not found' });
  }

  return res.status(200).json(membershipData);
}
