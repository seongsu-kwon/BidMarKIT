import { Box, Button, TextField } from '@mui/material';
import React, { useState } from 'react';
import { useLogin } from 'react-query/auth';

export default function LoginPage() {
    const [id, setId] = useState('');
    const [password, setPassword] = useState('');

    const handleId = (e) => {
        setId(e.target.value);
    };

    const handlePassword = (e) => {
        setPassword(e.target.value);
    };

    const { mutate: login } = useLogin();

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
                sx={{ marginTop: '10px' }}
            />
            <Button
                variant="contained"
                sx={{ marginTop: '10px' }}
                onClick={() => login({ id, password })}
                size="large"
                disabled={!id || !password}
            >
                로그인
            </Button>
        </Box>
    );
}
