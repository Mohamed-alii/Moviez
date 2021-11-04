import React, { useRef, useState } from "react";
import { Nav, Navbar, Form, FormControl, Button } from "react-bootstrap";
import { NavLink, Link } from "react-router-dom";
import classes from "./MainNavigation.module.css";
import UserDropdown from '../UserDropdown/UserDropdown';
import LoginModal from '../loginAndSignupModal/LoginModal';
import { useLocation, useHistory } from "react-router";
import { useSelector } from "react-redux";

const MainNavigation = () => {

  const [loginModalIsActive, setLoginModalIsActive] = useState(false);
  const userToken = useSelector(state => state.auth.token);
  const location = useLocation();
  const history = useHistory();
  const searchInputRef = useRef();
  

  const searchHandler = (event) => {
    event.preventDefault();
    const searchQuery = searchInputRef.current.value;
    if(searchQuery){
      history.push(`/search/${searchQuery}`);
    }
  }

  const showLoginModalHandler = () => {
    if(!userToken){
      setLoginModalIsActive(true);
    }
  }

  const hideModalHandler = () => {
    setLoginModalIsActive(false);
  }

  return (
    <Navbar bg="dark" expand="lg" fixed='top' className='py-1'>
            {/* login and registration modal */}
            {loginModalIsActive && <LoginModal modalMessage='Please login first in order to access your favourites page' onClose={hideModalHandler} />}
      <Navbar.Brand>
        <Link className={`${classes.brand} mx-2`} to='/Home'>Movies</Link>
      </Navbar.Brand>
      <Navbar.Toggle className={classes['toggle-btn']} aria-controls="navbarScroll" />
      <Navbar.Collapse className='justify-content-between' id="navbarScroll">
        <Nav
          className="mr-auto my-2 my-lg-0 text-center"
          style={{ maxHeight: "1000px" }}
          navbarScroll
        >
          <NavLink
            activeClassName={classes.active}
            className={`${classes.link} px-2 my-2`}
            to="/Home"
          >
            Home
          </NavLink>
          <NavLink
            activeClassName={location.pathname === '/Favourites' ? classes.active : ''}
            className={`${classes.link} px-2 my-2`}
            to={!userToken ? location.pathname : '/Favourites'}
            onClick={showLoginModalHandler}
          >
            Favourites
          </NavLink>
        </Nav>
        <Form onSubmit={searchHandler} className="d-flex justify-content-center mb-md-2 my-lg-0 my-sm-3">
          <FormControl
            className={` ${classes['search-input']} ${classes.outline} mx-2 `}
            type="search"
            placeholder="Search"
            aria-label="Search"
            ref={searchInputRef}
          />
          <Button variant="outline-success" onClick={searchHandler} className={`${classes.btn} mx-2`}>Search</Button>
        </Form>

        <UserDropdown />

      </Navbar.Collapse>
    </Navbar>
  );
};

export default MainNavigation;
