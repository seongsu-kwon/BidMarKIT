import React, { useEffect, useRef, useState } from 'react';

import styles from '@chatscope/chat-ui-kit-styles/dist/default/styles.min.css';

import {
    MainContainer,
    ChatContainer,
    MessageList,
    Message,
    MessageInput,
    Avatar,
} from '@chatscope/chat-ui-kit-react';
import { Box, Container, Typography } from '@mui/material';
import { useParams } from 'react-router-dom';
import ChatTitle from 'components/ChatTitle';
import * as Stompjs from '@stomp/stompjs';
import * as SockJS from 'sockjs-client';
import axios from 'axios';

const AVATAR_IMAGE =
    'https://image.shutterstock.com/image-vector/ui-image-placeholder-wireframes-apps-260nw-1037719204.jpg';
const defaultMessage = [
    {
        model: {
            message: 'How are you?',
            direction: 'incoming',
            sentTime: 'just now',
        },
        avatar: {
            src: AVATAR_IMAGE,
            name: 'bloodstrawberry',
        },
    },
    {
        model: {
            message: "I'm fine, thank you, and you?",
            direction: 'outgoing',
            sentTime: 'just now',
        },
    },
    {
        model: {
            message: "I'm fine, too. thank you, and you?",
            direction: 'incoming',
            sentTime: 'just now',
        },
        avatar: {
            src: AVATAR_IMAGE,
            name: 'bloodstrawberry',
        },
    },
];

const getMessageComponent = (data) => {
    return data.map((item, index) => {
        return (
            <Message key={index} model={item.model}>
                {item.avatar ? (
                    <Avatar src={item.avatar.src} name={item.avatar.name} />
                ) : null}
                <Message.Footer sentTime={item.model.sentTime}>
                    {item.model.sentTime}
                </Message.Footer>
            </Message>
        );
    });
};
const ChatUI = () => {
    const { id } = useParams();

    const client = useRef({});

    const sender = localStorage.getItem('userId') || 'test';

    const connect = () => {
        const socket = new SockJS('http://localhost:8080/ws-stomp');
        client.current = Stompjs.Stomp.over(socket);
        client.current.connect(
            {
                Authorization: localStorage.getItem('accessToken'),
                'Content-Type': 'application/json',
            },
            () => {
                console.log('connected');
                client?.current.subscribe(`/sub/chat/room/${id}`, (message) => {
                    console.log(message);
                    recvMessage(JSON.parse(message.body));
                });
                client.current.send(
                    `/pub/chat/message`,
                    {},
                    JSON.stringify({
                        type: 'ENTER',
                        roomId: id,
                        sender: sender,
                    })
                );
            }
        );
    };

    const sendMessage = (input) => {
        client.current.send(
            `/pub/chat/message`,
            {},
            JSON.stringify({
                type: 'TALK',
                roomId: id,
                sender: sender,
                message: input,
            })
        );
    };

    const recvMessage = (message) => {
        // setMessages((prev) => [
        //     ...prev,
        //     {
        //         type: message.type,
        //         sender: message.type === 'ENTER' ? 'system' : message.sender,
        //         message: message.message,
        //     },
        // ]);
        let newMessage;

        message.sender === 'test'
            ? (newMessage = {
                  model: {
                      message: message.message,
                      direction: 'outgoing',
                  },
              })
            : (newMessage = {
                  model: {
                      message: message.message,
                      direction: 'incoming',
                  },
                  avatar: {
                      src: AVATAR_IMAGE,
                      name: message.sender,
                  },
              });

        setMessages((prev) => [...prev, newMessage]);
    };

    useEffect(() => {
        connect();
    }, []);

    const [messages, setMessages] = useState([]);

    // const handleSend = (input) => {
    //     let newMessage = {
    //         model: {
    //             message: input,
    //             direction: 'outgoing',
    //         },
    //     };

    //     let newIncomingMessage = {
    //         model: {
    //             message: `You said: ${input}`,
    //             direction: 'incoming',
    //         },
    //         avatar: {
    //             src: AVATAR_IMAGE,
    //             name: 'bloodstrawberry',
    //         },
    //     };

    //     setMessages([...messages, newMessage, newIncomingMessage]);
    // };

    return (
        <Container
            sx={{ display: 'flex', flexDirection: 'column', height: '100vh' }}
        >
            {/* <Box
                sx={{
                    backgroundColor: 'grey',
                }}
            >
                <Typography variant="h4" sx={{ textAlign: 'center' }}>
                    Chat {id}
                </Typography>
            </Box> */}
            <ChatTitle
                thumbnail={AVATAR_IMAGE}
                name="거래한 상품"
                price={10000}
            />

            <MainContainer>
                <ChatContainer>
                    <MessageList>{getMessageComponent(messages)}</MessageList>
                    <MessageInput
                        // placeholder="Type message here"
                        onSend={sendMessage}
                        attachButton={false}
                    />
                </ChatContainer>
            </MainContainer>
        </Container>
    );
};

export default ChatUI;
