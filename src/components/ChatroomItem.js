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
                    <Typography
                        variant="h6"
                        fontWeight={'bold'}
                        sx={{
                            textOverflow: 'ellipsis',
                            width: '55%',
                            whiteSpace: 'nowrap',
                            overflow: 'hidden',
                        }}
                    >
                        {name}
                    </Typography>
                    <Typography
                        variant="body1"
                        sx={{
                            textOverflow: 'ellipsis',
                            width: '40%',
                            whiteSpace: 'nowrap',
                            overflow: 'hidden',
                            textAlign: 'right',
                        }}
                    >
                        {user}
                    </Typography>
                </Box>
                <Box
                    fullWidth
                    sx={{
                        display: 'flex',
                        justifyContent: 'flex-start ',
                        alignItems: 'center',
                    }}
                >
                    <Typography
                        variant="caption"
                        sx={{
                            textOverflow: 'ellipsis',
                            width: '80%',
                            whiteSpace: 'nowrap',
                            overflow: 'hidden',
                        }}
                    >
                        {lastMessage}
                    </Typography>
                </Box>
                <Box
                    fullWidth
                    sx={{
                        display: 'flex',
                        justifyContent: 'flex-end',
                        alignItems: 'center',
                    }}
                >
                    <Typography variant="caption" fontWeight="bold">
                        {date}
                    </Typography>
                </Box>
            </Box>
        </Card>
    );
}
