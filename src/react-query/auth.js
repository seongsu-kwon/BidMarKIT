import { getCancelToken, login, postFCMToken, register } from 'api/auth';
import { useMutation, useQuery } from 'react-query';
import { useNavigate } from 'react-router-dom';
import { authState } from 'recoil/auth';
import { useRecoilState } from 'recoil';
import axios from 'axios';

export const useLogin = () => {
    const navigate = useNavigate();
    const [auth, setAuth] = useRecoilState(authState);
    return useMutation((data) => login(data), {
        onSuccess: (data) => {
            console.log(data);
            // localStorage.setItem('token', data.data.token);
            //   localStorage.setItem("id", data.data.id);
            localStorage.setItem('nickname', data.data.nickname);
            localStorage.setItem('accessToken', data.data.accessToken);
            localStorage.setItem('refreshToken', data.data.refreshToken);
            setAuth({
                accessToken: data.data.accessToken,
                refreshToken: data.data.refreshToken,
                nickname: data.data.nickname,
            });
            // navigate("/main");

            // navigate(-1);
            navigate('/main');
            // window.location.href = "/main";
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

export const usePostFCMToken = () => {
    return useMutation((data) => postFCMToken(data), {
        onSuccess: (data) => {
            localStorage.setItem('success', true);
            console.log(data);
        },
        onError: (error) => {
            console.log(error);
        },
    });
};

export const useGetCancelToken = () => {
    const { data, isLoading, isError } = useQuery(['cancelToken'], () =>
        getCancelToken()
    );

    console.log('data', data);

    return { cancelToken: data?.data, isLoading, isError };
};
