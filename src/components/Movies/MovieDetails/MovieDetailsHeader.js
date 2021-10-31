import React, { useState, useEffect } from "react";
import classes from "./MovieDetailsHeader.module.css";
import { imgPrefix } from "../../../api/moviesAPI";
import { BsFillStarFill } from "react-icons/bs";
import { useSelector } from "react-redux";
import {
  addToFavourites,
  removeFromFavourites,
} from "../../../api/favouritesFirebase";
import LoginModal from "../../loginAndSignupModal/LoginModal";
import TrailerModal from "../TrailerModal/TrailerModal";
import { BsHeartFill } from 'react-icons/bs'

const convertMovieRuntime = (runtime) => {
  // converting movie runtime from only mins to => hours + mins
  const hours = Math.floor(runtime / 60);
  const mins = runtime % 60;
  const time = `${hours !== 0 ? hours + "h" : ""} ${mins} min`;

  return time;
};

const MovieDetailsHeader = ({ contentDetails, type }) => {
  const [isFavourite, setIsFavourite] = useState(false);
  const [loginModalIsActive, setLoginModalIsActive] = useState(false);
  const [trailerModalIsActive, setTrailerModalIsActive] = useState(false);
  const userFavourites = useSelector((state) => state.userData); // has fav movie + fav tv series
  const userToken = useSelector((state) => state.auth.token);
  const userEmail = useSelector((state) => state.auth.email);
  const currentMovie = {
    title: contentDetails.name || contentDetails.title,
    id: contentDetails.id,
    image: contentDetails.poster_path,
  };

  useEffect(() => {
    //checking if the content is favourite or not to display the proper buttons
    let favouriteFound = false;
    if (type === "movie") {
      favouriteFound =
        userFavourites.favourateMovies &&
        contentDetails &&
        userFavourites.favourateMovies.some(
          (movie) => movie.id === contentDetails.id
        );
    } else {
      //type = tv
      favouriteFound =
        userFavourites.favourateTv &&
        contentDetails &&
        userFavourites.favourateTv.some((tv) => tv.id === contentDetails.id);
    }
    //checking if the value is not false then set the favourite to true , if not no need to rerender the component while its inyial is false
    if (favouriteFound === true) {
      setIsFavourite(true);
    }
  }, [userFavourites, contentDetails]);

  const genres =
    contentDetails &&
    contentDetails.genres.map((genre) => (
      <p key={genre.id} className={classes.genre}>
        {genre.name}
      </p>
    ));

  const numberOfSeasons = contentDetails.seasons
    ? contentDetails.seasons.length
    : null; //number of seasons if it is tv series

  const addToFavouritesHandler = () => {
    //check if the user is loggged in first
    //if not show login modal
    if (userToken) {
      addToFavourites(
        type,
        userEmail,
        userFavourites.favourateMovies,
        userFavourites.favourateTv,
        currentMovie
      );
      setIsFavourite(true);
    } else {
      //  show modal
      setLoginModalIsActive(true);
    }
  };

  const removeFromFavouritesHandler = () => {
    removeFromFavourites(
      type,
      userEmail,
      userFavourites.favourateMovies,
      userFavourites.favourateTv,
      contentDetails.id
    );
    setIsFavourite(false);
  };

  const watchTrailerHandler = async () => {
    setTrailerModalIsActive(true);
  };

  const hideModalHandler = () => {
    setLoginModalIsActive(false);
    setTrailerModalIsActive(false);
  };

  return (
    <section className={`${classes.header} col-12`}>
      <div className={`${classes["header__container"]} row`}>
        <div
          className={`${classes["header__container__img"]} d-flex align-items-start col-sm-12 col-md-12 col-lg-4 col-xl-3 mb-3 `}
        >
          <img
            className={classes["header__img"]}
            src={imgPrefix + contentDetails.poster_path}
            alt={contentDetails.original_title + " " + type + " poster"}
          />
        </div>
        <div
          className={`${classes["header__container__content"]} col-sm-12 col-md-12 col-lg-8 col-xl-8 d-flex flex-column mb-3`}
        >
          <h3
            className={`${classes["header__title"]} mt-md-0 mt-3 text-sm-center text-md-start`}
          >
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
                {numberOfSeasons > 1
                  ? numberOfSeasons + " Seasons"
                  : numberOfSeasons + " Season"}
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
          <p className={`${classes.overview} flex-grow-1 `}>
            {contentDetails.overview}
          </p>

          <div className={`${classes["btns-container"]}`}>
            {!isFavourite && (
              <button
                className={`${classes["btn-add"]} ${classes["btns"]}`}
                onClick={addToFavouritesHandler}
                data-hover='add to favourite'
              >
                <span><BsHeartFill /></span>
              </button>
            )}
            {isFavourite && (
              <button
                className={`${classes["btn-remove"] } ${classes["btns"]}`}
                onClick={removeFromFavouritesHandler}
              >
                {" "}
                remove from favourites
              </button>
            )}

            <button className={`${classes["btn-watch"]} ${classes["btns"]}`} onClick={watchTrailerHandler} >watch trailer</button>
          </div>
        </div>
      </div>

      {/* login and registration modal */}
      {loginModalIsActive && <LoginModal onClose={hideModalHandler} />}
      {/* trailer modal */}
      {trailerModalIsActive && (
        <TrailerModal type={type} id={contentDetails.id} onClose={hideModalHandler} />
      )}
    </section>
  );
};

export default MovieDetailsHeader;
