import React from "react";
import classes from "./MovieDetailsHeader.module.css";
import { imgPrefix } from '../../../api/moviesAPI';
import { BsFillStarFill } from "react-icons/bs";

const MovieDetailsHeader = ({ contentDetails, type }) => {
  const genres =
    contentDetails &&
    contentDetails.genres.map((genre) => (
      <p key={genre.id} className={classes.genre}>{genre.name}</p>
    ));

  const numberOfSeasons = contentDetails.seasons
    ? contentDetails.seasons.length
    : null; //number of seasons if it is tv series

  const convertMovieRuntime = (runtime) => {
    // converting movie runtime from only mins to => hours + mins
    const hours = Math.floor(runtime / 60);
    const mins = runtime % 60;
    const time = `${hours !== 0 ? hours + "h" : ""} ${mins} min`;

    return time;
  };

  return (
    <section className={`${classes.header} col-12`}>
      <div className={`${classes["header__container"]} row`}>
        <div
          className={`${classes["header__container__img"]} d-flex align-items-start col-sm-12 col-md-12 col-lg-12 col-xl-6 mb-3`}
        >
          <img
            className={classes["header__img"]}
            src={ imgPrefix + contentDetails.backdrop_path}
            alt={contentDetails.original_title + ' ' + type + ' poster'}
          />
        </div>
        <div
          className={`${classes["header__container__content"]} col-sm-12 col-md-12 col-lg-12 col-xl-6`}
        >
          <h3 className={`${classes['header__title']} mt-md-0 mt-3 text-sm-center text-md-start`}>
            {contentDetails.original_title || contentDetails.name}
          </h3>
          {/* checking if the original name is different from title then show it */}
          {contentDetails.original_name &&
            contentDetails.original_name !== contentDetails.original_title &&
            contentDetails.original_name !== contentDetails.name && (
              <h6 className="mt-md-0 mt-3 text-sm-center text-md-start">
                Original name : {contentDetails.original_name}
              </h6>
            )}
          <div className="d-flex justify-content-sm-center justify-content-md-start flex-wrap">
            <p className="mb-1 me-3">
              {contentDetails.release_date || contentDetails.first_air_date}
            </p>
            {type === "movie" && (
              <p className="mb-1 me-3">
                {convertMovieRuntime(contentDetails.runtime)}
              </p>
            )}
            {numberOfSeasons && (
              <p className="mb-1 me-3">
                {numberOfSeasons > 1 ? (numberOfSeasons + ' Seasons') : (numberOfSeasons + ' Season')} 
              </p>
            )}
            <p className="mb-1 me-2">
              {contentDetails.vote_average}/10{" "}
              <BsFillStarFill className={classes["rate__icon"]} />{" "}
            </p>
          </div>
          <div className="d-flex justify-content-sm-center justify-content-md-start flex-wrap mb-3">
            {genres}
          </div>
          <p className={classes.overview}>{contentDetails.overview}</p>
        </div>
      </div>
    </section>
  );
};

export default MovieDetailsHeader;
