// import { takeLatest, call, put } from "redux-saga/effects";
// import {
//   movieDetails,
//   movieDetailsSuccess,
//   movieDetailsFailed,
// } from "../store/moviesSlice";
// import { getMovieDetailsRequest } from "../api/moviesAPI";

// export function* movieDetailsWatcher() {
//   yield takeLatest(movieDetails, movieDetailsHandler);
// }

// function* movieDetailsHandler(action) {
//   const contentType = action.payload.contentType; // tv or movie
//   const id = action.payload.id;
//   const contentDetails = yield call(getMovieDetailsRequest, contentType, id);

//   if (contentDetails.data) {
//     //success
//     yield put(movieDetailsSuccess(contentDetails.data.data));
//   } else {
//     //failed
//     yield put(movieDetailsFailed(contentDetails.error.message));
//   }
// }
