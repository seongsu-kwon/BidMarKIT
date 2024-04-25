import React, { useState, useEffect } from 'react';
import {
    Avatar,
    Box,
    Button,
    Dialog,
    DialogContent,
    DialogTitle,
    Grid,
    Modal,
    Typography,
} from '@mui/material';
import { Carousel } from 'react-responsive-carousel';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import FavoriteIcon from '@mui/icons-material/Favorite';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import StarIcon from '@mui/icons-material/Star';
// import Button from 'components/Button';
import { styled } from '@mui/material/styles';
import dayjs from 'dayjs';
import { useParams } from 'react-router-dom';
import { useGetBids, useGetProduct } from 'react-query/product';
import BidDialog from 'components/BidDialog';
import PurchaseDialog from 'components/PurchaseDialog';

const Offset = styled('div')(({ theme }) => theme.mixins.toolbar);

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: '80vw',
    height: '40vh',
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
    display: 'flex',
    justifyContent: 'center',
    flexDirection: 'column',
};

export default function ProductDetailPage() {
    const { id } = useParams();

    const [remain, setRemain] = useState();

    const [like, setLike] = useState(false);

    // const { product } = useGetProduct(id);

    const products = [
        {
            id: '1',
            thumbnail: 'http://placehold.it/200x200',
            productName: 'Product 1',
            initPrice: 1000,
            bidPrice: 2000,
            price: 5000,
            deadline: '2024-05-30T12:12:12',
            content: 'This is product 1',
            sellerName: '판매자',
        },
        {
            id: '2',
            thumbnail: 'http://placehold.it/200x200',
            productName: 'Product 2',
            initPrice: 2000,
            bidPrice: 3000,
            price: 6000,
            deadline: '2024-05-30T12:12:12',
            content: 'This is product 2',
            sellerName: '판매자',
        },
        {
            id: '3',
            thumbnail: 'http://placehold.it/200x200',
            productName: 'Product 3',
            initPrice: 3000,
            bidPrice: 4000,
            price: 7000,
            deadline: '2024-05-30T12:12:12',
            content: 'This is product 3',
            sellerName: '판매자',
        },
        {
            id: '4',
            thumbnail: 'http://placehold.it/200x200',
            productName: 'Product 4',
            initPrice: 4000,
            bidPrice: 5500,
            price: 8000,
            deadline: '2024-05-30T12:12:12',
            content: 'This is product 4',
            sellerName: '판매자',
        },
        {
            id: '5',
            thumbnail: 'http://placehold.it/200x200',
            productName: 'Product 5',
            initPrice: 5000,
            bidPrice: 6000,
            price: 9000,
            deadline: '2024-05-30T12:12:12',
            content: 'This is product 5',
            sellerName: '판매자',
        },
        {
            id: '6',
            thumbnail: 'http://placehold.it/200x200',
            productName: 'Product 6',
            initPrice: 6000,
            bidPrice: 7000,
            price: 10000,
            deadline: '2024-05-30T12:12:12',
            content: 'This is product 6',
            sellerName: '판매자',
        },
        {
            id: '7',
            thumbnail: 'http://placehold.it/200x200',
            productName: 'Product 7',
            initPrice: 7000,
            bidPrice: 8000,
            price: 11000,
            deadline: '2024-05-30T12:12:12',
            content: 'This is product 7',
            sellerName: '판매자',
        },
        {
            id: '8',
            thumbnail: 'http://placehold.it/200x200',
            productName: 'Product 8',
            initPrice: 8000,
            bidPrice: 9000,
            price: 12000,
            deadline: '2024-05-30T12:12:12',
            content: 'This is product 8',
            sellerName: '판매자',
        },
        {
            id: '9',
            thumbnail: 'http://placehold.it/200x200',
            productName: 'Product 9',
            initPrice: 9000,
            bidPrice: 10000,
            price: 13000,
            deadline: '2024-05-30T12:12:12',
            content: 'This is product 9',
            sellerName: '판매자',
        },
        {
            id: '10',
            thumbnail: 'http://placehold.it/200x200',
            productName: 'Product 10',
            initPrice: 10000,
            bidPrice: 11000,
            price: 14000,
            deadline: '2024-05-30T12:12:12',
            content: 'This is product 10',
            sellerName: '판매자',
        },
    ];
    const product = products[parseInt(id) - 1];

    // const { bids } = useGetBids(id);
    const bids = [
        {
            id: '82cc',
            memberId: '123',
            productId: 1,
            price: 1010000,
            createdAt: '2024-04-19T14:00:54',
        },
        {
            id: '3026',
            memberId: '123',
            productId: 1,
            price: 10100000,
            createdAt: '2024-04-19T14:00:55',
        },
        {
            id: '1ff5',
            memberId: '123',
            productId: 1,
            price: 100100000,
            createdAt: '2024-04-19T14:00:56',
        },
        {
            id: '39f3',
            memberId: '123',
            productId: 1,
            price: 1001000000,
            createdAt: '2024-04-19T14:00:57',
        },
        {
            id: 'd423',
            memberId: '1234',
            productId: 4,
            price: 1230,
            createdAt: '2024-04-19T14:42:26',
        },
    ];

    const [open, setOpen] = useState(false);

    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    useEffect(() => {
        const startDate = new Date();
        const endDate = new Date(product?.deadline);
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
                    }
                }
            }
        }
        const interval = setInterval(() => {
            const startDate = new Date();
            const endDate = new Date(product?.deadline);
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
    }, [product]);

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

    return (
        <div>
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
                <h1>{product?.productName}</h1>
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
                        {product?.bidPrice.toLocaleString()}원
                    </Typography>
                </Grid>
            </Grid>
            <Typography variant="body2">
                시작가 : {product?.initPrice.toLocaleString()}원
            </Typography>
            <Grid container spacing={2} sx={{ alignItems: 'center' }}>
                <Grid item md={4} xs={4}>
                    <Typography variant="body1" fontWeight={'bold'}>
                        즉시구매가
                    </Typography>
                </Grid>
                <Grid item md={8} xs={8}>
                    <Typography variant="h5" fontWeight={'bold'}>
                        {product?.price.toLocaleString()}원
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
                마감 기한 : ~{' '}
                {dayjs(product?.deadline).format('YYYY.MM.DD HH:mm')}
            </Typography>
            <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
                <Button variant="outlined" onClick={handleOpen}>
                    입찰 기록
                </Button>
            </Box>

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
                    <Typography variant="h6">{product?.sellerName}</Typography>
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
                {product?.content}
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
                <BidDialog product={product} remain={remain} />
                <PurchaseDialog product={product} remain={remain} />
            </Box>

            {/* <Box open={open} onClose={handleClose}>
                <Box sx={style}>
                    <Box sx={{ overflow: 'auto' }}>
                        {bids?.map((bid, index) => (
                            <Box key={index}>
                                <Box
                                    sx={{
                                        display: 'flex',
                                        justifyContent: 'space-between',
                                        alignItems: 'center',
                                    }}
                                >
                                    <Typography variant="h6">
                                        {bid?.memberId}
                                    </Typography>
                                    <Typography variant="body1">
                                        {bid?.price.toLocaleString()}원
                                    </Typography>
                                </Box>

                                <Typography variant="body2" align="right">
                                    {dayjs(bid?.createdAt).format(
                                        'YYYY.MM.DD HH:mm:ss'
                                    )}
                                </Typography>
                                <hr />
                            </Box>
                        ))}
                    </Box>
                </Box>
            </Box> */}

            <Dialog
                open={open}
                onClose={handleClose}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
                fullWidth
            >
                <DialogTitle>입찰 기록</DialogTitle>
                <DialogContent>
                    <Box sx={{ overflow: 'auto', height: '40vh' }}>
                        {bids?.map((bid, index) => (
                            <Box key={index}>
                                <Box
                                    sx={{
                                        display: 'flex',
                                        justifyContent: 'space-between',
                                        alignItems: 'center',
                                    }}
                                >
                                    <Typography variant="h6">
                                        {bid?.memberId}
                                    </Typography>
                                    <Typography variant="body1">
                                        {bid?.price.toLocaleString()}원
                                    </Typography>
                                </Box>

                                <Typography variant="body2" align="right">
                                    {dayjs(bid?.createdAt).format(
                                        'YYYY.MM.DD HH:mm:ss'
                                    )}
                                </Typography>
                                <hr />
                            </Box>
                        ))}
                    </Box>
                </DialogContent>
            </Dialog>
        </div>
    );
}
