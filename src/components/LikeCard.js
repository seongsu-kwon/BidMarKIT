import { Box, Card, CardContent, CardMedia, Typography } from '@mui/material';
import dayjs from 'dayjs';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import FavoriteIcon from '@mui/icons-material/Favorite';

export default function LikeCard({ item }) {
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

    const [like, setLike] = useState(false);

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
                            판매 완료
                        </Typography>
                    ) : null}
                </Box>
                <Box
                    sx={{
                        position: 'absolute',
                        top: 0,
                        right: 0,
                        padding: 1,
                    }}
                >
                    {like ? (
                        <FavoriteIcon
                            fontSize="large"
                            onClick={(e) => {
                                e.stopPropagation();
                                setLike(!like);
                            }}
                            color="error"
                        />
                    ) : (
                        <FavoriteBorderIcon
                            fontSize="large"
                            onClick={(e) => {
                                e.stopPropagation();
                                setLike(!like);
                            }}
                        />
                    )}
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
                        현재가
                    </Typography>

                    <Typography variant="caption" sx={{ fontWeight: 'bold' }}>
                        {bidPrice?.toLocaleString()}원
                    </Typography>
                </Box>
                <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                    <Typography variant="caption" color="text.secondary">
                        즉구가
                    </Typography>

                    <Typography variant="caption" sx={{ fontWeight: 'bold' }}>
                        {price?.toLocaleString()}원
                    </Typography>
                </Box>
                <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                    <Typography variant="caption" color="text.secondary">
                        마감 기한
                    </Typography>

                    <Typography variant="caption" sx={{ fontWeight: 'bold' }}>
                        {/* {formatDate(deadline)}  */}
                        {dayjs(deadline).format('MM/DD HH:mm')}
                    </Typography>
                </Box>
            </CardContent>
        </Card>
    );
}
