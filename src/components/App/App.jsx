import { Route, Routes, useNavigate } from 'react-router-dom';
import { Suspense, useEffect, useState } from 'react';
import { DeviceContext } from '../../contexts/DeviceContext';
import { windowWidth } from '../../contexts/DeviceContext';
import { CurrentUserContext } from '../../contexts/CurrentUserContext'
import { Preloader } from '../Preloader/Preloader';
import { Landing } from '../Landing/Landing';
import { Main } from '../Main/Main';
import { SavedMovies } from '../SavedMovies/SavedMovies';
import { Profile } from '../Profile/Profile';
import { Register } from '../Register/Register';
import { Login } from '../Login/Login';
import { NotFound } from '../NotFound/NotFound';

export const App = () => {
    const navigate = useNavigate();
    const [currentUser, setCurrentUser] = useState({});
    const [device, setDevice] = useState('desktop');

    useEffect(() => {
        const handleDevice = () => {
            if (window.innerWidth > windowWidth.tablet) {
                setDevice('desktop');
            } else if (window.innerWidth > windowWidth.mobile) {
                setDevice('tablet');
            } else {
                setDevice('mobile');
            }
        };

        handleDevice();
        window.addEventListener('resize', handleDevice);
        return () => window.removeEventListener('resize', handleDevice);
    }, [device]);

    const handleSignin = () => {
        setCurrentUser((prev) => ({ ...prev, isLoggedIn: true }));
        navigate('/movies', { replace: true });
    };
    const handleSignup = () => {
        navigate('/signin');
    };
    const handleLogout = () => {
        setCurrentUser((prev) => ({ ...prev, isLoggedIn: false }));
        navigate('/', { replace: true });
    };

    return (
        <CurrentUserContext.Provider value={currentUser}>
            <DeviceContext.Provider value={device}>
                <Suspense fallback={<Preloader />}>
                    <Routes>
                        <Route path='/' element={<Landing />} />
                        <Route path='/movies' element={<Main />} />
                        <Route path='/saved-movies' element={<SavedMovies />} />
                        <Route path='/profile' element={<Profile onLogout={handleLogout} />} />
                        <Route path='/signup' element={
                            <Register onLogin={handleSignin} onRegister={handleSignup} />
                        }
                        />
                        <Route
                            path='/signin'
                            element={
                                <Login onLogin={handleSignin} onRegister={handleSignup} />
                            }
                        />
                        <Route path='*' element={<NotFound />} />
                    </Routes>
                </Suspense>
            </DeviceContext.Provider>
        </CurrentUserContext.Provider>
    );
};
