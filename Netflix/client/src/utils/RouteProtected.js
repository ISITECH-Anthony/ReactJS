import React, { useState, useEffect } from 'react'
import { useSelector } from "react-redux"
import { Outlet, Navigate, useLocation } from "react-router-dom"

const RouteProtected = (props) => {
    const user = useSelector(state => state.auth.user);
    let location = useLocation();
    const { connected } = props;

    if(connected && !user) {
        return <Navigate to="/login" state={{ from: location}} replace />
    } else if (!connected && user) {
        return <Navigate to="/" state={{ from: location}} replace />
    }

    return <Outlet />;
}

export default RouteProtected;