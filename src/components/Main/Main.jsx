import React from 'react';
import './Main.css'
import { Header } from '../Header/Header';
import { Footer } from '../Footer/Footer';
import { MovieList } from './MovieList/MovieList';
import { MovieSearch } from './MovieSearch/MovieSearch';
import { useSearchFilms } from '../../utils/useSearchFilms';

function Main({ movies, savedMovies, onSave, onDelete, onError, onTrailerClick }) {
    console.log(movies, 12);
    const { sortedMovies, handleSearch, isLoading, text, } = useSearchFilms({
        movies: movies,
        isSavedPage: false,
        isMoviesPage: true,
    });
    return (
        <>
            <Header />
            <main className='main'>
                <MovieSearch
                    onSubmit={handleSearch}
                    isLoading={isLoading}
                    onError={onError} />
                <MovieList
                    movies={sortedMovies}
                    savedMovies={savedMovies}
                    isLoading={isLoading}
                    text={text}
                    onSave={onSave}
                    onDelete={onDelete}
                    onTrailerClick={onTrailerClick} />
            </main>
            <Footer />
        </>
    )
}

export default Main


