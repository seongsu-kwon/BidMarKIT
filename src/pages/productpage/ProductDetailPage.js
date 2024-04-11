import { Avatar, Box, Grid, PopoverPaper, Typography } from '@mui/material';
import ItemCard from 'components/ItemCard';
import { Carousel } from 'react-responsive-carousel';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import FavoriteIcon from '@mui/icons-material/Favorite';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import StarIcon from '@mui/icons-material/Star';
import Button from 'components/Button';

export default function ProductDetailPage() {
    let items = [];

    for (let i = 1; i <= 40; i++) {
        items.push({
            name: '상품 이름' + i,
            currentPrice: '10,000',
            buyNowPrice: '20,000',
            deadline: '~3/30 18:00',
        });
    }

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
                <h1>상품 이름</h1>
                <Box
                    sx={{
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                    }}
                >
                    <FavoriteBorderIcon fontSize="large" />
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
                        10,000원
                    </Typography>
                </Grid>
            </Grid>
            <Typography variant="body2">시작가 : 10,000원</Typography>
            <Grid container spacing={2} sx={{ alignItems: 'center' }}>
                <Grid item md={4} xs={4}>
                    <Typography variant="body1" fontWeight={'bold'}>
                        즉시구매가
                    </Typography>
                </Grid>
                <Grid item md={8} xs={8}>
                    <Typography variant="h5" fontWeight={'bold'}>
                        20,000원
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
                    <Typography variant="h5" fontWeight={'bold'}>
                        7시간 39분 43초
                    </Typography>
                </Grid>
            </Grid>
            <Typography variant="body2">
                마감 기한 : ~ 2024.04.01 18:00
            </Typography>
            <hr />
            <Typography variant="h5" fontWeight={'bold'}>
                판매자 정보
            </Typography>
            <Box
                sx={{
                    display: 'flex',
                    justifyContent: 'space-around',
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
                <Box
                    sx={{
                        display: 'flex',
                        justifyContent: 'space-around',
                        alignItems: 'center',
                    }}
                >
                    <StarIcon fontSize="large" />
                    <Typography variant="h6">4.5</Typography>
                </Box>
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
            <Box
                sx={{
                    display: 'flex',
                    justifyContent: 'space-around',
                    alignItems: 'center',
                    position: 'sticky',
                    bottom: '70px',
                }}
            >
                <Button>입찰하기</Button>
                <Button>구매하기</Button>
            </Box>
        </div>
    );
}
