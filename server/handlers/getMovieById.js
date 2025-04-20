const {
  getPopularMovies,
  getTopRatedMovies,
  getUpcomingMovies,
  getNowPlayingMovies,
} = require("../dbimport");

const getMovieById = async (req, res) => {
  try {
    // Fetch all categories of movies concurrently
    const [popular, topRated, upcoming, nowPlaying] = await Promise.all([
      getPopularMovies(),
      getTopRatedMovies(),
      getUpcomingMovies(),
      getNowPlayingMovies(),
    ]);

    // Combine all movies into one array
    const allMoviesArray = [
      ...popular.results, // Assuming the API returns { results: [...] }
      ...topRated.results,
      ...upcoming.results,
      ...nowPlaying.results,
    ];

    // Create a map to ensure uniqueness based on movie ID
    const allMoviesMap = new Map();
    allMoviesArray.forEach((movie) => {
      allMoviesMap.set(movie.id, movie);
    });

    // Convert the map back to an array of unique movies
    const uniqueMovies = Array.from(allMoviesMap.values());
    const movieId = parseInt(req.params.movieId);
    const movie = uniqueMovies.find((movie) => movie.id === movieId);

    if (movie) {
      res.json({ movie });
    } else {
      // Send the unique movies as a response

      res.status(404).json({ status: 404, error: "movie not found by ID" });
    }
  } catch (error) {
    console.error("Error fetching movie by ID :", error);
    res.status(500).json({ error: "Failed to fetch movie by ID" });
  }
};

module.exports = getMovieById;
