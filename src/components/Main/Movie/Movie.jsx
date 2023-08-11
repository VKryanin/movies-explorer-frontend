import React from 'react';
import './Movie.css';
import { useLocation } from 'react-router-dom';

export function Movie(props) {
    const { name, id, duration, saved, link } = props;
    const location = useLocation();
    return (
        <li className='movie'>
            <section className='movie__wrapper'>
                <div className='movie__description'>
                    <h1 className='movie__title'>{name}</h1>
                    <p className="movie__subtitle">{duration}</p>
                </div>
                {location.pathname === '/movies'
                    ? <button type='button' className={saved ? 'movie__favorite-button movie__favorite-button_active' : 'movie__favorite-button'} />
                    : <button type='button' className='movie__delete-button' />
                }

            </section>
            <img className='movie__image' src={link} alt={`Фильм: ${name}, id:${id} `} />
        </li>
    );
};

