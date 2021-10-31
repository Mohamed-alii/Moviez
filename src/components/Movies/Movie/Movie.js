import React, { useState, useEffect } from "react";
import classes from "./Movie.module.css";
import { imgPrefix, getMovieVideos } from "../../../api/moviesAPI";
import { AiOutlinePlus } from "react-icons/ai";
import { MdFavorite } from "react-icons/md";
import TrailerModal from "../TrailerModal/TrailerModal";
import LoginModal from "../../loginAndSignupModal/LoginModal";
import { useSelector } from "react-redux";
import { useHistory } from "react-router";
import { addToFavourites, removeFromFavourites } from "../../../api/favouritesFirebase";

const Movie = ({ title, img, type, id, className }) => {
  const [trailerModalIsActive, setTrailerModalIsActive] = useState(false);
  const [isFavourite, setIsFavourite] = useState(false);
  const [loginModalIsActive, setLoginModalIsActive] = useState(false);
  const history = useHistory();
  const userEmail = useSelector((state) => state.auth.email);
  const userToken = useSelector((state) => state.auth.token);
  const favourateTv = useSelector((state) => state.userData.favourateTv);
  const favourateMovies = useSelector(
    (state) => state.userData.favourateMovies
  );

  const currentMovie = {
    title,
    image: img,
    id: id,
  };

  useEffect(() => {
    if (type === "movie") {
      const favMovieFound = favourateMovies.some((movie) => movie.id === id); // some returns true if found
      setIsFavourite(favMovieFound);
    } else {
      const favTvFound = favourateTv.some((tv) => tv.id === id);
      setIsFavourite(favTvFound);
    }
  }, [favourateMovies, favourateTv]);

  const addToFavouritesHandler = (event) => {
    event.stopPropagation();
    //check if the user is loggged in first
    //if not show login modal
    if (userToken) {
      addToFavourites(type, userEmail, favourateMovies, favourateTv, currentMovie);
      setIsFavourite(true);
    } else {
      //  show modal
      setLoginModalIsActive(true);
    }
  };

  const removeFromFavouritesHandler = (event) => {
    event.stopPropagation();
    removeFromFavourites(type, userEmail, favourateMovies, favourateTv, id);
    setIsFavourite(false);
  };

  const watchTrailerHandler = async (event) => {
    event.stopPropagation();
    setTrailerModalIsActive(true);
  };

  const hideModalHandler = (event) => {
    event.stopPropagation();
    setLoginModalIsActive(false);
    setTrailerModalIsActive(false);
  };

  const redirectToMovieDetails = () => {
    const path = `/${type}/${id}`;
    history.push(path);
  };

  return (
    <div
      className={`${classes.container} ${className}`}
      onClick={redirectToMovieDetails}
    >
      {/* login and registration modal */}
      {loginModalIsActive && <LoginModal modalMessage='Please login first in order to add to your favourites' onClose={hideModalHandler} />}

      {/* trailer modal */}
      {trailerModalIsActive  && (
        <TrailerModal type={type} id={id} onClose={hideModalHandler} />
      )}
      <div className={classes["movie__title__container"]}>
        <p className={`${classes["movie__title"]} `}>
          {currentMovie.title}
        </p>
      </div>

      <figure
        className={`${classes["movie-img-container"]} mb-0 position-relative`}
      >
        <img src={imgPrefix + img} alt={title + "movie"} />
      </figure>
      <div className={classes.overlay}>
        {isFavourite && ( //remove from favourites btn
          <button
            onClick={removeFromFavouritesHandler}
            className={`${classes["remove-btn"]} ${classes.btn}`}
          >
            <MdFavorite />
          </button>
        )}
        {!isFavourite && ( //add to favourites btn
          <button
            onClick={addToFavouritesHandler}
            className={`${classes.btn} ${classes["add-btn"]} ${classes.blur}`}
          >
            <AiOutlinePlus className={classes.icon} />
          </button>
        )}

        <button
          onClick={watchTrailerHandler}
          className={`${classes["trailer-btn"]} py-1 align-self-end `}
        >
          Watch trailer
        </button>
        {/* <h4 className={`${classes.title} text-white pb-3`} >{title}</h4> */}
      </div>
    </div>
  );
};

export default Movie;
