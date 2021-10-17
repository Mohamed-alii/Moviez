import React, { useState } from "react";
import classes from "./UserDropdown.module.css";
import { Button } from "react-bootstrap";
import { useHistory } from "react-router";
import { useSelector, useDispatch } from "react-redux";
import { logout } from "../../store/authSlice";
import { Link } from "react-router-dom";
import defaultUserImg from "../../assets/user.png";

const UserDropdown = () => {
  const [userDropdownIsActive, setUserDropdownIsActive] = useState(true);
  const browserHistory = useHistory();
  const dispatch = useDispatch();
  const userAuthenticationData = useSelector((state) => state.auth);

  const menuToggleHandler = () => {
    setUserDropdownIsActive((prevState) => !prevState);
  };

  const signInHandler = () => {
    browserHistory.push("/authentication");
  };

  const createAccountHandler = () => {
    browserHistory.push("/authentication");
  };

  const logoutHandler = () => {
    dispatch(logout());
    browserHistory.replace("/authentication");
  };

  return (
    <>
      <div className={classes["profile-container"]}>
        <div onClick={menuToggleHandler} className={`${classes.profile} `}>
          <img
            className={`${classes["profile-img"]}`}
            alt="username"
            src={defaultUserImg}
          />
        </div>
      </div>
      <div
        className={`${classes.menu} ${
          userDropdownIsActive ? classes.active : ""
        } p-2`}
      >
        {userAuthenticationData.token && (
          <h3
            className={`${classes["profile-name"]} text-center py-2 font-weight-bold`}
          >
            {userAuthenticationData.email}
          </h3>
        )}
        <ul>
          {!userAuthenticationData.token && (
            <li>
              <Button
                onClick={signInHandler}
                className={`${classes["btn-purple"]} w-100 mb-2`}
              >
                Sign in{" "}
              </Button>
              <Button
                onClick={createAccountHandler}
                className={`${classes["btn-purple"]} w-100 `}
              >
                Create account
              </Button>
            </li>
          )}
          {userAuthenticationData.token && (
            <>
              <li>
                <Link
                  to="/Profile"
                  className={`${classes.link} d-flex justify-content-center`}
                >
                  profile
                </Link>
              </li>
              <li>
                <Button
                  onClick={logoutHandler}
                  className={`${classes["btn-purple"]} w-100 `}
                >
                  Logout
                </Button>
              </li>
            </>
          )}
        </ul>
      </div>
    </>
  );
};

export default UserDropdown;
