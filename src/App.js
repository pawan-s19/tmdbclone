import React from "react";
import { Route, Routes } from "react-router-dom";
import MovieDetails from "./Components/MovieDetails";
import Nav from "./Components/Nav";
import Body from "./Components/Body";
import Tv from "./Components/Tv";
const App = () => {
  return (
    <div>
      <Nav />
      <Routes>
        <Route path="/" element={<Body />}></Route>
        <Route path="/movieinfo/:id" element={<MovieDetails />}></Route>
        <Route path="/tv" element={<Tv />}></Route>
      </Routes>
    </div>
  );
};

export default App;
