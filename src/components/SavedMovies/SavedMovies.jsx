import React from 'react';
import { Header } from '../Header/Header';
import { Footer } from '../Footer/Footer';
import { MovieList } from '../Main/MovieList/MovieList';
import { MovieSearch } from '../Main/MovieSearch/MovieSearch';
import { useSearchFilms } from '../../utils/useSearchFilms';

export function SavedMovies({ isLoggedIn, movies, onDelete, onError, onTrailerClick }) {
    const { sortedMovies, handleSearch, isLoading, text } = useSearchFilms({
        movies: movies,
        isSavedPage: true,
    });
    console.log(sortedMovies);
    return (
        <>
            <Header isLoggedIn={isLoggedIn} />
            <main>
                <MovieSearch
                    onSubmit={handleSearch}
                    movies={sortedMovies}
                    onError={onError} />
                <MovieList
                    movies={sortedMovies}
                    savedMovies={sortedMovies}
                    isLoading={isLoading}
                    text={text}
                    onDelete={onDelete}
                    onTrailerClick={onTrailerClick} />
            </main>
            <Footer />
        </>
    );
};
