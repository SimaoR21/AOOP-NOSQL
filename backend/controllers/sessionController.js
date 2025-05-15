// controllers/sessionController.js
import Session from '../models/session.js';
import Movie from '../models/movie.js';
import Theater from '../models/theater.js';

// Create a new movie session
export async function createSession(req, res) {
  const { movieId, theaterId, date, time } = req.body;

  try {
    const [movieExists, theaterExists] = await Promise.all([
      Movie.findById(movieId),
      Theater.findById(theaterId)
    ]);

    if (!movieExists || !theaterExists) {
      return res.status(404).json({ message: 'Movie or theater not found' });
    }

    const session = new Session({
      movieId,
      theaterId,
      date,
      time
    });

    await session.save();
    return res.status(201).json(session);
  } catch (error) {
    return res.status(500).json({ message: 'Failed to create session', error: error.message });
  }
}

// Retrieve all sessions for a given movie
export async function listSessionsByMovie(req, res) {
  const { movieId } = req.params;

  try {
    const sessionList = await Session.find({ movieId }).populate('theaterId', 'name location');
    return res.status(200).json(sessionList);
  } catch (error) {
    return res.status(500).json({ message: 'Failed to retrieve sessions', error: error.message });
  }
}
