import React from 'react';
import { lazy } from 'react';
import './Login.css';
import AuthForm from '../AuthForm/AuthForm';
import { useNavigate } from 'react-router-dom';

const LazyLoginPage = ({ onLogin, onRegister }) => {
  const navigate = useNavigate();
  return (
    <main >
      <section className='auth'>
        <div onClick={() => navigate('/')} className='auth__logo'></div>
        <h2 className='auth__title'>Рады видеть!</h2>
        <AuthForm isRegForm={false} onLogin={onLogin} onRegister={onRegister} />
      </section>
    </main>
  );
};

const LazyLogin = lazy(() => Promise.resolve({ default: LazyLoginPage }));

export const Login = () => {
  return <LazyLogin />;
};
