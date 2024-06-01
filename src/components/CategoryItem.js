import { Box, Typography } from '@mui/material';
import React from 'react';

export default function CategoryItem({ item, setSearchCategory }) {
    return (
        <Box
            sx={{
                width: '80px',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'center',
                borderRadius: '5px',
                cursor: 'pointer',
                '&:hover': {
                    backgroundColor: '#f0f0f0',
                },
                padding: 1,
            }}
            onClick={() => {
                setSearchCategory(item.code);
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
                    variant="body2"
                    sx={{ fontWeight: 'bold', whiteSpace: 'pre-line' }}
                    align="center"
                >
                    {item.name === '노트북/PC'
                        ? '노트북/\nPC'
                        : item.name == '도서/음반'
                        ? '도서 /\n음반'
                        : item.name == '가구/인테리어'
                        ? '가구/\n인테리어'
                        : item.name}
                </Typography>
            </Box>
        </Box>
    );
}
