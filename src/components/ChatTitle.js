import { Image } from '@mui/icons-material';
import {
    Box,
    Button,
    Card,
    CardContent,
    CardMedia,
    Paper,
    Typography,
} from '@mui/material';
import React from 'react';

export default function ChatTitle(props) {
    const { thumbnail, name, price, onClick } = props;
    return (
        <Box sx={{ display: 'flex', m: 1 }} onClick={onClick}>
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
                            width: '85%',
                            whiteSpace: 'nowrap',
                            overflow: 'hidden',
                        }}
                    >
                        {name}
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
                        variant="body1"
                        sx={{
                            textOverflow: 'ellipsis',
                            width: '80%',
                            whiteSpace: 'nowrap',
                            overflow: 'hidden',
                        }}
                    >
                        최종거래가 : {price.toLocaleString()}원
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
                    <Button variant="contained" color="primary">
                        거래 확정
                    </Button>
                </Box>
            </Box>
        </Box>
    );
}
