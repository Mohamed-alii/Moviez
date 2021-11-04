import React, { useState , useEffect } from "react";
import { Form } from "react-bootstrap";
import classes from "./Auth.module.css";
import Card from "../../components/UI/Card";
import Button from "../../components/UI/Button";
import useInput from "../../Hooks/use-input";
import { useDispatch , useSelector } from "react-redux";
import { loginRequest , registerRequest } from "../../store/authSlice";
import { useHistory } from "react-router";

const validateEmail = (inputValue) => {
  const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(String(inputValue).toLowerCase());
}
const validatePassword = (inputValue) => {// at least 8 charcters , one letter and one number
  const re = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/;
  return re.test(inputValue);
}
const validateUsername = (inputValue) => {// at least 8 charcters , no _ or . 
  const re = /^(?=.{3,20}$)(?![_.])(?!.*[_.]{2})[a-zA-Z0-9._]+(?<![_.])$/;
  return re.test(inputValue);
}


const Auth = () => {
  const [isLoginForm, setIsLoginForm] = useState(true); // use for changing the view between login and registration
  const dispatch = useDispatch();
  const browserHistory = useHistory();

  const authenticationData = useSelector( state => state.auth );

  useEffect(() => {
    if(authenticationData.token){
      browserHistory.push('/')
    }
  }, [])


  const {
    value: emailValue,
    isValid: emailIsValid,
    hasError: emailHasError, //for styling the invalid input
    inputBlurHandler: emailInputBlurHandler,
    valueChangeHandler: emailInputChangeHandler,
  } = useInput( validateEmail ); // here we pass our validation func

  const {
    value: userNameValue,
    isValid: userNameIsValid,
    hasError: userNameHasError, //for styling the invalid input
    inputBlurHandler: userNameInputBlurHandler,
    valueChangeHandler: userNameInputChangeHandler,
  } = useInput( validateUsername ); // here we pass our validation func

  const {
    value: passwordValue,
    isValid: passwordIsValid,
    hasError: passwordHasError, //for styling the invalid input
    inputBlurHandler: passwordInputBlurHandler,
    valueChangeHandler: passwordInputChangeHandler,
  } = useInput( validatePassword ); // here we pass our validation func

  const loginFormIsValid = emailIsValid && passwordIsValid;
  const registrationFormIsValid = emailIsValid && passwordIsValid && userNameIsValid;


  const formSubmitHandler = (event) => {
    event.preventDefault();

    if(isLoginForm){//login submit
      if(loginFormIsValid){
        dispatch( loginRequest({
          email: emailValue,
          password: passwordValue,
          returnSecureToken: true,
          browserHistory,// we sent browserHistory to saga to redirect then to home page after login success
        }) )
      }
    }else{// registeration submit
      if(registrationFormIsValid){
        dispatch( registerRequest({
          email: emailValue,
          password: passwordValue,
          returnSecureToken: true,
          browserHistory,// we sent browserHistory to saga to redirect then to home page after registration success
        }) )
      }
    }
    
  };

  const loginFormHandler = () => {
    setIsLoginForm(true);
  };

  const registerFormHandler = () => {
    setIsLoginForm(false);
  };

  const userNameInputClasses = userNameHasError
  ? `${classes.outline} ${classes.invalid} ` 
  : `${classes.outline} ${classes.input}`;

  const emailInputClasses = emailHasError
  ? `${classes.outline} ${classes.invalid} ` 
  : `${classes.outline} ${classes.input}`;

  const passwordInputClasses = passwordHasError
  ? `${classes.outline} ${classes.invalid} ` 
  : `${classes.outline} ${classes.input}`;

  return (
    <div className={classes["container-auth"]}>
      <div className="row w-100">
        <Card
          className={`${classes["form-container"]} ${classes.blur}  p-3 offset-1 col-10 offset-sm-2 col-sm-8 offset-md-3 col-md-6 offset-lg-4 col-lg-4 `}
        >
          <header className="d-flex flex-column align-items-center">
            <h2 className={classes.header}>Movies</h2>

            <div className="d-flex mb-3">
              <button
                onClick={loginFormHandler}
                className={`${classes["register-btns"]} ${
                  isLoginForm ? "text-white" : classes["text-grey"]
                }`}
              >
                Login
              </button>
              <div className={classes.line}></div>
              <button
                onClick={registerFormHandler}
                className={`${classes["register-btns"]} ${
                  isLoginForm ? classes["text-grey"] : "text-white"
                }`}
              >
                Register
              </button>
            </div>

            {isLoginForm ? (
              <p>Login to access your account</p>
            ) : (
              <p>Create your account now </p>
            )}
          </header>
          <Form onSubmit={formSubmitHandler} className="px-4">
            {isLoginForm ? (
              ""
            ) : (
              <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Control
                  value={userNameValue}
                  onChange={userNameInputChangeHandler}
                  onBlur={userNameInputBlurHandler}
                  className={userNameInputClasses}
                  type="text"
                  placeholder="Enter your name"
                />
                <Form.Text className="text-muted"></Form.Text>
                {/* error message */}
                {userNameHasError && <p className={classes['error-text']}>username must have at least 3 characters and should not contain _ or .</p>}
              </Form.Group>
              
            )}

            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Control
                value={emailValue}
                onChange={emailInputChangeHandler}
                onBlur={emailInputBlurHandler}
                className={emailInputClasses}
                type="email"
                placeholder="Email Address"
              />
              <Form.Text className="text-muted"></Form.Text>
              {/* error message */}
              {emailHasError && <p className={classes['error-text']}>Email must have valid email format</p>}
            </Form.Group>
              
            <Form.Group className="mb-3" controlId="formBasicPassword">
              <Form.Control
                value={passwordValue}
                onChange={passwordInputChangeHandler}
                onBlur={passwordInputBlurHandler}
                className={passwordInputClasses}
                type="password"
                placeholder="Password"
              />
              {/*invalid password error message */}
              {passwordHasError && <p className={classes['error-text']}>password must have at least 8 characters , one letter and one number</p>}
            </Form.Group>

            <Form.Group controlId="formBasicCheckbox">
              <Form.Check
                className={`${classes["form-check-input"]} mb-3`}
                type="checkbox"
                label="Remember me"
              />
            </Form.Group>
            <div className="w-100 d-flex justify-content-center">
              <Button
                disabled={(!loginFormIsValid && isLoginForm) || (!registrationFormIsValid && !isLoginForm)}
                className={`${classes.btn} ${classes.outline} btn-bill px-4 py-2`}
                type={'submit'}
              >
                {isLoginForm ? "Login" : "Register"}
              </Button>
            </div>
          </Form>
        </Card>
      </div>
    </div>
  );
};

export default Auth;
