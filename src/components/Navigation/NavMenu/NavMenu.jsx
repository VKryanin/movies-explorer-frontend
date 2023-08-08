import React from 'react';
import { NavLink } from 'react-router-dom';
import './NavMenu.css';

export function NavMenu({ isDesktop }) {
    return (
        <nav className='header__nav'>
            <ul className='header__items'>
                {!isDesktop && (
                    <li className='header__item'>
                        <NavLink className={
                            ({ isActive }) => `header__link header__link_type_default ${isActive && 'header__link_active'}`
                        } to='/' >
                            Главная
                        </NavLink>
                    </li>
                )}
                <li className='header__item'>
                    <NavLink className={
                        ({ isActive }) => `header__link header__link_type_default ${isActive && 'header__link_active'}`
                    } to='/movies' >
                        Фильмы
                    </NavLink>
                </li>
                <li className='header__item'>
                    <NavLink className={
                        ({ isActive }) => `header__link header__link_type_default ${isActive && 'header__link_active'}`
                    } to='/saved-movies' >
                        Сохранённые фильмы
                    </NavLink>
                </li>
                <li className='header__item'>
                    <NavLink className={
                        ({ isActive }) => `header__link header__link_type_profile ${isActive && 'header__link_active'}`
                    } to='/profile' >
                        Аккаунт
                    </NavLink>
                </li>
            </ul>
        </nav>
    );
};