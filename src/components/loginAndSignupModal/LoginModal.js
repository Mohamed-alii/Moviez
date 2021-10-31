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

  return (
    <Modal onClose={props.onClose}>
      <div className={classes["loginModal-container"]} >
          <button onClick={props.onClose} className={classes.cancel}>
              <ImCancelCircle />
          </button>
        <h6 className={`${classes.header} mt-4`}>
          {props.modalMessage}
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
