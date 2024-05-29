import { Grid } from '@mui/material';
import React from 'react';
import CategoryItem from './CategoryItem';
import CategoryList from 'constants/Category';

export default function Category(props) {
    const { setSearchCategory } = props;
    return (
        <Grid container spacing={1} sx={{ mt: 1 }}>
            {CategoryList.map((item, index) => (
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
                    <CategoryItem
                        item={item}
                        setSearchCategory={setSearchCategory}
                    />
                </Grid>
            ))}
        </Grid>
    );
}
