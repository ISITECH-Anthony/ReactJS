import { createSlice } from "@reduxjs/toolkit";
import { GetMostPopular, GetBannerMovie, GetBestOfYear, GetMovieBySearch } from "../services/MovieService";

const initialState = {
    bannerMovie: null,
    bannerMovieLoading: false,
    bannerMovieError: false,

    mostPopular: null,
    mostPopularLoading: false,
    mostPopularError: false,
    mostPopularErrorTry: 0, // permet de savoir combien de fois a été tenté de récupérer les données

    bestOfYear: null,
    bestOfYearLoading: false,
    bestOfYearError: false,
    bestOfYearErrorTry: 0,

    searchParam: null,
    searchResult: null,
    searchLoading: false,
    searchError: false,

    genres: [],
}

export const MovieSlice = createSlice({
    name: "movie",
    initialState,
    extraReducers: (builder) => {
        builder.addCase(GetBannerMovie.pending, (state) => {
            state.bannerMovieLoading = true;
        });
        builder.addCase(GetBannerMovie.fulfilled, (state, action) => {
            state.bannerMovieLoading = false;
            state.bannerMovieError = false;
            state.bannerMovie = action.payload.data;
        });
        builder.addCase(GetBannerMovie.rejected, (state) => {
            state.bannerMovieLoading = false;
            state.bannerMovieError = true;
        });

        builder.addCase(GetMostPopular.pending, (state) => {
            state.mostPopularLoading = true;
        });
        builder.addCase(GetMostPopular.fulfilled, (state, action) => {
            state.mostPopularLoading = false;
            state.mostPopularError = false;
            state.mostPopular = action.payload.data;
        });
        builder.addCase(GetMostPopular.rejected, (state) => {
            state.mostPopularLoading = false;
            state.mostPopularError = true;
            state.mostPopularErrorTry += 1;
        });

        builder.addCase(GetBestOfYear.pending, (state) => {
            state.bestOfYearLoading = true;
        });
        builder.addCase(GetBestOfYear.fulfilled, (state, action) => {
            state.bestOfYearLoading = false;
            state.bestOfYearError = false;
            state.bestOfYear = action.payload.data;
        });
        builder.addCase(GetBestOfYear.rejected, (state) => {
            state.bestOfYearLoading = false;
            state.bestOfYearError = true;
            state.bestOfYearErrorTry += 1;
        });

        builder.addCase(GetMovieBySearch.pending, (state) => {
            state.searchLoading = true;
        });
        builder.addCase(GetMovieBySearch.fulfilled, (state, action) => {
            state.searchLoading = false;
            state.searchError = false;
            state.searchResult = action.payload.data;
        });
        builder.addCase(GetMovieBySearch.rejected, (state) => {
            state.searchLoading = false;
            state.searchError = true;
        });
    }
});

export default MovieSlice.reducer;