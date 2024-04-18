import { AppBar, Box, IconButton, Toolbar, Typography } from '@mui/material';
import { styled } from '@mui/material/styles';
import Button from 'components/Button';
import { useLocation, useNavigate } from 'react-router-dom';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';

const Offset = styled('div')(({ theme }) => theme.mixins.toolbar);

export default function TopAppBar() {
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
    return (
        <>
            <AppBar
                position="fixed"
                sx={{
                    backgroundColor: 'blue',
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
                    <Typography variant="h6">로그인</Typography>
                </Toolbar>
            </AppBar>

            <Offset />
        </>
    );
}
