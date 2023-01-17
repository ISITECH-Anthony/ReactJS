import { createSlice } from "@reduxjs/toolkit";
import { Login, AuthVerification } from "../services/AuthService";

const initialState = {
    user: null,
    is_verified: false,
    is_loading: false,
    is_success: false,
    is_error: false,
    message: "",
    errors: {},
}

export const AuthSlice = createSlice({
    name: "auth",
    initialState,
    extraReducers:(builder) =>{
        builder.addCase(Login.pending, (state) => {
            state.is_loading = true;
        });
        builder.addCase(Login.fulfilled, (state, action) => {
            state.is_loading = false;
            state.message = action.payload.message;
            state.user = action.payload.data;
        });
        builder.addCase(Login.rejected, (state, action) => {
            state.is_loading = false;
            state.is_error = true;
            state.message = action.payload.message;
            state.errors = action.payload.data;
        });

        builder.addCase(AuthVerification.pending, (state) => {
            state.is_loading = true;
        });
        builder.addCase(AuthVerification.fulfilled, (state, action) => {
            state.is_loading = false;
            state.is_verified = true;
            state.user = action.payload.data;
        });
    }
});

export default AuthSlice.reducer;