import ChatroomItem from 'components/ChatroomItem';
import React, { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import * as Stompjs from '@stomp/stompjs';
import * as SockJS from 'sockjs-client';
import axios from 'axios';

export default function ChatroomListPage() {
    const navigate = useNavigate();

    const [chatList, setChatList] = useState([]);

    const getChatList = async () => {
        await axios
            .get('http://localhost:8080/chat/rooms')
            .then((response) => {
                console.log(response);
                let rooms = [];
                response.data.forEach((room) => {
                    rooms.push({
                        roomId: room.roomId,
                        thumbnail: 'https://source.unsplash.com/random',
                        name: room.name,
                        lastMessage: '마지막 메시지',
                        date: '2024.04.01 18:10',
                        user: '사용자 이름',
                    });
                });
                setChatList(rooms);
            })
            .catch((error) => {
                console.error(error);
            });
    };

    useEffect(() => {
        getChatList();
    }, []);

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
            {chatList?.map((chatroom, index) => (
                <ChatroomItem
                    key={index}
                    roomId={chatroom.roomId}
                    thumbnail={chatroom.thumbnail}
                    name={chatroom.name}
                    lastMessage={chatroom.lastMessage}
                    date={chatroom.date}
                    user={chatroom.user}
                    onClick={() => navigate(`/chat/${chatroom.roomId}`)}
                />
            ))}
        </div>
    );
}
