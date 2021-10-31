import React, { useState } from "react";
import { Nav, Navbar, Form, FormControl, Button } from "react-bootstrap";
import { NavLink, Link } from "react-router-dom";
import classes from "./MainNavigation.module.css";
import UserDropdown from '../UserDropdown/UserDropdown';
import LoginModal from '../loginAndSignupModal/LoginModal';
import { useLocation } from "react-router";
import { useSelector } from "react-redux";

const MainNavigation = () => {

  const [loginModalIsActive, setLoginModalIsActive] = useState(false);
  const userToken = useSelector(state => state.auth.token);
  const location = useLocation();


  const showLoginModalHandler = () => {
    if(!userToken){
      setLoginModalIsActive(true);
    }
  }

  const hideModalHandler = () => {
    setLoginModalIsActive(false);
  }

  return (
    <Navbar bg="dark" expand="lg" fixed='top'>
            {/* login and registration modal */}
            {loginModalIsActive && <LoginModal modalMessage='Please login first in order to access your favourites page' onClose={hideModalHandler} />}
      <Navbar.Brand>
        <Link className={`${classes.brand} mx-2`} to='/Home'>Movies</Link>
      </Navbar.Brand>
      <Navbar.Toggle className={classes['toggle-btn']} aria-controls="navbarScroll" />
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
            activeClassName={location.pathname === '/Favourites' ? classes.active : ''}
            className={`${classes.link} px-2`}
            to={!userToken ? location.pathname : '/Favourites'}
            onClick={showLoginModalHandler}
          >
            Favourites
          </NavLink>
        </Nav>
        <Form className="d-flex justify-content-center mb-md-2 mb-lg-0">
          <FormControl
            className={` ${classes['search-input']} ${classes.outline} mx-2 `}
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
