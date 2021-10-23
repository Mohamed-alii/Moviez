import React, { useState } from "react";
import classes from "./Movie.module.css";
import { imgPrefix, getMovieVideos } from "../../../api/moviesAPI";
import { AiOutlinePlus } from "react-icons/ai";
import TrailerModal from "../TrailerModal/TrailerModal";

const Movie = ({ title, img, type, id }) => {
  const [TrailerModalIsActive, setTrailerModalIsActive] = useState(false);
  const [trailerKeyData, setTrailerKeyData] = useState(null);

  console.log(title);

  const addToFavouratesHandler = () => {
    console.log("add to favourates");
  };

  const watchTrailerHandler = async () => {
    const trailerkeyResponse = await getMovieVideos(id, type); // type = movie or tv
    if (trailerkeyResponse.data) {
      // the data is an array of video so we get the first one
      let trailerVideoKey = trailerkeyResponse.data.data.results[0].key;
      setTrailerKeyData({ data: trailerVideoKey, error: null });
    } else {
      let trailerVideoKeyError = trailerkeyResponse.error.message;
      setTrailerKeyData({ data: null, error: trailerVideoKeyError });
    }
    setTrailerModalIsActive(true);
  };

  const hideModalHandler = () => {
    setTrailerModalIsActive(false);
  };

  return (
    <div className={classes.container}>
      {TrailerModalIsActive && trailerKeyData && (
        <TrailerModal videoKey={trailerKeyData} onClose={hideModalHandler} />
      )}

      <figure className={`${classes["movie-img-container"]} mb-0`}>
        <img src={imgPrefix + img} alt={title + "movie"} />
      </figure>
      <div className={classes.overlay}>
        <button
          onClick={addToFavouratesHandler}
          className={`${classes["add-btn"]} ${classes.blur}`}
        >
          <AiOutlinePlus className={classes.icon} />
        </button>
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
