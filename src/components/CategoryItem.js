import { Box, Typography } from '@mui/material';
import React from 'react';

export default function CategoryItem({ item }) {
    return (
        <Box
            sx={{
                width: '80px',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'center',
            }}
        >
            <img
                src={item.thumbnail || 'https://via.placeholder.com/150'}
                alt={item.name}
                style={{ width: '60px', height: '60px' }}
            />
            <Box
                sx={{
                    width: '60px',
                    height: '60px',
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                }}
            >
                <Typography
                    variant="caption"
                    sx={{ fontWeight: 'bold' }}
                    align="center"
                >
                    {item.name}
                </Typography>
            </Box>
        </Box>
    );
}
