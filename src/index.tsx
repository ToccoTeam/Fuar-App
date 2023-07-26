import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { AuthProvider } from './context/AuthContext';
import { CustomThemeProvider } from './context/CustomThemeContext';

import 'react-toastify/dist/ReactToastify.css';
import './styles/global.css';
import '@fontsource/roboto';
import { ToastContainer } from 'react-toastify';

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);

root.render(
    <React.StrictMode>
        <CustomThemeProvider>
            <AuthProvider>
                <App />
                <ToastContainer />
            </AuthProvider>
        </CustomThemeProvider>
    </React.StrictMode>
);
