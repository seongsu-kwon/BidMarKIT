import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { Box, Grid, Pagination } from '@mui/material';
import ItemCard from 'components/ItemCard';
import Types from 'constants/Types';
import { useGetProducts } from 'react-query/product';
import { useInfiniteQuery } from 'react-query';
import { getProducts } from 'api/product';
import InfiniteScroll from 'react-infinite-scroller';

export default function ProductInfListPage() {
    const { type } = useParams();

    const title = Types[type];

    const [pageNum, setPageNum] = useState(0);
    const [size, setSize] = useState(10);

    const { data, fetchNextPage, hasNextPage, isLoading, isError } =
        useInfiniteQuery(
            ['page'],
            ({ pageParam = 0 }) => getProducts({ pageNum: pageParam, size }),
            {
                getNextPageParam: (lastPage, pages) => {
                    console.log(
                        '라스트페이지.data.pageNum',
                        lastPage?.data?.pageable?.pageNumber
                    );
                    console.log(
                        '페이지ㅣ[0].data.totalPages',
                        pages[0]?.data?.totalPages
                    );

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
