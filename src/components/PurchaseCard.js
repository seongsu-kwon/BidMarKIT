import {
    Box,
    Button,
    Card,
    CardContent,
    CardMedia,
    Typography,
} from '@mui/material';
import dayjs from 'dayjs';
import React from 'react';
import { useNavigate } from 'react-router-dom';

export default function PurchaseCard({ item }) {
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
                    {state === 1 ? (
                        <Typography
                            variant="h6"
                            color="text.secondary"
                            fontWeight={'bold'}
                        >
                            거래 중
                        </Typography>
                    ) : state === 2 ? (
                        <Typography
                            variant="h6"
                            color="text.secondary"
                            fontWeight={'bold'}
                        >
                            유찰
                        </Typography>
                    ) : state === 3 ? (
                        <Typography
                            variant="h6"
                            color="text.secondary"
                            fontWeight={'bold'}
                        >
                            구매 완료
                        </Typography>
                    ) : null}
                </Box>
            </Box>

            <CardContent sx={{ flex: 1 }}>
                <Typography
                    gutterBottom
                    nowrap
                    variant="body1"
                    sx={{
                        fontWeight: 'bold',
                        overflow: 'hidden',
                        textOverflow: 'ellipsis',
                        display: '-webkit-box',
                        WebkitLineClamp: '2',
                        WebkitBoxOrient: 'vertical',
                    }}
                >
                    {productName}
                </Typography>

                <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                    <Typography variant="caption" color="text.secondary">
                        구매가
                    </Typography>

                    <Typography variant="caption" sx={{ fontWeight: 'bold' }}>
                        {bidPrice?.toLocaleString()}원
                    </Typography>
                </Box>
            </CardContent>
        </Card>
    );
}
