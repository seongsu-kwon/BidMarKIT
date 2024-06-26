import {
    Avatar,
    Box,
    Divider,
    List,
    ListItemButton,
    ListItemIcon,
    ListItemText,
    TextField,
    Typography,
} from '@mui/material';
import React from 'react';
import NotificationsIcon from '@mui/icons-material/Notifications';
import ShoppingBasketIcon from '@mui/icons-material/ShoppingBasket';
import ReceiptIcon from '@mui/icons-material/Receipt';
import { useNavigate } from 'react-router-dom';
import { useGetCancelToken } from 'react-query/auth';

function stringToColor(string) {
    let hash = 0;
    let i;

    /* eslint-disable no-bitwise */
    for (i = 0; i < string.length; i += 1) {
        hash = string.charCodeAt(i) + ((hash << 5) - hash);
    }

    let color = '#';

    for (i = 0; i < 3; i += 1) {
        const value = (hash >> (i * 8)) & 0xff;
        color += `00${value.toString(16)}`.slice(-2);
    }
    /* eslint-enable no-bitwise */

    return color;
}
function stringAvatar(name) {
    return {
        sx: {
            bgcolor: stringToColor(name),
        },
        children: `${name[0]}`,
    };
}
export default function MyPage() {
    const navigate = useNavigate();
    const username = localStorage.getItem('nickname') || '게스트';

    const { cancelToken } = useGetCancelToken();

    return (
        <>
            <Box
                sx={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                }}
            >
                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                    <Avatar {...stringAvatar(username)} sx={{ p: 1, m: 1 }} />
                    <h1>{username}</h1>
                </Box>
                <Box>
                    <Typography variant="body2">
                        구매파기횟수 : {cancelToken?.cancelPurchase}
                    </Typography>
                    <Typography variant="body2">
                        판매파기횟수 : {cancelToken?.cancelSale}
                    </Typography>
                </Box>
            </Box>

            <Divider />
            <Box
                sx={{
                    width: '100%',
                    maxWidth: '100%',
                    bgcolor: 'background.paper',
                }}
            >
                <List>
                    <ListItemButton
                        onClick={() => {
                            navigate('noti');
                        }}
                    >
                        <ListItemIcon>
                            <NotificationsIcon />
                        </ListItemIcon>
                        <ListItemText primary="알림 목록" />
                    </ListItemButton>
                    <ListItemButton
                        onClick={() => {
                            navigate('history/purchase');
                        }}
                    >
                        <ListItemIcon>
                            <ShoppingBasketIcon />
                        </ListItemIcon>
                        <ListItemText primary="구매 내역" />
                    </ListItemButton>
                    <ListItemButton
                        onClick={() => {
                            navigate('history/sale');
                        }}
                    >
                        <ListItemIcon>
                            <ReceiptIcon />
                        </ListItemIcon>
                        <ListItemText primary="판매 내역" />
                    </ListItemButton>
                </List>
            </Box>
        </>
    );
}
