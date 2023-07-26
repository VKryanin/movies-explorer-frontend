import React from 'react'
import "./MovieSearch.css";

export function MovieSearch() {
    return (
        <form className='search'>
            <input className='search__input' type="text" placeholder='Фильм' />
            <label className="search__label">
                <input type="checkbox" className="search__checkbox-input" />
                <button className='search__button'>Найти</button>
                <span className='search__checkbox-span'></span>
                <p className="search__checkbox-caption">Короткометражки</p>
            </label>
        </form>
    )
}

