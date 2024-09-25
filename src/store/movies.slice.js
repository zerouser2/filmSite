import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

// Основной обработчик для получения детализированной информации о фильмах
const fetchMovieDetails = async (movies) => {
    try {
        const [moviesWithTrailers, moviesWithCredits, moviesWithKeywords, moviesLittleInfo] = await Promise.all([
            fetchMovieTrailers(movies),
            fetchMovieCredits(movies),
            fetchMovieKeywords(movies),
            fetchMovieLittleInfo(movies),
        ]);

        return moviesWithTrailers.map((movie, index) => ({
            ...movie,
            credits: moviesWithCredits[index]?.creditData || [],
            keywords: moviesWithKeywords[index]?.keywordData || [],
            littleInfo: moviesLittleInfo[index]?.movieData || {}
        }));

    } catch (error) {
        console.error("Failed to fetch movie details:", error);
        return movies; // Вернем базовые данные при ошибке
    }
};

// Получение популярных фильмов
export const fetchPopularMovies = createAsyncThunk(
    'movies/fetchPopularMovies',
    async () => {
        try {
            const response = await fetch('https://api.themoviedb.org/3/movie/popular?api_key=32e298a0ed54b91c64093a45759e40aa');
            const data = await response.json();
            return await fetchMovieDetails(data.results);
        } catch (error) {
            console.error('Failed to fetch popular movies:', error);
            return []; // Возвращаем пустой массив при ошибке
        }
    }
);

// Получение фильмов с высоким рейтингом
export const fetchTopRatedMovies = createAsyncThunk(
    'movies/fetchTopRatedMovies',
    async () => {
        try {
            const response = await fetch('https://api.themoviedb.org/3/movie/top_rated?api_key=32e298a0ed54b91c64093a45759e40aa');
            const data = await response.json();
            return await fetchMovieDetails(data.results);
        } catch (error) {
            console.error('Failed to fetch top rated movies:', error);
            return [];
        }
    }
);

// Получение предстоящих фильмов
export const fetchUpcoming = createAsyncThunk(
    'movies/fetchUpcoming',
    async () => {
        try {
            const response = await fetch('https://api.themoviedb.org/3/movie/upcoming?api_key=32e298a0ed54b91c64093a45759e40aa');
            const data = await response.json();
            return await fetchMovieDetails(data.results);
        } catch (error) {
            console.error('Failed to fetch upcoming movies:', error);
            return [];
        }
    }
);

export const fetchActors = createAsyncThunk(
    'movies/fetchActors',
    async (page=1) => {
        try {
            const response = await fetch(`https://api.themoviedb.org/3/person/popular?api_key=32e298a0ed54b91c64093a45759e40aa&page=${page}`);
            const data = await response.json();
            return data.results
        } catch (error) {
            console.error('Failed to fetch upcoming movies:', error);
            return [];
        }
    }
);

const fetchMovieLittleInfo = async (movies) => {
    try {
        return await Promise.all(movies.map(async (movie) => {
            const movieResponse = await fetch(`https://api.themoviedb.org/3/movie/${movie.id}?api_key=32e298a0ed54b91c64093a45759e40aa`);
            const movieData = await movieResponse.json();
            return { ...movie, movieData };
        }));
    } catch (error) {
        console.error('Failed to fetch little info:', error);
        return movies;
    }
};

// Получение ключевых слов для фильмов
const fetchMovieKeywords = async (movies) => {
    try {
        return await Promise.all(movies.map(async (movie) => {
            const keywordsResponse = await fetch(`https://api.themoviedb.org/3/movie/${movie.id}/keywords?api_key=32e298a0ed54b91c64093a45759e40aa`);
            const keywordData = await keywordsResponse.json();
            return { ...movie, keywordData };
        }));
    } catch (error) {
        console.error('Failed to fetch movie keywords:', error);
        return movies;
    }
};

// Получение информации о кредитах
const fetchMovieCredits = async (movies) => {
    try {
        return await Promise.all(movies.map(async (movie) => {
            const creditResponse = await fetch(`https://api.themoviedb.org/3/movie/${movie.id}/credits?api_key=32e298a0ed54b91c64093a45759e40aa`);
            const creditData = await creditResponse.json();
            return { ...movie, creditData };
        }));
    } catch (error) {
        console.error('Failed to fetch movie credits:', error);
        return movies;
    }
};

// Получение трейлеров для фильмов
const fetchMovieTrailers = async (movies) => {
    try {
        return await Promise.all(movies.map(async (movie) => {
            const trailerResponse = await fetch(`https://api.themoviedb.org/3/movie/${movie.id}/videos?api_key=32e298a0ed54b91c64093a45759e40aa`);
            const trailerData = await trailerResponse.json();
            const trailer = trailerData.results.find(video => video.type === "Trailer");
            return { ...movie, trailerKey: trailer ? trailer.key : null };
        }));
    } catch (error) {
        console.error('Failed to fetch movie trailers:', error);
        return movies;
    }
};

const Movies = createSlice({
    name: 'movies',
    initialState: {
        allMovies: [],
        popularMovies: [],
        topRatedMovies: [],
        upComingMovies: [],
        actors: []
    },
    reducers: {
        addPopularMovies(state, action) {
            state.popularMovies = action.payload
            console.log(action.payload)
        },
        addTopRatedMovies(state, action) {
            state.topRatedMovies = action.payload
            console.log(action.payload)
        },
        addUpComingMovies(state, action) {
            state.upComingMovies = action.payload
            console.log(action.payload)
        },
        addActors(state, action) {
            state.actors = action.payload
            console.log(action.payload)
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchPopularMovies.fulfilled, (state, action) => {
                state.popularMovies = action.payload;
            })
            .addCase(fetchTopRatedMovies.fulfilled, (state, action) => {
                state.topRatedMovies = action.payload;
            })
            .addCase(fetchUpcoming.fulfilled, (state, action) => {
                state.upComingMovies = action.payload;
            })
            .addCase(fetchActors.fulfilled, (state, action) => {
                state.actors = [...state.actors, ...action.payload]
            })
    }
})

export const { addPopularMovies, addTopRatedMovies, addUpComingMovies } = Movies.actions
export default Movies.reducer
