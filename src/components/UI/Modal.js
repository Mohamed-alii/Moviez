import React, { Fragment } from "react";
import reactDom from "react-dom";
import Backdrop from "./Backdrop";
import ModalContent from "./ModalContent";

const Modal = (props) => {
  const portalElement = document.getElementById("overlay");
  return (
    <Fragment>
      {reactDom.createPortal(<Backdrop onClose={props.onClose} />, portalElement)}
      {reactDom.createPortal(
        <ModalContent>{props.children}</ModalContent>,
        portalElement
      )}
    </Fragment>
  );
};

export default Modal;
