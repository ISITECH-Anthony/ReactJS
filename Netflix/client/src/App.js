import React from 'react'
import {
    BrowserRouter,
    Routes,
    Route
} from 'react-router-dom'
import './App.scss'

import RouteProtected from './utils/RouteProtected'

import HomeScreen from './screens/Home'
import SearchScreen from './screens/Search'
import LoginScreen from './screens/Login'
import RegisterScreen from './screens/Register'
import NotFoundScreen from './screens/NotFound'

function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route element={<RouteProtected connected={true}/>}>
                    <Route index path='/' name="home" element={<HomeScreen />} />
                    <Route path='/search' name="search" element={<SearchScreen />} />
                </Route>
                <Route element={<RouteProtected connected={false}/>}>
                    <Route path='/login' element={<LoginScreen />} />
                    <Route path='/register' element={<RegisterScreen />} />
                </Route>
                <Route path='*' element={<NotFoundScreen />} />
            </Routes>
        </BrowserRouter>
    );
}

export default App;
