import React, { useEffect } from "react";
import Movie from "../components/Movies/Movie/Movie";
import CarouselContainer from "../components/UI/CarouselContainer";
import { useSelector, useDispatch } from "react-redux";
import { db } from "../firebase";
import { storeUserData } from "../store/userDataSlice";
import Loading from "../components/UI/Loading";

const HomePage = () => {
  const dispatch = useDispatch();
  const homePageData = useSelector((state) => state.moviesData);
  const userEmail = useSelector((state) => state.auth.email);
  const userToken = useSelector((state) => state.auth.token);

  useEffect(() => {
    //we get the user favourates data from firebase and store them in the store
    const ref = db.collection("users");
    ref.onSnapshot((querySnapShot) => {
      querySnapShot.forEach((doc) => {
        if (doc.id === userEmail && userToken) {
          // here we only get the data of our exact username
          let userData;
          userData = doc.data();
          dispatch(storeUserData(userData));
        }
      });
    });
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

  const allSectionsLoaded =
    trendingMoviesList &&
    nowPlayingMoviesList &&
    topRatedMoviesList &&
    popularMoviesList &&
    upcomingMoviesList &&
    topRatedTVSeriesList &&
    trendingTvSeriesList;

  if (!allSectionsLoaded) {
    return <Loading />;
  }

  return (
    <main className="container mt-5">
      <CarouselContainer to="/category/trendingMovies" header="Trending movies">
        {trendingMoviesList}
      </CarouselContainer>
      <CarouselContainer to="/category/trendingSeries" header="Trending series">
        {trendingTvSeriesList}
      </CarouselContainer>
      <CarouselContainer
        to="/category/topRatedMovies"
        header="Top rated movies"
      >
        {topRatedMoviesList}
      </CarouselContainer>
      <CarouselContainer
        to="/category/topRatedSeries"
        header="Top rated series"
      >
        {topRatedTVSeriesList}
      </CarouselContainer>
      <CarouselContainer to="/category/popularMovies" header="Popular movies">
        {popularMoviesList}
      </CarouselContainer>
      <CarouselContainer
        to="/category/nowPlayingMovies"
        header="Now playing movies"
      >
        {nowPlayingMoviesList}
      </CarouselContainer>
      <CarouselContainer to="/category/upcomingMovies" header="Upcoming movies">
        {upcomingMoviesList}
      </CarouselContainer>
    </main>
  );
};

export default HomePage;
