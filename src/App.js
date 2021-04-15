import classes from './App.module.scss';
import Layout from './hoc/Layout/Layout';
import * as actions from './store/actions';

import { useEffect, useCallback } from 'react';
import { useDispatch } from 'react-redux';
import { Redirect } from 'react-router-dom';

function App() {
  const dispatch = useDispatch();

  const onInitMovieGenres = useCallback(() => dispatch(actions.initMovieGenres()), [
    dispatch,
  ]);

  useEffect(() => {
    onInitMovieGenres();
  }, [onInitMovieGenres]);

  return (
    <div className={classes.App}>
      <Layout />
      <Redirect to="/" />
    </div>
  );
}

export default App;
