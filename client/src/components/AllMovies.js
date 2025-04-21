import React, { useEffect, useState } from "react";
import "./styles/StylesPopularMovies.css";
import MoviesList from "./MovieList";

const AllMovies = () => {
  const [movies, setMovies] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const res = await fetch(
          `${process.env.REACT_APP_API_URL}/api/movies/all`
        );

        // Log the raw response to see the content before parsing
        const text = await res.text();
        console.log("Raw response:", text);

        // If the response is not okay (status is not in the 200-299 range), throw an error
        if (!res.ok) {
          throw new Error(`HTTP error! Status: ${res.status}`);
        }

        // Try to parse the response as JSON if it looks like JSON
        try {
          const data = JSON.parse(text);
          setMovies(data.uniqueMovies || []);
        } catch (parseError) {
          throw new Error("Error parsing JSON response");
        }
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
