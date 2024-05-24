import { login, register } from 'api/auth';
import { useMutation } from 'react-query';
import { useNavigate } from 'react-router-dom';
import { authState } from 'recoil/auth';
import { useRecoilState } from 'recoil';

export const useLogin = () => {
    const navigate = useNavigate();
    const [auth, setAuth] = useRecoilState(authState);
    return useMutation((data) => login(data), {
        onSuccess: (data) => {
            console.log(data);
            // localStorage.setItem('token', data.data.token);
            // localStorage.setItem('id', data.data.id);
            localStorage.setItem('nickname', data.data.nickname);
            localStorage.setItem('accessToken', data.data.accessToken);
            localStorage.setItem('refreshToken', data.data.refreshToken);
            setAuth({
                accessToken: data.data.accessToken,
                refreshToken: data.data.refreshToken,
                nickname: data.data.nickname,
            });
            navigate('/main');
        },
        onError: (error) => {
            alert(`로그인에 실패했습니다. ${error?.code}`);
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
