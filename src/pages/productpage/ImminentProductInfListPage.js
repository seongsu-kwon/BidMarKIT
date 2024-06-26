import React from 'react';
import { useParams } from 'react-router-dom';
import { Box, Grid, Pagination } from '@mui/material';
import ItemCard from 'components/ItemCard';
import Types from 'constants/Types';
import { useInfiniteQuery } from 'react-query';
import { getImminentProducts } from 'api/product';
import InfiniteScroll from 'react-infinite-scroller';

export default function ImminentProductInfListPage() {
    const { type } = useParams();

    const title = Types[type];

    const size = 12;

    const { data, fetchNextPage, hasNextPage, isLoading, isError } =
        useInfiniteQuery(
            ['imminentproducts', 'page'],
            ({ pageParam = 0 }) =>
                getImminentProducts({ pageNum: pageParam, size }),
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
                                <ItemCard item={item} />
                            </Grid>
                        ));
                    })}
                </Grid>
            </InfiniteScroll>
        </div>
    );
}
