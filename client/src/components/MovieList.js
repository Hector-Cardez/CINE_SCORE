import React from "react";
import { useNavigate } from "react-router-dom";

const MoviesList = ({ movies }) => {
  const navigate = useNavigate();

  return (
    <div className="movies-container">
      <div className="movies-wrapper">
        {movies.length > 0 ? (
          movies.map((movie) => (
            <div
              key={movie.id}
              className="movie-item"
              onClick={() => navigate(`/movies/${movie.id}`)}
            >
              <img
                src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                alt={movie.title}
                loading="lazy"
              />
            </div>
          ))
        ) : (
          <div>Loading...</div>
        )}
      </div>
    </div>
  );
};

export default MoviesList;
