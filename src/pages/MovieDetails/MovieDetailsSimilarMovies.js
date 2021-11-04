import React, { useEffect, useState } from "react";
import CarouselComponent from "../../components/UI/CarouselComponent";
import classes from "./MovieDetailsSimilarMovies.module.css";
import Movie from "../../components/Movies/Movie/Movie";
import { getSimilarMoviesRequest } from "../../api/moviesAPI";

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

  if (similarMovies && similarMovies.length === 0) {
    return <div></div>;
  }

  console.log(similarMovies)

  return (
    <section className='col-12 '>
        <div className='horizontal-line'></div>
      <header>
        <h3 className={`${classes.header} `}>
          Similar {type === "movie" ? "movie" : "tv series"}
        </h3>
      </header>
      <CarouselComponent breakPoints={breakPoints}>{similarContent}</CarouselComponent>
    </section>
  );
};

export default MovieDetailsSimilarMovies;
