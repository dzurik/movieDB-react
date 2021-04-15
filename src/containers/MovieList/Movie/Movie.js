import classes from './Movie.module.scss';
import { posterLoadHelper } from '../../../shared/utility';
import PropTypes from 'prop-types';

const Movie = (props) => {
  return (
    <div className={classes.Movie} onClick={props.clicked}>
      <div className={classes.Overlay}>
        {props.releaseDate || props.genres.length ? (
          <h3>
            {props.releaseDate ? `(${props.releaseDate.slice(0, 4)}) ` : null}
            {props.genres.join(', ')}
          </h3>
        ) : (
          <h3>No information</h3>
        )}
      </div>
      )
      <img
        src={posterLoadHelper(props.posterPath, props.backdropPath)}
        alt={props.title}
      />
      <div className={classes.Title}>
        <h3 className={classes.MovieTitle}>{props.title}</h3>
      </div>
    </div>
  );
};

Movie.propTypes = {
  clicked: PropTypes.func,
  backdropPath: PropTypes.string,
  posterPath: PropTypes.string,
  genres: PropTypes.array,
  releaseDate: PropTypes.string,
  title: PropTypes.string,
};

export default Movie;
