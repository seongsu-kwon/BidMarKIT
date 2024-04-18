import {
    Box,
    Button,
    Card,
    CardContent,
    CardMedia,
    Typography,
} from '@mui/material';
import React from 'react';

export default function FailCard({ item }) {
    const { name, bidPrice } = item;

    return (
        <Card sx={{ width: '160px' }}>
            <CardMedia
                sx={{ height: 140, flex: 1 }}
                image="/image.png"
                title="image"
            />
            <CardContent sx={{ flex: 1 }}>
                <Typography
                    gutterBottom
                    variant="h6"
                    sx={{ fontWeight: 'bold' }}
                >
                    {name}
                </Typography>
                <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                    <Typography variant="caption" color="text.secondary">
                        현재가
                    </Typography>

                    <Typography variant="caption" sx={{ fontWeight: 'bold' }}>
                        {bidPrice}원
                    </Typography>
                </Box>
                <Box sx={{ display: 'flex', justifyContent: 'center' }}>
                    <Button variant="contained" color="error">
                        유찰
                    </Button>
                </Box>
            </CardContent>
        </Card>
    );
}
