import { all } from "redux-saga/effects";
import { loginWatcher } from "./loginSaga";
import { signupWatcher } from "./signupSaga";
import { homePageMoviesWatcher } from "./homePageMoviesSaga";

export function* rootSaga() {
  yield all([
      loginWatcher(),
      signupWatcher(),
      homePageMoviesWatcher(),
    ]);
}
