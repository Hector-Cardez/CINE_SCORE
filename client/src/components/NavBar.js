import React from "react";
import { NavLink } from "react-router-dom";
import "./styles/StylesPopularMovies.css";
import SearchBar from "./SearchBar";
import GoogleLoginButton from "./GoogleLoginButton";

const NavBar = () => {
  return (
    <div className="navBar">
      <div className="nav-wrapper">
        <div className="logo-wrapper">
          <NavLink to="/all">
            <img
              className="logo"
              src="/assets/cineScore.png"
              alt="CineScore Logo"
            />
          </NavLink>
        </div>

        <div className="link-wrapper">
          <div className="link">
            <NavLink
              to="/all"
              className={({ isActive }) => (isActive ? "active" : "")}
            >
              All Movies
            </NavLink>
          </div>

          <div className="link">
            <NavLink
              to="/popular-movies"
              className={({ isActive }) => (isActive ? "active" : "")}
            >
              Popular
            </NavLink>
          </div>

          <div className="link">
            <NavLink
              to="/top-rated-movies"
              className={({ isActive }) => (isActive ? "active" : "")}
            >
              Top Rated
            </NavLink>
          </div>

          <div className="link">
            <NavLink
              to="/upcoming-movies"
              className={({ isActive }) => (isActive ? "active" : "")}
            >
              Upcoming
            </NavLink>
          </div>

          <div className="link">
            <NavLink
              to="/now-playing-movies"
              className={({ isActive }) => (isActive ? "active" : "")}
            >
              Now Playing
            </NavLink>
          </div>

          <div className="link">
            <NavLink
              to="/favourites"
              className={({ isActive }) => (isActive ? "active" : "")}
            >
              Favourites
            </NavLink>
          </div>
        </div>
      </div>
      <div className="search-loggin-wrapper">
        <SearchBar />
        <GoogleLoginButton />
      </div>
    </div>
  );
};

export default NavBar;
