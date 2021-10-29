import React, { useEffect, useState } from "react";
import CarouselComponent from "../../UI/CarouselComponent";
import classes from "./MovieDetailsSimilarMovies.module.css";
import Movie from "../Movie/Movie";
import { getSimilarMoviesRequest } from "../../../api/moviesAPI";

const MovieDetailsSimilarMovies = ({ contentDetails, type }) => {
  const [similarMovies, setSimilarMovies] = useState(null);
  const [similarMoviesError, setSimilarMoviesError] = useState(null);

  const similarContent =
    similarMovies &&
    similarMovies.map((movie) => (
      <Movie
        title={movie.title || movie.name}
        img={movie.poster_path}
        key={movie.id}
        type={type}
        id={movie.id}
      />
    ));

  useEffect(() => {
    const getSimilarMovies = async () => {
      const similarMovies = await getSimilarMoviesRequest(
        type,
        contentDetails.id
      );
      if (similarMovies.data) {
        // success
        setSimilarMovies(similarMovies.data.data.results);
      } else {
        //failed
        setSimilarMoviesError(similarMovies.error.message);
      }
    };

    getSimilarMovies();
  }, []);

  const breakPoints = [
    { width: 1, itemsToShow: 1 },
    { width: 550, itemsToShow: 3 },
    { width: 768, itemsToShow: 4 },
    { width: 992, itemsToShow: 5 },
  ];

  return (
    <section className='col-12 '>
      <header>
        <h3 className={classes.header}>
          Similar {type === "movie" ? "movie" : "tv series"}
        </h3>
      </header>
      <CarouselComponent breakPoints={breakPoints}>{similarContent}</CarouselComponent>
    </section>
  );
};

export default MovieDetailsSimilarMovies;
