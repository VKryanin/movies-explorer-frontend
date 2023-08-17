import React from 'react';
import { useContext } from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { CurrentUserContext } from '../../contexts/CurrentUserContext';

export function ProtectedRoute() {
    const { isLoggedIn } = useContext(CurrentUserContext);

    return isLoggedIn ? (
        <Outlet />
    ) : (
        <Navigate
            to='/'
            replace
        />
    );
};
