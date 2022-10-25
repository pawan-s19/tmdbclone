import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import css from "../Components/body.css";
import { useDispatch, useSelector } from "react-redux";
import { getImagesAsync } from "../store/features/counterSlice";
const Body = () => {
  const data = useSelector((state) => state.counter.data);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getImagesAsync());
  }, []);

  let dataToShow = <p>Loading</p>;

  let topRatedData = <p>loading</p>;

  if (data.popular) {
    dataToShow = data.popular.map((data) => (
      <Link
        to={`/movieinfo/${data.id}`}
        key={data.id}
        style={{ textDecoration: "none", color: "black" }}
      >
        <div className="moviedata">
          <div className="movieimage">
            <img src={`https://image.tmdb.org/t/p/w500${data.poster_path}`} />
          </div>
          <h6 style={{ fontSize: "17.5px" }}>{data.title}</h6>
          <h6>{data.release_date}</h6>
        </div>
      </Link>
    ));
  }

  if (data.top_rated) {
    topRatedData = data.top_rated.map((data) => (
      <Link
        to={`/movieinfo/${data.id}`}
        key={data.id}
        style={{ textDecoration: "none", color: "black" }}
      >
        <div className="moviedata">
          <div className="movieimage">
            <img src={`https://image.tmdb.org/t/p/w500${data.poster_path}`} />
          </div>
          <h6 style={{ fontSize: "17.5px" }}>{data.title}</h6>
          <h6>{data.release_date}</h6>
        </div>
      </Link>
    ));
  }
  return (
    <div id="body">
      <div className="mycard">
        <h1>Welcome</h1>
        <p>Millions of movies, TV shows and people to discover. Explore now.</p>
      </div>
      <div className="moviegrid">
        <h4>What's Popular</h4>
        <div className="grid ">{dataToShow}</div>
      </div>

      <div className="moviegrid">
        <h4>Top Rated Movies</h4>
        <div className="grid">{topRatedData}</div>
      </div>
    </div>
  );
};

export default Body;
