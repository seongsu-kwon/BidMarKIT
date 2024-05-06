import { Box, Button, TextField } from '@mui/material';
import React, { useState } from 'react';
import { useRegister } from 'react-query/auth';

export default function RegisterPage() {
    const [id, setId] = useState('');
    const [password, setPassword] = useState('');
    const [name, setName] = useState('');
    const [nickname, setNickname] = useState('');

    const handleId = (e) => {
        setId(e.target.value);
    };

    const handlePassword = (e) => {
        setPassword(e.target.value);
    };

    const handleName = (e) => {
        setName(e.target.value);
    };

    const handleNickname = (e) => {
        setNickname(e.target.value);
    };

    const formData = new FormData();

    const { mutate: register } = useRegister();

    const onClickRegister = () => {
        // formData.append('id', id);
        // formData.append('password', password);
        // login(formData);
        register({ id, password, name, nickname });
    };

    return (
        <Box
            sx={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
            }}
        >
            <h1>회원가입</h1>
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
            />
            <TextField
                label="이름"
                value={name}
                onChange={handleName}
                sx={{ marginTop: '10px' }}
            />
            <TextField
                label="닉네임"
                value={nickname}
                onChange={handleNickname}
                sx={{ marginTop: '10px' }}
            />
            <Button
                variant="contained"
                sx={{ marginTop: '10px' }}
                onClick={onClickRegister}
                size="large"
                disabled={!id || !password || !name || !nickname}
            >
                로그인
            </Button>
        </Box>
    );
}
