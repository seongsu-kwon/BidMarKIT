import { InputBase, TextField, Typography } from '@mui/material';
import SearchBar from 'components/SearchBar';
import React from 'react';

export default function SearchPage() {
    return (
        <div>
            <h1>검색 페이지</h1>
            <SearchBar />
            <Typography variant="h6">input</Typography>
            <input
                type="text"
                placeholder="검색어를 입력하세요"
                enterKeyHint="search"
            />
            <Typography variant="h6">TextField</Typography>
            <TextField
                label="검색어를 입력하세요"
                inputProps={{ inputMode: 'search' }}
            />
            <Typography variant="h6">InputBase</Typography>
            <InputBase
                placeholder="검색어를 입력하세요"
                inputProps={{ inputMode: 'search', enterKeyHint: 'search' }}
            />
        </div>
    );
}
