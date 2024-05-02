import instance from './instance';

export const getProducts = async () => {
    const response = await instance
        .get('/products')
        .then((res) => res)
        .catch((err) => {
            return {
                data: [
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
                ],
            };
        });

    console.log('진실', response);
    return response;
};

export const getProduct = async (id) => {
    const response = await instance
        .get(`/products/${id}`)
        .then((res) => res)
        .catch((err) => {
            return {
                data: {
                    id: { id },
                    thumbnail: 'http://placehold.it/200x200',
                    productName: `상품 ${id}`,
                    initPrice: 1000,
                    bidPrice: 2000,
                    price: 5000,
                    deadline: '2024-05-30T12:12:12',
                    content: `이 상품은 상품 ${id}`,
                    sellerName: '판매자',
                },
            };
        });
    return response;
};

export const bidProduct = async (data) => {
    const response = await instance.post('bid', data);
    return response;
};

export const autoBidProduct = async (data) => {
    const response = await instance.post('auto-bid', data);
    return response;
};

export const purchaseProduct = async (data) => {
    const response = await instance.post('purchase', data);
    return response;
};

export const getBids = async (id) => {
    const response = await instance
        .get(`/bids/${id}`)
        .then((res) => res)
        .catch((err) => {
            return {
                data: [
                    {
                        id: '1',
                        memberId: '1234',
                        productId: 4,
                        price: 1230,
                        createdAt: '2024-04-19T14:42:26',
                    },
                    {
                        id: '2',
                        memberId: '1234',
                        productId: 4,
                        price: 1230,
                        createdAt: '2024-04-19T14:42:26',
                    },
                    {
                        id: '3',
                        memberId: '1234',
                        productId: 4,
                        price: 1230,
                        createdAt: '2024-04-19T14:42:26',
                    },
                    {
                        id: '4',
                        memberId: '1234',
                        productId: 4,
                        price: 1230,
                        createdAt: '2024-04-19T14:42:26',
                    },
                    {
                        id: '5',
                        memberId: '1234',
                        productId: 4,
                        price: 1230,
                        createdAt: '2024-04-19T14:42:26',
                    },
                    {
                        id: '6',
                        memberId: '1234',
                        productId: 4,
                        price: 1230,
                        createdAt: '2024-04-19T14:42:26',
                    },
                ],
            };
        });
    return response;
};

export const getTestBids = async () => {
    const response = await instance.get('/bid');
    return response;
};
