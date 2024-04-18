import React from 'react';
import { useParams } from 'react-router-dom';
import { Grid } from '@mui/material';
import ItemCard from 'components/ItemCard';
import Types from 'constants/Types';
import { useGetProducts } from 'react-query/product';

export default function ProductListPage() {
    const { type } = useParams();

    const title = Types[type];

    let items = [];

    for (let i = 1; i <= 40; i++) {
        items.push({
            id: i,
            name: '상품 이름' + i,
            bidPrice: '10,000',
            price: '20,000',
            deadline: '~3/30 18:00',
        });
    }

    const { products } = useGetProducts();

    console.log('상품들', products);

    return (
        <div>
            <h1>{title}</h1>
            <Grid container spacing={2}>
                {items?.map((item, index) => (
                    <Grid
                        item
                        key={index}
                        xs={6}
                        sm={4}
                        md={3}
                        sx={{ display: 'flex', justifyContent: 'center' }}
                    >
                        <ItemCard item={item} />
                    </Grid>
                ))}
            </Grid>
        </div>
    );
}
