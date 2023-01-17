import React, { useEffect } from 'react';
import { useSelector, useDispatch } from "react-redux";
import FullScreenLoader from '../components/FullScreenLoader/FullScreenLoader';
import { AuthVerification } from "../services/AuthService";

const AuthMiddleware = ({ children }) => {
    const dispatch = useDispatch();
    const { is_loading, is_verified } = useSelector((state) => state.auth);

    useEffect(() => {
        if (!is_verified && !is_loading) {
            dispatch(AuthVerification());
        }
    }, [dispatch, is_verified, is_loading]);

    return !is_verified || !is_verified && is_loading ? <FullScreenLoader /> : children;
}

export default AuthMiddleware;