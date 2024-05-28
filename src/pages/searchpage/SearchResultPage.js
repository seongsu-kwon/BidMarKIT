import {
    Box,
    Grid,
    IconButton,
    InputBase,
    Paper,
    Typography,
} from '@mui/material';
import RecentSearchItem from 'components/RecentSearchItem';
import React, { useState } from 'react';
import SearchIcon from '@mui/icons-material/Search';
import SuggestionItem from 'components/SuggestionItem';
import Category from 'components/Category';
import { searchState } from 'recoil/search';
import { useRecoilState } from 'recoil';
import { useSuggestSearch } from 'react-query/search';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import SearchBar from 'components/SearchBar';
import InfiniteScroll from 'react-infinite-scroller';
import ItemCard from 'components/ItemCard';
import { useInfiniteQuery } from 'react-query';
import { getSearchProducts } from 'api/search';

export default function SearchResultPage({ keyword }) {
    const [size, setSize] = useState(12);

    console.log('목록 검색어: ', keyword);

    const { data, fetchNextPage, hasNextPage, isLoading, isError } =
        useInfiniteQuery(
            ['products', 'page', keyword],
            ({ pageParam = 0 }) =>
                getSearchProducts({ keyword, pageNum: pageParam, size }),
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
        <InfiniteScroll hasMore={hasNextPage} loadMore={() => fetchNextPage()}>
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
                            {/* <LikeCard item={item} /> */}
                        </Grid>
                    ));
                })}
            </Grid>
        </InfiniteScroll>
    );
}
