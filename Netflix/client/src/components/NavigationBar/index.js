import React, { useState, useEffect } from 'react'

import { useSelector } from "react-redux";
import { NavLink } from "react-router-dom"

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSearch } from '@fortawesome/free-solid-svg-icons'


import Logo from '../../assets/images/logo.png'
import './style.scss'

const NavigationBar = (props) => {
    const { user } = useSelector((state) => state.auth);
    const [scrolled, setScrolled] = useState(false);

    const listenScrollEvent = () => {
        window.scrollY > 10 ? setScrolled(true) : setScrolled(false);
    };

    useEffect(() => {
        window.addEventListener("scroll", listenScrollEvent);

        return () => {
            window.removeEventListener("scroll", listenScrollEvent);
        };
    }, []);

    const buttonSearchHandler = () => {
        // navigate to search page
        console.log("buttonSearchHandler");

        // redirect to search page
    }

    return (
        <nav className={"navigation-bar " + (scrolled && !props.active ? "active" : "") + (props.active ? "active" : "")}>
            <div>
                <img className='logo' src={Logo} alt='Logo' />
                {
                    user != null ? (
                        <ul>
                            <li>
                                <NavLink to="/">Accueil</NavLink>
                            </li>
                            <li>
                                <a href='my-list'>Ma liste</a>
                            </li>
                            <li>
                                <a href='my-opinions'>Mes avis</a>
                            </li>
                        </ul>
                    ) : ""
                }
            </div>
            {
                user != null ? (
                    <div>
                        <button className='search-button' onClick={buttonSearchHandler}>
                            <FontAwesomeIcon icon={faSearch} />
                        </button>
                    </div>
                ) : ""
            }
        </nav>
    );
}

export default NavigationBar
