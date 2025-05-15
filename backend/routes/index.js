// routes/index.js
import express from 'express';
import { registerUser, loginUser } from '../controllers/userController.js';
import { createComment, getCommentsByMovieId } from '../controllers/commentController.js';
import { 
  filterMovies, 
  listAvailableYears, 
  listAvailableGenres, 
  listAvailableCountries, 
  listAvailableLanguages, 
  fetchMovieDetails 
} from '../controllers/movieController.js';
import { authenticateToken } from '../middlewares/authMiddleware.js';

const router = express.Router();

// User authentication routes
router.post('/register', registerUser);
router.post('/login', loginUser);

// Comment routes (authenticated)
router.post('/comments', authenticateToken, createComment);
router.get('/comments/:id', getCommentsByMovieId);

// Movie routes
router.get('/movies', filterMovies);
router.get('/movies/years', listAvailableYears);
router.get('/movies/genres', listAvailableGenres);
router.get('/movies/countries', listAvailableCountries);
router.get('/movies/languages', listAvailableLanguages);
router.get('/movies/:id', fetchMovieDetails);

export default router;
