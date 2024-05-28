import { IconButton, InputBase, Paper, Typography } from '@mui/material';
import RecentSearchItem from 'components/RecentSearchItem';
import React, { useState } from 'react';
import SearchIcon from '@mui/icons-material/Search';
import SuggestionItem from 'components/SuggestionItem';
import Category from 'components/Category';
import { searchState } from 'recoil/search';
import { useRecoilState } from 'recoil';

export default function SearchPage() {
    const keywords = ['키워드1', '키워드2', '키워드3', '키워드4', '키워드5'];
    const [search, setSearch] = useRecoilState(searchState);
    const suggestions = ['키워드1', '키워드2', '키워드3', '키워드4', '키워드5'];

    const onSearch = () => {
        console.log('검색어:', search);
    };

    return (
        <div>
            <Paper
                sx={{
                    display: 'flex',
                    alignItems: 'center',
                    width: '100%',
                }}
            >
                <InputBase
                    sx={{ ml: 1, flex: 1 }}
                    placeholder="검색어를 입력하세요"
                    inputProps={{ enterKeyHint: 'search' }}
                    value={search}
                    onKeyDown={(e) => {
                        if (e.key === 'Enter') {
                            onSearch();
                        }
                    }}
                    onChange={(e) => setSearch(e.target.value)}
                />
                <IconButton
                    type="button"
                    sx={{ p: '10px' }}
                    aria-label="search"
                >
                    <SearchIcon color="primary" />
                </IconButton>
            </Paper>

            {search.length > 0 ? (
                suggestions.map((suggestion) => (
                    <SuggestionItem key={suggestion} keyword={search} />
                ))
            ) : (
                <>
                    {' '}
                    <Typography variant="h5" sx={{ mt: '1rem' }}>
                        카테고리
                    </Typography>
                    <Category />
                    <Typography variant="h5" sx={{ mt: '1rem' }}>
                        최근 검색어
                    </Typography>
                    {keywords.map((keyword) => (
                        <RecentSearchItem key={keyword} keyword={keyword} />
                    ))}
                </>
            )}
        </div>
    );
}
