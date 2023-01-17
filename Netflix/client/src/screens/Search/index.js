import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from "react-redux"

import NavigationBar from "../../components/NavigationBar"

import "./style.scss"

const SearchScreen = () => {
    return (
        <div className="page page__search">
            <NavigationBar />

            <div className="page__content">
                <p>Search</p>
            </div>
        </div>
    )
}

export default SearchScreen
