import { Grid } from '@mui/material';
import React from 'react';
import CategoryItem from './CategoryItem';

export default function Category() {
    const list = [
        {
            name: '의류',
            thumbnail: 'https://via.placeholder.com/150',
        },
        {
            name: '가전제품',
            thumbnail: 'https://via.placeholder.com/150',
        },
        {
            name: '가구',
            thumbnail: 'https://via.placeholder.com/150',
        },
        {
            name: '생활용품',
            thumbnail: 'https://via.placeholder.com/150',
        },
        {
            name: '도서',
            thumbnail: 'https://via.placeholder.com/150',
        },
        {
            name: '식품',
            thumbnail: 'https://via.placeholder.com/150',
        },
        {
            name: '스포츠',
            thumbnail: 'https://via.placeholder.com/150',
        },
        {
            name: '애완용품',
            thumbnail: 'https://via.placeholder.com/150',
        },
    ];
    return (
        <Grid container spacing={1} sx={{ mt: 1 }}>
            {list.map((item, index) => (
                <Grid
                    item
                    key={index}
                    xs={3}
                    sm={3}
                    md={3}
                    sx={{
                        display: 'flex',
                        justifyContent: 'center',
                    }}
                >
                    <CategoryItem item={item} />
                </Grid>
            ))}
        </Grid>
    );
}
