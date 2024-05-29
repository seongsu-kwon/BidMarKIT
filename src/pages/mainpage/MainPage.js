import { Stack } from '@mui/material';
import React, { useState, useEffect, useLayoutEffect, Suspense } from 'react';
import 'react-responsive-carousel/lib/styles/carousel.min.css'; // requires a loader
import CardsCarousel from 'pages/mainpage/CardsCarousel';
import { useGetProducts } from 'react-query/product';
import axiosInstance from 'api/axiosInstance';
import { useRecoilValue } from 'recoil';
import { allItemsPreviewState } from 'recoil/products';

function MainPage() {
    const [count, setCount] = useState(1);

    // const { products: allItems } = useGetProducts({
    //     pageNum: 0,
    //     size: 8,
    // });

    // const { allItems } = useRecoilValue(allItemsPreviewState());

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
            <Suspense fallback={<div>Loading...</div>}>
                {localStorage.getItem('accessToken') && (
                    <CardsCarousel
                        type={'suggest'}
                        count={count}
                        // items={allItems?.content}
                    />
                )}

                <CardsCarousel
                    type={'imminent'}
                    count={count}
                    // items={allItems?.content}
                />
                <CardsCarousel
                    type={'all'}
                    count={count}
                    // items={allItems?.content}
                />
            </Suspense>
        </Stack>
    );
}

export default MainPage;
