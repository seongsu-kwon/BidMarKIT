import { Box, Card, CardContent, CardMedia, Typography } from '@mui/material';
import React from 'react';
import { useNavigate } from 'react-router-dom';

export default function ItemCard({ item }) {
    const { id, thumbnail, productName, bidPrice, price, deadline } = item;

    const navigate = useNavigate();

    const formatDate = (date) => {
        const d = new Date(date);
        const year = d.getFullYear();
        const month = d.getMonth() + 1;
        const day = d.getDate();
        const hour = d.getHours();
        const minute = d.getMinutes();
        const second = d.getSeconds();
        return `${month}/${day} ${hour}:${minute}`;
    };

    return (
        <Card sx={{ width: '160px' }} onClick={() => navigate(`/detail/${id}`)}>
            <CardMedia
                sx={{ height: 140, flex: 1 }}
                image={thumbnail}
                title="image"
            />
            <CardContent sx={{ flex: 1 }}>
                <Typography
                    gutterBottom
                    variant="h6"
                    sx={{ fontWeight: 'bold' }}
                >
                    {productName}
                </Typography>
                <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                    <Typography variant="caption" color="text.secondary">
                        현재가
                    </Typography>

                    <Typography variant="caption" sx={{ fontWeight: 'bold' }}>
                        {bidPrice}원
                    </Typography>
                </Box>
                <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                    <Typography variant="caption" color="text.secondary">
                        즉시구매가
                    </Typography>

                    <Typography variant="caption" sx={{ fontWeight: 'bold' }}>
                        {price}원
                    </Typography>
                </Box>
                <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                    <Typography variant="caption" color="text.secondary">
                        마감 기한
                    </Typography>

                    <Typography variant="caption" sx={{ fontWeight: 'bold' }}>
                        {formatDate(deadline)}
                    </Typography>
                </Box>
            </CardContent>
        </Card>
    );
}
