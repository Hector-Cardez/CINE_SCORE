// src/components/MoviePage.js
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import "./styles/StylesPopularMovies.css";
import { getRatingClass } from "../helpers/rating";
import favouritesHelper from "../helpers/favouritesHelper";

const { toggleFavourite, getFavouriteImage } = favouritesHelper;

const MoviePage = () => {
  const { movieId } = useParams(); // Get movieId from URL
  const [movie, setMovie] = useState(null);
  const [error, setError] = useState(null);
  const [isFavourite, setIsFavourite] = useState(false); // Track if movie is in favourites

  useEffect(() => {
    const fetchMovieById = async () => {
      try {
        const response = await fetch(
          `${process.env.REACT_APP_API_URL}/api/movies/${movieId}`
        );

        if (!response.ok) {
          throw new Error("Movie not found");
        }
        const data = await response.json();
        setMovie(data.movie);

        // Check if this movie is already in favourites and store the information in sessionStorage
        const storedFavourites =
          JSON.parse(sessionStorage.getItem("favourites")) || [];
        setIsFavourite(
          storedFavourites.some((fav) => fav.id === data.movie.id)
        );
      } catch (err) {
        setError(err.message);
      }
    };

    fetchMovieById();
  }, [movieId]);

  const handleFavouriteToggle = () => {
    const updatedFavouriteState = toggleFavourite(movie, isFavourite);
    setIsFavourite(updatedFavouriteState);
  };

  if (error) return <div>{error}</div>;

  return (
    <div className="movie-details">
      {movie ? (
        <div className="movie-page-container">
          <div className="movie-page-img">
            <img
              src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
              alt={movie.title}
            />
            <div className="fav-wrapper">
              <button onClick={handleFavouriteToggle} className="fav-button">
                <div className="fav-container">
                  <img
                    src={getFavouriteImage(isFavourite)}
                    alt={
                      isFavourite
                        ? "Remove from favourites"
                        : "Add to favourites"
                    }
                    className="fav-icon"
                  />
                  <span className="fav-text">
                    {isFavourite
                      ? "Remove from favourites"
                      : "Add to favourites"}
                  </span>
                </div>
              </button>
            </div>
          </div>
          <div className="movie-page-wrapper">
            <h2>{movie.title}</h2>
            <p>{movie.overview}</p>

            <div className="additional-info">
              <p>Release Date: {movie.release_date}</p>
              <h2>
                Average Rating:
                <span className={getRatingClass(movie.vote_average)}>
                  {movie.vote_average}
                </span>
              </h2>
            </div>
          </div>
        </div>
      ) : (
        <div>Loading movie details...</div>
      )}
    </div>
  );
};

export default MoviePage;
