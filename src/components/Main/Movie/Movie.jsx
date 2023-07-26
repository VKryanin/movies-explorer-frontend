import React from 'react';
import './Movie.css';
import { useLocation } from 'react-router-dom';

export function Movie(props) {
    const { name, duration, saved, link } = props;
    const location = useLocation();
    console.log(link);
    return (
        <li className='movie'>
            <div className='movie__wrapper'>
                <h1 className='movie__title'>{name}</h1>
                <p className="movie__subtitle">{duration}</p>
            </div>
            <img className='movie__image' src={link} alt={name} />
            {location.pathname === '/movies'
                ? <button type='button' className={saved ? 'movie__favorite-button movie__favorite-button_active' : 'movie__favorite-button'} />
                : <button type='button' className='movie__delete-button' />
            }
        </li>
    );
};
