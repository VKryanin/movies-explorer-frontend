import React from 'react'
import "./MovieSearch.css";

export function MovieSearch() {
    return (
        <form className='search'>
            <div className="search__container">
                <input className='search__input' type="text" placeholder='Фильм' required/>
                <button className='search__button' type="button"></button>
            </div>
            <label className="search__label">
                <input type="checkbox" className="search__checkbox-input" />
                <span className='search__checkbox-span'></span>
                <p className="search__checkbox-caption">Короткометражки</p>
            </label>
        </form>
    )
}

