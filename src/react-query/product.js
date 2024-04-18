import instance from 'api/instance';
import { useQuery } from 'react-query';

export const useGetProducts = () => {
    const { data, isLoading, isError } = useQuery('products', async () => {
        const response = await instance.get('/products');
        return response;
    });
    return { products: data, isLoading, isError };
};
