import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import { store } from './store';
import App from './App';
import axios from "axios";
import AuthMiddleware from './utils/AuthMiddleware';

axios.defaults.withCredentials = true;
axios.defaults.baseURL = process.env.REACT_APP_API_URL;

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <React.StrictMode>
        <Provider store={store}>
            <AuthMiddleware>
                <App />
            </AuthMiddleware>
        </Provider>
    </React.StrictMode>
);
