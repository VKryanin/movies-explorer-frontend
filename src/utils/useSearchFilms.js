import { useEffect, useState } from 'react';
import { LOCAL_STORAGE_LAST_SEARCH_QUERY } from './constants';
import { createData } from './searchHelper';

export function useSearchFilms({ movies, isSavedPage, isMoviesPage }) {
    const [sortedMovies, setSortedMovies] = useState([]);
    const [isLoading, setLoading] = useState(false);
    const [text, setText] = useState('Для просмотра фильмов введите название фильма в строку поиска.');
    const [lastSearchQuery, setLastSearchQuery] = useState({
        queryString: '',
        isShortMovie: false,
        data: [],
    });

    useEffect(() => {
        console.log(isSavedPage, movies, 12);
        if (isSavedPage) {
            setSortedMovies(movies);
        }
    }, [isSavedPage, movies]);

    useEffect(() => {
        if (LOCAL_STORAGE_LAST_SEARCH_QUERY in localStorage) {
            setLastSearchQuery(JSON.parse(localStorage.getItem(LOCAL_STORAGE_LAST_SEARCH_QUERY)));
        }
    }, [isMoviesPage]);

    useEffect(() => {
        if (isMoviesPage) {
            setSortedMovies(lastSearchQuery.data);
        }
    }, [isMoviesPage, lastSearchQuery]);

    const handleSearch = (searchQuery) => {
        setLoading(true);

        const data = createData(movies, searchQuery);
        setSortedMovies(data);

        if (data.length === 0) {
            setText('Ничего не найдено. Попробуйте поменять параметры поиска.');
        }

        if (!searchQuery.searchString) {
            setText('Нужно ввести ключевое слово')
            setSortedMovies([]);
        }

        setTimeout(() => {
            setLoading(false);
        }, 200);

        if (isMoviesPage) {
            localStorage.setItem(LOCAL_STORAGE_LAST_SEARCH_QUERY, JSON.stringify({
                searchString: searchQuery.searchString,
                isShortMovie: searchQuery.isShortMovie,
                data: data,
            }));
        }
    };

    return { sortedMovies, handleSearch, isLoading, text, };
};
