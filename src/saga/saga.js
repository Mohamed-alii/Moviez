import { all } from "redux-saga/effects";
import { loginWatcher } from "./loginSaga";
import { signupWatcher } from "./signupSaga";

export function* rootSaga() {
  yield all([
      loginWatcher(),
      signupWatcher(),
    ]);
}
