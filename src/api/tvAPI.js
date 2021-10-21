import axios from "axios";
import { resolve } from "./resolver";

const trendingTvUrl = `https://api.themoviedb.org/3/trending/tv/week?api_key=${process.env.REACT_APP_MOVIES_REQUESTS_API_KEY}`;
const topRatedTvUrl = `https://api.themoviedb.org/3/tv/top_rated?api_key=${process.env.REACT_APP_MOVIES_REQUESTS_API_KEY}`;

export const getTrendingTvRequest = () => {
  return resolve(axios.get(trendingTvUrl).then((response) => response));
};

export const getTopRatedTvrequest = () => {
  return resolve(axios.get(topRatedTvUrl).then((response) => response));
};

export const getTvSeriesDetailsRequest = (tvSeriesId) => {
  return resolve(
    axios
      .get(
        `https://api.themoviedb.org/3/tv/${tvSeriesId}?api_key=${process.env.REACT_APP_MOVIES_REQUESTS_API_KEY}`
      )
      .then((response) => response)
  );
};


