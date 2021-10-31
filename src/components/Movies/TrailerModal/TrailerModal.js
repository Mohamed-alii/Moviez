import React, { useEffect, useState } from "react";
import Modal from "../../UI/Modal";
import classes from "./TrailerModal.module.css";
import { getMovieVideos } from "../../../api/moviesAPI";

const TrailerModal = (props) => {
  const [trailerKeyData, setTrailerKeyData] = useState({
    data: null,
    error: null,
  });

  useEffect(() => {
    const getTrailer = async () => {
      const trailerkeyResponse = await getMovieVideos(props.id, props.type); // type = movie or tv
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
        let trailerVideoKeyError = trailerkeyResponse.error.message;
        setTrailerKeyData({ data: null, error: trailerVideoKeyError });
      }
    };

    getTrailer();
  }, []);

  if (trailerKeyData.error !== null) {
    return (
      <Modal onClose={props.onClose}>
        <div
          className={`${classes["modal-content-error"]} d-flex align-items-center justify-content-center`}
        >
          <h4 className="text-white">{trailerKeyData.error}</h4>
        </div>
      </Modal>
    );
  }

  return (
    <Modal onClose={props.onClose}>
      <iframe
        className={classes["trailer-video"]}
        src={`https://www.youtube.com/embed/${trailerKeyData.data}`}
      ></iframe>
    </Modal>
  );
};

export default TrailerModal;
