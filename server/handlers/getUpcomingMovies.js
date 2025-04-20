// handlers/upcomingMovies.js
"use strict";

const { getUpcomingMovies } = require("../dbimport");

const upcomingMovies = async (req, res) => {
  try {
    const movies = await getUpcomingMovies();
    res.json(movies);
  } catch (error) {
    console.error("Error fetching upcoming movies:", error);
    res.status(500).json({ error: "Failed to fetch upcoming movies" });
  }
};

module.exports = upcomingMovies;
