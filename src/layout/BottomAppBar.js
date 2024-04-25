import { AppBar, Box, Toolbar, Typography } from '@mui/material';
import { styled } from '@mui/material/styles';
import HomeIcon from '@mui/icons-material/Home';
import SearchIcon from '@mui/icons-material/Search';
import NotificationsIcon from '@mui/icons-material/Notifications';
import ChatIcon from '@mui/icons-material/Chat';
import PersonIcon from '@mui/icons-material/Person';
import { useLocation, useNavigate } from 'react-router-dom';
import NavIconButton from 'components/NavIconButton';

const Offset = styled('div')(({ theme }) => theme.mixins.toolbar);

export default function BottomAppBar() {
    const navigate = useNavigate();

    const location = useLocation().pathname;

    return (
        <>
            <Offset />
            <AppBar
                position="fixed"
                sx={{
                    top: 'auto',
                    bottom: 0,
                    backgroundColor: 'lightgrey',
                    boxShadow: 'none',
                    borderTop: '1px solid #e0e0e0',
                }}
            >
                <Toolbar
                    sx={{ display: 'flex', justifyContent: 'space-around' }}
                >
                    <NavIconButton
                        icon={
                            <HomeIcon
                                fontSize="large"
                                sx={{ color: location === '/main' && 'black' }}
                            />
                        }
                        text="홈"
                        url="/main"
                    />

                    <NavIconButton
                        icon={
                            <SearchIcon
                                fontSize="large"
                                sx={{
                                    color: location === '/search' && 'black',
                                }}
                            />
                        }
                        text="검색"
                        url="/search"
                    />

                    <NavIconButton
                        icon={
                            <NotificationsIcon
                                fontSize="large"
                                sx={{ color: location === '/noti' && 'black' }}
                            />
                        }
                        text="알림"
                        url="/noti"
                    />

                    <NavIconButton
                        icon={
                            <ChatIcon
                                fontSize="large"
                                sx={{ color: location === '/chat' && 'black' }}
                            />
                        }
                        text="톡"
                        url="/chat"
                    />

                    <NavIconButton
                        icon={
                            <PersonIcon
                                fontSize="large"
                                sx={{
                                    color: location === '/mypage' && 'black',
                                }}
                            />
                        }
                        text="마이페이지"
                        url="/mypage"
                    />
                </Toolbar>
            </AppBar>
        </>
    );
}
