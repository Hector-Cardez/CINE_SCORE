import React, { useEffect, useState } from "react";
import "./styles/StylesPopularMovies.css";
import MoviesList from "./MovieList";

const TopRatedMovies = () => {
  const [movies, setMovies] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch("http://localhost:8000/api/movies/top-rated")
      .then((res) => {
        if (!res.ok) {
          throw new Error(`HTTP error! Status: ${res.status}`);
        }
        return res.json();
      })
      .then((data) => {
        setMovies(data.results || []);
      })
      .catch((error) => {
        console.error("Error fetching Top Rated movies:", error);
        setError(`Error: ${error.message}`);
      });
  }, []);

  if (error) {
    return <div>Error loading Top Rated movies: {error}</div>;
  }

  return <MoviesList movies={movies} />;
};

export default TopRatedMovies;
