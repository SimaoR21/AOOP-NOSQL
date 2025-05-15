// models/comment.js
import mongoose from 'mongoose';

const CommentSchema = new mongoose.Schema({
  authorName: { type: String, required: true },
  authorEmail: { type: String, required: true },
  movieId: { type: mongoose.Schema.Types.ObjectId, ref: 'Movie', required: true },
  content: { type: String, required: true },
  postedAt: { type: Date, default: Date.now }
}, {
  versionKey: false // remove __v
});

export default mongoose.model('Comment', CommentSchema);
