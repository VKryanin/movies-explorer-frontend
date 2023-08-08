import React from 'react';
import './NavPromo.css';
import { Link } from 'react-router-dom';

export function NavPromo() {
    return (
        <nav className='promo__nav'>
            <ul className='promo__items'>
                <li className='promo__item'>
                    <Link className='promo__link promo__link_type_register' to='/signup'>Регистрация</Link>
                </li>
                <li className='promo__item'>
                    <Link className='promo__link promo__link_type_login' to='/signin'>Войти</Link>
                </li>
            </ul>
        </nav>
    );
};