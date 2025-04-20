import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { GoogleOAuthProvider } from "@react-oauth/google"; // Import GoogleOAuthProvider
import GlobalStyles from "./components/GlobalStyles";
import NavBar from "./components/NavBar";
import PopularMovies from "./components/PopularMovies";
import TopRatedMovies from "./components/TopRatedMovies";
import UpcomingMovies from "./components/UpcomingMovies";
import NowPlayingMovies from "./components/NowPlayingMovies";
import MyFavourites from "./components/MyFavorites";
import AllMovies from "./components/AllMovies";
import MoviePage from "./components/MoviePage";

import Footer from "./components/Footer";

const App = () => (
  <GoogleOAuthProvider clientId="972191320332-v7cc469r7trk8s1f9ll159tc8r9jq17k.apps.googleusercontent.com">
    <Router>
      <div>
        <GlobalStyles />
        <NavBar />

        <Routes>
          <Route path="/" element={<AllMovies />} />
          <Route path="/all" element={<AllMovies />} />
          <Route path="/popular-movies" element={<PopularMovies />} />
          <Route path="/top-rated-movies" element={<TopRatedMovies />} />
          <Route path="/upcoming-movies" element={<UpcomingMovies />} />
          <Route path="/now-playing-movies" element={<NowPlayingMovies />} />
          <Route path="/favourites" element={<MyFavourites />} />
          <Route path="/movies/:movieId" element={<MoviePage />} />
        </Routes>
      </div>
    </Router>
    <Footer />
  </GoogleOAuthProvider>
);

export default App;
