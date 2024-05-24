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
    const { thumbnail, name, price } = props;

    return (
        <Card sx={{ display: 'flex', m: 1 }}>
            <CardMedia
                component="img"
                sx={{ width: '10rem', height: '10rem', flex: 1 }}
                image={thumbnail}
            />

            <Box
                sx={{
                    flex: 3,
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'space-between',
                    p: 1,
                    // boxSizing: 'border-box',
                    minWidth: 0,
                }}
            >
                <Typography
                    variant="h6"
                    fontWeight={'bold'}
                    sx={{
                        textOverflow: 'ellipsis',
                        // width: '85vw',

                        whiteSpace: 'nowrap',
                        overflow: 'hidden',
                    }}
                >
                    {name}
                </Typography>

                <Typography
                    variant="body1"
                    sx={
                        {
                            // textOverflow: 'ellipsis',
                            // // width: '85vw',
                            // whiteSpace: 'nowrap',
                            // overflow: 'hidden',
                        }
                    }
                >
                    최종거래가 : {price?.toLocaleString()}원
                </Typography>

                <Button variant="contained" color="primary">
                    거래 확정
                </Button>
            </Box>
        </Card>
    );
}
