import { useSelector } from 'react-redux';
import React, { useState } from 'react';

import classes from './MovieList.module.scss';
import Movie from './Movie/Movie';
import FullMovie from './FullMovie/FullMovie';
import Spinner from '../../components/UI/Spinner/Spinner';
import Modal from '../../components/UI/Modal/Modal';

const MovieList = (props) => {
  const [showModal, setShowModal] = useState(false);
  const [clickedMovieId, setclickedMovieId] = useState('');

  const searchResult = useSelector((state) => {
    return state.searchResult;
  });

  const genres = useSelector((state) => {
    return state.movieGenres;
  });

  const loadingMovieList = useSelector((state) => {
    return state.loadingMovieList;
  });

  const errorMovieList = useSelector((state) => {
    return state.errorMovieList;
  });

  const updateGenres = (genres, movieGenres) => {
    let updatedGenres = [];

    genres.forEach((genre) => {
      movieGenres.forEach((genreId) => {
        if (genre.id === genreId) {
          updatedGenres.push(genre.name);
        }
      });
    });

    return updatedGenres;
  };

  const loadSingleMovie = (id) => {
    setShowModal(true);
    setclickedMovieId(id);
  };

  let movieList =
    searchResult === null ? null : (
      <React.Fragment>
        {searchResult.length > 0 ? (
          <h2>{searchResult.length} Search result(s)</h2>
        ) : (
          <h2>Sorry, there is not results for your searching.</h2>
        )}

        <div className={classes.Movies}>
          {searchResult
            ? searchResult.map((movie) => {
                return (
                  <Movie
                    key={movie.id}
                    title={movie.title}
                    releaseDate={movie.release_date}
                    posterPath={movie.poster_path}
                    backdropPath={movie.backdrop_path}
                    genres={updateGenres(genres, movie.genre_ids)}
                    clicked={() => loadSingleMovie(movie.id)}
                  />
                );
              })
            : null}
        </div>
      </React.Fragment>
    );

  if (loadingMovieList) {
    movieList = <Spinner />;
  }

  return (
    <React.Fragment>
      <Modal showModal={showModal} closeModal={() => setShowModal(false)}>
        <FullMovie closeModal={() => setShowModal(false)} movieId={clickedMovieId} />
      </Modal>

      <div className={classes.MovieList}>
        {errorMovieList ? (
          <h1 className={classes.Error}>
            Sorry something went wrong. Please try again later. :(
          </h1>
        ) : (
          movieList
        )}
      </div>
    </React.Fragment>
  );
};

export default MovieList;
