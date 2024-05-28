import React from 'react';
import { useParams } from 'react-router-dom';
import { Grid } from '@mui/material';
import ItemCard from 'components/ItemCard';
import Types from 'constants/Types';
import { useGetSuggestProducts } from 'react-query/product';

export default function SuggestListPage() {
    const { type } = useParams();

    const title = Types[type];

    const { products } = useGetSuggestProducts();

    return (
        <div>
            <h1>{title}</h1>

            <Grid container spacing={2}>
                {products?.map((item, index) => (
                    <Grid
                        item
                        key={index}
                        xs={6}
                        sm={4}
                        md={3}
                        sx={{
                            display: 'flex',
                            justifyContent: 'center',
                        }}
                    >
                        <ItemCard item={item} />
                    </Grid>
                ))}
            </Grid>
        </div>
    );
}
