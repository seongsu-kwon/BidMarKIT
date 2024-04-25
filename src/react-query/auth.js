import { login } from 'api/auth';
import { useMutation } from 'react-query';
import { useNavigate } from 'react-router-dom';

export const useLogin = () => {
    const navigate = useNavigate();
    return useMutation((data) => login(data), {
        onSuccess: (data) => {
            console.log(data);
            localStorage.setItem('token', data.data.token);
            localStorage.setItem('id', data.data.id);
            navigate('/main');
        },
        onError: (error) => {
            console.log(error);
        },
    });
};
