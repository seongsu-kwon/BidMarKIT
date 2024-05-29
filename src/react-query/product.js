import {
    autoBidProduct,
    bidProduct,
    getBids,
    getProduct,
    getProducts,
    getTestBids,
    purchaseProduct,
    getSaleHistories,
    getPurchaseHistories,
    getSuggestProducts,
} from 'api/product';
import { useMutation, useQuery, useQueryClient } from 'react-query';

export const useGetProducts = ({ pageNum, size }) => {
    const { data, isLoading, isError } = useQuery(['products', pageNum], () =>
        getProducts({
            pageNum,
            size,
        })
    );

    console.log('data', data?.data);

    return { products: data?.data, isLoading, isError };
};

//페이징 추천 상품
// export const useGetSuggestProducts = ({ pageNum, size }) => {
//     const { data, isLoading, isError } = useQuery(['suggests', pageNum], () =>
//         getSuggestProducts({
//             pageNum,
//             size,
//         })
//     );

//     console.log('data', data?.data);

//     return { products: data?.data, isLoading, isError };
// };

export const useGetSuggestProducts = () => {
    const { data, isLoading, isError } = useQuery(['suggests'], () =>
        getSuggestProducts()
    );

    console.log('data', data?.data);

    return { products: data?.data, isLoading, isError };
};

export const useGetProduct = (id) => {
    console.log('useGetProduct id', id);
    const { data, isLoading, isError } = useQuery(['product', id], () =>
        getProduct(id)
    );
    return { product: data?.data, isLoading, isError };
};

export const useBidProduct = (id) => {
    const client = useQueryClient();

    console.log('useBidProduct id', id);

    return useMutation(
        (price) =>
            bidProduct({
                productId: Number(id),
                price,
            }),
        {
            onSuccess: () => {
                client.invalidateQueries(['product', id]);
                client.invalidateQueries('bids');
                console.log('성공');
            },
            onError: (error) => {
                console.log('실패');
                console.log(error);
            },
        }
    );
};

export const useAutoBidProduct = (id) => {
    const client = useQueryClient();

    return useMutation(
        (price) =>
            autoBidProduct({
                productId: Number(id),
                ceilingPrice: price,
            }),
        {
            onSuccess: () => {
                client.invalidateQueries(['product', id]);
                client.invalidateQueries('bids');
                console.log('성공');
            },
            onError: (error) => {
                console.log('실패');
                console.log(error);
            },
        }
    );
};

export const usePurchaseProduct = (id) => {
    const client = useQueryClient();

    return useMutation(
        () =>
            purchaseProduct({
                productId: Number(id),
            }),
        {
            onSuccess: () => {
                client.invalidateQueries(['product', id]);
                client.invalidateQueries('bids');
                console.log('성공');
            },
            onError: (error) => {
                console.log('실패');
                console.log(error);
            },
        }
    );
};

export const useGetBids = (id) => {
    const { data, isLoading, isError } = useQuery(['bids', id], () =>
        getBids(id)
    );
    return { bids: data?.data, isLoading, isError };
};

export const useGetSaleHistories = ({ status, pageNum, size }) => {
    const { data, isLoading, isError } = useQuery(
        ['products', status, pageNum],
        () =>
            getSaleHistories({
                status,
                pageNum,
                size,
            })
    );

    console.log('data', data?.data);

    return { products: data?.data, isLoading, isError };
};

export const useGetPurchaseHistories = ({ pageNum, size }) => {
    const { data, isLoading, isError } = useQuery(['products', pageNum], () =>
        getPurchaseHistories({
            pageNum,
            size,
        })
    );

    console.log('data', data?.data);

    return { products: data?.data, isLoading, isError };
};
