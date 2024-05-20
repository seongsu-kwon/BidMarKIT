import { BottomNavigation, BottomNavigationAction, Box } from '@mui/material';
import React, { useEffect, useState } from 'react';
import HomeIcon from '@mui/icons-material/Home';
import SearchIcon from '@mui/icons-material/Search';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import NotificationsIcon from '@mui/icons-material/Notifications';
import ChatIcon from '@mui/icons-material/Chat';
import PersonIcon from '@mui/icons-material/Person';
import { useLocation, useNavigate } from 'react-router-dom';
import { styled } from '@mui/material/styles';

const Offset = styled('div')(({ theme }) => theme.mixins.toolbar);
export default function BottomNav() {
    const [value, setValue] = useState(0);

    const navigate = useNavigate();

    const location = useLocation().pathname;

    useEffect(() => {
        switch (location) {
            case '/main':
                setValue(0);
                break;
            case '/search':
                setValue(1);
                break;
            // case '/noti':
            case '/upload':
                setValue(2);
                break;
            case '/chat':
                setValue(3);
                break;
            case '/mypage':
                setValue(4);
                break;
            case '/login':
                setValue(5);
                break;
            default:
                setValue(0);
                break;
        }
    }, [location]);

    return (
        <>
            <Offset />
            <Box
                sx={{
                    width: '100%',
                    position: 'fixed',
                    top: 'auto',
                    bottom: 0,
                }}
            >
                <BottomNavigation
                    value={value}
                    onChange={(event, newValue) => {
                        setValue(newValue);
                    }}
                >
                    <BottomNavigationAction
                        label="홈"
                        icon={<HomeIcon />}
                        onClick={() => navigate('/main')}
                    />
                    <BottomNavigationAction
                        label="검색"
                        icon={<SearchIcon />}
                        onClick={() => navigate('/search')}
                    />
                    <BottomNavigationAction
                        label="알림"
                        // icon={<NotificationsIcon />}
                        icon={<AddCircleOutlineIcon />}
                        onClick={
                            localStorage.getItem('accessToken')
                                ? () => navigate('/upload')
                                : () => navigate('/login')
                        }
                    />
                    <BottomNavigationAction
                        label="톡"
                        icon={<ChatIcon />}
                        onClick={
                            localStorage.getItem('accessToken')
                                ? () => navigate('/chat')
                                : () => navigate('/login')
                        }
                    />
                    <BottomNavigationAction
                        label="MY"
                        icon={<PersonIcon />}
                        onClick={
                            localStorage.getItem('accessToken')
                                ? () => navigate('/mypage')
                                : () => navigate('/login')
                        }
                    />
                </BottomNavigation>
            </Box>
        </>
    );
}
