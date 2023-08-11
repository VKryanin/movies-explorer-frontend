import React from 'react';
import './Main.css'
import { lazy } from 'react';
import { Header } from '../Header/Header';
import { Footer } from '../Footer/Footer';
import { MovieList } from './MovieList/MovieList';
import { MovieSearch } from './MovieSearch/MovieSearch';

const LazyMainPage = () => {
    return (
        <>
            <Header />
            <main className='main'>
                <MovieSearch />
                <MovieList />
            </main>
            <Footer />
        </>
    )
}

const LazyMain = lazy(() => Promise.resolve({ default: LazyMainPage }));

export const Main = () => {
    return <LazyMain />;
};
