import { Box, Button } from '@mui/material';
import React from 'react';

export default function OAuthLoginPage() {
    const link = `https://kauth.kakao.com/oauth/authorize?client_id=${process.env.REACT_APP_KAKAO_API_KEY}&redirect_uri=${process.env.REACT_APP_KAKAO_REDIRECT_URI}&response_type=code`;

    const loginHandler = () => {
        window.location.href = link;
    };

    return (
        <Box
            sx={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
            }}
        >
            <h1>로그인</h1>
            <Button onClick={loginHandler} variant="contained">
                카카오 로그인
            </Button>
        </Box>
    );
}
