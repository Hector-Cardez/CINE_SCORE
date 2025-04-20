// toggles favourites and update sessionStorage
const toggleFavourite = (movie, isFavourite) => {
  // Retrieve the current list of favourites from sessionStorage
  const storedFavourites =
    JSON.parse(sessionStorage.getItem("favourites")) || [];

  // Check if the movie is currently marked as a favourite
  if (isFavourite) {
    // If it is a favourite, filter it out from the stored favourites
    const updatedFavourites = storedFavourites.filter(
      (fav) => fav.id !== movie.id // Keep only the favourites that do not match the current movie's ID
    );

    // Update sessionStorage with the new list of favourites
    sessionStorage.setItem("favourites", JSON.stringify(updatedFavourites));

    // Return false indicating the movie is no longer a favourite
    return false;
  } else {
    // If it is not a favourite, add the current movie to the favourites list
    storedFavourites.push(movie);

    // Update sessionStorage with the new favourites list including the newly added movie
    sessionStorage.setItem("favourites", JSON.stringify(storedFavourites));

    return true;
  }
};

// Function to get the favourite image based on the favourite status
const getFavouriteImage = (isFavourite) => {
  const favourite = "/assets/star.png";
  const nonFavourite = "/assets/starFavourite.png";

  // Return the appropriate image path based on the favourite status
  return isFavourite ? favourite : nonFavourite;
};

export default { toggleFavourite, getFavouriteImage };
