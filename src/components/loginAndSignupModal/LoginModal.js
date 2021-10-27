import React from "react";
import Modal from "../UI/Modal";
import classes from "./LoginModal.module.css";
import { useHistory } from "react-router";
import { ImCancelCircle } from 'react-icons/im'

const LoginModal = (props) => {
    const history = useHistory();

    const loginDirectHandler = () => {
        history.push('/Authentication');
    }

    const noHideHandler = (e) => {
      e.stopPropagation()
    }

  return (
    <Modal onClose={props.onClose} onClick={noHideHandler}>
      <div className={classes["loginModal-container"]} onClick={noHideHandler}>
          <button onClick={props.onClose} className={classes.cancel}>
              <ImCancelCircle />
          </button>
        <h6 className={`${classes.header} mt-4`}>
          Please login first in order to add to your favourites{" "}
        </h6>
        <div className={classes['btns-container']}>
          <button onClick={loginDirectHandler} className={`${classes.btn} mx-1`}>login</button>
          <button onClick={loginDirectHandler} className={`${classes.btn} mx-1`}>signup</button>
        </div>
      </div>
    </Modal>
  );
};

export default LoginModal;
