import axios from "axios";
import React from "react";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
const Tv = () => {
  const [tv, setTv] = useState(null);
  const [onAir, setOnAir] = useState(null);

  useEffect(() => {
    getData();
  }, []);

  const getData = async () => {
    const { data } = await axios.get(
      "https://api.themoviedb.org/3/tv/popular?api_key=f9f03127d4251f69e1a48357e1a838f5&language=en-US&page=1"
    );
    const onTheAir = await axios.get(
      "https://api.themoviedb.org/3/tv/on_the_air?api_key=f9f03127d4251f69e1a48357e1a838f5&language=en-US&page=1"
    );
    setTv(data.results);
    setOnAir(onTheAir.data.results);
  };

  let loader = <p>loading</p>;
  if (tv) {
    loader = tv.map((data) => (
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
  let loader2 = <p>loading</p>;
  if (onAir) {
    loader2 = onAir.map((data) => (
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
      <div className="moviegrid">
        <h4>What's Popular</h4>
        <div className="grid ">{loader}</div>
      </div>
      <div className="moviegrid">
        <h4>On Air</h4>
        <div className="grid ">{loader2}</div>
      </div>
    </div>
  );
};

export default Tv;
