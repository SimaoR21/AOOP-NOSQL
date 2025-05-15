// controllers/commentController.js
import Comment from '../models/comment.js';
import User from '../models/user.js';

export async function createComment(req, res) {
  console.log('Body recebido:', req.body);
  try {
    const { movieId, content } = req.body; // estes nomes devem corresponder ao frontend
    const userId = req.user.userId;

    const user = await User.findById(userId);
    if (!user) return res.status(404).json({ message: 'User not found' });

    const newComment = new Comment({
      authorName: user.name,
      authorEmail: user.email,
      movieId: movieId,
      content: content,
      postedAt: new Date()
    });

    await newComment.save();
    res.status(201).json({ message: 'Comment successfully created', comment: newComment });
  } catch (error) {
    console.error('Erro ao criar comentário:', error);
    res.status(500).json({ message: 'Error creating comment', error: error.message });
  }
}



export async function getCommentsByMovieId(req, res) {
  const movieId = req.params.id;
  console.log('[getCommentsByMovieId] Movie ID:', movieId);

  try {
    const comments = await Comment.find({ movieId: movieId });
    console.log('[getCommentsByMovieId] Comments retrieved:', comments);

    if (comments.length === 0) {
      return res.status(404).json({ message: 'No comments found for this movie' });
    }

    res.json(comments);
  } catch (error) {
    console.error('[getCommentsByMovieId] Error:', error);
    res.status(500).json({ message: 'Failed to retrieve comments', error: error.message });
  }
}
