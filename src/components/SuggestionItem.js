import { Box, Typography } from '@mui/material';
import React from 'react';
import SearchIcon from '@mui/icons-material/Search';

export default function SuggestionItem(props) {
    const { keyword } = props;
    return (
        <Box
            sx={{
                display: 'flex',
                alignItems: 'center',
            }}
            fullWidth
        >
            <SearchIcon color="primary" sx={{ p: '10px' }} />
            <Typography variant="body1">{keyword}</Typography>
        </Box>
    );
}
