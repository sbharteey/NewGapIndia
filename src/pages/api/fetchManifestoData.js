import { fetchManifestoDataFromGoogleDocs } from './fetchManifestoDataFromGoogleDocs';

export default async function handler(req, res) {
  try {
    const data = await fetchManifestoDataFromGoogleDocs();
    res.status(200).json(data);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching vision data from Google Docs' });
  }
}
