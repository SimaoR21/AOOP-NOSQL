// src/pages/MovieDetailsPage.js
import React, { useEffect, useState, useContext } from 'react';
import { useParams } from 'react-router-dom';
import { AuthContext } from '../App';

function MovieDetailsPage() {
  const { id } = useParams();
  const { token } = useContext(AuthContext);

  const [movie, setMovie] = useState(null);
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchMovie = async () => {
      const res = await fetch(`${process.env.REACT_APP_API_URL}/api/movies/${id}`);
      if (res.ok) {
        setMovie(await res.json());
      }
    };

    const fetchComments = async () => {
      const res = await fetch(`${process.env.REACT_APP_API_URL}/api/comments/${id}`);
      if (res.ok) {
        setComments(await res.json());
      }
    };

    fetchMovie();
    fetchComments();
  }, [id]);

  const handleCommentSubmit = async e => {
    e.preventDefault();
    setError('');

    if (!token) {
      setError('You must be logged in to comment');
      return;
    }

    try {
      const res = await fetch(`${process.env.REACT_APP_API_URL}/api/comments`, {
        method: 'POST',
        headers: { 
          'Content-Type': 'application/json',
          Authorization: 'Bearer ' + token,
        },
        body: JSON.stringify({
          movieId: id,
          content: newComment,
        }),
      });

      if (!res.ok) {
        const data = await res.json();
        setError(data.message || 'Failed to add comment');
        return;
      }

      setNewComment('');
      // Re-fetch comments after successful submission
      const commentsRes = await fetch(`${process.env.REACT_APP_API_URL}/api/comments/${id}`);
      if (commentsRes.ok) {
        setComments(await commentsRes.json());
      }
    } catch {
      setError('Network error');
    }
  };

  if (!movie) return <p style={{ textAlign: 'center', marginTop: 40 }}>Loading...</p>;

  return (
    <div style={{ maxWidth: 800, margin: '30px auto', fontFamily: 'Arial, sans-serif', padding: '0 15px' }}>
      <h2 style={{ textAlign: 'center', marginBottom: 10, color: '#222' }}>
        {movie.title} <span style={{ color: '#555' }}>({movie.year})</span>
      </h2>
      <p style={{ lineHeight: 1.6, color: '#444', marginBottom: 30 }}>{movie.plot}</p>

      <section>
        <h3 style={{ borderBottom: '2px solid #007BFF', paddingBottom: 6, marginBottom: 15, color: '#007BFF' }}>
          Comments
        </h3>

        {comments.length === 0 ? (
          <p style={{ fontStyle: 'italic', color: '#777' }}>No comments yet</p>
        ) : (
          <ul style={{ listStyleType: 'none', paddingLeft: 0, marginBottom: 30 }}>
            {comments.map(c => (
              <li
                key={c._id}
                style={{
                  backgroundColor: '#f9f9f9',
                  padding: 12,
                  borderRadius: 5,
                  marginBottom: 12,
                  boxShadow: '0 1px 3px rgba(0,0,0,0.1)',
                }}
              >
                <strong style={{ color: '#007BFF' }}>{c.authorName}</strong>: {c.content}{' '}
                <em style={{ color: '#666', fontSize: '0.85rem' }}>
                  ({new Date(c.postedAt).toLocaleString()})
                </em>
              </li>
            ))}
          </ul>
        )}

        {token ? (
          <form onSubmit={handleCommentSubmit} style={{ display: 'flex', flexDirection: 'column' }}>
            <textarea
              placeholder="Add a comment..."
              value={newComment}
              onChange={e => setNewComment(e.target.value)}
              required
              rows={4}
              style={{
                padding: 10,
                fontSize: '1rem',
                borderRadius: 5,
                border: '1px solid #ccc',
                resize: 'vertical',
                marginBottom: 12,
                fontFamily: 'inherit',
              }}
              aria-label="Add a comment"
            />
            <button
              type="submit"
              style={{
                alignSelf: 'flex-start',
                padding: '10px 20px',
                backgroundColor: '#007BFF',
                color: 'white',
                border: 'none',
                borderRadius: 5,
                cursor: 'pointer',
                fontWeight: 'bold',
                transition: 'background-color 0.3s ease',
              }}
              onMouseEnter={e => (e.currentTarget.style.backgroundColor = '#0056b3')}
              onMouseLeave={e => (e.currentTarget.style.backgroundColor = '#007BFF')}
              aria-label="Post comment"
            >
              Post Comment
            </button>
            {error && (
              <p style={{ color: 'red', marginTop: 8, fontWeight: 'bold' }} role="alert">
                {error}
              </p>
            )}
          </form>
        ) : (
          <p style={{ color: '#777', fontStyle: 'italic' }}>You need to login to post comments.</p>
        )}
      </section>
    </div>
  );
}

export default MovieDetailsPage;
