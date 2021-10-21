import axios from "axios";
import { resolve } from "./resolver";


const trendingMoviesUrl = `https://api.themoviedb.org/3/trending/movie/week?api_key=${process.env.REACT_APP_MOVIES_REQUESTS_API_KEY}`;
const latestMovieUrl = `https://api.themoviedb.org/3/movie/latest?api_key=${process.env.REACT_APP_MOVIES_REQUESTS_API_KEY}`;
const nowPlayingMoviesUrl = `https://api.themoviedb.org/3/movie/now_playing?api_key=${process.env.REACT_APP_MOVIES_REQUESTS_API_KEY}`;
const popularMoviesUrl = `https://api.themoviedb.org/3/movie/popular?api_key=${process.env.REACT_APP_MOVIES_REQUESTS_API_KEY}`;
const topRatedMoviesUrl = `https://api.themoviedb.org/3/movie/top_rated?api_key=${process.env.REACT_APP_MOVIES_REQUESTS_API_KEY}`;
const upcomingMoviesUrl = `https://api.themoviedb.org/3/movie/upcoming?api_key=${process.env.REACT_APP_MOVIES_REQUESTS_API_KEY}`;

export const imgPrefix = 'https://image.tmdb.org/t/p/w500';

export const getTrendingMoviesRequest = () => {
    return resolve(axios.get(trendingMoviesUrl).then(response => response) );
}

export const getLatestMoviesRequest = () => {
    return resolve(axios.get(latestMovieUrl).then(response => response) );
}

export const getNowPlayingMoviesRequest = () => {
    return resolve(axios.get(nowPlayingMoviesUrl).then(response => response) );
}

export const getPopularMoviesRequest = () => {
    return resolve(axios.get(popularMoviesUrl).then(response => response) );
}

export const getTopRatedMoviesRequest = () => {
    return resolve( axios.get(topRatedMoviesUrl).then( response => response) );
}

export const getUpcomingMoviesRequest = () => {
    return resolve( axios.get(upcomingMoviesUrl).then( response => response) );
}

export const getSimilarMoviesRequest = (movieId) => {
    return resolve( axios.get(`https://api.themoviedb.org/3/movie/${movieId}/similar?api_key=${process.env.REACT_APP_MOVIES_REQUESTS_API_KEY}`).then( response => response) );
}

export const getMovieVideosRequest = (movieId) => {
    return resolve( axios.get(`https://api.themoviedb.org/3/movie/${movieId}/videos?api_key=${process.env.REACT_APP_MOVIES_REQUESTS_API_KEY}`).then( response => response) );
}

export const getMovieImgsRequest = (movieId) => {
    return resolve( axios.get(`https://api.themoviedb.org/3/movie/${movieId}/images?api_key=${process.env.REACT_APP_MOVIES_REQUESTS_API_KEY}`).then( response => response) );
}

export const getMovieDetailsRequest = (movieId) => {
    return resolve( axios.get(`https://api.themoviedb.org/3/movie/${movieId}?api_key=${process.env.REACT_APP_MOVIES_REQUESTS_API_KEY}`).then( response => response) );
}