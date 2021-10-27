import React, { useState, useEffect } from "react";
import classes from "./Movie.module.css";
import { imgPrefix, getMovieVideos } from "../../../api/moviesAPI";
import { AiOutlinePlus } from "react-icons/ai";
import { MdFavorite } from "react-icons/md";
import TrailerModal from "../TrailerModal/TrailerModal";
import LoginModal from "../../loginAndSignupModal/LoginModal";
import { db } from "../../../firebase";
import { useSelector } from "react-redux";
import { useHistory } from "react-router";

const Movie = ({ title, img, type, id, className }) => {
  const [TrailerModalIsActive, setTrailerModalIsActive] = useState(false);
  const [trailerKeyData, setTrailerKeyData] = useState(null);
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
    //if not redirct him to login page
    if (userToken) {
      if (type === "movie" && !isFavourite) {
        // first we check if the movie is already added before to favourates or not
        db.collection("users")
          .doc(userEmail)
          .set({
            favourateMovies: [...favourateMovies, currentMovie],
            favourateTv: [...favourateTv],
          });
        setIsFavourite(true);
      } else if (type === "tv" && !isFavourite) {
        // tv series
        db.collection("users")
          .doc(userEmail)
          .set({
            favourateMovies: [...favourateMovies],
            favourateTv: [...favourateTv, currentMovie]
          });
        setIsFavourite(true);
      }
    } else {
      //  show modal
      setLoginModalIsActive(true);
    }
  };

  const removeFromFavouritesHandler = (event) => {
    event.stopPropagation();
    if (type === "movie") {
      const updatedFavouriteMovies = favourateMovies.filter(
        (movie) => movie.id !== id
      );
      db.collection("users")
        .doc(userEmail)
        .set({
          favourateMovies: [...updatedFavouriteMovies],
          favourateTv: [...favourateTv],
        });
    } else {
      const updatedFavouriteTv = favourateTv.filter(
        (tvSeries) => tvSeries.id !== id
      );
      db.collection("users")
        .doc(userEmail)
        .set({
          favourateMovies: [...favourateMovies],
          favourateTv: [...updatedFavouriteTv],
        });
    }

    setIsFavourite(false);
  };

  const watchTrailerHandler = async (event) => {
    event.stopPropagation();
    const trailerkeyResponse = await getMovieVideos(id, type); // type = movie or tv
    if (trailerkeyResponse.data) {
      // sometimes api returns empty array so we should give show the user that there is no trailer for this
      if (trailerkeyResponse.data.data.results.length !== 0) {
        // the data is an array of video so we get the first one
        let trailerVideoKey = trailerkeyResponse.data.data.results[0].key;
        setTrailerKeyData({ data: trailerVideoKey, error: null });
      } else {
        // array = 0 = no trailer for this movie
        setTrailerKeyData({
          data: null,
          error: "Sorry no trailer available for this",
        });
      }
    } else {
      console.log(trailerkeyResponse.data);
      let trailerVideoKeyError = trailerkeyResponse.error.message;
      setTrailerKeyData({ data: null, error: trailerVideoKeyError });
    }
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
    <div className={`${classes.container} ${className}`} onClick={redirectToMovieDetails}>
      {/* login and registration modal */}
      {loginModalIsActive && <LoginModal onClose={hideModalHandler} />}

      {/* trailer modal */}
      {TrailerModalIsActive && trailerKeyData && (
        <TrailerModal videoKey={trailerKeyData} onClose={hideModalHandler} />
      )}

      <figure className={`${classes["movie-img-container"]} mb-0`}>
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
