// UpcomingMovies.js
import React, { useEffect, useState } from "react";
import "./styles/StylesPopularMovies.css";
import MoviesList from "./MovieList";

const UpcomingMovies = () => {
  const [movies, setMovies] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch("http://localhost:8000/api/movies/upcoming")
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
        console.error("Error fetching upcoming-movies movies:", error);
        setError(`Error: ${error.message}`);
      });
  }, []);

  if (error) {
    return <div>Error loading Upcoming Movies: {error}</div>;
  }

  // Use the new MoviesList component here
  return <MoviesList movies={movies} />;
};

export default UpcomingMovies;
