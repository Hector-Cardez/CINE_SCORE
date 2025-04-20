import React, { useEffect, useState } from "react";
import "./styles/StylesPopularMovies.css";
import MoviesList from "./MovieList";

const AllMovies = () => {
  const [movies, setMovies] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const res = await fetch("http://localhost:8000/api/movies/all");
        if (!res.ok) {
          throw new Error(`HTTP error! Status: ${res.status}`);
        }
        const data = await res.json();
        setMovies(data.uniqueMovies || []);
      } catch (error) {
        console.error("Error fetching all movies:", error);
        setError(`Error: ${error.message}`);
      }
    };

    fetchMovies();
  }, []);

  if (error) {
    return <div>Error loading all movies: {error}</div>;
  }

  if (movies.length === 0) {
    return <div>No movies found.</div>;
  }

  return <MoviesList movies={movies} />;
};

export default AllMovies;
