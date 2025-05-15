// middlewares/authMiddleware.js
import jwtConfig from '../jwt.js';

export const authenticateToken = (req, res, next) => {
  const authHeader = req.headers.authorization;
  const token = authHeader?.split(' ')[1]; // Expecting "Bearer <token>"

  // Debug logs (optional)
  // console.log('Received token:', token);

  if (!token) {
    return res.status(401).json({ message: 'Access token missing' });
  }

  try {
    const decodedUser = jwtConfig.verifyToken(token);
    req.user = decodedUser;

    // Debug log (optional)
    // console.log('Verified user:', decodedUser);

    next();
  } catch (err) {
    // console.error('Token verification error:', err);
    return res.status(401).json({ message: 'Invalid access token' });
  }
};
