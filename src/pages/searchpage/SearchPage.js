import { IconButton, InputBase, Paper, Typography } from '@mui/material';
import RecentSearchItem from 'components/RecentSearchItem';
import React, { useState } from 'react';
import SearchIcon from '@mui/icons-material/Search';
import SuggestionItem from 'components/SuggestionItem';

export default function SearchPage() {
    const keywords = ['키워드1', '키워드2', '키워드3', '키워드4', '키워드5'];
    const [search, setSearch] = useState('');
    const suggestions = ['키워드1', '키워드2', '키워드3', '키워드4', '키워드5'];
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
                    <SuggestionItem keyword={search} />
                ))
            ) : (
                <>
                    <Typography variant="h5" sx={{ mt: '1rem' }}>
                        최근 검색어
                    </Typography>
                    {keywords.map((keyword) => (
                        <RecentSearchItem keyword={keyword} />
                    ))}
                </>
            )}
        </div>
    );
}
