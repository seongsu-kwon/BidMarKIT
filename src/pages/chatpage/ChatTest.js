import React, { useRef, useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import * as Stompjs from '@stomp/stompjs';
import * as SockJS from 'sockjs-client';
import axios from 'axios';
import instance from 'api/instance';
import { Button, TextField } from '@mui/material';
import { LocalConvenienceStoreOutlined } from '@mui/icons-material';

export default function ChatTest() {
    const [chatList, setChatList] = useState([]);
    const [chat, setChat] = useState('');

    // const { apply_id } = useParams();
    const apply_id = 1;
    const client = useRef({});

    const connect = () => {
        client.current = new Stompjs.Client({
            // brokerURL: 'ws://localhost:8080/ws-stomp',
            brokerURL: 'wss://bidmarkit.shop/ws-stomp',
            onConnect: () => {
                console.log('connected');
            },
        });
        // client.current.webSocketFactory = () => {
        //     // return new SockJS('http://localhost:8080/ws-stomp');
        //     return new SockJS('https://bidmarkit.shop/ws-stomp');
        // };
        client.current.activate();
    };

    const ca = () => {
        client.current = new Stompjs.Client({
            brokerURL: 'ws://localhost:8080/ws-stomp',
            onConnect: () => {
                console.log('connected to ws://localhost:8080/ws-stomp');
            },
        });
        client.current.activate();
    };

    const cb = () => {
        console.log(
            "localStorage.getItem('accessToken')",
            localStorage.getItem('accessToken')
        );
        client.current = new Stompjs.Client({
            brokerURL: 'wss://bidmarkit.shop/ws-stomp',
            onConnect: () => {
                console.log('connected to wss://bidmarkit.shop/ws-stomp');
            },
            connectHeaders: {
                Authorization: `${localStorage.getItem('accessToken')}`,
            },
        });

        console.log('client.current', client.current);
        client.current.activate();
    };

    const cc = () => {
        client.current = new Stompjs.Client({
            brokerURL: 'ws://localhost:8080/ws-stomp',
            onConnect: () => {
                console.log('connected');
            },
        });
        client.current.webSocketFactory = () => {
            return new SockJS('http://localhost:8080/ws-stomp');
        };
        client.current.activate();
    };

    const cd = () => {
        client.current = new Stompjs.Client({
            brokerURL: 'wss://bidmarkit.shop/ws-stomp',
            connectHeaders: {
                Authorization: localStorage.getItem('accessToken'),
            },
            onConnect: () => {
                console.log('connected');
            },
        });
        client.current.webSocketFactory = () => {
            return new SockJS('https://bidmarkit.shop/ws-stomp');
        };
        client.current.activate();
    };

    const wsbid = () => {
        client.current = new Stompjs.Client({
            brokerURL: 'wss://bidmarkit.shop:8080/ws-stomp',
            onConnect: () => {
                console.log('connected to ws://bidmarkit.shop/ws-stomp');
            },
        });
        client.current.activate();
    };

    const wsbidsock = () => {
        client.current = new Stompjs.Client({
            brokerURL: 'wss://bidmarkit.shop:8080/ws-stomp',
            onConnect: () => {
                console.log('connected');
            },
        });
        client.current.webSocketFactory = () => {
            return new SockJS('https://bidmarkit.shop:8080/ws-stomp');
        };
        client.current.activate();
    };

    const ce = () => {
        const socket = new SockJS('http://localhost:8080/ws-stomp');
        client.current = Stompjs.Stomp.over(socket);
        client.current.connect(
            {
                Authorization: localStorage.getItem('accessToken'),
                'Content-Type': 'application/json',
            },
            () => {
                console.log('connected');
            }
        );
    };

    const cf = () => {
        const socket = new SockJS('https://bidmarkit.shop/ws-stomp');
        client.current = Stompjs.Stomp.over(socket);
        client.current.connect(
            {
                Authorization: localStorage.getItem('accessToken'),
                // 'Content-Type': 'application/json',
            },
            () => {
                console.log('connected');
            }
        );

        console.log('client.current', client.current);
    };

    const websocket = () => {
        client.current = new WebSocket('wss://bidmarkit.shop/ws-stomp', null, {
            headers: { Authorization: localStorage.getItem('accessToken') },
        });
        client.current.onopen = () => {
            console.log('connected');
        };
    };

    const disconnect = () => {
        client.current.deactivate();
    };

    const handleChange = (e) => {
        setChat(e.target.value);
    };

    const handleSubmit = (e, chat) => {
        e.preventDefault();

        console.log('chat', chat);
    };

    // useEffect(() => {
    //     connect();
    // }, []);

    const getChatList = async () => {
        await axios
            .get('http://localhost:8080/chat/rooms')
            .then((response) => {
                console.log(response);
                setChatList(response.data);
            })
            .catch((error) => {
                console.error(error);
            });
    };

    const getBidChatList = async () => {
        await instance
            .get('/chatRooms')
            .then((response) => {
                console.log(response);
                // setChatList(response.data);
            })
            .catch((error) => {
                console.error(error);
            });
    };

    const getBidChatList2 = async () => {
        await instance
            .get('/chatRooms?pageNum=0&size=8')
            .then((response) => {
                console.log(response);
                // setChatList(response.data);
            })
            .catch((error) => {
                console.error(error);
            });
    };

    const [roomName, setRoomName] = useState('');

    useEffect(() => {
        getChatList();
    }, []);

    const createChatRoom = async () => {
        try {
            const formData = new FormData();
            formData.append('name', roomName);

            const response = await axios.post(
                'http://localhost:8080/chat/room',
                formData
            );
            console.log(response);
            getChatList();
        } catch (e) {
            console.error(e);
        }
    };

    const enterChatRoom = async (roomId) => {
        setRoomId(roomId);
        client.current.subscribe(`/sub/chat/room/${roomId}`, (message) => {
            console.log(message);
            recvMessage(JSON.parse(message.body));
        });
        client.current.send(
            `/pub/chat/message`,
            {},
            JSON.stringify({
                type: 'ENTER',
                roomId: roomId,
                sender: 'test',
            })
        );
    };

    const [messages, setMessages] = useState([]);

    const [roomId, setRoomId] = useState(0);

    const sendMessage = () => {
        client.current.send(
            `/pub/chat/message`,
            {},
            JSON.stringify({
                type: 'TALK',
                roomId: roomId,
                sender: 'test',
                message: chat,
            })
        );
        setChat('');
    };

    const recvMessage = (message) => {
        setMessages((prev) => [
            ...prev,
            {
                type: message.type,
                sender: message.type === 'ENTER' ? 'system' : message.sender,
                message: message.message,
            },
        ]);
    };

    return (
        <div>
            <TextField
                placeholder="채팅"
                value={chat}
                onChange={handleChange}
            />
            <TextField
                value={roomName}
                onChange={(e) => setRoomName(e.target.value)}
            />

            <Button onClick={() => createChatRoom()}>createChatRoom</Button>
            <Button onClick={() => sendMessage()}>send</Button>
            <Button onClick={() => ca()}>local</Button>
            <Button onClick={() => cb()}>bid</Button>
            <Button onClick={() => cc()}>local sockjs</Button>
            <Button onClick={() => cd()}>bid sockjs</Button>
            <Button onClick={() => disconnect()}>disconnect</Button>
            <Button onClick={() => getChatList()}>getChatList</Button>
            <Button onClick={() => ce()}>local stomp</Button>
            <Button onClick={() => cf()}>bid stomp</Button>
            <Button onClick={() => getBidChatList()}>getBidChatList</Button>
            <Button onClick={() => getBidChatList2()}>getBidChatList2</Button>
            <Button onClick={() => wsbid()}>wsbid8080</Button>
            <Button onClick={() => wsbidsock()}>wsbidsock8080</Button>
            <Button onClick={() => websocket()}>websocket</Button>

            {chatList.map((chat) => (
                <div
                    key={chat.roomId}
                    onClick={() => {
                        enterChatRoom(chat.roomId);
                    }}
                >
                    {chat.name}
                </div>
            ))}

            {messages?.map((message, index) => (
                <div key={index}>
                    {message.sender}: {message.message}
                </div>
            ))}
        </div>
    );
}
