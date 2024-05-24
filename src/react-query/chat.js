import { getChatRoom, getChatRooms } from '../api/chat';
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
