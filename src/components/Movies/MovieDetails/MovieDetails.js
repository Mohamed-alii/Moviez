import React, { useEffect, useState } from "react";
import { useParams, useLocation } from "react-router";
import MovieDetailsHeader from "./MovieDetailsHeader";
import MovieDetailsSimilarMovies from "./MovieDetailsSimilarMovies";
import { getMovieDetailsRequest } from "../../../api/moviesAPI";
import MovieImgs from "./MovieImgs";
import MovieCredit from "./MovieCredit";

const MovieDetails = () => {
  const { id } = useParams();
  const location = useLocation();
  const [contentDetails, setContentDetails] = useState(null);
  const [contentDetailsError, setContentDetailsError] = useState(null);
  const type = location.pathname.split("/")[1];

  useEffect(() => {
    const getContentDetails = async () => {
      const contentDetails = await getMovieDetailsRequest(type, id);
      if (contentDetails.data) {
        //success
        setContentDetails(contentDetails.data.data);
      } else {
        //failed
        setContentDetailsError(contentDetails.error.message);
      }
    };
    getContentDetails();
  }, []);

  if (!contentDetails) {
    return (
      <div className="text-white d-flex justify-content-center align-items-center w-100 h-100">
        <p>loading...</p>
      </div>
    );
  }

  return (
    <main className={`text-white container mx-auto row mt-5 pt-5 `}>
      <MovieDetailsHeader contentDetails={contentDetails} type={type}/>
      <MovieCredit contentDetails={contentDetails} type={type} />
      <MovieImgs contentDetails={contentDetails} type={type} />
      <MovieDetailsSimilarMovies contentDetails={contentDetails} type={type} />
    </main>
  );
};

export default MovieDetails;
