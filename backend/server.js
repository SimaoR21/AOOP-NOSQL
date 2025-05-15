import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import connectDB from './db.js';
import routes from './routes/index.js';

dotenv.config();
const app = express();
const PORT = process.env.PORT || 4040;
console.log(process.env.CLIENT_URL)

// Middlewares
app.use(cors({
  origin: process.env.CLIENT_URL || 'http://localhost:3001',
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// DB
connectDB();

// API routes
app.use('/api', routes);


app.listen(PORT, () => {
  console.log(`Servidor rodando em http://localhost:${PORT}`);
});

