import React, { Suspense } from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import * as serviceWorkerRegistration from './serviceWorkerRegistration';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter } from 'react-router-dom';
import ScrollToTop from './ScrollToTop';
import { QueryClient, QueryClientProvider } from 'react-query';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { ReactQueryDevtools } from 'react-query/devtools';
import { RecoilRoot } from 'recoil';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';

const theme = createTheme({
    palette: {
        primary: {
            // main: '#ff7042',
            main: '#03AED2',
        },
        secondary: {
            // main: '#ffc84b',
            main: '#68D2E8',
        },
        accent: {
            // main: '#65cf55',
            main: '#FDDE55',
        },
        gray: {
            main: '#f5f5f5',
        },
        success: {
            // main: '#65cf55',
            main: '#FDDE55',
        },
        action: {
            // main: '#ff7042',
            main: '#03AED2',
        },
        warning: {
            // main: '#ffc84b',
            main: '#68D2E8',
        },
        error: {
            main: '#d7260d',
        },
        background: {
            default: '#f5f5f5',
        },
    },
});

const root = ReactDOM.createRoot(document.getElementById('root'));
const queryClient = new QueryClient();
root.render(
    <React.StrictMode>
        <BrowserRouter>
            <RecoilRoot>
                <QueryClientProvider client={queryClient}>
                    <ReactQueryDevtools initialIsOpen={true} />
                    <ThemeProvider theme={theme}>
                        <LocalizationProvider dateAdapter={AdapterDayjs}>
                            <ScrollToTop />
                            <App />
                        </LocalizationProvider>
                    </ThemeProvider>
                </QueryClientProvider>
            </RecoilRoot>
        </BrowserRouter>
    </React.StrictMode>
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://cra.link/PWA
serviceWorkerRegistration.register();

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
