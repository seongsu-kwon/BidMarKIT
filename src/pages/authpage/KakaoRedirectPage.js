import axios from 'axios';
import React, { useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';

export default function KakaoRedirectPage() {
    const navigate = useNavigate();
    const [searchParams, setSearchParams] = useSearchParams();

    const code = searchParams.get('code');

    useEffect(() => {
        console.log(code);
        axios
            .get('https://novemberrain.duckdns.org/hello-string?name=star')
            .then((res) => {
                console.log(res);
            })
            .catch((err) => {
                console.error(err);
            });

        if (code) {
            axios
                .post('https:/novemberrain.duckdns.org/oauth/kakao', {
                    code,
                })
                .then((res) => {
                    console.log(res);
                    localStorage.setItem('access', res.data.accessToken);
                    localStorage.setItem('refresh', res.data.refreshToken);

                    navigate('/main');
                })
                .catch((err) => {
                    console.error(err);
                });
        }
    });

    return (
        <div>
            <h1>로그인중입니다...</h1>
        </div>
    );
}
