import axios from 'axios';
import axiosInstance from './axiosInstance';

const REFRESH_API = '/accessToken';

const instance = axios.create({
    baseURL: process.env.REACT_APP_API,
});

instance.interceptors.request.use(
    (config) => {
        if (config.url === '/login' || config.url === REFRESH_API)
            return config;
        const accessToken = localStorage.getItem('accessToken');

        if (accessToken) {
            // config.headers.Authorization = `Bearer ${accessToken}`;
            config.headers.Authorization = `${accessToken}`;

            console.log('config', config);
            return config;
        }
    },
    (error) => {
        console.log('ERROR', error);
        return Promise.reject(error);
    }
);
instance.interceptors.response.use(
    (response) => {
        console.log('response', response);
        return response;
    },
    (error) => {
        console.log('ERROR', error);
        if (error.response) {
            console.log('ERRORSTATUS', error.response.status);

            if (error.response.status === 401) {
                localStorage.removeItem('accessToken');
                const refreshToken = localStorage.getItem('refreshToken');
                axiosInstance
                    .post(REFRESH_API, {
                        refreshToken,
                    })
                    .then((res) => {
                        const { accessToken } = res.data.data;
                        localStorage.setItem('accessToken', accessToken);
                        // localStorage.setItem('refreshToken', refreshToken);
                    })
                    .catch((err) => {
                        console.log('에러', err);
                    });
            }
        } else if (axios.isCancel(error)) {
            console.log('Request canceled', error.message);
        } else {
            console.error('Another error happened', error.message);
        }

        return Promise.reject(error);
    }
);

export default instance;
