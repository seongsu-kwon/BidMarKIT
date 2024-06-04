import { Box, Grid } from '@mui/material';
import NotificationItem from 'components/NotificationItem';
import React from 'react';
import { useGetNotification } from 'react-query/noti';

export default function NotiPage() {
    // const notis = [
    //     {
    //         content: '상품이 낙찰되었습니다.',
    //         date: '2024.04.01 18:10',
    //     },
    //     {
    //         content: '상품이 낙찰되었습니다.',
    //         date: '2024.04.01 18:10',
    //     },
    //     {
    //         content: '상품이 낙찰되었습니다.',
    //         date: '2024.04.01 18:10',
    //     },
    //     {
    //         content: '상품이 낙찰되었습니다.',
    //         date: '2024.04.01 18:10',
    //     },
    // ];

    const { notifications } = useGetNotification();

    return (
        <Box>
            {notifications.map((noti, index) => (
                <NotificationItem
                    key={index}
                    content={noti.content}
                    date={noti.created_at}
                />
            ))}
        </Box>
    );
}
