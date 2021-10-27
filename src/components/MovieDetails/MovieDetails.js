import React, { useEffect } from "react";
import { useParams, useLocation } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import { movieDetails } from "../../store/moviesSlice";
import classes from "./MovieDetails.module.css";
import MovieDetailsHeader from "./MovieDetailsHeader";

const MovieDetails = () => {
  const { id } = useParams();
  const location = useLocation();
  const dispatch = useDispatch();
  const contentDetails = useSelector((state) => state.moviesData.movieDetals);

  const urlType = location.pathname.split("/")[1];
  const type = urlType === "movie" ? "movie" : "tv";


  useEffect(() => {
    dispatch(movieDetails({ contentType: type, id: id }));
  }, []);


  if (!contentDetails) {
    return <div className="text-white">loading</div>;
  }

  return (
    <main className={`${classes["content-details"]} container mx-auto row mt-5 pt-5 `}>
      <MovieDetailsHeader contentDetails={contentDetails} type={type} />
      <section className={`${classes["imgs"]} col-12`}></section>
      <section className={`${classes["similar-content"]} col-12`}></section>
    </main>
  );
};

export default MovieDetails;
