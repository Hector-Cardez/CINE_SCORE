"use strict";

const { getPopularMovies } = require("../dbimport");

const popularMovies = async (req, res) => {
  try {
    const movies = await getPopularMovies();
    res.json(movies);
  } catch (error) {
    console.error("Error fetching Top-Rated movies:", error);
    res.status(500).json({ error: "Failed to fetch top-rated movies" });
  }
};

module.exports = popularMovies;
