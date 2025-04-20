import React, { useEffect, useState } from "react";
import "./styles/StylesPopularMovies.css";
import MoviesList from "./MovieList";

const NowPlayingMovies = () => {
  const [movies, setMovies] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch("http://localhost:8000/api/movies/now-playing")
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
        console.error("Error fetching Now Playing movies:", error);
        setError(`Error: ${error.message}`);
      });
  }, []);

  if (error) {
    return <div>Error loading Now Playing movies: {error}</div>;
  }

  return <MoviesList movies={movies} />;
};

export default NowPlayingMovies;
