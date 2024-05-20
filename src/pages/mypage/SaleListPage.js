import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import {
    Box,
    Button,
    FormControl,
    Grid,
    InputLabel,
    NativeSelect,
    Pagination,
    Select,
} from '@mui/material';
import ItemCard from 'components/ItemCard';
import Types from 'constants/Types';
import { useGetProducts } from 'react-query/product';
import { useInfiniteQuery } from 'react-query';
import { getSaleHistories } from 'api/product';
import InfiniteScroll from 'react-infinite-scroller';
import ItemCardWithState from 'components/ItemCardWithState';
import PurchaseCard from 'components/PurchaseCard';
import CompleteCard from 'components/CompleteCard';
import { styled } from '@mui/material/styles';

const Offset = styled('div')(({ theme }) => theme.mixins.toolbar);

export default function SaleListPage() {
    const { type } = useParams();

    const title = Types[type];

    const [select, setSelect] = useState(0);

    const [pageNum, setPageNum] = useState(0);
    const [size, setSize] = useState(12);

    const [status, setStatus] = useState(4);

    const { data, fetchNextPage, hasNextPage, isLoading, isError } =
        useInfiniteQuery(
            ['page', status],
            ({ pageParam = 0 }) =>
                getSaleHistories({ status, pageNum: pageParam, size }),
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
        <div style={{ width: '100%' }}>
            {/* <Box>
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
            </Box> */}
            {/* <Offset
                style={{
                    display: 'flex',
                    justifyContent: 'center',
                    backgroundColor: 'white',
                    opacity: 1,
                    zIndex: 99,
                }}
            > */}
            <FormControl fullWidth>
                <NativeSelect
                    defaultValue={4}
                    inputProps={{
                        name: 'age',
                        id: 'uncontrolled-native',
                    }}
                    sx={{
                        mt: 2,
                        mb: 2,
                        // position: 'fixed',
                        // width: '70%',
                    }}
                    onChange={(e) => {
                        setStatus(e.target.value);
                    }}
                >
                    <option value={4}>전체</option>
                    <option value={0}>판매중</option>
                    <option value={1}>거래중</option>
                    <option value={2}>유찰(거래무효)</option>
                    <option value={3}>판매완료</option>
                </NativeSelect>
            </FormControl>

            {/* </Offset> */}

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
                                {/* {item.state === 0 ? (
                                    <ItemCard item={item} />
                                ) : ( */}
                                <PurchaseCard item={item} />
                                {/* )} */}
                            </Grid>
                        ));
                    })}
                </Grid>
            </InfiniteScroll>
        </div>
    );
}
