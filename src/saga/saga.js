import { all } from "redux-saga/effects";
import { loginWatcher } from "./loginSaga";
import { signupWatcher } from "./signupSaga";
import { homePageMoviesWatcher } from "./homePageMoviesSaga";
import { movieDetailsWatcher } from "./movieDetailsSaga";

export function* rootSaga() {
  yield all([
      loginWatcher(),
      signupWatcher(),
      homePageMoviesWatcher(),
      movieDetailsWatcher()
    ]);
}
