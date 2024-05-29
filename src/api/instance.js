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
        if (
            config.url.startsWith('/products/') &&
            !isNaN(config.url.split('/').pop()) &
                (localStorage.getItem('accessToken') === null)
        )
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
        console.log('IntanceResponse', response);
        return response;
    },
    (error) => {
        console.log('ERROR', error);
        if (error.response) {
            console.log('ERRORSTATUS', error.response.status);

            console.log('인스턴스 토큰 응답 에러', error.response);

            if (error.response.status === 403) {
                console.log('토큰 만료 403 Forbidden');
                localStorage.removeItem('accessToken');
                const refreshToken = localStorage.getItem('refreshToken');
                axiosInstance
                    .post(REFRESH_API, {
                        refreshToken,
                    })
                    .then((res) => {
                        console.log('리프레쉬 성공', res);
                        const { accessToken } = res.data;
                        localStorage.setItem('accessToken', accessToken);
                        // localStorage.setItem('refreshToken', refreshToken);
                    })
                    .catch((err) => {
                        console.log('리프레쉬 에러', err);
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
