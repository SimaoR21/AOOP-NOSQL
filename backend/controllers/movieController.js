// controllers/movieController.js
import Movie from '../models/movie.js';
import Theater from '../models/theater.js';
import Session from '../models/session.js';

// Search movies based on filters
export async function filterMovies(req, res) {
  const { title, genres, year, countries, language } = req.query;

  const filters = {};

  if (title) {
    filters.title = new RegExp(title, 'i'); // case-insensitive search
  }

  if (genres) {
    const genreArray = genres.split(',').map((g) => g.trim());
    filters.genres = { $in: genreArray };
  }

  if (year) {
    const parsedYear = parseInt(year);
    if (!isNaN(parsedYear)) filters.year = parsedYear;
  }

  if (countries) {
    const countryArray = countries.split(',').map((c) => c.trim());
    filters.countries = { $in: countryArray };
  }

  if (language) {
    filters.language = language;
  }

  try {
    const results = await Movie.find(filters);
    return res.status(200).json(results);
  } catch (error) {
    return res.status(500).json({ message: 'Failed to search movies', error: error.message });
  }
}

// Get distinct years
export async function listAvailableYears(req, res) {
  try {
    const yearsList = await Movie.distinct('year');
    return res.status(200).json(yearsList);
  } catch (error) {
    return res.status(500).json({ message: 'Failed to retrieve years', error: error.message });
  }
}

// Get distinct genres
export async function listAvailableGenres(req, res) {
  try {
    const genreList = await Movie.distinct('genres');
    return res.status(200).json(genreList);
  } catch (error) {
    return res.status(500).json({ message: 'Failed to retrieve genres', error: error.message });
  }
}

// Get distinct countries
export async function listAvailableCountries(req, res) {
  try {
    const countryList = await Movie.distinct('countries');
    return res.status(200).json(countryList);
  } catch (error) {
    return res.status(500).json({ message: 'Failed to retrieve countries', error: error.message });
  }
}

// Get distinct languages
export async function listAvailableLanguages(req, res) {
  try {
    const aggregatedLanguages = await Movie.aggregate([
      { $unwind: '$languages' },
      { $group: { _id: '$languages' } },
      { $sort: { _id: 1 } }
    ]);

    const languages = aggregatedLanguages.map(entry => entry._id);
    return res.status(200).json(languages);
  } catch (error) {
    return res.status(500).json({ message: 'Failed to retrieve languages', error: error.message });
  }
}

// Get movie details by ID
export async function fetchMovieDetails(req, res) {
  const { id: movieId } = req.params;

  try {
    const movie = await Movie.findById(movieId);
    if (!movie) {
      return res.status(404).json({ message: 'Movie not found' });
    }

    return res.status(200).json(movie);
  } catch (error) {
    return res.status(500).json({ message: 'Failed to fetch movie details', error: error.message });
  }
}
