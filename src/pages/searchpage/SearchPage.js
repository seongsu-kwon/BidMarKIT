import { Box, IconButton, InputBase, Paper, Typography } from '@mui/material';
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

const Offset = styled('div')(({ theme }) => theme.mixins.toolbar);

export default function SearchPage() {
    const navigate = useNavigate();
    const keywords = ['키워드1', '키워드2', '키워드3', '키워드4', '키워드5'];
    const suggestions = [
        '키워드1',
        '키워드2키워드2키워드2키워드2키워드2키워드2키워드2키워드2',
        '키워드3키워드2키워드2키워드2키워드2',
        '키워드4키워드2키워드2',
        '키워드5',
    ];

    const keyword = useLocation().search.split('=')[1];

    console.log('keyword', keyword);

    const [searchKeyword, setSearchKeyword] = useState();

    useEffect(() => {
        console.log('검색어 변경됨: ', searchKeyword);
    }, [searchKeyword]);

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

            {searchKeyword ? (
                <>
                    <Offset />
                    <SearchResultPage keyword={searchKeyword} />
                </>
            ) : (
                <>
                    <Offset />
                    <Category />
                </>
            )}
        </Box>
    );
}
