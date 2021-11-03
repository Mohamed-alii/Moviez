import { createSlice } from "@reduxjs/toolkit";
import { timer } from "../App";

const calculateExpirationDate = (expirationTime) => {
  const remainingTime = new Date(+expirationTime * 1000 + new Date().getTime());
  return remainingTime;
};

const calculateRemainingTime = (expirationDate) => {
  if(expirationDate){
  const currentTime = new Date().getTime();
  const adjExpirationTime = new Date(expirationDate).getTime();
  const remainingTime = adjExpirationTime - currentTime; // if +ve we still logged in
  return remainingTime;
  }
  return null;
};

const retrieveStoredToken = () => {
  const storedToken = localStorage.getItem("token");
  const storedExpirationDate = localStorage.getItem("expirationDate");
  const remainingTime = calculateRemainingTime(storedExpirationDate);

  if (remainingTime <= 60000) {
    //if less then 60 sec seconds then logout
    localStorage.removeItem("expirationDate");
    localStorage.removeItem("token");
    return null;
  }
  return {
    token: storedToken,
    duration: remainingTime,
  };
};

const initialState = {
  userIsLoggedIn: retrieveStoredToken() ? true : false,
  username: "",
  email: localStorage.getItem('email') ?  localStorage.getItem('email') : '',
  error: null,
  isLoading: false,
  token: retrieveStoredToken() ? retrieveStoredToken().token : null,
  expirationRemainingTime: calculateRemainingTime(localStorage.getItem('expirationDate')),
};

export const authSlice = createSlice({
  name: "authentication",
  initialState,
  reducers: {
    loginRequest(state) {
      state.isLoading = true;
      state.error = null;
    },
    loginRequestSuccess(state, action) {
      state.isLoading = false;
      state.email = action.payload.email;
      state.token = action.payload.idToken;
      state.userIsLoggedIn = true;
      const expirationDate = calculateExpirationDate(action.payload.expiresIn);
      localStorage.setItem("token", action.payload.idToken);
      localStorage.setItem("expirationDate", expirationDate);
      localStorage.setItem("email", action.payload.email);
    },
    loginRequestFailed(state, action) {
      state.isLoading = false;
      state.error = action.payload;
    },
    registerRequest(state) {
      state.isLoading = true;
      state.error = null;
    },
    registerRequestSuccess(state, action) {
      state.isLoading = false;
      state.email = action.payload.email;
      state.token = action.payload.idToken;
      state.userIsLoggedIn = true;
      const remainingTime = calculateExpirationDate(action.payload.expiresIn);
      localStorage.setItem("token", action.payload.idToken);
      localStorage.setItem("expirationDate", remainingTime);
      localStorage.setItem("email", action.payload.email);
    },
    registerRequestFailed(state, action) {
      state.isLoading = false;
      state.error = action.payload;
    },

    logout(state) {
      if(timer){
        clearTimeout(timer);
      }
      state.token = null;
      state.userIsLoggedIn = false;
      state.email = "";
      state.expirationRemainingTime = null;
      localStorage.removeItem("email");
      localStorage.removeItem("expirationDate");
      localStorage.removeItem("token");

      //const browserHistory = action.payload;
      //browserHistory.push("/Authentication");
    },
  },
});

export const {
  loginRequestSuccess,
  loginRequestFailed,
  loginRequest,
  registerRequest,
  registerRequestSuccess,
  registerRequestFailed,
  logout,
  checkUserLoggedIn,
} = authSlice.actions;

export default authSlice.reducer;
