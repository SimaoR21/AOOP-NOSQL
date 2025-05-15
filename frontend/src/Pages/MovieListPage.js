// src/pages/MovieListPage.js
import React, { useEffect, useState, useCallback } from 'react';
import { Link } from 'react-router-dom';

function MovieListPage() {
  const [movies, setMovies] = useState([]);
  const [filters, setFilters] = useState({
    title: '',
    genres: '',
    year: '',
    countries: '',
    language: '',
  });

  const fetchMovies = useCallback(async () => {
    const params = new URLSearchParams();

    Object.entries(filters).forEach(([key, val]) => {
      if (val) params.append(key, val);
    });

    try {
      const res = await fetch(`${process.env.REACT_APP_API_URL}/api/movies?` + params.toString());
      const data = await res.json();
      setMovies(data);
    } catch (error) {
      console.error('Failed to fetch movies:', error);
    }
  }, [filters]);

  useEffect(() => {
    fetchMovies();
  }, [fetchMovies]);

  const handleFilterChange = e => {
    setFilters(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleFilterSubmit = e => {
    e.preventDefault();
    fetchMovies();
  };

  return (
    <div style={{ maxWidth: 900, margin: '30px auto', fontFamily: 'Arial, sans-serif' }}>
      <h2 style={{ textAlign: 'center', marginBottom: 20, color: '#333' }}>Movies</h2>

      <form 
        onSubmit={handleFilterSubmit} 
        style={{ 
          display: 'flex', 
          flexWrap: 'wrap', 
          gap: 12, 
          marginBottom: 30, 
          justifyContent: 'center' 
        }}
        aria-label="Movie filters"
      >
        <input
          name="title"
          placeholder="Title"
          value={filters.title}
          onChange={handleFilterChange}
          style={{ flex: '1 1 150px', padding: 8, borderRadius: 4, border: '1px solid #ccc' }}
          aria-label="Filter by title"
        />
        <input
          name="genres"
          placeholder="Genres (comma separated)"
          value={filters.genres}
          onChange={handleFilterChange}
          style={{ flex: '1 1 150px', padding: 8, borderRadius: 4, border: '1px solid #ccc' }}
          aria-label="Filter by genres"
        />
        <input
          name="year"
          type="number"
          placeholder="Year"
          value={filters.year}
          onChange={handleFilterChange}
          style={{ flex: '1 1 100px', padding: 8, borderRadius: 4, border: '1px solid #ccc' }}
          aria-label="Filter by year"
        />
        <input
          name="countries"
          placeholder="Countries (comma separated)"
          value={filters.countries}
          onChange={handleFilterChange}
          style={{ flex: '1 1 150px', padding: 8, borderRadius: 4, border: '1px solid #ccc' }}
          aria-label="Filter by countries"
        />
        <input
          name="language"
          placeholder="Language"
          value={filters.language}
          onChange={handleFilterChange}
          style={{ flex: '1 1 150px', padding: 8, borderRadius: 4, border: '1px solid #ccc' }}
          aria-label="Filter by language"
        />
        <button
          type="submit"
          style={{
            padding: '10px 20px',
            backgroundColor: '#007BFF',
            border: 'none',
            color: 'white',
            borderRadius: 4,
            cursor: 'pointer',
            flex: '0 0 auto',
            fontWeight: 'bold',
            transition: 'background-color 0.3s ease',
          }}
          onMouseEnter={e => e.currentTarget.style.backgroundColor = '#0056b3'}
          onMouseLeave={e => e.currentTarget.style.backgroundColor = '#007BFF'}
          aria-label="Search movies"
        >
          Search
        </button>
      </form>

      {movies.length === 0 ? (
        <p style={{ textAlign: 'center', color: '#777' }}>No movies found</p>
      ) : (
        <ul style={{ listStyleType: 'none', paddingLeft: 0 }}>
          {movies.map(movie => (
            <li
              key={movie._id}
              style={{
                backgroundColor: '#f9f9f9',
                marginBottom: 12,
                padding: 15,
                borderRadius: 6,
                boxShadow: '0 2px 5px rgba(0,0,0,0.1)',
                transition: 'transform 0.2s ease',
              }}
              onMouseEnter={e => e.currentTarget.style.transform = 'scale(1.02)'}
              onMouseLeave={e => e.currentTarget.style.transform = 'scale(1)'}
            >
              <Link
                to={`/movies/${movie._id}`}
                style={{ textDecoration: 'none', color: '#007BFF', fontWeight: '600', fontSize: '1.1rem' }}
              >
                {movie.title} <span style={{ color: '#555' }}>({movie.year})</span>
              </Link>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default MovieListPage;
