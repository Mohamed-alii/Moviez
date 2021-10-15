import React from "react";
import { Nav, Navbar, Form, FormControl, Button } from "react-bootstrap";
import { NavLink } from "react-router-dom";
import classes from "./MainNavigation.module.css";
import { useSelector, useDispatch } from "react-redux";
import { logout } from "../../store/authSlice";
import { useHistory } from "react-router";

const MainNavigation = () => {
  const browserHistory = useHistory();
  const dispatch = useDispatch();
  const userIsLoggedIn = useSelector((state) => state.auth.userIsLoggedIn);

  const logoutHandler = () => {
    dispatch(logout(browserHistory));
  };

  return (
    <Navbar bg="dark" expand="lg">
      <Navbar.Brand>Movies</Navbar.Brand>
      <Navbar.Toggle aria-controls="navbarScroll" />
      <Navbar.Collapse id="navbarScroll">
        <Nav
          className="mr-auto my-2 my-lg-0"
          style={{ maxHeight: "100px" }}
          navbarScroll
        >
          <NavLink
            activeClassName={classes.active}
            className={`${classes.link} px-2`}
            to="/Home"
          >
            Home
          </NavLink>
          <NavLink
            activeClassName={classes.active}
            className={`${classes.link} px-2`}
            to="/Profile"
          >
            Profile
          </NavLink>
        </Nav>
        <Form className="d-flex">
          <FormControl
            type="search"
            placeholder="Search"
            className="mr-2"
            aria-label="Search"
          />
          <Button variant="outline-success">Search</Button>
        </Form>
        {userIsLoggedIn && (
          <Button onClick={logoutHandler} variant="outline-success">
            Logout
          </Button>
        )}
      </Navbar.Collapse>
    </Navbar>
  );
};

export default MainNavigation;
