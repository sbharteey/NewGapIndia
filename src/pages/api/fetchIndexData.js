// src/pages/api/fetchIndexData.js
import { fetchIndexDataFromGoogleSlide } from './fetchIndexDataFromGoogleSlide';

export default async function handler(req, res) {
  try {
    const data = await fetchIndexDataFromGoogleSlide();
    res.status(200).json(data);
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ message: 'Error fetching Index data from Google Slide' });
  }
}
