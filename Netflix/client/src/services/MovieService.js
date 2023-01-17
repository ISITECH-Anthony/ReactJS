import axios from "axios";
import { createAsyncThunk } from "@reduxjs/toolkit";

export const GetMostPopular = createAsyncThunk("/movie/most/popular", async(thunkAPI) => {
    try {
        const response = await axios.get('/movie/most/popular');

        return response.data;
    } catch (err) {
        if (err.response) {
            return thunkAPI.rejectWithValue(err.response);
        }
    }
});

export const GetBannerMovie = createAsyncThunk("/movie/banner", async(thunkAPI) => {
    try {
        const response = await axios.get('/movie/banner');

        return response.data;
    } catch (err) {
        if (err.response) {
            return thunkAPI.rejectWithValue(err.response);
        }
    }
});

export const GetBestOfYear = createAsyncThunk("/movie/bestOfYear", async(thunkAPI) => {
    try {
        const response = await axios.get('/movie/bestOfYear');

        return response.data;
    } catch (err) {
        if (err.response) {
            return thunkAPI.rejectWithValue(err.response);
        }
    }
});

export const GetMovieBySearch = createAsyncThunk("/movie/search", async(data, thunkAPI) => {
    try {
        const response = await axios.get('/movie/search/' + data);

        return response.data;
    } catch (err) {
        if (err.response) {
            return thunkAPI.rejectWithValue(err.response);
        }
    }
});