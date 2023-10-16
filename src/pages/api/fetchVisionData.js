import { fetchVisionDataFromGoogleDocs } from './fetchVisionDataFromGoogleDocs';

export default async function handler(req, res) {
  try {
    const data = await fetchVisionDataFromGoogleDocs();
    res.status(200).json(data);
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ message: 'Error fetching vision data from Google Docs' });
  }
}