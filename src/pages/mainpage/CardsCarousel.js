import { Box, Grid, IconButton, Typography } from '@mui/material';
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Carousel } from 'react-responsive-carousel';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import ItemCard from 'components/ItemCard';
import Types from 'constants/Types';

export default function CardsCarousel({ type, count }) {
    const navigate = useNavigate();
    let items = [];

    const title = Types[type];

    for (let i = 1; i <= 8; i++) {
        items.push({
            id: i,
            name: '상품 이름' + i,
            bidPrice: '10,000',
            price: '20,000',
            deadline: '~3/30 18:00',
        });
    }

    function chunk(data = [], size = 1) {
        const results = [];
        while (data.length) {
            results.push(data.splice(0, size));
        }
        return results;
    }

    return (
        <Box
            sx={{
                '& .carousel': {
                    margin: '0px',
                },
            }}
        >
            <Box
                sx={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                }}
            >
                <Typography variant="h6" sx={{ fontWeight: 'bold' }}>
                    {title}
                </Typography>
                <Typography
                    variant="caption"
                    color="text.secondary"
                    onClick={() => {
                        navigate(`/list/${type}`);
                    }}
                    SX={{ cursor: 'pointer' }}
                >
                    {'전체보기 >'}
                </Typography>
            </Box>

            <Carousel
                // slidable={true}
                // emulateTouch={true}
                showStatus={false}
                showArrows={count === 4 ? true : false}
                showThumbs={false}
                renderArrowPrev={(clickHandler, hasPrev) => {
                    return (
                        hasPrev && (
                            <IconButton
                                sx={{
                                    position: 'absolute',
                                    left: 0,
                                    top: '50%',
                                    zIndex: 1,
                                }}
                                onClick={clickHandler}
                            >
                                <ArrowBackIosNewIcon fontSize="large" />
                            </IconButton>
                        )
                    );
                }}
                renderArrowNext={(clickHandler, hasNext) => {
                    return (
                        hasNext && (
                            <IconButton
                                sx={{
                                    position: 'absolute',
                                    right: 0,
                                    top: '50%',
                                    zIndex: 1,
                                }}
                                onClick={clickHandler}
                            >
                                <ArrowForwardIosIcon fontSize="large" />
                            </IconButton>
                        )
                    );
                }}
                preventMovementUntilSwipeScrollTolerance={true}
                swipeScrollTolerance={50}
            >
                {chunk(items, count)?.map((item) => (
                    // <Box
                    //     sx={{
                    //         display: 'flex',
                    //         justifyContent: 'space-around',
                    //     }}
                    // >
                    //     {item.map((i) => (
                    //         <ItemCard item={i} />
                    //     ))}
                    // </Box>
                    <Grid container spacing={2}>
                        {item?.map((i) => (
                            <Grid
                                item
                                key={i.id}
                                xs={6}
                                sm={4}
                                md={3}
                                sx={{
                                    display: 'flex',
                                    justifyContent: 'center',
                                }}
                            >
                                <ItemCard item={i} />
                            </Grid>
                        ))}
                    </Grid>
                ))}
            </Carousel>
        </Box>
    );
}
