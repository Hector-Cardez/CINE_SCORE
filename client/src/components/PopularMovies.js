import React, { useEffect, useState } from "react";
import "./styles/StylesPopularMovies.css";
import MoviesList from "./MovieList";

const PopularMovies = () => {
  const [movies, setMovies] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch("http://localhost:8000/api/movies/popular")
      .then((res) => {
        if (!res.ok) {
          throw new Error(`HTTP error! Status: ${res.status}`);
        }
        return res.json();
      })
      .then((data) => {
        // Handle case where data.results might be undefined
        setMovies(data.results || []);
      })
      .catch((error) => {
        console.error("Error fetching popular movies:", error);
        setError(`Error: ${error.message}`);
      });
  }, []);

  if (error) {
    return <div>Error loading popular movies: {error}</div>;
  }

  return <MoviesList movies={movies} />;
};

export default PopularMovies;
