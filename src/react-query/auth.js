import { login, register } from 'api/auth';
import { useMutation } from 'react-query';
import { useNavigate } from 'react-router-dom';

export const useLogin = () => {
    const navigate = useNavigate();
    return useMutation((data) => login(data), {
        onSuccess: (data) => {
            console.log(data);
            // localStorage.setItem('token', data.data.token);
            // localStorage.setItem('id', data.data.id);
            localStorage.setItem('nickname', data.data.nickname);
            localStorage.setItem('access', data.data.accessToken);
            localStorage.setItem('refresh', data.data.refreshToken);
            navigate('/main');
        },
        onError: (error) => {
            console.log(error);
        },
    });
};

export const useRegister = () => {
    const navigate = useNavigate();
    return useMutation((data) => register(data), {
        onSuccess: (data) => {
            console.log(data);
            navigate('/login');
        },
        onError: (error) => {
            console.log(error);
        },
    });
};
