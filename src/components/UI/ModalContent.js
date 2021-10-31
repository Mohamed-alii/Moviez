import React from "react";
import classes from "./ModalContent.module.css";

const ModalContent = (props) => {
  const stopHidingModal = (event) => {
    event.stopPropagation();
  }
  return <div className={classes['modal-content']} onClick={stopHidingModal}>{props.children}</div>;
};

export default ModalContent;
