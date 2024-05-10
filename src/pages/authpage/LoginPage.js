import { Box, Button, TextField } from '@mui/material';
import React, { useState } from 'react';
import { useLogin } from 'react-query/auth';
import { useNavigate } from 'react-router-dom';

export default function LoginPage() {
    const navigate = useNavigate();
    const [id, setId] = useState('');
    const [password, setPassword] = useState('');

    const handleId = (e) => {
        setId(e.target.value);
    };

    const handlePassword = (e) => {
        setPassword(e.target.value);
    };

    const formData = new FormData();

    const { mutate: login } = useLogin();

    const onClickLogin = () => {
        formData.append('username', id);
        formData.append('password', password);
        login(formData);
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
            <TextField
                label="아이디"
                value={id}
                onChange={handleId}
                sx={{ marginTop: '10px' }}
            />
            <TextField
                label="비밀번호"
                value={password}
                onChange={handlePassword}
                inputProps={{
                    type: 'password',
                }}
                sx={{ marginTop: '10px' }}
                onKeyDown={(e) => {
                    if (e.key === 'Enter') {
                        onClickLogin();
                    }
                }}
            />
            <Button
                variant="contained"
                sx={{ marginTop: '10px' }}
                onClick={onClickLogin}
                size="large"
                disabled={!id || !password}
            >
                로그인
            </Button>
            <Button
                variant="contained"
                sx={{ marginTop: '10px' }}
                onClick={() => {
                    navigate('/register');
                }}
            >
                회원가입
            </Button>
        </Box>
    );
}
