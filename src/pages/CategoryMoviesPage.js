import React, { useEffect, useState } from "react";
import Movie from "../components/Movies/Movie/Movie";
import classes from "./CategoryMoviesPage.module.css";
import { useParams, useHistory } from "react-router";
import { useSelector } from "react-redux";
import Loading from "../components/UI/Loading";

const CategoryMoviesPage = () => {
  const moviesData = useSelector((state) => state.moviesData); // all movies categories
  const [header, setHeader] = useState("");
  const [categoryData, setCategoryData] = useState([]);
  const [categoryType, setCategoryType] = useState(null); // type = movie or tv
  const [loadButtonIsVisible, setLoadButtonIsVisible] = useState(false);
  const params = useParams();
  const history = useHistory();
  const category = params.category;

  useEffect(() => {
    switch (category) {
      case "trendingMovies":
        setCategoryData(moviesData.trendingMovies);
        setCategoryType("movie");
        setHeader("Trending movies");
        break;
      case "trendingSeries":
        setCategoryData(moviesData.trendingTv);
        setCategoryType("tv");
        setHeader("Trending series");
        break;
      case "topRatedMovies":
        setCategoryData(moviesData.topRatedMovies);
        setCategoryType("movie");
        setHeader("Top rated movies");
        break;
      case "topRatedSeries":
        setCategoryData(moviesData.topRatedTv);
        setCategoryType("tv");
        setHeader("Top rated series");
        break;
      case "popularMovies":
        setCategoryData(moviesData.popularMovies);
        setCategoryType("movie");
        setHeader("Popular movies");
        break;
      case "nowPlayingMovies":
        setCategoryData(moviesData.nowPlayingMovies);
        setCategoryType("movie");
        setHeader("Now playing movies");
        break;
      case "upcomingMovies":
        setCategoryData(moviesData.upcomingMovies);
        setCategoryType("movie");
        setHeader("upcoming movies");
        break;
      default:
        history.push("/notfound");
        break;
    }
  }, [moviesData]);

  const categoryDataList =
    (categoryData && categoryData.length > 0) &&
    categoryData.map((movie) => (
      <div className="col-sm-6 col-md-4 col-lg-3 mb-4" key={movie.id}>
        <Movie
          title={movie.title || movie.name}
          img={movie.poster_path}
          type={categoryType}
          id={movie.id}
        />
      </div>
    ));

  const loadMoreHandler = () => {
    //setLoadButtonIsVisible(false)
    console.log(category);
  };

  if (!categoryDataList) {
    return <Loading />;
  }

  return (
    <main className="container mt-5 pt-5">
      <section className={`${classes["movie-container"]} `}>
        <header>
          <h2 className={`${classes.header} pb-3`}>{header}</h2>
        </header>
        <div className="row">{categoryDataList}</div>
        {loadButtonIsVisible && (
        <div className="d-flex justify-content-center mt-4">
          <button className="load-more" onClick={loadMoreHandler}>
            Load More
          </button>
        </div>
      )}
      </section>
    </main>
  );
};

export default CategoryMoviesPage;
