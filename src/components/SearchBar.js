import { Box, IconButton, InputBase, Paper } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import { useSuggestSearch } from 'react-query/search';
import { useNavigate } from 'react-router-dom';
import { useRecoilState, useRecoilValue, useSetRecoilState } from 'recoil';
import SuggestionItem from './SuggestionItem';
import RecentSearchItem from './RecentSearchItem';
import { searchState } from 'recoil/search';
import { useState } from 'react';

export default function SearchBar({ setSearchKeyword }) {
    const navigate = useNavigate();
    const keywords = ['키워드1', '키워드2', '키워드3', '키워드4', '키워드5'];
    const [search, setSearch] = useState('');

    const onSearch = (keyword) => {
        setSearchKeyword(keyword);
        setSearch(keyword);
        setFocused(false);
        console.log('검색어:', keyword);
    };
    const { suggests, isLoading, isError } = useSuggestSearch(search);

    const [focused, setFocused] = useRecoilState(searchState);

    return (
        <Box sx={{ position: 'fixed', width: '90vw' }}>
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
                            onSearch(search);
                        }
                    }}
                    onChange={(e) => {
                        setSearch(e.target.value);

                        setFocused(true);
                    }}
                    onFocus={() => {
                        setFocused(true);
                    }}
                    onBlur={() => {
                        setFocused(false);
                    }}
                />
                <IconButton
                    type="button"
                    sx={{ p: '10px' }}
                    aria-label="search"
                    onClick={() => {
                        onSearch(search);
                    }}
                >
                    <SearchIcon color="primary" />
                </IconButton>
            </Paper>
            <Box
                onMouseDown={(e) => {
                    e.preventDefault();
                }}
            >
                {focused ? (
                    search.length > 0 ? (
                        suggests?.map((suggestion) => (
                            <SuggestionItem
                                key={suggestion}
                                keyword={suggestion}
                                onSearch={onSearch}
                            />
                        ))
                    ) : (
                        keywords?.map((keyword) => (
                            <RecentSearchItem
                                key={keyword}
                                keyword={keyword}
                                onSearch={onSearch}
                            />
                        ))
                    )
                ) : (
                    <></>
                )}
            </Box>
        </Box>
    );
}
