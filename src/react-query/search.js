import { getSearchProducts, getSuggestSearch } from 'api/search';
import { useQuery } from 'react-query';

export const useSuggestSearch = (keyword) => {
    const { data, isLoading, isError } = useQuery(['suggest', keyword], () =>
        getSuggestSearch({
            keyword,
        })
    );

    return { suggests: data?.data, isLoading, isError };
};

export const useSearchProducts = ({ keyword, pageNum, size }) => {
    const { data, isLoading, isError } = useQuery(
        ['search', keyword, pageNum],
        () =>
            getSearchProducts({
                keyword,
                pageNum,
                size,
            })
    );

    return { products: data?.data, isLoading, isError };
};
