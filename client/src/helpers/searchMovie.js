const BASE_URL = "http://localhost:8000/api/movies";

export const searchMovie = async (query) => {
  const endpoints = ["/popular", "/top-rated", "/upcoming", "/now-playing"];

  const fetchMovies = async (endpoint) => {
    try {
      const response = await fetch(`${BASE_URL}${endpoint}`);
      if (!response.ok)
        throw new Error(
          "Error fetching, correct the endpoint before searching"
        );
      const data = await response.json();

      return data.results || []; // Return the results array directly
    } catch (error) {
      console.error(error);
      return []; // Return an empty array on error ....
    }
  };

  try {
    const allMovies = await Promise.all(endpoints.map(fetchMovies));

    // Combine all the movie arrays from all endpoints
    const arrayOfMovies = allMovies.flat();

    if (query) {
      const filteredMovies = arrayOfMovies.filter(
        (movie) =>
          movie.title && movie.title.toLowerCase().includes(query.toLowerCase())
      );

      return filteredMovies;
    }

    return arrayOfMovies;
  } catch (error) {
    console.error("Error searching for movies:", error);
    return [];
  }
};
