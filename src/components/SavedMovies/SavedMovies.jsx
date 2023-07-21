import React from 'react';
import { lazy } from 'react';
import Header from '../Header/Header';
import Footer from '../Footer/Footer';
import MovieList from '../Main/MovieList/MovieList';
import MovieSearch from '../Main/MovieSearch/MovieSearch';

const LazySavedMovies = ({ isLoggedIn }) => {
    return (
        <>
            <Header isLoggedIn={isLoggedIn} />
            <MovieSearch />
            <MovieList />
            <Footer />
        </>
    );
};

const LazySavedMoviesWrapper = lazy(() => Promise.resolve({ default: LazySavedMovies }));

export const SavedMovies = () => {
    return <LazySavedMoviesWrapper />;
};
