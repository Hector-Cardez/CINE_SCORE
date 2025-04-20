"use strict";

const { getTopRatedMovies } = require("../dbimport");

const topRatedMoviesRoute = async (req, res) => {
  try {
    const movies = await getTopRatedMovies();
    res.json(movies);
  } catch (error) {
    console.error("Error fetching top-rated movies:", error);
    res.status(500).json({ error: "Failed to fetch top-rated movies" });
  }
};

module.exports = topRatedMoviesRoute;
