import instance from './instance';

export const login = async (data) => {
    const response = await instance.post('/login', data);
    return response;
};
