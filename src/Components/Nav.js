import React from "react";
import { Link, Routes } from "react-router-dom";
import css from "../Components/nav.css";
const Nav = () => {
  return (
    <div id="nav">
      <div className="navleft">
        <h2>TMDB</h2>

        <Link style={{ textDecoration: "none", color: "white" }} to={"/"}>
          <h5>Movies</h5>
        </Link>
        <Link style={{ textDecoration: "none", color: "white" }} to={"/tv"}>
          <h5>TV Shows</h5>
        </Link>
        <Link style={{ textDecoration: "none", color: "white" }} to={"/people"}>
          <h5>People</h5>
        </Link>
      </div>
    </div>
  );
};

export default Nav;
