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

    // const { products } = useGetProducts();
    const products = [
        {
            id: '1',
            thumbnail: 'http://placehold.it/200x200',
            productName: 'Product 1',
            initPrice: 1000,
            bidPrice: 2000,
            price: 5000,
            deadline: '2024-05-30T12:12:12',
            content: 'This is product 1',
            sellerName: '판매자',
        },
        {
            id: '2',
            thumbnail: 'http://placehold.it/200x200',
            productName: 'Product 2',
            initPrice: 2000,
            bidPrice: 3000,
            price: 6000,
            deadline: '2024-05-30T12:12:12',
            content: 'This is product 2',
            sellerName: '판매자',
        },
        {
            id: '3',
            thumbnail: 'http://placehold.it/200x200',
            productName: 'Product 3',
            initPrice: 3000,
            bidPrice: 4000,
            price: 7000,
            deadline: '2024-05-30T12:12:12',
            content: 'This is product 3',
            sellerName: '판매자',
        },
        {
            id: '4',
            thumbnail: 'http://placehold.it/200x200',
            productName: 'Product 4',
            initPrice: 4000,
            bidPrice: 5500,
            price: 8000,
            deadline: '2024-05-30T12:12:12',
            content: 'This is product 4',
            sellerName: '판매자',
        },
        {
            id: '5',
            thumbnail: 'http://placehold.it/200x200',
            productName: 'Product 5',
            initPrice: 5000,
            bidPrice: 6000,
            price: 9000,
            deadline: '2024-05-30T12:12:12',
            content: 'This is product 5',
            sellerName: '판매자',
        },
        {
            id: '6',
            thumbnail: 'http://placehold.it/200x200',
            productName: 'Product 6',
            initPrice: 6000,
            bidPrice: 7000,
            price: 10000,
            deadline: '2024-05-30T12:12:12',
            content: 'This is product 6',
            sellerName: '판매자',
        },
        {
            id: '7',
            thumbnail: 'http://placehold.it/200x200',
            productName: 'Product 7',
            initPrice: 7000,
            bidPrice: 8000,
            price: 11000,
            deadline: '2024-05-30T12:12:12',
            content: 'This is product 7',
            sellerName: '판매자',
        },
        {
            id: '8',
            thumbnail: 'http://placehold.it/200x200',
            productName: 'Product 8',
            initPrice: 8000,
            bidPrice: 9000,
            price: 12000,
            deadline: '2024-05-30T12:12:12',
            content: 'This is product 8',
            sellerName: '판매자',
        },
        {
            id: '9',
            thumbnail: 'http://placehold.it/200x200',
            productName: 'Product 9',
            initPrice: 9000,
            bidPrice: 10000,
            price: 13000,
            deadline: '2024-05-30T12:12:12',
            content: 'This is product 9',
            sellerName: '판매자',
        },
        {
            id: '10',
            thumbnail: 'http://placehold.it/200x200',
            productName: 'Product 10',
            initPrice: 10000,
            bidPrice: 11000,
            price: 14000,
            deadline: '2024-05-30T12:12:12',
            content: 'This is product 10',
            sellerName: '판매자',
        },
    ];

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
                        sx={{ display: 'flex', justifyContent: 'center' }}
                    >
                        <ItemCard item={item} />
                    </Grid>
                ))}
            </Grid>
        </div>
    );
}
