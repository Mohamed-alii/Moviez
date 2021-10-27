import React from "react";
import classes from "./ModalContent.module.css";

const ModalContent = (props) => {
  return <div className={classes['modal-content']} onClick={props.onClose}>{props.children}</div>;
};

export default ModalContent;
