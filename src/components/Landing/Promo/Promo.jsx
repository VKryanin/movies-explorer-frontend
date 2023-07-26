import React from 'react';
import './Promo.css';
import NavTab from '../NavTab/NavTab';
import logo from '../../../images/landing-logo.svg'


export function Promo() {
    return (
        <section className='promo'>
            <div className='promo__container'>
                <h1 className='promo__title'>Учебный проект студента факультета Веб-разработки.</h1>
                <p className='promo__subtitle'>Листайте ниже, чтобы узнать больше про этот проект и его создателя.</p>
                <NavTab />
            </div>
            <img className='promo__image' src={logo} alt="Логотип промо" />
        </section>
    );
};

