import axios from "axios";
import { createAsyncThunk } from "@reduxjs/toolkit";

export const Login = createAsyncThunk("/login", async(data, thunkAPI) => {
    try {
        const response = await axios.post('/login', data);

        return response.data;
    } catch (err) {
        if (err.response) {
            return thunkAPI.rejectWithValue(err.response.data);
        }
    }
});

export const Logout = createAsyncThunk("/logout", async() => {
    await axios.post('/logout');
});

export const AuthVerification = createAsyncThunk("/auth/verification", async(_, thunkAPI) => {
    try {
        const response = await axios.get('/auth/verification');

        return response.data;
    } catch (err) {
        if(err.response){
            return thunkAPI.rejectWithValue(err.response.data);
        }
    }
});