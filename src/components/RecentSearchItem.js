import React from 'react';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import ClearIcon from '@mui/icons-material/Clear';
import { Box, IconButton, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { useRecoilState } from 'recoil';
import { searchState } from 'recoil/search';

export default function RecentSearchItem(props) {
    const { key, keyword, onSearch, handleRemoveKeyword } = props;
    const navigate = useNavigate();
    const [focused, setFocused] = useRecoilState(searchState);

    return (
        <Box
            key={key}
            sx={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                backgroundColor: 'white',
                borderRadius: '5px',
                border: '1px solid #e0e0e0',
                cursor: 'pointer',
            }}
            // fullWidth
            onMouseDown={(e) => {
                e.preventDefault();
            }}
            onClick={(e) => {
                setFocused(false);
                // navigate(`/search?keyword=${keyword}`);
                onSearch(keyword);
            }}
        >
            <Box
                sx={{
                    display: 'flex',
                    alignItems: 'center',
                }}
            >
                <AccessTimeIcon sx={{ p: '10px' }} color="primary" />
                <Typography variant="body1">{keyword}</Typography>
            </Box>

            <IconButton
                sx={{ p: '10px' }}
                onClick={(e) => {
                    console.log('remove keyword', keyword);
                    handleRemoveKeyword(keyword);
                    e.stopPropagation();
                }}
            >
                <ClearIcon />
            </IconButton>
        </Box>
    );
}
