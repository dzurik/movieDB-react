import { useSelector, useDispatch } from 'react-redux';
import React, { useEffect, useCallback } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

import classes from './FullMovie.module.scss';
import Spinner from '../../../components/UI/Spinner/Spinner';
import * as actions from '../../../store/actions';
import { posterLoadHelper } from '../../../shared/utility';
import { GrFormClose } from 'react-icons/gr';

const FullMovie = (props) => {
  const { movieId } = props;

  const singleMovieDetails = useSelector((state) => {
    return state.singleMovieDetails;
  });

  const loadingSingleMovie = useSelector((state) => {
    return state.loadingSingleMovie;
  });

  const errorSingleMovie = useSelector((state) => {
    return state.errorSingleMovie;
  });

  const dispatch = useDispatch();

  const onLoadSingleMovie = useCallback((id) => dispatch(actions.getSingleMovie(id)), [
    dispatch,
  ]);

  useEffect(() => {
    onLoadSingleMovie(movieId);
  }, [onLoadSingleMovie, movieId]);

  const updateDateFormat = (date) => {
    if (!date) return 'Unknown';

    // prettier-ignore
    const monthArray = ['January','February','March','April','May','June','July','August','September','October','November','December',
    ];

    const [year, month, day] = date.split('-');
    let updatedDate = `${monthArray[month - 1]} ${day}, ${year}`;

    return updatedDate;
  };

  const updateListFromArray = (list) => {
    if (!list || !list.length) return 'No Data';

    let updatedlist = list.map((property) => property.name);

    return updatedlist.join(', ');
  };

  let details = (
    <React.Fragment>
      <div className={classes.ImageSide}>
        <GrFormClose className={classes.CloseButtonMobile} onClick={props.closeModal} />
        <img
          className={classes.MovieImage}
          src={posterLoadHelper(
            singleMovieDetails.backdrop_path,
            singleMovieDetails.poster_path
          )}
          alt={singleMovieDetails.title}
        />
      </div>
      <div className={classes.Details}>
        <GrFormClose className={classes.CloseButton} onClick={props.closeModal} />
        <h1>{singleMovieDetails.title}</h1>
        <p>Released: {updateDateFormat(singleMovieDetails.release_date)}</p>
        <p className={classes.Overview}>{singleMovieDetails.overview}</p>
        <ul className={classes.List}>
          <li>
            <span className={classes.ListTitle}>Country</span>
            {updateListFromArray(singleMovieDetails.production_countries)}
          </li>
          <li>
            <span className={classes.ListTitle}>Genres</span>
            {updateListFromArray(singleMovieDetails.genres)}
          </li>
          <li>
            <span className={classes.ListTitle}>Length</span>
            {singleMovieDetails.runtime} mins
          </li>
        </ul>

        <Link
          to={{ pathname: `https://www.imdb.com/title/${singleMovieDetails.imdb_id}/` }}
          target="_blank"
        >
          <button className={classes.ToIMdb}>More Details on IMDb</button>
        </Link>
      </div>
    </React.Fragment>
  );

  if (loadingSingleMovie) {
    details = <Spinner />;
  }

  return (
    <div className={classes.FullMovie}>
      {errorSingleMovie ? (
        <h1 className={classes.Error}>
          Sorry something went wrong. Please try again later. :(
        </h1>
      ) : (
        details
      )}
    </div>
  );
};

FullMovie.propTypes = {
  closeModal: PropTypes.func,
};

export default FullMovie;
