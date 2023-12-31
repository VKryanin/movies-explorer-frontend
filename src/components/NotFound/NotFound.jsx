import React from 'react';
import { lazy } from 'react';
import './NotFound.css';
import { useNavigate } from 'react-router-dom';

const LazyNotFoundPage = () => {
    const navigate = useNavigate();
    return (
        <main >
            <section className='not-found'>
                <h1 className='not-found__title'>404</h1>
                <p className='not-found__caption'>Упс. Страница не найдена</p>
                <button type='button' className='not-found__button' onClick={() => navigate(-1)}>
                    Назад
                </button>
            </section>

        </main>
    );
};

const LazyNotFound = lazy(() => Promise.resolve({ default: LazyNotFoundPage }));

export const NotFound = () => {
    return <LazyNotFound />;
};