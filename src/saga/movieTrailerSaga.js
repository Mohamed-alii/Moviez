// import { takeLatest, put, call } from "@redux-saga/core/effects";
// import {
//   getMovieTrailer,
//   getMovieTrailerSucceed,
//   getMovieTrailerFailed,
//   showTrailerModal,
// } from "../store/moviesSlice";
// import { getMovieVideos } from "../api/moviesAPI";

// export function* movieTrailerWatcher() {
//     yield takeLatest(getMovieTrailer , movieTrailerHandler);
// }

// export function* movieTrailerHandler(action) {
//     const movieVideos = yield call(getMovieVideos , action.payload);

//     if(movieVideos.data){
//         yield put(getMovieTrailerSucceed(movieVideos.data.data.results));
//         yield put(showTrailerModal())
//     }else{
//         yield put(getMovieTrailerFailed(movieVideos.error.message));
//     }
// }
