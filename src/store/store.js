import { configureStore } from "@reduxjs/toolkit";
import moviesSlice from './movies.slice'

export default configureStore({
    reducer: {
        movies: moviesSlice,
    },
})