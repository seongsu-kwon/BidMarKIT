import { Box, Typography } from '@mui/material';
import React from 'react';
import SearchIcon from '@mui/icons-material/Search';
import { useRecoilState } from 'recoil';
import { searchState } from 'recoil/search';

export default function SuggestionItem(props) {
    const { keyword } = props;
    const suggestion = `${keyword}1`;
    return (
        <Box
            sx={{
                display: 'flex',
                alignItems: 'center',
            }}
        >
            <SearchIcon color="primary" sx={{ p: '10px' }} />
            <Typography
                variant="body1"
                sx={{ cursor: 'pointer' }}
                onClick={() => {
                    console.log('SUGGESTION');
                }}
            >
                {suggestion}
            </Typography>
        </Box>
    );
}
