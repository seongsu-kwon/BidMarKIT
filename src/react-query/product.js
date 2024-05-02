import {
    autoBidProduct,
    bidProduct,
    getBids,
    getProduct,
    getProducts,
    getTestBids,
    purchaseProduct,
} from 'api/product';
import { useMutation, useQuery, useQueryClient } from 'react-query';

export const useGetProducts = () => {
    const { data, isLoading, isError } = useQuery('products', () =>
        getProducts()
    );

    console.log('data', data?.data);

    return { products: data?.data, isLoading, isError };
};

export const useGetProduct = (id) => {
    const { data, isLoading, isError } = useQuery(['product', id], () =>
        getProduct(id)
    );
    return { product: data?.data, isLoading, isError };
};

export const useBidProduct = (id) => {
    const client = useQueryClient();

    return useMutation((data) => bidProduct(data), {
        onSuccess: () => {
            client.invalidateQueries(['product', id]);
            client.invalidateQueries('bids');
            console.log('성공');
        },
        onError: (error) => {
            console.log('실패');
            console.log(error);
        },
    });
};

export const useAutoBidProduct = (id) => {
    const client = useQueryClient();

    return useMutation((data) => autoBidProduct(data), {
        onSuccess: () => {
            client.invalidateQueries(['product', id]);
            client.invalidateQueries('bids');
            console.log('성공');
        },
        onError: (error) => {
            console.log('실패');
            console.log(error);
        },
    });
};

export const usePurchaseProduct = (id) => {
    const client = useQueryClient();

    return useMutation((data) => purchaseProduct(data), {
        onSuccess: () => {
            client.invalidateQueries(['product', id]);
            client.invalidateQueries('bids');
            console.log('성공');
        },
        onError: (error) => {
            console.log('실패');
            console.log(error);
        },
    });
};

export const useGetBids = (id) => {
    const { data, isLoading, isError } = useQuery(['bids', id], () =>
        getBids(id)
    );
    return { bids: data?.data, isLoading, isError };
};
