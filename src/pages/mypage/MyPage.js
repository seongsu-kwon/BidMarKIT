import {
    Avatar,
    Box,
    Divider,
    List,
    ListItemButton,
    ListItemIcon,
    ListItemText,
} from '@mui/material';
import React from 'react';
import FavoriteIcon from '@mui/icons-material/Favorite';
import ShoppingBasketIcon from '@mui/icons-material/ShoppingBasket';
import ReceiptIcon from '@mui/icons-material/Receipt';

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
    const username = 'USER1';
    return (
        <>
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
                <Avatar {...stringAvatar(username)} sx={{ p: 1, m: 1 }} />
                <h1>{username}</h1>
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
                    <ListItemButton>
                        <ListItemIcon>
                            <FavoriteIcon />
                        </ListItemIcon>
                        <ListItemText primary="관심 목록" />
                    </ListItemButton>
                    <ListItemButton>
                        <ListItemIcon>
                            <ShoppingBasketIcon />
                        </ListItemIcon>
                        <ListItemText primary="구매 내역" />
                    </ListItemButton>
                    <ListItemButton>
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
