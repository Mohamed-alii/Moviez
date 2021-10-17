import React from "react";
import { Nav, Navbar, Form, FormControl, Button } from "react-bootstrap";
import { NavLink, Link } from "react-router-dom";
import classes from "./MainNavigation.module.css";
import { useSelector, useDispatch } from "react-redux";
import { logout } from "../../store/authSlice";
import UserDropdown from '../UserDropdown/UserDropdown';

const MainNavigation = () => {

  return (
    <Navbar bg="dark" expand="lg">
      <Navbar.Brand>
        <Link className={`${classes.brand} mx-2`} to='/Home'>Movies</Link>
      </Navbar.Brand>
      <Navbar.Toggle aria-controls="navbarScroll" />
      <Navbar.Collapse className='justify-content-between' id="navbarScroll">
        <Nav
          className="mr-auto my-2 my-lg-0 text-center"
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
            className={` ${classes['search-input']} ${classes.outline} mx-2`}
            type="search"
            placeholder="Search"
            aria-label="Search"
          />
          <Button variant="outline-success" className={`${classes.btn} mx-2`}>Search</Button>
        </Form>

        <UserDropdown />

      </Navbar.Collapse>
    </Navbar>
  );
};

export default MainNavigation;
