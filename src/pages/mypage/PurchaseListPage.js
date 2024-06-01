import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { Box, Grid, Pagination } from '@mui/material';
import ItemCard from 'components/ItemCard';
import Types from 'constants/Types';
import { useGetPurchaseHistories } from 'react-query/product';
import { useInfiniteQuery } from 'react-query';
import { getProducts, getPurchaseHistories } from 'api/product';
import InfiniteScroll from 'react-infinite-scroller';
import ItemCardWithState from 'components/ItemCardWithState';
import PurchaseCard from 'components/PurchaseCard';

export default function PurchaseListPage() {
    const { type } = useParams();

    const title = Types[type];

    const [pageNum, setPageNum] = useState(0);
    const [size, setSize] = useState(12);

    const { data, fetchNextPage, hasNextPage, isLoading, isError } =
        useInfiniteQuery(
            ['page'],
            ({ pageParam = 0 }) =>
                getPurchaseHistories({ pageNum: pageParam, size }),
            {
                getNextPageParam: (lastPage, pages) => {
                    return lastPage?.data?.pageable?.pageNumber !==
                        pages[0]?.data?.totalPages
                        ? lastPage?.data?.pageable?.pageNumber + 1
                        : undefined;
                },
            }
        );

    console.log('data', data);

    return (
        <div>
            <h1>구매 내역</h1>
            {data?.pages[0].data.content.length === 0 ? (
                <h2>구매 내역이 없습니다.</h2>
            ) : (
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
            )}
        </div>
    );
}
