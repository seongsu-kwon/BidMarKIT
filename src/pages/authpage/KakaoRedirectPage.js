import instance from 'api/instance';
import axios from 'axios';
import React, { useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';

export default function KakaoRedirectPage() {
    const navigate = useNavigate();
    const [searchParams, setSearchParams] = useSearchParams();

    const code = searchParams.get('code');

    useEffect(() => {
        console.log(code);

        if (code) {
            instance
                .post('/oauth/kakao', {
                    code,
                })
                .then((res) => {
                    console.log(res);
                    localStorage.setItem('access', res.data.accessToken);
                    localStorage.setItem('refresh', res.data.refreshToken);

                    navigate('/main');
                })
                .catch((err) => {
                    navigate('/main');

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
