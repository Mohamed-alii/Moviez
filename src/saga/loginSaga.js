import { takeLatest, call, put } from "redux-saga/effects";
import {
  loginRequest,
  loginRequestFailed,
  loginRequestSuccess,
} from "../store/authSlice";

const apiUrl = `https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${process.env.REACT_APP_MOVIES_API_KEY}`; // login

const loginHttp = (loginData) => {
  return fetch(apiUrl, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(loginData),
  })
    .then((res) => res.json())
    .then((data) => {
      // checking if we get the data or an error from the server
      if (data.error) {
        // passing the error msg we got from the server 
        throw new Error(data.error.message);
      }
      return data;
    })
    .catch((error) => {
      throw new Error(error.message);
    });
};

export function* loginWatcher() {
  yield takeLatest(loginRequest, loginHandler);
}

function* loginHandler(action) {
  try {
    const loginData = yield call(loginHttp, action.payload);
    yield put(loginRequestSuccess(loginData));
    yield action.payload.browserHistory.push('/');
  } catch (error) {
    yield put(loginRequestFailed(error.message || "Something went wrong!"));
    yield alert(error.message)
  }
}
