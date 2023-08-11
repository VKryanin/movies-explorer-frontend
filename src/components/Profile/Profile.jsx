import './Profile.css';
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { lazy } from 'react';
import { Header } from '../Header/Header';
import { useFormAndValidation } from '../../utils/useFormValidation';

const LazyProfilePage = ({ onLogout }) => {
    const [currentUser, setCurrentUser] = useState({ name: 'Виталий', email: 'pochta@yandex.ru' });
    const { values, errors, isValid, handleChange } = useFormAndValidation({
        name: currentUser.name,
        email: currentUser.email,
    });
    const [serverResError, setServerResError] = useState(false);
    const [isShowSaveButton, setShowSaveButton] = useState(false);

    const handleEditButtonClick = () => {
        setShowSaveButton(true);
    };

    const handleSubmit = (evt) => {
        evt.preventDefault();
        setServerResError(true);
    };
    return (
        <main>
            <Header />
            <section className='profile'>
                <h2 className='profile__title'>Привет, {currentUser.name}!</h2>
                <form name='profile' className='profile__form' onSubmit={handleSubmit} >
                    <label className='profile__label'>
                        <span className='profile__input-title'>Имя</span>
                        <input
                            className='profile__input'
                            type='text'
                            name='name'
                            onChange={handleChange}
                            onFocus={handleEditButtonClick}
                            value={values.name}
                            minLength={2}
                            maxLength={30}
                            required
                        />
                    </label>
                    <span className='profile__span-error'>{errors.name}</span>
                    <label className='profile__label'>
                        <span className='profile__input-title'>E-mail</span>
                        <input
                            className='profile__input'
                            type='email'
                            name='email'
                            onChange={handleChange}
                            onFocus={handleEditButtonClick}
                            value={values.email}
                            required
                        />
                    </label>
                    <span className='profile__span-error'>{errors.email}</span>
                    <p className='profile__response-error'>
                        {serverResError && 'При обновлении профиля произошла ошибка.'}
                    </p>
                    {isShowSaveButton ? (
                        <button type='submit' className='profile__button profile__button_type_submit' >
                            Сохранить
                        </button>
                    ) : (
                        <>
                            <button type='button' className='profile__button' onClick={handleEditButtonClick} >
                                Редактировать
                            </button>
                            <Link to="/" className='profile__button profile__button_type_logout'>Выйти из аккаунта</Link>
                        </>
                    )}
                </form>
            </section>
        </main>
    );
};

const LazyProfile = lazy(() => Promise.resolve({ default: LazyProfilePage }));

export const Profile = () => {
    return <LazyProfile />;
};
