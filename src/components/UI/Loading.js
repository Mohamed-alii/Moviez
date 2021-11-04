import React, { useEffect } from "react";
import classes from './Loading.module.css';

const Loading = () => {

  useEffect(() => {
    document.body.style.overflowY = 'hidden';
    return () => {
      document.body.style.overflowY = 'auto';
    }
  }, [])

  return (
    <div className={`${classes.loading_container} d-flex align-items-center justify-content-center`}>
      <div className="spinner-border text-danger " role="status"></div>
    </div>
  );
};

export default Loading;
