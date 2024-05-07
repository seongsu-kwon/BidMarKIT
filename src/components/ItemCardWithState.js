import { Box, Card, CardContent, CardMedia, Typography } from '@mui/material';
import React from 'react';
import { useNavigate } from 'react-router-dom';

export default function ItemCardWithState({ item }) {
    const {
        productId,
        thumbnail,
        productName,
        bidPrice,
        price,
        deadline,
        state,
    } = item;

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

    console.log('ITEM', productName);
    console.log('STATE', state);
    console.log('진실', state === 0 ? '경매중' : '경매종료');

    return (
        <Card
            sx={{ width: '160px' }}
            onClick={() => navigate(`/detail/${productId}`)}
        >
            <Box sx={{ position: 'relative', width: '160px', height: '140px' }}>
                <CardMedia
                    sx={{
                        width: 160,
                        height: 140,
                        flex: 1,
                        opacity: state === 0 ? 1 : 0.5,
                        position: 'absolute',
                        top: 0,
                        left: 0,
                    }}
                    image={thumbnail || 'https://via.placeholder.com/150'}
                    title="image"
                />
                <Box
                    sx={{
                        width: '160px',
                        height: '140px',
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                    }}
                >
                    {state === 0 ? null : (
                        <Typography variant="h6" color="text.secondary">
                            거래 중
                        </Typography>
                    )}
                </Box>
            </Box>

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
