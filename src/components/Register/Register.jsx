import React from 'react';
import { lazy } from 'react';
import '../Login/Login.css';
import AuthForm from '../AuthForm/AuthForm';
import { useNavigate } from 'react-router-dom';

const LazyRegisterPage = ({ onLogin, onRegister }) => {
    const navigate = useNavigate();
    return (
        <div className='auth'>
            <div onClick={() => navigate('/')} className='auth__logo'></div>
            <h2 className='auth__title'>Добро пожаловать!</h2>
            <AuthForm isRegForm={true} onLogin={onLogin} onRegister={onRegister} />
        </div>
    );
};

const LazyRegister = lazy(() => Promise.resolve({ default: LazyRegisterPage }));

export const Register = () => {
    return <LazyRegister />;
};
