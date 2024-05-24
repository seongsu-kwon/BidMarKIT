import React, { useEffect, useRef, useState } from 'react';

import styles from '@chatscope/chat-ui-kit-styles/dist/default/styles.min.css';

import {
    MainContainer,
    ChatContainer,
    MessageList,
    Message,
    MessageInput,
    Avatar,
    MessageGroup,
} from '@chatscope/chat-ui-kit-react';
import { Grid, Avatar as MuiAvatar } from '@mui/material';
import { Box, Container, Typography } from '@mui/material';
import { useParams } from 'react-router-dom';
import ChatTitle from 'components/ChatTitle';
import * as Stompjs from '@stomp/stompjs';
import * as SockJS from 'sockjs-client';
import axios from 'axios';
import dayjs from 'dayjs';
import { useGetChatRoom } from 'react-query/chat';

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
function stringToColor(string) {
    let hash = 0;
    let i;

    /* eslint-disable no-bitwise */
    for (i = 0; i < string.length; i += 1) {
        hash = string.charCodeAt(i) + ((hash << 5) - hash);
    }

    let color = '#';

    for (i = 0; i < 3; i += 1) {
        const value = (hash >> (i * 8)) & 0xff;
        color += `00${value.toString(16)}`.slice(-2);
    }
    /* eslint-enable no-bitwise */

    return color;
}
function stringAvatar(name) {
    return {
        sx: {
            backgroundcolor: stringToColor(name),
        },
        children: `${name[0]}`,
    };
}

const getMessageComponent = (data) => {
    return data.map((item, index) => {
        return (
            <Message key={index} model={item.model}>
                {/* {item.avatar ? (
                    <Avatar
                        // src={item.avatar.src}
                        // name={item.avatar.name}
                        children={
                            <MuiAvatar {...stringAvatar(item.avatar.name)} />
                        }
                    />
                ) : null} */}
                {/* <Message.Footer sentTime={item.model.sentTime}>
                    {item.model.sentTime}
                </Message.Footer> */}
            </Message>
        );
    });
};
const getMessageGroupComponent = (data) => {
    let grouplist = [];
    let group = [];

    data.forEach((item, index) => {
        if (index === 0) {
            group.push(item);
        } else {
            if (item.model.direction === data[index - 1].model.direction) {
                if (item.model.sentTime !== data[index - 1].model.sentTime) {
                    grouplist.push(group);
                    group = [];
                }

                group.push(item);
            } else {
                grouplist.push(group);
                group = [];
                group.push(item);
            }
        }
    });
    grouplist.push(group);
    console.log('grouplist', grouplist);

    return grouplist.map((group, index) => {
        return (
            <MessageGroup direction={group[0]?.model.direction}>
                <MessageGroup.Messages>
                    {getMessageComponent(group)}
                    <Message.Footer sentTime={group[0]?.model.sentTime} />
                </MessageGroup.Messages>
            </MessageGroup>
        );
    });
};

const ChatUI = () => {
    const { id } = useParams();

    const { chatRoom } = useGetChatRoom(id);

    const client = useRef({});

    const sender = localStorage.getItem('nickname') || 'test';

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
                // client.current.send(
                //     `/pub/chat/message`,
                //     {},
                //     JSON.stringify({
                //         type: 'ENTER',
                //         roomId: id,
                //         sender: sender,
                //     })
                // );
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

                sentTime: dayjs().format('HH:mm'),
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

        message.sender === sender
            ? (newMessage = {
                  model: {
                      message: message.message,
                      direction: 'outgoing',
                      //   sentTime: 'just now',
                      sentTime: message.sentTime,
                  },
              })
            : (newMessage = {
                  model: {
                      message: message.message,
                      direction: 'incoming',
                      sentTime: message.sentTime,
                  },
                  avatar: {
                      src: AVATAR_IMAGE,
                      name: message.sender,
                  },
              });

        setMessages((prev) => [...prev, newMessage]);
    };

    useEffect(() => {
        // connect();
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
            sx={{
                display: 'flex',
                flexDirection: 'column',
                height: '100vh',
            }}
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
                thumbnail={chatRoom?.thumbnail}
                name={chatRoom?.productName}
                price={chatRoom?.price}
            />

            <MainContainer>
                <ChatContainer>
                    <MessageList>
                        {getMessageGroupComponent(messages)}
                    </MessageList>
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
