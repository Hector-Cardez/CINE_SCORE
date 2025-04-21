import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

// Function to toggle favourites and update sessionStorage
const toggleFavourite = (movie, isFavourite) => {
  const storedFavourites =
    JSON.parse(sessionStorage.getItem("favourites")) || [];

  if (isFavourite) {
    // Remove from favourites
    const updatedFavourites = storedFavourites.filter(
      (fav) => fav.id !== movie.id
    );
    sessionStorage.setItem("favourites", JSON.stringify(updatedFavourites));
    return false; // Return false indicating movie is no longer a favourite
  } else {
    // Add to favourites
    storedFavourites.push(movie);
    sessionStorage.setItem("favourites", JSON.stringify(storedFavourites));
    return true; // Return true indicating movie is now a favourite
  }
};

// Defined const for favourite and nonFavourite images
const favourite = "/assets/star.png";
const nonFavourite = "/assets/starFavourite.png";

// Function to get the image source and class based on favourite status
const getFavouriteImage = (isFavourite) => {
  return isFavourite ? favourite : nonFavourite;
};

// Share favourites function
export const shareFavourites = (favourites) => {
  if (!favourites || favourites.length === 0) {
    return "No favourite movies to share.";
  }

  // Generate a shareable link
  const movieTitles = favourites.map((movie) => movie.title).join(", ");
  const shareableLink = `Check out my favorite movies: ${movieTitles}`;

  // You can also implement sharing via the Web Share API if you want
  if (navigator.share) {
    navigator
      .share({
        title: "My Favourite Movies",
        text: shareableLink,
        url: window.location.href, // Link to your app/page
      })
      .then(() => {})
      .catch((error) => {
        console.error("Error sharing:", error);
      });
  } else {
    // Fallback for browsers that don't support the Web Share API
    alert(shareableLink);
  }

  return shareableLink;
};

const MyFavourites = () => {
  const [favouriteMovies, setFavouriteMovies] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    // Retrieve favourites from sessionStorage
    const storedFavourites =
      JSON.parse(sessionStorage.getItem("favourites")) || [];

    setFavouriteMovies(storedFavourites);

    // Call the backend to save favourites
    const saveFavourites = async () => {
      try {
        const response = await fetch(
          `${process.env.REACT_APP_API_URL}/api/favourites`,
          {
            method: "PATCH",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              userId: "e62a17e5-9c48-4a71-b7d8-1e2e7c6fcf3d", // Keeping the same userId as requested
              favourites: storedFavourites,
            }),
          }
        );

        if (!response.ok) {
          const errorData = await response.json();
          console.error("Failed to update favourites:", errorData.message);
          throw new Error("Failed to update favourites");
        }

        const data = await response.json();
      } catch (error) {
        console.error("Error in saveFavourites:", error);
      }
    };

    if (storedFavourites.length > 0) {
      saveFavourites();
    }
  }, []);

  return (
    <div className="movies-container">
      <div className="movies-wrapper">
        {favouriteMovies.length > 0 ? (
          favouriteMovies.map((movie) => {
            const isFavourite = true;

            return (
              <div
                key={movie.id}
                className="movie-item"
                onClick={() => {
                  navigate(`/movies/${movie.id}`);
                }}
              >
                <img
                  src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                  alt={movie.title}
                  loading="lazy"
                />
              </div>
            );
          })
        ) : (
          <div>Add some movies to your favourites</div>
        )}
      </div>

      {/* 
      <div>
        <div>
          <button>Add some</button>
        </div>
        <div>Friends' Top Picks</div>
        <div>movies here</div>
      </div>
        */}

      <div>
        <button
          className="share-button"
          onClick={() => shareFavourites(favouriteMovies)}
        >
          Share Favourites
        </button>
      </div>
    </div>
  );
};

export default MyFavourites;
