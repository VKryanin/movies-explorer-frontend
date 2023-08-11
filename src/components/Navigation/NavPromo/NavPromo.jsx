import React from 'react';
import './NavPromo.css';
import { Link } from 'react-router-dom';

export function NavPromo() {
    return (
        <nav className='header__navigation'>
            <ul className='header__list'>
                <li className='header__item'>
                    <Link className='header__link header__link_type_register' to='/signup'>Регистрация</Link>
                </li>
                <li className='header__item'>
                    <Link className='header__link header__link_type_login' to='/signin'>Войти</Link>
                </li>
            </ul>
        </nav>
    );
};