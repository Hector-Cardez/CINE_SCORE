const fetch = require("node-fetch");
require("dotenv").config();

const BASE_URL = "https://api.themoviedb.org/3/movie";

// Helper function to fetch data from TMDB
async function fetchFromTMDBW(endpoint) {
  const url = `${BASE_URL}${endpoint}?language=en-US&page=1`;
  const options = {
    method: "GET",
    headers: {
      accept: "application/json",
      Authorization: `Bearer ${process.env.TMDB_ACCESS_TOKEN}`,
    },
  };

  try {
    const response = await fetch(url, options);
    if (!response.ok) {
      throw new Error(`Error fetching data: ${response.statusText}`);
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching data from TMDB:", error);
    throw error;
  }
}

// Gets popular movies
async function getPopularMovies() {
  const endpoint = "/popular";
  return fetchFromTMDBW(endpoint);
}

// Gets top-rated movies
async function getTopRatedMovies() {
  const endpoint = "/top_rated";
  return fetchFromTMDBW(endpoint);
}

// Get images for a specific movie
async function getImages(movieId) {
  const endpoint = `/${movieId}/images`;
  return fetchFromTMDBW(endpoint);
}

// Gets upcoming-movies
async function getUpcomingMovies() {
  const endpoint = "/upcoming";
  return fetchFromTMDBW(endpoint);
}
// Gets now-playing
async function getNowPlayingMovies() {
  const endpoint = "/now_playing";
  return fetchFromTMDBW(endpoint);
}

module.exports = {
  getPopularMovies,
  getTopRatedMovies,
  getImages,
  getUpcomingMovies,
  getNowPlayingMovies,
};
