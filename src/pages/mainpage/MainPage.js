import { Stack } from '@mui/material';
import React, { useState, useEffect } from 'react';
import 'react-responsive-carousel/lib/styles/carousel.min.css'; // requires a loader
import CardsCarousel from 'pages/mainpage/CardsCarousel';

function MainPage() {
    const [count, setCount] = useState(1);

    useEffect(() => {
        if (window.innerWidth < 900) {
            setCount(2);
        } else {
            setCount(4);
        }
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

    return (
        <Stack spacing={5}>
            {localStorage.getItem('accessToken') && (
                <CardsCarousel type={'suggest'} count={count} />
            )}

            <CardsCarousel type={'imminent'} count={count} />
            <CardsCarousel type={'all'} count={count} />
        </Stack>
    );
}

export default MainPage;
