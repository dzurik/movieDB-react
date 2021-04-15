import { useState, useEffect, useRef, useCallback } from 'react';
import { useDispatch } from 'react-redux';
import classes from './Search.module.scss';
import { AiOutlineCloseCircle } from 'react-icons/ai';
import * as actions from '../../store/actions';

const Search = (props) => {
  const [title, setTitle] = useState('');
  const searchRef = useRef();

  const dispatch = useDispatch();

  const onGetSearchResult = useCallback(
    (title) => dispatch(actions.getSearchResult(title)),
    [dispatch]
  );

  useEffect(() => {
    const timer = setTimeout(() => {
      if (title === searchRef.current.value && title.length >= 3) {
        console.log('searching...');
        onGetSearchResult(title);
      }
    }, 500);

    return () => {
      clearTimeout(timer);
    };
  }, [title, searchRef, onGetSearchResult]);

  return (
    <div className={classes.Search}>
      <h2>Search:</h2>
      <div className={classes.InputBox}>
        <input
          className={classes.Input}
          type="text"
          ref={searchRef}
          value={title}
          placeholder={'Movie title ...'}
          onChange={(event) => setTitle(event.target.value)}
        />
        <AiOutlineCloseCircle
          className={classes.ResetButton}
          onClick={() => setTitle('')}
        />
      </div>
    </div>
  );
};

export default Search;
