import React, { useState, useEffect } from 'react';
import { Avatar, Box, Grid, Typography } from '@mui/material';
import { Carousel } from 'react-responsive-carousel';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import FavoriteIcon from '@mui/icons-material/Favorite';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import StarIcon from '@mui/icons-material/Star';
import Button from 'components/Button';
import { styled } from '@mui/material/styles';
import dayjs from 'dayjs';
import { useNavigate, useParams } from 'react-router-dom';

const Offset = styled('div')(({ theme }) => theme.mixins.toolbar);

export default function ProductDetailPage() {
    const navigate = useNavigate();
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
        currentPrice: 10000,
        buyNowPrice: 20000,
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
    return (
        <div>
            <h1>Product Detail Page</h1>
            <Carousel
                // slidable={true}
                // emulateTouch={true}
                showStatus={false}
                // showArrows={count === 4 ? true : false}
                showArrows={false}
                showThumbs={false}
                preventMovementUntilSwipeScrollTolerance={true}
                swipeScrollTolerance={50}
                infiniteLoop={true}
            >
                {imageList.map((image, index) => (
                    <Box key={index}>
                        <img
                            src={image}
                            alt="상품 이미지"
                            style={{ width: '400px', height: '300px' }}
                        />
                    </Box>
                ))}
            </Carousel>
            <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                <h1>{item.name}</h1>
                <Box
                    sx={{
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                    }}
                >
                    {item.like ? (
                        <FavoriteIcon
                            fontSize="large"
                            onClick={() => setLike(!like)}
                        />
                    ) : (
                        <FavoriteBorderIcon
                            fontSize="large"
                            onClick={() => setLike(!like)}
                        />
                    )}
                </Box>
            </Box>

            <Grid container spacing={2} sx={{ alignItems: 'center' }}>
                <Grid item md={4} xs={4}>
                    <Typography variant="body1" fontWeight={'bold'}>
                        현재가
                    </Typography>
                </Grid>
                <Grid item md={8} xs={8}>
                    <Typography variant="h5" fontWeight={'bold'}>
                        {item.currentPrice.toLocaleString()}원
                    </Typography>
                </Grid>
            </Grid>
            <Typography variant="body2">
                시작가 : {item.initPrice.toLocaleString()}원
            </Typography>
            <Grid container spacing={2} sx={{ alignItems: 'center' }}>
                <Grid item md={4} xs={4}>
                    <Typography variant="body1" fontWeight={'bold'}>
                        즉시구매가
                    </Typography>
                </Grid>
                <Grid item md={8} xs={8}>
                    <Typography variant="h5" fontWeight={'bold'}>
                        {item.buyNowPrice.toLocaleString()}원
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
            <Typography variant="body2">
                마감 기한 : ~ {dayjs(item.deadline).format('YYYY.MM.DD HH:mm')}
            </Typography>
            <hr />
            <Typography variant="h5" fontWeight={'bold'}>
                판매자 정보
            </Typography>
            <Box
                sx={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                }}
            >
                <Box
                    sx={{
                        display: 'flex',
                        justifyContent: 'space-around',
                        alignItems: 'center',
                    }}
                >
                    <Avatar sx={{ width: 50, height: 50 }}>
                        <AccountCircleIcon sx={{ width: 50, height: 50 }} />
                    </Avatar>
                    <Typography variant="h6">판매자 이름</Typography>
                </Box>
                {/* <Box
                    sx={{
                        display: 'flex',
                        justifyContent: 'space-around',
                        alignItems: 'center',
                    }}
                >
                    <StarIcon fontSize="large" />
                    <Typography variant="h6">4.5</Typography>
                </Box> */}
            </Box>
            <hr />
            <Typography variant="h5" fontWeight={'bold'}>
                상품 설명
            </Typography>
            <Typography
                variant="body2"
                sx={{
                    textAlign: 'left',
                    overflow: 'auto',
                    wordBreak: 'keep-all',
                    width: '100%',
                }}
            >
                설명 내용 설명 내용 설명 내용설명 내용 설명 내용 설명 내용설명
                내용 설명 내용 설명 내용설명 내용 설명 내용 설명 내용설명 내용
                설명 내용 설명 내용설명 내용 설명 내용 설명 내용설명 내용 설명
                내용 설명 내용설명 내용 설명 내용 설명 내용설명 내용 설명 내용
                설명 내용설명 내용 설명 내용 설명 내용설명 내용 설명 내용 설명
                내용설명 내용 설명 내용 설명 내용설명 내용 설명 내용 설명
                내용설명 내용 설명 내용 설명 내용설명 내용 설명 내용 설명
                내용설명 내용 설명 내용 설명 내용설명 내용 설명 내용 설명
                내용설명 내용 설명 내용 설명 내용설명 내용 설명 내용 설명
                내용설명 내용 설명 내용 설명 내용설명 내용 설명 내용 설명
                내용설명 내용 설명 내용 설명 내용설명 내용 설명 내용 설명 내용
            </Typography>
            <Offset />
            <Box
                sx={{
                    display: 'flex',
                    justifyContent: 'space-around',
                    alignItems: 'center',
                    position: 'sticky',
                    bottom: '70px',
                }}
            >
                <Button onClick={() => navigate('bid')}>입찰하기</Button>
                <Button onClick={() => navigate('buyNow')}>구매하기</Button>
            </Box>
        </div>
    );
}
