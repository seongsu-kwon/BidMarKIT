import React, { useState, useEffect } from 'react';
import { Avatar, Box, Grid, TextField, Typography } from '@mui/material';
import { Carousel } from 'react-responsive-carousel';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import FavoriteIcon from '@mui/icons-material/Favorite';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import StarIcon from '@mui/icons-material/Star';
import Button from 'components/Button';
import { styled } from '@mui/material/styles';
import dayjs from 'dayjs';
import { useParams } from 'react-router-dom';

const Offset = styled('div')(({ theme }) => theme.mixins.toolbar);

export default function BidPage() {
    const { id } = useParams();

    const [remain, setRemain] = useState();

    const [like, setLike] = useState(false);

    useEffect(() => {
        const interval = setInterval(() => {
            const startDate = new Date();
            const endDate = new Date(item.deadline);
            const day = startDate.getTime() - endDate.getTime();
            const dDay = Math.floor(Math.abs(day / (1000 * 3600 * 24)));
            const dHour = Math.floor(Math.abs((day / (1000 * 3600)) % 24));
            const dMin = Math.floor(Math.abs((day / (1000 * 60)) % 60));
            const dSec = Math.floor(Math.abs((day / 1000) % 60));

            setRemain(`${dDay}일 ${dHour}시간 ${dMin}분 ${dSec}초`);
            if (dDay === 0) {
                setRemain(`${dHour}시간 ${dMin}분 ${dSec}초`);
                if (dHour === 0) {
                    setRemain(`${dMin}분 ${dSec}초`);
                    if (dMin === 0) {
                        setRemain(`${dSec}초`);
                        if (dSec === 0) {
                            setRemain('마감');
                            clearInterval(interval);
                        }
                    }
                }
            }
        }, 1000);
        return () => {
            clearInterval(interval);
        };
    }, []);

    const item = {
        name: '상품' + id,
        content:
            'https://cdn.pixabay.com/photo/2015/04/23/22/00/tree-736885__480.jpghttps://cdn.pixabay.com/photo/2015/04/23/22/00/tree-736885__480.jpghttps://cdn.pixabay.com/photo/2015/04/23/22/00/tree-736885__480.jpg',
        initPrice: 10000,
        bidPrice: 10000,
        price: 20000,
        deadline: '2024-04-30T14:41:00',
        like: like,
    };

    const imageList = [
        'https://cdn.pixabay.com/photo/2015/04/23/22/00/tree-736885__480.jpg',
        'https://cdn.pixabay.com/photo/2015/04/23/22/00/tree-736885__480.jpg',
        'https://cdn.pixabay.com/photo/2015/04/23/22/00/tree-736885__480.jpg',
        'https://cdn.pixabay.com/photo/2015/04/23/22/00/tree-736885__480.jpg',
        'https://cdn.pixabay.com/photo/2015/04/23/22/00/tree-736885__480.jpg',
        'https://cdn.pixabay.com/photo/2015/04/23/22/00/tree-736885__480.jpg',
        'https://cdn.pixabay.com/photo/2015/04/23/22/00/tree-736885__480.jpg',
        'https://cdn.pixabay.com/photo/2015/04/23/22/00/tree-736885__480.jpg',
    ];

    const [bidAmount, setBidAmount] = useState(0);

    const handleBidAmount = (e) => {
        let price = e.target.value;
        price = Number(price.replaceAll(/[^0-9]/g, ''));
        if (isNaN(price)) {
            setBidAmount(0);
        } else {
            setBidAmount(price.toLocaleString('ko-KR'));
        }
    };

    const [ceilingPrice, setCeilingPrice] = useState(0);

    const handleCeilingPrice = (e) => {
        let price = e.target.value;
        price = Number(price.replaceAll(/[^0-9]/g, ''));
        if (isNaN(price)) {
            setCeilingPrice(0);
        } else {
            setCeilingPrice(price.toLocaleString('ko-KR'));
        }
    };

    return (
        <div>
            <h1>{item.name}</h1>

            <Grid container spacing={2} sx={{ alignItems: 'center' }}>
                <Grid item md={4} xs={4}>
                    <Typography variant="body1" fontWeight={'bold'}>
                        현재가
                    </Typography>
                </Grid>
                <Grid item md={8} xs={8}>
                    <Typography variant="h5" fontWeight={'bold'}>
                        {item.bidPrice.toLocaleString()}원
                    </Typography>
                </Grid>
            </Grid>

            <Grid container spacing={2} sx={{ alignItems: 'center' }}>
                <Grid item md={4} xs={4}>
                    <Typography variant="body1" fontWeight={'bold'}>
                        남은 시간
                    </Typography>
                </Grid>
                <Grid item md={8} xs={8}>
                    <Typography variant="h6" fontWeight={'bold'}>
                        {remain}
                    </Typography>
                </Grid>
            </Grid>
            <h2>직접 입찰</h2>
            <Grid container spacing={2} sx={{ alignItems: 'center' }}>
                <Grid item md={4} xs={4}>
                    <Typography variant="h6" fontWeight={'bold'}>
                        입찰가
                    </Typography>
                </Grid>
                <Grid item md={8} xs={8}>
                    <Box
                        sx={{
                            display: 'flex',
                            justifyContent: 'center',
                            alignItems: 'center',
                        }}
                    >
                        <TextField
                            variant="outlined"
                            fontWeight={'bold'}
                            value={bidAmount}
                            onChange={handleBidAmount}
                            inputProps={{
                                style: { textAlign: 'right' },
                            }}
                        />
                        <Typography variant="h6" fontWeight={'bold'}>
                            원
                        </Typography>
                    </Box>
                </Grid>
                <Grid
                    item
                    md={12}
                    xs={12}
                    sx={{ display: 'flex', justifyContent: 'center' }}
                >
                    <Button>입찰하기</Button>
                </Grid>
            </Grid>

            <h2>자동 입찰</h2>
            <Grid container spacing={2} sx={{ alignItems: 'center' }}>
                <Grid item md={4} xs={4}>
                    <Typography variant="h6" fontWeight={'bold'}>
                        입찰가
                    </Typography>
                </Grid>
                <Grid item md={8} xs={8}>
                    <Box
                        sx={{
                            display: 'flex',
                            justifyContent: 'center',
                            alignItems: 'center',
                        }}
                    >
                        <TextField
                            variant="outlined"
                            fontWeight={'bold'}
                            value={ceilingPrice}
                            onChange={handleCeilingPrice}
                            inputProps={{
                                style: { textAlign: 'right' },
                            }}
                        />
                        <Typography variant="h6" fontWeight={'bold'}>
                            원
                        </Typography>
                    </Box>
                </Grid>
                <Grid
                    item
                    md={12}
                    xs={12}
                    sx={{ display: 'flex', justifyContent: 'center' }}
                >
                    <Button>입찰하기</Button>
                </Grid>
            </Grid>
        </div>
    );
}
