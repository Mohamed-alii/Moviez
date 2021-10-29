import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  trendingMovies: null,
  trendingMoviesError: null,
  topRatedMovies: null,
  topRatedMoviesError: null,
  nowPlayingMovies: null,
  nowPlayingMoviesError: null,
  upcomingMovies: null,
  upcomingMoviesError: null,
  popularMovies: null,
  popularMoviesError: null,
  trendingTv: null,
  trendingTvError: null,
  topRatedTv: null,
  topRatedTvError: null,

};

export const moviesSlice = createSlice({
  name: "moviesData",
  initialState,
  reducers: {
    intiateHomePageData() {},
    homePageDataSucceed(state, action) {
      //here the action payload hold object with the data and the type of this data like( latest movies or trending etc )
      switch (action.payload.type) {
        case "trendingMovies":
          state.trendingMovies = action.payload.data;
          break;

        case "nowPlaying":
          state.nowPlayingMovies = action.payload.data;
          break;

        case "topRated":
          state.topRatedMovies = action.payload.data;
          break;

        case "popular":
          state.popularMovies = action.payload.data;
          break;

        case "upcoming":
          state.upcomingMovies = action.payload.data;
          break;

        case "trendingTv":
          state.trendingTv = action.payload.data;
          break;

        case "topRatedTv":
          state.topRatedTv = action.payload.data;
          break;

        default:
          break;
      }
    },
    homePageDataFailed(state, action) {
      switch (action.payload.type) {
        case "trendingMovies":
          state.trendingMoviesError = action.payload.error;
          break;

        case "nowPlaying":
          state.nowPlayingMoviesError = action.payload.error;
          break;

        case "topRated":
          state.topRatedMoviesError = action.payload.error;
          break;

        case "popular":
          state.popularMoviesError = action.payload.error;
          break;

        case "upcoming":
          state.upcomingMoviesError = action.payload.error;
          break;

        case "trendingTv":
          state.trendingTvError = action.payload.error;
          break;

        case "topRatedTv":
          state.topRatedTvError = action.payload.error;
          break;

        default:
          break;
      }
    },

  },
});

export const {
  intiateHomePageData,
  homePageDataSucceed,
  homePageDataFailed,
} = moviesSlice.actions;

export default moviesSlice.reducer;
