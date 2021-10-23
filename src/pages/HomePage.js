import React, { useEffect, useState } from "react";
import classes from "./HomePage.module.css";
import { getTrendingMoviesRequest } from "../api/moviesAPI";
import Movie from "../components/Movies/Movie/Movie";
import CarouselContainer from "../components/UI/CarouselContainer";
import { useSelector, useDispatch } from "react-redux";
import { intiateHomePageData } from "../store/moviesSlice";
import Card from '../components/UI/Card'

const HomePage = () => {
  const dispatch = useDispatch();
  const homePageData = useSelector((state) => state.moviesData);

  useEffect(() => {
    // this action will trigger many api requests via redux saga to get all the home page data we need
    dispatch(intiateHomePageData());
  }, []);

  // trending movies list
  const trendingMoviesList =
    homePageData.trendingMovies &&
    homePageData.trendingMovies.map((movie) => (
        <Movie
          title={movie.title}
          img={movie.poster_path}
          key={movie.id}
          type="movie"
          id={movie.id}
        />
    ));
  // nowPlaying movies list
  const nowPlayingMoviesList =
    homePageData.nowPlayingMovies &&
    homePageData.nowPlayingMovies.map((movie) => (
      <Movie
        title={movie.title}
        img={movie.poster_path}
        key={movie.id}
        type="movie"
        id={movie.id}
      />
    ));
  // top rated movies list
  const topRatedMoviesList =
    homePageData.topRatedMovies &&
    homePageData.topRatedMovies.map((movie) => (
      <Movie
        title={movie.title}
        img={movie.poster_path}
        key={movie.id}
        type="movie"
        id={movie.id}
      />
    ));
  // popular movies list
  const popularMoviesList =
    homePageData.popularMovies &&
    homePageData.popularMovies.map((movie) => (
      <Movie
        title={movie.title}
        img={movie.poster_path}
        key={movie.id}
        type="movie"
        id={movie.id}
      />
    ));
  // up coming  movies list
  const upcomingMoviesList =
    homePageData.upcomingMovies &&
    homePageData.upcomingMovies.map((movie) => (
      <Movie
        title={movie.title}
        img={movie.poster_path}
        key={movie.id}
        type="movie"
        id={movie.id}
      />
    ));
  // top rated tv series list
  const topRatedTVSeriesList =
    homePageData.topRatedTv &&
    homePageData.topRatedTv.map((movie) => (
      <Movie
        title={movie.name}
        img={movie.poster_path}
        key={movie.id}
        type="tv"
        id={movie.id}
      />
    ));
  // trending tv series list
  const trendingTvSeriesList =
    homePageData.trendingTv &&
    homePageData.trendingTv.map((movie) => (
      <Movie
        title={movie.name}
        img={movie.poster_path}
        key={movie.id}
        type="tv"
        id={movie.id}
      />
    ));

  return (
    <main className="container mt-5">
      <CarouselContainer header="Trending movies">
        {trendingMoviesList}
      </CarouselContainer>
      <CarouselContainer header="Trending series">
        {trendingTvSeriesList}
      </CarouselContainer>
      <CarouselContainer header="Top rated movies">
        {topRatedMoviesList}
      </CarouselContainer>
      <CarouselContainer header="Top rated series">
        {topRatedTVSeriesList}
      </CarouselContainer>
      <CarouselContainer header="Popular movies">
        {popularMoviesList}
      </CarouselContainer>
      <CarouselContainer header="Now playing movies">
        {nowPlayingMoviesList}
      </CarouselContainer>
      <CarouselContainer header="Upcoming movies">
        {upcomingMoviesList}
      </CarouselContainer>
    </main>
  );
};

export default HomePage;
