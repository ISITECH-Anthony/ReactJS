import { configureStore } from '@reduxjs/toolkit';
import Auth from "./AuthStore";
import Movie from "./MovieStore";

export const store = configureStore({
    reducer: {
        auth: Auth,
        movie: Movie,
    },
});
