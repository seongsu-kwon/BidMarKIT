import {
    Box,
    Grid,
    IconButton,
    InputBase,
    Paper,
    Typography,
} from '@mui/material';
import RecentSearchItem from 'components/RecentSearchItem';
import React, { useEffect, useState } from 'react';
import SearchIcon from '@mui/icons-material/Search';
import SuggestionItem from 'components/SuggestionItem';
import Category from 'components/Category';
import { searchState } from 'recoil/search';
import { useRecoilState } from 'recoil';
import { useSuggestSearch } from 'react-query/search';
import { json, useLocation, useNavigate } from 'react-router-dom';
import SearchBar from 'components/SearchBar';
import SearchResultPage from './SearchResultPage';
import { styled } from '@mui/material/styles';
import CategorySelect from 'components/CategorySelect';
import SortSelect from 'components/SortSelect';
import StateSelect from 'components/StateSelect';

const Offset = styled('div')(({ theme }) => theme.mixins.toolbar);

export default function SearchPage() {
    const [searchKeyword, setSearchKeyword] = useState('');
    const [searchCategory, setSearchCategory] = useState('');
    const [searchState, setSearchState] = useState(0);
    const [searchSort, setSearchSort] = useState(0);

    useEffect(() => {
        console.log('검색어 변경됨: ', searchKeyword);
    }, [searchKeyword]);

    useEffect(() => {
        console.log('카테고리 변경됨: ', searchCategory);
    }, [searchCategory]);

    useEffect(() => {
        console.log('정렬 변경됨: ', searchSort);
    }, [searchSort]);

    return (
        <Box sx={{ position: 'relative' }}>
            <Box
                sx={{
                    position: 'absolute',
                    width: '100%',
                    zIndex: '100',
                    display: 'flex',
                    justifyContent: 'center',
                }}
            >
                <SearchBar
                    setSearchKeyword={(e) => {
                        setSearchKeyword(e);
                    }}
                />
            </Box>

            {searchKeyword !== '' || searchCategory !== '' ? (
                <>
                    <Offset />
                    <CategorySelect setSearchCategory={setSearchCategory} />
                    <Grid container spacing={2}>
                        <Grid item xs={6}>
                            <SortSelect setSearchSort={setSearchSort} />
                        </Grid>
                        <Grid item xs={6}>
                            <StateSelect setSearchState={setSearchState} />
                        </Grid>
                    </Grid>

                    <SearchResultPage
                        keyword={searchKeyword}
                        category={searchCategory}
                        sort={searchSort}
                        state={searchState}
                    />
                </>
            ) : (
                <>
                    <Offset />
                    <Category
                        setSearchCategory={(e) => {
                            setSearchCategory(e);
                        }}
                    />
                </>
            )}
        </Box>
    );
}
