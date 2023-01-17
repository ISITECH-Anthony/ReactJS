import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from "react-redux"

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlay, faCircleInfo, faChevronRight } from '@fortawesome/free-solid-svg-icons'

import NavigationBar from '../../components/NavigationBar'
import Slider from '../../components/Slider'

import { GetMostPopular, GetBestOfYear, GetBannerMovie } from '../../services/MovieService'

import Logo from '../../assets/images/logo.png'
import './style.scss'

const HomeScreen = () => {
    const dispatch = useDispatch();
    const { bannerMovie, bannerMovieLoading } = useSelector((state) => state.movie);
    const [bannerStyle, setBannerStyle] = useState({});

    useEffect(() => {
        if (bannerMovie === null && !bannerMovieLoading) {
            dispatch(GetBannerMovie());
        } else if (bannerMovie) {
            setBannerStyle({ backgroundImage: 'url(https://image.tmdb.org/t/p/original' + bannerMovie.backdrop_path + ')' });
        }
    }, [dispatch, bannerMovie, bannerMovieLoading])

    return (
        <div className="page page__home">
            <NavigationBar />

            <div className='banner' style={bannerStyle}>
                <div className='layer'>
                    {
                        bannerMovie ?
                            <div className='information'>
                                <img src={Logo} />
                                <p className='description'>
                                    {bannerMovie ? bannerMovie.overview.length > 40 ? bannerMovie.overview.substring(0, 140) + '...' : bannerMovie.overview : ''}
                                </p>
                                <div className='buttons'>
                                    <button className='button button__active' onClick={() => {
                                        console.log("Lecture du film: " + bannerMovie.id);
                                    }}>
                                        <FontAwesomeIcon icon={faPlay} />
                                        Lecture
                                    </button>
                                    <button className='button' onClick={() => {
                                        console.log("Plus d'infos sur le film: " + bannerMovie.id);
                                    }}>
                                        <FontAwesomeIcon icon={faCircleInfo} />
                                        Plus d'infos
                                    </button>
                                </div>
                            </div>
                        : ''
                    }
                </div>
            </div>

            <Slider
                service={GetMostPopular}
                storeData={"mostPopular"}
                title={"Films les plus populaires"}
                showAllHandler = {() => {
                    console.log("Tout explorer");
                }}
                showOneHandler = {(id) => {
                    console.log("Show one film: " + id);
                }}
                myListHandler = {(id, status) => {
                    if (!status) {
                        console.log("Add to my list: " + id);
                    } else {
                        console.log("Remove from my list: " + id);
                    }
                }}
            />
            <Slider
                service={GetBestOfYear}
                storeData={"bestOfYear"}
                title={"Meilleurs films de l'année"}
                showAllHandler = {() => {
                    console.log("Tout explorer");
                }}
                showOneHandler = {(id) => {
                    console.log("Show one film: " + id);
                }}
                myListHandler = {(id, status) => {
                    if (!status) {
                        console.log("Add to my list: " + id);
                    } else {
                        console.log("Remove from my list: " + id);
                    }
                }}
            />
        </div>
    )
}

export default HomeScreen
