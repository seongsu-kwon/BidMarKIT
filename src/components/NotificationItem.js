import React from 'react';
import NotificationsIcon from '@mui/icons-material/Notifications';
import { Box, Paper, Typography } from '@mui/material';

export default function NotificationItem(props) {
    const { content, date } = props;
    return (
        <Paper
            sx={{
                m: '10px',
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
            }}
            fullWidth
        >
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
                <NotificationsIcon
                    sx={{ p: '10px' }}
                    color="primary"
                    fontSize="large"
                />
                <Typography
                    variant="body1"
                    sx={{
                        width: '60%',
                    }}
                >
                    "상품"이 낙찰되었습니다.
                </Typography>
                <Typography
                    variant="caption"
                    sx={{ p: '10px', width: '30%', whiteSpace: 'nowrap' }}
                >
                    2024.04.01 18:10
                </Typography>
            </Box>
        </Paper>
    );
}
