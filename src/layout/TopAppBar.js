import { AppBar, Box, IconButton, Toolbar, Typography } from '@mui/material';
import { styled } from '@mui/material/styles';
import { useLocation, useNavigate } from 'react-router-dom';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import { useRecoilValue } from 'recoil';
import { authState } from 'recoil/auth';

const Offset = styled('div')(({ theme }) => theme.mixins.toolbar);

export default function TopAppBar() {
    const auth = useRecoilValue(authState);

    const navigate = useNavigate();

    const location = useLocation().pathname;

    const checkLocation = () => {
        if (
            location === '/main' ||
            location === '/search' ||
            location === '/chat' ||
            location === '/noti' ||
            location === '/mypage' ||
            location === '/login'
        ) {
            return true;
        } else {
            return false;
        }
    };

    const logout = () => {
        localStorage.removeItem('id');
        localStorage.removeItem('token');
        localStorage.removeItem('accessToken');
        localStorage.removeItem('refreshToken');
        localStorage.removeItem('nickname');
        navigate('/login');
    };
    return (
        <>
            <AppBar
                position="fixed"
                color="primary"
                sx={{
                    // backgroundColor: 'green',
                    boxShadow: 'none',
                }}
            >
                <Toolbar
                    sx={{ display: 'flex', justifyContent: 'space-between' }}
                >
                    {checkLocation() ? (
                        <Box sx={{ width: '50px', height: '50px' }}></Box>
                    ) : (
                        <IconButton
                            onClick={() => navigate(-1)}
                            sx={{
                                width: '50px',
                                height: '50px',
                            }}
                        >
                            <ArrowBackIosIcon />
                        </IconButton>
                    )}

                    <img
                        src="/BMKlogo.png"
                        alt="logo"
                        style={{ width: '200px' }}
                    />
                    {localStorage.getItem('accessToken') ? (
                        <Typography variant="body1" onClick={() => logout()}>
                            로그아웃
                        </Typography>
                    ) : (
                        <Typography
                            variant="body1"
                            onClick={() => navigate('/login')}
                        >
                            로그인
                        </Typography>
                    )}
                </Toolbar>
                {/* <Box>
                    <Typography variant="h6" align="center">
                        {auth.nickname}
                    </Typography>
                </Box> */}
            </AppBar>

            <Offset />
        </>
    );
}
