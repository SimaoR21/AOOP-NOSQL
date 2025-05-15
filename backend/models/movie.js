// models/movie.js
import mongoose from 'mongoose';

const MovieSchema = new mongoose.Schema({
  title: { type: String, required: true },
  plotShort: String,
  plotFull: String,
  genres: [{ type: String }],
  cast: [{ type: String }],
  directors: [{ type: String }],
  writers: [{ type: String }],
  year: { type: Number },
  releasedAt: { type: Date },
  rated: { type: String },
  runtimeMinutes: { type: Number },
  posterUrl: { type: String },
  countries: [{ type: String }],
  languages: [{ type: String }],
  imdb: {
    rating: { type: Number },
    votes: { type: Number },
    id: { type: Number }
  },
  rottenTomatoes: {
    viewer: {
      rating: { type: Number },
      numReviews: { type: Number }
    },
    critic: {
      rating: { type: Number },
      numReviews: { type: Number }
    },
    lastUpdated: { type: Date }
  },
  plotEmbedding: {
    type: [Number],
    required: false
  },
  commentCount: { type: Number }
}, {
  versionKey: false
});

export default mongoose.model('Movie', MovieSchema);
