import * as actionTypes from '../actions/actionTypes';
import { updateObject } from '../../shared/utility';

const initialState = {
  searchResult: null,
  movieGenres: {},
  loadingMovieList: false,
  loadingSingleMovie: false,
  errorMovieList: false,
  errorSingleMovie: false,
  singleMovieDetails: {},
};

const initMovieGenresSuccess = (state, action) => {
  return updateObject(state, {
    movieGenres: action.movieGenres,
  });
};
const initMovieGenresFailed = (state, action) => {
  return updateObject(state, {
    errorMovieList: true,
  });
};

const startFetchingSearchResult = (state, action) => {
  return updateObject(state, { loadingMovieList: true });
};

const setSearchResult = (state, action) => {
  return updateObject(state, {
    searchResult: action.searchResult,
    loadingMovieList: false,
  });
};

const getSearchResultFailed = (state, action) => {
  return updateObject(state, {
    errorMovieList: true,
    loadingMovieList: false,
  });
};

const startFetchingSingleMovie = (state, action) => {
  return updateObject(state, {
    loadingSingleMovie: true,
    singleMovieDetails: {},
    errorSingleMovie: false,
  });
};

const getSingleMovieSuccess = (state, action) => {
  return updateObject(state, {
    loadingSingleMovie: false,
    singleMovieDetails: action.movie,
  });
};

const getSingleMovieFailed = (state, action) => {
  return updateObject(state, { errorSingleMovie: true, loadingSingleMovie: false });
};

const reducer = (state = initialState, action) => {
  if (action.type === actionTypes.INIT_MOVIE_GENRES_SUCCESS) {
    return initMovieGenresSuccess(state, action);
  }
  if (action.type === actionTypes.INIT_MOVIE_GENRES_FAILED) {
    return initMovieGenresFailed(state, action);
  }

  if (action.type === actionTypes.START_FETCHING_SEARCH_RESULT) {
    return startFetchingSearchResult(state, action);
  }

  if (action.type === actionTypes.SET_SEARCH_RESULT) {
    return setSearchResult(state, action);
  }

  if (action.type === actionTypes.GET_SEARCH_RESULT_FAILED) {
    return getSearchResultFailed(state, action);
  }

  if (action.type === actionTypes.START_FETCHING_SINGLE_MOVIE) {
    return startFetchingSingleMovie(state, action);
  }
  if (action.type === actionTypes.GET_SINGLE_MOVIE_SUCCESS) {
    return getSingleMovieSuccess(state, action);
  }
  if (action.type === actionTypes.GET_SINGLE_MOVIE_FAILED) {
    return getSingleMovieFailed(state, action);
  }

  return state;
};

export default reducer;
