import { Box, Typography } from '@mui/material';
import React from 'react';
import SearchIcon from '@mui/icons-material/Search';
import { useRecoilState } from 'recoil';
import { searchState } from 'recoil/search';
import { useNavigate } from 'react-router-dom';

export default function SuggestionItem(props) {
    const { keyword, onSearch } = props;
    const navigate = useNavigate();
    const [focused, setFocused] = useRecoilState(searchState);

    return (
        <Box
            sx={{
                display: 'flex',
                alignItems: 'center',
                backgroundColor: 'white',
                borderRadius: '5px',
                border: '1px solid #e0e0e0',
                cursor: 'pointer',
            }}
            onMouseDown={(e) => {
                e.preventDefault();
            }}
            onClick={() => {
                setFocused(false);
                // navigate(`/search?keyword=${keyword}`);
                onSearch(keyword);
            }}
        >
            <SearchIcon color="primary" sx={{ p: '10px' }} />
            <Typography
                variant="body1"
                sx={{
                    overflow: 'hidden',
                    textOverflow: 'ellipsis',
                    whiteSpace: 'nowrap',
                }}
            >
                {keyword}
            </Typography>
        </Box>
    );
}
