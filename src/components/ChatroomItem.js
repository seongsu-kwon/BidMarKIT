import { Image } from '@mui/icons-material';
import {
    Box,
    Card,
    CardContent,
    CardMedia,
    Paper,
    Typography,
} from '@mui/material';
import React from 'react';

export default function ChatroomItem(props) {
    const { thumbnail, name, lastMessage, date, user } = props;
    return (
        <Card sx={{ display: 'flex', m: 1 }}>
            <CardMedia
                component="img"
                sx={{ width: 100, height: 100 }}
                image="http://placehold.it/200x200"
            />
            <Box
                sx={{
                    width: '100%',
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'space-between',
                    p: 1,
                }}
            >
                <Box
                    fullWidth
                    sx={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                    }}
                >
                    <Typography variant="h6" fontWeight={'bold'}>
                        {name}
                    </Typography>
                    <Typography variant="body1">{user}</Typography>
                </Box>
                <Box
                    fullWidth
                    sx={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                    }}
                >
                    <Typography variant="body1">{lastMessage}</Typography>
                    <Typography variant="caption">{date}</Typography>
                </Box>
            </Box>
        </Card>
    );
}
