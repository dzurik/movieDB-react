import * as actionTypes from './actionTypes';
import axios from 'axios';

const initMovieGenresSuccess = (genres) => {
  return {
    type: actionTypes.INIT_MOVIE_GENRES_SUCCESS,
    movieGenres: genres,
  };
};
const initMovieGenresFailed = () => {
  return {
    type: actionTypes.INIT_MOVIE_GENRES_FAILED,
  };
};

export const initMovieGenres = () => {
  return (dispatch) => {
    axios
      .get(
        'https://api.themoviedb.org/3/genre/movie/list?api_key=2f867a6607457543947012740db7e7e2&language=en-US'
      )
      .then((response) => {
        console.log('Genres init:');
        console.log(response.data.genres);
        console.log('--------------------');
        dispatch(initMovieGenresSuccess(response.data.genres));
      })
      .catch((err) => dispatch(initMovieGenresFailed()));
  };
};

const startFetchingSearchResult = () => {
  return {
    type: actionTypes.START_FETCHING_SEARCH_RESULT,
  };
};

const setSearchResult = (searchResult) => {
  return {
    type: actionTypes.SET_SEARCH_RESULT,
    searchResult: searchResult,
  };
};

const getSearchResultFailed = () => {
  return {
    type: actionTypes.GET_SEARCH_RESULT_FAILED,
  };
};

export const getSearchResult = (title) => {
  return (dispatch) => {
    dispatch(startFetchingSearchResult());
    axios
      .get(
        `https://api.themoviedb.org/3/search/movie?api_key=2f867a6607457543947012740db7e7e2&language=en-US&page=1&include_adult=false&query=${title}`
      )
      .then((response) => {
        console.log('Search result:');
        console.log(response.data.results);
        console.log('--------------------');
        dispatch(setSearchResult(response.data.results));
      })
      .catch((error) => dispatch(getSearchResultFailed()));
  };
};

const startFetchingSingleMovie = () => {
  return {
    type: actionTypes.START_FETCHING_SINGLE_MOVIE,
  };
};

const getSingleMovieSuccess = (movie) => {
  return {
    type: actionTypes.GET_SINGLE_MOVIE_SUCCESS,
    movie: movie,
  };
};

const getSingleMovieFailed = () => {
  return {
    type: actionTypes.GET_SINGLE_MOVIE_FAILED,
  };
};

export const getSingleMovie = (id) => {
  return (dispatch) => {
    dispatch(startFetchingSingleMovie());

    axios
      .get(
        `https://api.themoviedb.org/3/movie/${id}?api_key=2f867a6607457543947012740db7e7e2&language=en-US`
      )
      .then((response) => {
        console.log('Single Movie details:');
        console.log(response.data);
        console.log('--------------------');
        dispatch(getSingleMovieSuccess(response.data));
      })
      .catch((err) => dispatch(getSingleMovieFailed()));
  };
};
