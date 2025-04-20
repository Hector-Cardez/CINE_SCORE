"use strict";

const dotenv = require("dotenv");
const express = require("express");
const morgan = require("morgan");

dotenv.config();

const PORT = 8000;

// Import route handlers
const popularMoviesRoute = require("./handlers/getPopularMovies");
const topRatedMoviesRoute = require("./handlers/getTopRatedMovies");
const imagesRoute = require("./handlers/getImages");
const upcomingMoviesRoute = require("./handlers/getUpcomingMovies");
const nowPlayingRoute = require("./handlers/getNowPlayingMovies");
const getAllMoviesRoute = require("./handlers/getAllMovies");
const getMovieByIdRoute = require("./handlers/getMovieById");
const patchMyFavouritesRoute = require("./handlers/patchMyFavourites");
const googleSignin = require("./handlers/googleSignin");
const app = express();

app
  .use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header(
      "Access-Control-Allow-Methods",
      "GET, POST, PUT, DELETE, PATCH, OPTIONS"
    );
    res.header(
      "Access-Control-Allow-Headers",
      "Origin, X-Requested-With, Content-Type, Accept"
    );
    if (req.method === "OPTIONS") {
      return res.status(204).end();
    }
    next();
  })
  .use(morgan("tiny"))
  .use(express.json())
  .use(express.urlencoded({ extended: false }));

// REST endpoints below //
app.get("/api/movies/popular", popularMoviesRoute);
app.get("/api/movies/top-rated", topRatedMoviesRoute);
app.get("/api/movies/:movieId/images", imagesRoute);
app.get("/api/movies/upcoming", upcomingMoviesRoute);
app.get("/api/movies/now-playing", nowPlayingRoute);
app.get("/api/movies/all", getAllMoviesRoute);
app.get("/api/movies/:movieId", getMovieByIdRoute);
app.post("/api/google-signin", googleSignin);
app.patch("/api/favourites", patchMyFavouritesRoute);
// REST endpoints above //

// Start the server
app.listen(PORT, () => {
  console.info(`Server running on port ${PORT}`);
});
