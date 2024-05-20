import ChatroomItem from 'components/ChatroomItem';
import React from 'react';
import { useNavigate } from 'react-router-dom';

export default function ChatroomListPage() {
    const navigate = useNavigate();

    const chatrooms = [
        {
            thumbnail: 'https://source.unsplash.com/random',
            name: '채팅방 이름',
            lastMessage: '마지막 메시지',
            date: '2024.04.01 18:10',
            user: '사용자 이름',
        },
        {
            thumbnail: 'https://source.unsplash.com/random',
            name: '채팅방 이름',
            lastMessage: '마지막 메시지',
            date: '2024.04.01 18:10',
            user: '사용자 이름',
        },
        {
            thumbnail: 'https://source.unsplash.com/random',
            name: '채팅방 이름',
            lastMessage: '마지막 메시지',
            date: '2024.04.01 18:10',
            user: '사용자 이름',
        },
        {
            thumbnail: 'https://source.unsplash.com/random',
            name: '채팅방 이름',
            lastMessage: '마지막 메시지',
            date: '2024.04.01 18:10',
            user: '사용자 이름',
        },
    ];

    return (
        <div>
            {chatrooms.map((chatroom, index) => (
                <ChatroomItem
                    key={index}
                    thumbnail={chatroom.thumbnail}
                    name={chatroom.name}
                    lastMessage={chatroom.lastMessage}
                    date={chatroom.date}
                    user={chatroom.user}
                    onClick={() => navigate(`/chat/${index}`)}
                />
            ))}
        </div>
    );
}
