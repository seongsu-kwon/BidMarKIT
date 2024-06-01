import NotificationItem from 'components/NotificationItem';
import React from 'react';

export default function NotiPage() {
    const notis = [
        {
            content: '상품이 낙찰되었습니다.',
            date: '2024.04.01 18:10',
        },
        {
            content: '상품이 낙찰되었습니다.',
            date: '2024.04.01 18:10',
        },
        {
            content: '상품이 낙찰되었습니다.',
            date: '2024.04.01 18:10',
        },
        {
            content: '상품이 낙찰되었습니다.',
            date: '2024.04.01 18:10',
        },
    ];
    return (
        <div>
            {notis.map((noti, index) => (
                <NotificationItem
                    key={index}
                    content={noti.content}
                    date={noti.date}
                />
            ))}
        </div>
    );
}
