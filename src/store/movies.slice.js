import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

const fetchMovieDetails = async (movies) => {
    try {
        // Параллельные запросы для различных данных
        const [moviesWithTrailers, moviesWithCredits, moviesWithKeywords, moviesLittleInfo] = await Promise.all([
            fetchMovieTrailers(movies),
            fetchMovieCredits(movies),
            fetchMovieKeywords(movies),
            fetchMovieLittleInfo(movies),
        ]);

        // Объединение всех данных
        return moviesWithTrailers.map((movie, index) => ({
            ...movie,
            credits: moviesWithCredits[index].creditData,
            keywords: moviesWithKeywords[index].keywordData,
            littleInfo: moviesLittleInfo[index].movieData
        }));
    } catch (error) {
        console.error("Failed to fetch movie details:", error);
        return movies; // Возвращаем базовые данные при ошибке
    }
};

export const fetchPopularMovies = createAsyncThunk(
    'movies/fetchPopularMovies',
    async () => {
        const response = await fetch('https://api.themoviedb.org/3/movie/popular?api_key=32e298a0ed54b91c64093a45759e40aa');
        const data = await response.json();
        return await fetchMovieDetails(data.results);
    }
);

// Создание асинхронного thunk для топ-рейтинг фильмов
export const fetchTopRatedMovies = createAsyncThunk(
    'movies/fetchTopRatedMovies',
    async () => {
        const response = await fetch('https://api.themoviedb.org/3/movie/top_rated?api_key=32e298a0ed54b91c64093a45759e40aa');
        const data = await response.json();
        return await fetchMovieDetails(data.results);
    }
);

export const fetchUpcoming = createAsyncThunk(
    'movies/fetchUpcoming',
    async () => {
        const response = await fetch('https://api.themoviedb.org/3/movie/upcoming?api_key=32e298a0ed54b91c64093a45759e40aa');
        const data = await response.json();
        return await fetchMovieDetails(data.results);
    }
);


// Функция получения дополнительной информации о фильмах
const fetchMovieLittleInfo = async (movies) => {
    const moviesWithLittleInfo = await Promise.all(movies.map(async (movie) => {
        const movieResponse = await fetch(`https://api.themoviedb.org/3/movie/${movie.id}?api_key=32e298a0ed54b91c64093a45759e40aa`);
        const movieData = await movieResponse.json();

        return {
            ...movie,
            movieData
        };
    }));
    return moviesWithLittleInfo;
};

// Функция получения ключевых слов для фильмов
const fetchMovieKeywords = async (movies) => {
    const moviesWithKeywords = await Promise.all(movies.map(async (movie) => {
        const keywordsResponse = await fetch(`https://api.themoviedb.org/3/movie/${movie.id}/keywords?api_key=32e298a0ed54b91c64093a45759e40aa`);
        const keywordData = await keywordsResponse.json();

        return {
            ...movie,
            keywordData
        };
    }));
    return moviesWithKeywords;
};

// Функция получения кредитов для фильмов
const fetchMovieCredits = async (movies) => {
    const moviesWithCredits = await Promise.all(movies.map(async (movie) => {
        const creditResponse = await fetch(`https://api.themoviedb.org/3/movie/${movie.id}/credits?api_key=32e298a0ed54b91c64093a45759e40aa`);
        const creditData = await creditResponse.json();

        return {
            ...movie,
            creditData
        };
    }));
    return moviesWithCredits;
};

// Функция получения трейлеров для фильмов
const fetchMovieTrailers = async (movies) => {
    const moviesWithTrailers = await Promise.all(movies.map(async (movie) => {
        const trailerResponse = await fetch(`https://api.themoviedb.org/3/movie/${movie.id}/videos?api_key=32e298a0ed54b91c64093a45759e40aa`);
        const trailerData = await trailerResponse.json();
        const trailer = trailerData.results.find(video => video.type === "Trailer");

        return {
            ...movie,
            trailerKey: trailer ? trailer.key : null
        };
    }));
    return moviesWithTrailers;
};


const Movies = createSlice({
    name: 'movies',
    initialState: {
        popularMovies: [],
        topRatedMovies: [],
        upComingMovies: []
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
    }
})

export const { addPopularMovies, addTopRatedMovies, addUpComingMovies } = Movies.actions
export default Movies.reducer
