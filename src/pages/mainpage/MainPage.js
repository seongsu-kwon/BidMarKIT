import { Stack } from '@mui/material';
import React, { useState, useEffect } from 'react';
import 'react-responsive-carousel/lib/styles/carousel.min.css'; // requires a loader
import CardsCarousel from 'pages/mainpage/CardsCarousel';

function MainPage() {
    let items = [];

    for (let i = 1; i <= 8; i++) {
        items.push({
            name: '상품 이름' + i,
            currentPrice: '10,000',
            buyNowPrice: '20,000',
            deadline: '~3/30 18:00',
        });
    }

    const [count, setCount] = useState(2);

    useEffect(() => {
        const handleResize = () => {
            if (window.innerWidth < 900) {
                setCount(2);
            } else {
                setCount(4);
            }
        };
        window.addEventListener('resize', handleResize);
        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, []);

    console.log('아이템', items);

    return (
        <Stack spacing={5}>
            <CardsCarousel type={'recommend'} count={count} />
            <CardsCarousel type={'imminent'} count={count} />
            <CardsCarousel type={'all'} count={count} />
        </Stack>
    );
}

export default MainPage;
