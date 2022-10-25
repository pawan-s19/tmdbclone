import React from "react";
import css from "../Components/moviedetails.css";
import { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import { getImageDets } from "../store/features/counterSlice";
import { useDispatch } from "react-redux";
const MovieDetails = () => {
  const dispatch = useDispatch();
  dispatch(getImageDets());
  const [movieData, setMovieData] = useState(null);
  const [credits, setCredits] = useState(null);
  const [castdets, setCastdets] = useState(null);
  useEffect(() => {
    dataReceiver();
  }, []);
  let { id } = useParams();
  let loader = <p>loading</p>;
  const dataReceiver = async () => {
    const movie = await axios.get(
      `https://api.themoviedb.org/3/movie/${id}?api_key=f9f03127d4251f69e1a48357e1a838f5&language=en-US`
    );
    const credits = await axios.get(
      `https://api.themoviedb.org/3/movie/${id}/credits?api_key=f9f03127d4251f69e1a48357e1a838f5&language=en-US`
    );

    setMovieData(movie.data);

    if (credits.data.crew.length > 5) {
      credits.data.crew.splice(5, credits.data.crew.length);
    }
    setCredits(credits.data.crew);
    setCastdets(credits.data.cast);
  };

  let credit = <p>loading</p>;
  if (credits) {
    credit = credits.map((e) => (
      <div key={e.id}>
        <h6 style={{ marginRight: "1vw" }}>
          {e.original_name} <br /> {e.department}
        </h6>
      </div>
    ));
  }

  if (movieData) {
    let genresList = movieData.genres.map((e) => e.name + " ");

    function timeConvert(n) {
      var num = n;
      var hours = num / 60;
      var rhours = Math.floor(hours);
      var minutes = (hours - rhours) * 60;
      var rminutes = Math.round(minutes);
      return rhours + " hr " + rminutes + " min";
    }
    loader = (
      <div
        className="moviedets"
        style={{
          backgroundImage: `url(https://image.tmdb.org/t/p/w500${movieData.backdrop_path})`,
          backgroundRepeat: "no-repeat",
          backgroundSize: "cover",
        }}
      >
        <div className="overlay"></div>
        <div className="image">
          <div className="image-holder">
            <img
              src={`https://image.tmdb.org/t/p/w500${movieData.poster_path}`}
            />
          </div>
        </div>
        <div className="text">
          <h1>{movieData.title}</h1>
          <h6>
            {movieData.release_date +
              " " +
              genresList +
              "-" +
              " " +
              timeConvert(movieData.runtime)}
          </h6>
          <div className="score">
            <div className="circle">
              {Math.floor(movieData.vote_average * 10) + "%"}
            </div>
            <h6>
              User <br /> Score
            </h6>
          </div>
          <h6 className="tagline">
            <i>{movieData.tagline}</i>
          </h6>
          <div className="overview">
            <h4>Overview</h4>

            <p>{movieData.overview}</p>
          </div>
          <div className="creator">{credit}</div>
        </div>
      </div>
    );
  }

  let casts = "";
  if (castdets) {
    console.log(castdets);
    casts = castdets.map((e) => (
      <div className="actor-card">
        <div className="actor-image">
          <img
            src={`https://image.tmdb.org/t/p/w500${e.profile_path}`}
            alt=" Not available"
          />
        </div>
        <div className="actor-details">
          <h6>
            <b>{e.original_name}</b>
          </h6>
          <h6 style={{ fontSize: "13.5px" }}>{e.character}</h6>
        </div>
      </div>
    ));
  }
  return (
    <div id="main">
      {loader}

      <div className="cast">
        {castdets ? <h4>Top Billed Cast</h4> : null}
        <div className="actor-grid">{casts}</div>
      </div>
    </div>
  );
};

export default MovieDetails;
