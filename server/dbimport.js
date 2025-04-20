// dbimport.js
require("dotenv").config();
const fetch = require("node-fetch");

const BASE_URL = "https://api.themoviedb.org/3";
const MOVIE_URL = `${BASE_URL}/movie`;
const DISCOVER_URL = `${BASE_URL}/discover/movie`;

// Helper to fetch from TMDB
async function fetchFromTMDB(url) {
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
      throw new Error(`Fetch error: ${response.statusText}`);
    }
    return await response.json();
  } catch (error) {
    console.error("TMDB fetch error:", error);
    throw error;
  }
}

// Popular movies
async function getPopularMovies() {
  const url = `${MOVIE_URL}/popular?language=en-US&page=1`;
  return fetchFromTMDB(url);
}

// Top rated movies
async function getTopRatedMovies() {
  const url = `${MOVIE_URL}/top_rated?language=en-US&page=1`;
  return fetchFromTMDB(url);
}

// Images by ID
async function getImages(movieId) {
  const url = `${MOVIE_URL}/${movieId}/images`;
  return fetchFromTMDB(url);
}

// Accurate upcoming movies using Discover
async function getUpcomingMovies() {
  const today = new Date().toISOString().split("T")[0]; // format: YYYY-MM-DD
  const url = `${DISCOVER_URL}?language=en-US&sort_by=primary_release_date.asc&page=1&release_date.gte=${today}&with_release_type=2|3&region=CA`;
  return fetchFromTMDB(url);
}

// Now playing
async function getNowPlayingMovies() {
  const url = `${MOVIE_URL}/now_playing?language=en-US&page=1`;
  return fetchFromTMDB(url);
}

module.exports = {
  getPopularMovies,
  getTopRatedMovies,
  getImages,
  getUpcomingMovies,
  getNowPlayingMovies,
};
