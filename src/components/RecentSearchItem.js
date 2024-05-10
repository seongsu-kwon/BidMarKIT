import React from 'react';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import ClearIcon from '@mui/icons-material/Clear';
import { Box, IconButton, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';

export default function RecentSearchItem(props) {
    const { keyword } = props;
    const navigate = useNavigate();
    return (
        <Box
            sx={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
            }}
            // fullWidth
        >
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
                <AccessTimeIcon sx={{ p: '10px' }} color="primary" />
                <Typography
                    variant="body1"
                    // onMouseDown={(e) => {
                    //     e.preventDefault();
                    // }}
                    onClick={() => {
                        navigate(`/search?keyword=${keyword}`);
                    }}
                    sx={{ cursor: 'pointer' }}
                >
                    {keyword}
                </Typography>
            </Box>

            <IconButton sx={{ p: '10px' }}>
                <ClearIcon />
            </IconButton>
        </Box>
    );
}
