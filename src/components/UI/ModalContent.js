import React from "react";
import classes from "./ModalContent.module.css";

const ModalContent = (props) => {
  return <div className={classes['modal-content']} >{props.children}</div>;
};

export default ModalContent;
