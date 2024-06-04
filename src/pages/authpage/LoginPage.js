import { Box, Button, Dialog, TextField } from '@mui/material';
import { postFCMToken } from 'api/auth';
import Permission from 'components/Permission';
import requestPermission from 'firebase-messaging-sw';
import React, { useState } from 'react';
import { useLogin, usePostFCMToken } from 'react-query/auth';
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

    // const { mutate: postFCMToken } = usePostFCMToken();

    const { mutate: login } = useLogin();

    const [show, setShow] = useState(false);

    const [loading, setLoading] = useState(false);

    const [message, setMessage] = useState('');

    const onClickLogin = async () => {
        localStorage.setItem('memberId', id);

        // if (Notification.permission === 'default') {
        //     setShow(true);
        //     return;
        // } else if (Notification.permission === 'denied') {
        //     alert('알림을 허용해주세요');
        //     return;
        // } else {
        //     setShow(false);
        // }

        if (Notification.permission === 'denied') {
            alert('알림을 허용해주세요');
            return;
        }
        setLoading(true);
        console.log('로그인 시작');
        setMessage('권한 설정 중입니다.');
        await requestPermission();

        setMessage('FCMToken 전송 중입니다.');

        await Promise.all([
            postFCMToken({
                memberId: id,
                FCMToken: localStorage.getItem('fcmToken'),
            }).then((res) => {
                localStorage.setItem('success', true);
            }),
        ]);
        setMessage('로그인 중입니다.');
        console.log('FCMToken 전송 완료');
        formData.append('username', id);
        formData.append('password', password);

        login(formData);
        console.log('로그인 완료');
        setLoading(false);
    };

    return (
        <Box
            sx={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
            }}
        >
            {loading && <Dialog open={loading}>{message}</Dialog>}
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

            <Permission show={show} setShow={setShow} />
        </Box>
    );
}
