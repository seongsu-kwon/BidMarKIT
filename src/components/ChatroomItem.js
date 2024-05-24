import { Image } from '@mui/icons-material';
import {
    Box,
    Card,
    CardContent,
    CardMedia,
    Paper,
    Typography,
} from '@mui/material';
import dayjs from 'dayjs';
import React from 'react';

export default function ChatroomItem(props) {
    const { roomId, thumbnail, name, lastMessage, date, user, onClick } = props;
    return (
        <Card sx={{ display: 'flex', m: 1 }} onClick={onClick}>
            <CardMedia
                component="img"
                sx={{ width: 100, height: 100, flex: 1 }}
                image={thumbnail}
            />
            <Box
                sx={{
                    flex: 4,
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'space-between',
                    p: 1,
                    minWidth: 0,
                }}
            >
                <Box
                    sx={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        minWidth: 0,
                    }}
                >
                    <Box sx={{ flex: 2, minWidth: 0 }}>
                        <Typography
                            variant="body1"
                            fontWeight={'bold'}
                            sx={{
                                textOverflow: 'ellipsis',

                                whiteSpace: 'nowrap',
                                overflow: 'hidden',
                            }}
                        >
                            {name}
                        </Typography>
                    </Box>
                    <Box sx={{ flex: 1, minWidth: 0 }}>
                        <Typography
                            variant="body1"
                            sx={{
                                flex: 1,
                                textOverflow: 'ellipsis',

                                whiteSpace: 'nowrap',
                                overflow: 'hidden',
                                textAlign: 'right',
                            }}
                        >
                            {user}
                        </Typography>
                    </Box>
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
                        {dayjs(date).format('YYYY-MM-DD HH:mm')}
                    </Typography>
                </Box>
            </Box>
        </Card>
    );
}
