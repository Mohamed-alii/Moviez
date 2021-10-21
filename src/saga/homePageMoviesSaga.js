import { takeLatest, call, put } from "redux-saga/effects";
import {
  intiateHomePageData,
  homePageDataSucceed,
  homePageDataFailed,
} from "../store/moviesSlice";
import {
  getTrendingMoviesRequest,
  getTopRatedMoviesRequest,
  getNowPlayingMoviesRequest,
  getPopularMoviesRequest,
  getUpcomingMoviesRequest
} from "../api/moviesAPI";
import {
  getTopRatedTvrequest,
  getTrendingTvRequest
} from '../api/tvAPI';

export function* homePageMoviesWatcher() {
  yield takeLatest( intiateHomePageData, homePageMoviesHandler);
}

export function* homePageMoviesHandler() {
    //  trending movies
    const trendingMovies = yield call(getTrendingMoviesRequest);
    if(trendingMovies.data){
        yield put( homePageDataSucceed({data: trendingMovies.data.data.results , type: 'trendingMovies'}) )
    }else{
        yield homePageDataFailed({error: trendingMovies.error.message, type: 'trendingMovies'})
    }
    // nowplaying movies
    const nowPlaying = yield call(getNowPlayingMoviesRequest);
    if(nowPlaying.data){
        yield put( homePageDataSucceed({data: nowPlaying.data.data.results , type: 'nowPlaying'}) )
    }else{
        yield homePageDataFailed({error: nowPlaying.error.message, type: 'nowPlaying'})
    }
    // topRated movies
    const topRated = yield call(getTopRatedMoviesRequest);
    if(topRated.data){
        yield put( homePageDataSucceed({data: topRated.data.data.results , type: 'topRated'}) )
    }else{
        yield homePageDataFailed({errpr: topRated.error.message, type: 'topRated'})
    }
    // popular movies
    const popular = yield call(getPopularMoviesRequest);
    if(popular.data){
        yield put( homePageDataSucceed({data: popular.data.data.results , type: 'popular'}) )
    }else{
        yield homePageDataFailed({error: popular.error.message, type: 'popular'})
    }
    // upcoming movies
    const upcoming = yield call(getUpcomingMoviesRequest);
    if(upcoming.data){
        yield put( homePageDataSucceed({data: upcoming.data.data.results , type: 'upcoming'}) )
    }else{
        yield homePageDataFailed({error: upcoming.error.message, type: 'upcoming'})
    }
    // trending tv
    const trendingTvSeries = yield call(getTrendingTvRequest);
    if(trendingTvSeries.data){
        yield put( homePageDataSucceed({data: trendingTvSeries.data.data.results , type: 'trendingTv'}) )
    }else{
        yield homePageDataFailed({error: trendingTvSeries.error.message, type: 'trendingTv'})
    }
    // topRated tv 
    const topRatedTvSeries = yield call(getTopRatedTvrequest);
    if(topRatedTvSeries.data){
        yield put( homePageDataSucceed({data: topRatedTvSeries.data.data.results , type: 'topRatedTv'}) )
    }else{
        yield homePageDataFailed({error: topRatedTvSeries.error.message, type: 'topRated'})
    }

}
