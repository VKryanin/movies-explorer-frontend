import React from 'react';
import { lazy } from 'react';
import { Header } from '../Header/Header';
import { Footer } from '../Footer/Footer';
import { MovieList } from './MovieList/MovieList';
import { MovieSearch } from './MovieSearch/MovieSearch';

const LazyMainPage = () => {
    return (
        <main>
            <Header />
            <MovieSearch />
            <MovieList />
            <Footer />
        </main>
    )
}

const LazyMain = lazy(() => Promise.resolve({ default: LazyMainPage }));

export const Main = () => {
    return <LazyMain />;
};
