import axiosInstance from 'api/axiosInstance';
import {
    getChatRoom,
    getChatRooms,
    putTradeCheck,
    putTradeFailure,
    putTradeSuccess,
} from '../api/chat';
import { useMutation, useQuery, useQueryClient } from 'react-query';

export const useGetChatRooms = ({ pageNum, size }) => {
    const { data, isLoading, isError } = useQuery(['chatRooms', pageNum], () =>
        getChatRooms({
            pageNum,
            size,
        })
    );

    console.log('data', data?.data);

    return { chatRooms: data?.data, isLoading, isError };
};

export const useGetChatRoom = (roomId) => {
    const { data, isLoading, isError } = useQuery(['chatRoom', roomId], () =>
        getChatRoom(roomId)
    );
    return { chatRoom: data?.data, isLoading, isError };
};

export const usePutTradeCheck = (roomId) => {
    const client = useQueryClient();
    return useMutation((checkType) => putTradeCheck({ roomId, checkType }), {
        onSuccess: () => {
            client.invalidateQueries(['chatRoom', roomId]);
            console.log('성공');
        },
    });
};

// export const usePutTradeFailure = (productId) => {
//     const client = useQueryClient();
//     return useMutation(() => putTradeFailure({ productId }), {
//         onSuccess: () => {
//             client.invalidateQueries(['product', productId]);
//             console.log('성공');
//         },
//     });
// };

// export const usePutTradeSuccess = (productId) => {
//     const client = useQueryClient();
//     return useMutation(() => putTradeSuccess({ productId }), {
//         onSuccess: () => {
//             client.invalidateQueries(['product', productId]);
//             console.log('성공');
//         },
//     });
// };
