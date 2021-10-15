import { takeLatest, call, put } from "redux-saga/effects";
import {
  registerRequest,
  registerRequestFailed,
  registerRequestSuccess,
} from "../store/authSlice";

const registrationUrl = `https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=${process.env.REACT_APP_MOVIES_API_KEY}`; //sign up

const registertionHttp = (registrationData) => {
  return fetch(registrationUrl, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(registrationData),
  })
    .then((res) => res.json())
    .then((data) => {
      // checking if we get the data or an error from the server
      if (data.error.message) {
        // passing the error msg we got from the server
        throw new Error(data.error.message);
      }
      return data;
    })
    .catch((error) => {
      throw new Error(error.message);
    });
};

export function* signupWatcher() {
  yield takeLatest(registerRequest, signupHandler);
}

function* signupHandler(action) {
  try {
    const registrationData = yield call(registertionHttp, action.payload);
    yield put(registerRequestSuccess(registrationData));
    yield action.payload.browserHistory.push('/');
  } catch (error) {
    yield put(registerRequestFailed(error.message || "Something went wrong!"));
    yield alert(error.message);
  }

}
