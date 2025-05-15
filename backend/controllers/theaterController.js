// controllers/theaterController.js
import Theater from '../models/theater.js';

// Create a new theater
export async function createTheater(req, res) {
  const { name, location } = req.body;

  try {
    const theater = new Theater({ name, location });
    await theater.save();
    return res.status(201).json(theater);
  } catch (error) {
    return res.status(500).json({ message: 'Failed to create theater', error: error.message });
  }
}

// Retrieve all theaters
export async function listTheaters(req, res) {
  try {
    const theaterList = await Theater.find();
    return res.status(200).json(theaterList);
  } catch (error) {
    return res.status(500).json({ message: 'Failed to fetch theaters', error: error.message });
  }
}
