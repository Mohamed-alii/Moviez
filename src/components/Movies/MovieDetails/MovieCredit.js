import React, { useState, useEffect } from "react";
import classes from "./MovieCredit.module.css";
import { getMovieCreditRequest, imgPrefix } from "../../../api/moviesAPI";

const MovieCredit = ({ contentDetails, type }) => {
  const [movieCredit, setMovieCredit] = useState(null);
  const [movieCreditError, setMovieCreditError] = useState(null);

  useEffect(() => {
    const getMovieCredit = async () => {
      const movieCreditData = await getMovieCreditRequest(
        type,
        contentDetails.id
      );
      if (movieCreditData.data) {
        //success
        setMovieCredit(movieCreditData.data.data.cast);
      } else {
        //failed
        setMovieCreditError(movieCreditData.error.message);
      }
    };

    getMovieCredit();
  }, []);

  const movieCreditList =
    movieCredit &&
    movieCredit.map((castMember) => (
      <div key={castMember.id}
        className={`${classes.font} col-6 col-sm-6 col-md-4 col-lg-3  d-flex  flex-column text-center `}
      >
        <figure className={`${classes["cast-img"]} mx-auto`}>
          <img
            src={imgPrefix + castMember.profile_path}
            alt={`${castMember.gender == 2 ? 'actor' : 'actress'} ${castMember.name} photo`}
          />
        </figure>
        <h6>{castMember.name}</h6>
        <p className="text-secondary">as {castMember.character}</p>
      </div>
    ));

  return (
    <section className="mb-3 col-12">
        <div className='horizontal-line'></div>
      <header>
        <h3 className={`${classes.header} `}>Top cast</h3>
      </header>
      <div className="row px-3">{movieCreditList}</div>
    </section>
  );
};

export default MovieCredit;
