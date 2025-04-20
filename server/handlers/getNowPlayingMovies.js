"use strict";

const { getNowPlayingMovies } = require("../dbimport");

const nowPlaying = async (req, res) => {
  try {
    const movies = await getNowPlayingMovies();
    res.json(movies);
  } catch (error) {
    console.error("Error fetching Now Playing movies:", error);
    res.status(500).json({ error: "Failed to fetch Now Playing movies" });
  }
};

module.exports = nowPlaying;
