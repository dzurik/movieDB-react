import React from 'react';
import classes from './Layout.module.scss';
import Header from '../../components/Header/Header';
import Search from '../../containers/Search/Search';
import MovieList from '../../containers/MovieList/MovieList';

const Layout = (props) => {
  return (
    <div className={classes.Layout}>
      <Header />
      <main className={classes.Main}>
        <Search />
        <MovieList />
      </main>
    </div>
  );
};

export default Layout;
