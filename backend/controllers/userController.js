import User from '../models/user.js';
import bcrypt from 'bcrypt';
import { generateToken } from '../jwt.js';

// Register a new user
export async function registerUser(req, res) {
  const { name, email, password } = req.body;

  try {
    const emailExists = await User.findOne({ email });
    if (emailExists) {
      return res.status(400).json({ message: 'Email already registered' });
    }

    const encryptedPassword = await bcrypt.hash(password, 10);
    const user = new User({
      name,
      email,
      password: encryptedPassword
    });

    await user.save();
    return res.status(201).json({ message: 'User registered successfully' });
  } catch (error) {
    return res.status(500).json({ message: 'Registration failed', error: error.message });
  }
}

// Authenticate user and return token
export async function loginUser(req, res) {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    const token = generateToken(user);
    return res.status(200).json({ token });
  } catch (error) {
    return res.status(500).json({ message: 'Login failed', error: error.message });
  }
}
