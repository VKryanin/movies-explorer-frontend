import React, { useState, useContext } from 'react';
import './AuthForm.css';
import { Link } from 'react-router-dom';
import { useFormAndValidation } from '../../utils/useFormValidation';
import { Label } from './Label/Label';
import { Preloader } from '../Preloader/Preloader';
import { ApiServiceContext } from '../../contexts/ApiServiceContext';

const AuthForm = ({ isRegForm, handleForm, isFetching }) => {
    const { values, errors, isValid, handleChange } = useFormAndValidation();
    const { isLoading } = useContext(ApiServiceContext);

    function handleSubmit(e) {
        e.preventDefault();
        const { name, email, password } = values;
        handleForm({ email: email, password: password, name: name });
    }

    return (
        <form name={isRegForm ? 'register' : 'login'} className='form' onSubmit={handleSubmit} noValidate >
            {isRegForm && (
                <Label
                    title='Имя'
                    name='name'
                    handleChange={handleChange}
                    values={values}
                    errors={errors}
                    pattern='^(?!\s)[A-Za-zА-Яа-я\-\s]+$'
                    minLength={2}
                    maxLength={30}
                    isFetching={isFetching}
                />
            )}
            <Label
                title='E-mail'
                name='email'
                handleChange={handleChange}
                values={values}
                errors={errors}
                pattern='^.+@.+\..+$'
                errorMessage={errors.email}
                isFetching={isFetching}
            />
            <Label
                title='Пароль'
                name='password'
                handleChange={handleChange}
                values={values}
                errors={errors}
                minLength={6}
                isFetching={isFetching}
            />
            <p className={`form__response - error ${!isRegForm && 'form__response-error_type_login'}`}>
            </p>
            {
                isLoading ? <Preloader />
                    : <button type='submit'
                        className={!isValid || isFetching
                            ? 'form__submit-button form__submit-button_disabled'
                            : 'form__submit-button'
                        }
                        disabled={!isValid || isFetching ? true : false} >
                        {isRegForm ? 'Зарегистрироваться' : 'Войти'}</button >}
            <p className='form__link-caption'>
                {isRegForm ? (<> Уже зарегистрированы?
                    <Link to='/signin' className='form__link' >
                        Войти
                    </Link>
                </>)
                    : (<>
                        Еще не зарегистрированы?
                        <Link to='/signup' className='form__link' >
                            Регистрация
                        </Link>
                    </>
                    )}
            </p>
        </form >
    );
};

export default AuthForm;