import React, { useState, useEffect } from 'react'

import { useNavigate, Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { Login } from "../../services/AuthService";

import Validator from '../../utils/Validator'

import NavigationBar from '../../components/NavigationBar'

import './style.scss'

const LoginScreen = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { user, is_loading, is_success, is_error, errors } = useSelector(
        (state) => state.auth
    );
    const [formData, setFormData] = useState({
        email: {
            value: "anthony.vallenet@gmail.com",
            errors: [],
            validationRules: {
                required: true,
                email: true
            },
            customMessages: {
                email: ":attribute est invalide !",
                required: "Le champ \":attribute\" est obligatoire !"
            },
            customAttribute: "Adresse e-mail"
        },
        password: {
            value: "passworddsqdsq",
            errors: [],
            validationRules: {
                required: true,
                minLength: 8,
                maxLength: 16
            },
            customMessages: {
                required: "Le champ \":attribute\" est obligatoireeeee !"
            },
            customAttribute: "Mot de passe"
        }
    });

    useEffect(() => {
        if (is_success) {
            navigate("/");
        } else if (is_error && errors) {
            for (const input in formData) {
                if (errors[input]) {
                    setFormData((currentValue) => {
                        return {
                            ...currentValue,
                            [input]: {
                                ...currentValue[input],
                                errors: errors[input]
                            }
                        }
                    });
                }
            }
        }
    }, [user, is_success, is_error, errors, dispatch, navigate]);

    const inputHandler = (e, input) => {
        const validation = Validator({
                [input]: e.target.value
            },
            {
                [input]: formData[input].validationRules,
            },
            formData[input].customMessages || {},
            {
                [input]: formData[input].customAttribute
            });

        setFormData((currentValue) => {
            return {
                ...currentValue,
                [input]: {
                    ...currentValue[input],
                    value: e.target.value,
                    errors: validation[input] ? validation[input] : []
                }
            }
        });
    }

    const submitHandler = async (e) => {
        e.preventDefault();

        if (is_loading) {
            return;
        }

        const custom_messages = {};

        for (const input in formData) {
            if (formData[input].customMessages) {
                for (const key in formData[input].customMessages) {
                    custom_messages[key] = {
                        ...custom_messages[key],
                        [input]: formData[input].customMessages[key]
                    };
                }
            }
        }

        const validation = Validator({
                email: formData.email.value,
                password: formData.password.value
            },
            {
                email: formData.email.validationRules,
                password: formData.password.validationRules
            },
            custom_messages,
            {
                email: formData.email.customAttribute,
                password: formData.password.customAttribute
            });

        if (Object.keys(validation).length > 0) {
            setFormData((currentValue) => {
                return {
                    ...currentValue,
                    email: {
                        ...currentValue.email,
                        errors: validation.email ? validation.email : []
                    },
                    password: {
                        ...currentValue.password,
                        errors: validation.password ? validation.password : []
                    }
                }
            });

            return;
        }

        dispatch(Login({
            email: formData.email.value,
            password: formData.password.value
        }));
    }

    return (
        <div className="page page__login">
            <NavigationBar connected={false} />

            <div className='layer'>
                <form className='form' onSubmit={submitHandler}>
                    <h1>S'identifier</h1>
                    {/* <div className='error-message-container'>
                        <p>Erreur</p>
                    </div> */}
                    <div className='form-group form-group__combined'>
                        <input type='email' name='email' id='email' className={`${formData.email.value === "" ? 'empty' : ''} ${formData.email.errors.length > 0 ? 'error' : ''}`} defaultValue={formData.email.value} onChange={(e) => inputHandler(e, 'email')} />
                        <label htmlFor='email'>Adresse e-mail</label>
                        {
                            formData.email.errors.length > 0 && (
                                <p className='error-message'>{formData.email.errors[0]}</p>
                            )
                        }
                    </div>
                    <div className='form-group form-group__combined'>
                        <input type='password' name='password' id='password' className={`${formData.password.value === "" ? 'empty' : ''} ${formData.password.errors.length > 0 ? 'error' : ''}`} defaultValue={formData.password.value} onChange={(e) => inputHandler(e, 'password')} />
                        <label htmlFor='password'>Mot de passe</label>
                        {
                            formData.password.errors.length > 0 && (
                                <p className='error-message'>{formData.password.errors[0]}</p>
                            )
                        }
                    </div>
                    <button type='submit' className='button' disabled={is_loading}>
                        {
                            is_loading ? (
                                <div className='loader'>
                                    <div className='loader__dot'></div>
                                    <div className='loader__dot'></div>
                                    <div className='loader__dot'></div>
                                </div>
                            ) : "S'identifier"
                        }
                    </button>
                    <div className='remember'>
                        <div className='form-group form-group__checkbox'>
                            <input type='checkbox' className='input' name='remember' id='remember'/>
                            <label htmlFor='remember'>Se souvenir de moi</label>
                        </div>
                        <a href='#' className='link'>Besoin d'aide ?</a>
                    </div>
                    <p className='signup'>Première visite sur Netflix ? <Link className='link' to='/register'>Inscrivez-vous</Link>.</p>
                    <div className='recaptcha'>
                        <p>Cette page est protégée par Google reCAPTCHA <br /> pour nous assurer que vous n'êtes pas un robot.</p>
                        <a href='#' className='link'>En savoir plus.</a>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default LoginScreen
