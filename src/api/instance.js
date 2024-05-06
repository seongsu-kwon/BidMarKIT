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
        const accessToken = localStorage.getItem('access');

        if (accessToken) {
            config.headers.Authorization = `Bearer ${accessToken}`;

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
                localStorage.removeItem('access');
                const refreshToken = localStorage.getItem('refresh');
                axiosInstance
                    .post(REFRESH_API, {
                        refreshToken,
                    })
                    .then((res) => {
                        const { accessToken } = res.data.data;
                        localStorage.setItem('access', accessToken);
                        //   localStorage.setItem("refresh", refreshToken);
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
