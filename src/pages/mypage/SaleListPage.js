import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { Box, Button, Grid, Pagination } from '@mui/material';
import ItemCard from 'components/ItemCard';
import Types from 'constants/Types';
import { useGetProducts } from 'react-query/product';
import { useInfiniteQuery } from 'react-query';
import { getProducts } from 'api/product';
import InfiniteScroll from 'react-infinite-scroller';
import ItemCardWithState from 'components/ItemCardWithState';
import PurchaseCard from 'components/PurchaseCard';
import CompleteCard from 'components/CompleteCard';

export default function SaleListPage() {
    const { type } = useParams();

    const title = Types[type];

    const [select, setSelect] = useState(0);

    const [pageNum, setPageNum] = useState(0);
    const [size, setSize] = useState(12);

    const { data, fetchNextPage, hasNextPage, isLoading, isError } =
        useInfiniteQuery(
            ['page'],
            ({ pageParam = 0 }) => getProducts({ pageNum: pageParam, size }),
            {
                getNextPageParam: (lastPage, pages) => {
                    return lastPage?.data?.pageable?.pageNumber !==
                        pages[0]?.data?.totalPages
                        ? lastPage?.data?.pageable?.pageNumber + 1
                        : undefined;
                },
            }
        );

    return (
        <div>
            <h1>{title}</h1>
            <Box>
                <Box
                    sx={{
                        display: 'flex',
                        justifyContent: 'space-around',
                        m: 2,
                    }}
                >
                    <Button
                        variant="contained"
                        color={select === 0 ? 'primary' : 'gray'}
                        size="large"
                        sx={{ width: '40%' }}
                        onClick={() => {
                            setSelect(0);
                        }}
                    >
                        전체
                    </Button>
                    <Button
                        variant="contained"
                        color={select === 1 ? 'primary' : 'gray'}
                        size="large"
                        sx={{ width: '40%' }}
                        onClick={() => {
                            setSelect(1);
                        }}
                    >
                        판매중
                    </Button>
                </Box>
                <Box
                    sx={{
                        display: 'flex',
                        justifyContent: 'space-around',
                        m: 2,
                    }}
                >
                    <Button
                        variant="contained"
                        color={select === 2 ? 'primary' : 'gray'}
                        size="large"
                        sx={{ width: '40%' }}
                        onClick={() => {
                            setSelect(2);
                        }}
                    >
                        판매완료
                    </Button>
                    <Button
                        variant="contained"
                        color={select === 3 ? 'primary' : 'gray'}
                        size="large"
                        sx={{ width: '40%' }}
                        onClick={() => {
                            setSelect(3);
                        }}
                    >
                        유찰
                    </Button>
                </Box>
            </Box>

            <InfiniteScroll
                hasMore={hasNextPage}
                loadMore={() => fetchNextPage()}
            >
                <Grid container spacing={2}>
                    {data?.pages?.map((page) => {
                        return page?.data?.content.map((item, index) => (
                            <Grid
                                item
                                key={index}
                                xs={6}
                                sm={4}
                                md={3}
                                sx={{
                                    display: 'flex',
                                    justifyContent: 'center',
                                }}
                            >
                                <PurchaseCard item={item} />
                            </Grid>
                        ));
                    })}
                </Grid>
            </InfiniteScroll>
        </div>
    );
}
