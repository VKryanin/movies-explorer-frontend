/* eslint-disable react-hooks/exhaustive-deps */
import { Route, Routes, useNavigate, useLocation } from 'react-router-dom';
import { Suspense, useEffect, useState } from 'react';
import { DeviceContext } from '../../contexts/DeviceContext';
import { windowWidth } from '../../contexts/DeviceContext';
import { CurrentUserContext } from '../../contexts/CurrentUserContext'
import { Preloader } from '../Preloader/Preloader';
import { LandingLazy } from '../Landing/Landing.lazy';
import { MainLazy } from '../Main/Main.lazy';
import { SavedMovies } from '../SavedMovies/SavedMovies';
import { ProfileLazy } from '../Profile/Profile.lazy';
import { RegisterLazy } from '../Register/Register.lazy';
import { Login } from '../Login/Login.lazy';
import { NotFound } from '../NotFound/NotFound';
import { ProtectedRoute } from '../ProtectedRoute/ProtectedRoute';
import api from '../../utils/MainApi';
import { ApiServiceContext } from '../../contexts/ApiServiceContext';
import { BEAT_API_URL, LOCAL_STORAGE_TOKEN_KEY } from '../../utils/constants';
import { InfoTooltip } from '../Popup/InfoTooltip/InfoTooltip';
import { PopupVideo } from '../Popup/PopupVideo/PopupVideo';
import beatApi from '../../utils/MoviesApi';

export const App = () => {
    const navigate = useNavigate();
    const { pathname } = useLocation();

    const [currentUser, setCurrentUser] = useState({
        isLoggedIn: localStorage.getItem(LOCAL_STORAGE_TOKEN_KEY) ? true : false,
    });

    const [device, setDevice] = useState('desktop');
    const [movies, setMovies] = useState([]);
    const [savedMovies, setSavedMovies] = useState([]);
    const [currentMovie, setCurrentMovie] = useState({});

    const [isInfoPopupOpen, setInfoPopupOpen] = useState(false);
    const [isVideoPopupOpen, setVideoPopupOpen] = useState(false);

    const [apiService, setApiService] = useState({});

    useEffect(() => {
        const handleWidth = () => {
            if (window.innerWidth > windowWidth.tablet) {
                setDevice('desktop');
            } else if (window.innerWidth > windowWidth.mobile) {
                setDevice('tablet');
            } else {
                setDevice('mobile');
            }
        };

        handleWidth();
        window.addEventListener('resize', handleWidth);

        return () => window.removeEventListener('resize', handleWidth);
    }, [device]);

    useEffect(() => {
        if (currentUser.isLoggedIn) {
            checkToken();
        }
    }, [currentUser.isLoggedIn]);

    useEffect(() => {
        if (currentUser.isLoggedIn && (pathname === '/signin' || pathname === '/signup')) {
            navigate('/movies', { replace: true });
        }
    }, [pathname, navigate, currentUser.isLoggedIn]);

    useEffect(() => {
        if (currentUser.isLoggedIn) {
            beatApi
                .getMovies()
                .then(setMovies)
                .catch((e) => {
                    console.error(e);
                });
            api
                .getSavedMovies()
                .then((movies) => setSavedMovies(movies.data))
                .catch((e) => {
                    console.error(e);
                });
        }
    }, [currentUser.isLoggedIn]);

    async function checkToken() {
        const token = localStorage.getItem(LOCAL_STORAGE_TOKEN_KEY);
        if (token) {
            try {
                const userInfo = await api.getUserInfo();
                setCurrentUser(prev => ({
                    ...prev,
                    name: userInfo.data.name,
                    email: userInfo.data.email,
                    isLoggedIn: true,
                }));
            } catch (error) {
                localStorage.clear();
                setCurrentUser(prev => ({
                    ...prev,
                    isLoggedIn: false,
                }));
                handleError('С токеном что-то не так. Авторизуйтесь заново.');
            }
        }
    }

    const closeAllPopups = () => {
        setInfoPopupOpen(false);
        setVideoPopupOpen(false);
        setTimeout(() => {
            setApiService((prev) => ({ ...prev, isError: false }));
        }, 200);
    };

    const enableLoader = () => {
        setApiService((prev) => ({ ...prev, isLoading: true }));
    };

    const disableLoader = () => {
        setApiService((prev) => ({ ...prev, isLoading: false }));
    };

    const handleError = (e) => {
        setApiService((prev) => ({ ...prev, isError: true, errorText: e }));
        setInfoPopupOpen(true);
    };

    const handleSearchError = () => {
        handleError('Для поиска нужно ввести запрос.');
    };

    const handleSignin = ({ email, password }) => {
        try {
            enableLoader();
            api.signin({ email, password })
                .then(({ token }) => {
                    localStorage.setItem(LOCAL_STORAGE_TOKEN_KEY, token);
                    setCurrentUser(prev => ({ ...prev, isLoggedIn: true }));
                    navigate('/movies', { replace: true });
                })
                .catch(e => handleError(e))
                .finally(disableLoader());
        } catch (e) {
            handleError(e);
        }
    };

    const handleSignup = async ({ email, password, name }) => {
        enableLoader();
        try {
            const newUser = await api.signup({ email, password, name });
            handleSignin({ email, password });
            setApiService((prev) => ({
                ...prev,
                successText: `${newUser.name}, Вы успешно зарегистрировались.`,
            }));
            setInfoPopupOpen(true);
        } catch (error) {
            handleError(error);
        }
        disableLoader();
    };

    const handleLogout = () => {
        setCurrentUser((prev) => ({ ...prev, isLoggedIn: false }));
        localStorage.clear();
        navigate('/', { replace: true });
    };

    const handleOpenMovieTrailer = (movie) => {
        try {
            enableLoader();
            setVideoPopupOpen(true);
            setCurrentMovie(movie);
        } catch (e) {
            handleError(e);
        } finally {
            setTimeout(() => disableLoader(), 200);
        }
    };

    const handleClickSaveMovie = (movie) => {
        const movieData = {
            country: movie.country,
            director: movie.director,
            duration: movie.duration,
            year: movie.year,
            description: movie.description,
            image: BEAT_API_URL + movie.image.url,
            trailerLink: movie.trailerLink,
            thumbnail: BEAT_API_URL + movie.image.formats.thumbnail.url,
            movieId: movie.id,
            nameRU: movie.nameRU,
            nameEN: movie.nameEN,
        };

        api
            .saveMovie(movieData)
            .then((savedMovie) => setSavedMovies((movies) => [...movies, savedMovie.data]))
            .catch((e) => console.error(e));
    };

    const handleClickDeleteMovie = (movieId) => {
        api
            .deleteMovie(movieId)
            .then(() => setSavedMovies((films) => films.filter((movie) => movie._id !== movieId)))
            .catch((e) => console.error(e));
    };

    const handleChangeProfileData = ({ name, email }) => {
        enableLoader();
        api
            .setUserInfo({ name, email })
            .then((userData) => {
                setCurrentUser((currentUser) => ({
                    ...currentUser,
                    name: userData.data.name,
                    email: userData.data.email,
                }));
                setInfoPopupOpen(true);
                setApiService((prev) => ({
                    ...prev,
                    successText: `Данные обновлены.`,
                }));
            })
            .catch((e) => {
                handleError(e);
            })
            .finally(() => {
                disableLoader();
            });
    };

    return (
        <CurrentUserContext.Provider value={currentUser}>
            <DeviceContext.Provider value={device}>
                <ApiServiceContext.Provider value={apiService}>
                    <Suspense fallback={<Preloader />}>
                        <Routes>
                            <Route path='/' element={<LandingLazy />} />
                            <Route path='/signup' element={
                                <RegisterLazy onLogin={handleSignin} onRegister={handleSignup} />
                            } />
                            <Route path='/signin' element={
                                <Login onLogin={handleSignin} onRegister={handleSignup} />
                            } />
                            <Route element={<ProtectedRoute />}>
                                <Route path='/movies' element={
                                    <MainLazy
                                        movies={movies}
                                        savedMovies={savedMovies}
                                        onSave={handleClickSaveMovie}
                                        onDelete={handleClickDeleteMovie}
                                        onError={handleSearchError}
                                        onTrailerClick={handleOpenMovieTrailer}
                                    />
                                } />
                                <Route path='/saved-movies' element={
                                    <SavedMovies
                                        movies={savedMovies}
                                        savedMovies={savedMovies}
                                        onDelete={handleClickDeleteMovie}
                                        onError={handleSearchError}
                                        onTrailerClick={handleOpenMovieTrailer}
                                    />
                                } />

                                <Route path='/profile' element={
                                    <ProfileLazy
                                        onLogout={handleLogout}
                                        onSubmit={handleChangeProfileData}
                                    />
                                } />
                            </Route>

                            <Route path='*' element={<NotFound />} />
                        </Routes>
                    </Suspense>
                    <InfoTooltip isOpen={isInfoPopupOpen} onClosed={closeAllPopups}
                    />
                    <PopupVideo isOpen={isVideoPopupOpen} onClosed={closeAllPopups} name={currentMovie.nameRU} link={currentMovie.trailerLink}
                    />
                </ApiServiceContext.Provider>
            </DeviceContext.Provider>
        </CurrentUserContext.Provider>
    );
};
