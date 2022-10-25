import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  value: 0,
  data: { popular: [], upcoming: [], top_rated: [] },
};

export const counterSlice = createSlice({
  name: "counter",
  initialState,
  reducers: {
    getImages: (state, action) => {
      state.data.popular = action.payload.popular;
      state.data.top_rated = action.payload.top_rated;
    },
    getImageDets: (state, action) => {
      console.log(action);
    },
  },
});

export const { getImages, getImageDets } = counterSlice.actions;

export default counterSlice.reducer;

export const getImagesAsync = () => async (dispatch, getState) => {
  let top_rated = await axios.get(
    " https://api.themoviedb.org/3/movie/top_rated?api_key=f9f03127d4251f69e1a48357e1a838f5&language=en-US&page=1"
  );

  let popular = await axios.get(
    "https://api.themoviedb.org/3/movie/popular?api_key=f9f03127d4251f69e1a48357e1a838f5&language=en-US&page=1"
  );

  dispatch(
    getImages({
      top_rated: top_rated.data.results,
      popular: popular.data.results,
    })
  );
};
