import React, { useState, useEffect } from "react";
import "./styles/StylesPopularMovies.css";
import { useNavigate } from "react-router-dom";

const SearchBar = () => {
  const [searchInput, setSearchInput] = useState(""); // State for the search input
  const [filteredMovies, setFilteredMovies] = useState([]); // State for filtered movies
  const [movies, setMovies] = useState([]); // State for all movies

  useEffect(() => {
    // Fetch movies when the component mounts
    const fetchMovies = async () => {
      try {
        const res = await fetch("http://localhost:8000/api/movies/all");
        if (!res.ok) {
          throw new Error(`HTTP error! Status: ${res.status}`);
        }
        const data = await res.json();
        setMovies(data.uniqueMovies || []); // Store all movies
      } catch (error) {
        console.error("Error fetching all movies:", error);
      }
    };

    fetchMovies();
  }, []);

  // Update filtered movies based on the search input
  useEffect(() => {
    if (searchInput === "") {
      setFilteredMovies([]); // Clear the list if the input is empty
    } else {
      const filtered = movies.filter((movie) =>
        movie.title.toLowerCase().includes(searchInput.toLowerCase())
      );
      setFilteredMovies(filtered);
    }
  }, [searchInput, movies]);

  /* Helpers */

  const navigate = useNavigate();

  const handleMovieClick = (movieId) => {
    navigate(`/movies/${movieId}`); // Navigate to the selected movie page
    setSearchInput(""); // Clear the search input to refresh the search bar
  };

  return (
    <div>
      <input
        id="movie-search-input"
        className="search-input"
        type="text"
        placeholder="Search for a movie..."
        value={searchInput}
        onChange={(e) => setSearchInput(e.target.value)} // Update the search input
      />
      <div>
        {searchInput === "" ? ( // If search bar is empty, show nothing
          <div></div>
        ) : filteredMovies.length > 0 ? ( // If matches are found, display movies
          filteredMovies.map((movie) => (
            <div className="search-container" key={movie.id}>
              <div className="search-wrapper">
                <div
                  className="movie-item"
                  onClick={() => handleMovieClick(movie.id)} // Use the handleMovieClick function
                >
                  <img
                    className="img-search"
                    src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                    alt={movie.title}
                    loading="lazy"
                  />
                  <p>{movie.title}</p>
                </div>
              </div>
            </div>
          ))
        ) : (
          // If no matches, show "No movies found"
          <div>No movies found.</div>
        )}
      </div>
    </div>
  );
};

export default SearchBar;
