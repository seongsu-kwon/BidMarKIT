import React, { useState } from 'react';

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

const AVATAR_IMAGE =
    'https://image.shutterstock.com/image-vector/ui-image-placeholder-wireframes-apps-260nw-1037719204.jpg';
const defaultMessage = [
    {
        model: {
            message: 'How are you?',
            direction: 'incoming',
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
        },
    },
    {
        model: {
            message: "I'm fine, too. thank you, and you?",
            direction: 'incoming',
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
            </Message>
        );
    });
};
const ChatUI = () => {
    const { id } = useParams();

    const [messages, setMessages] = useState(defaultMessage);

    const handleSend = (input) => {
        let newMessage = {
            model: {
                message: input,
                direction: 'outgoing',
            },
        };

        let newIncomingMessage = {
            model: {
                message: `You said: ${input}`,
                direction: 'incoming',
            },
            avatar: {
                src: AVATAR_IMAGE,
                name: 'bloodstrawberry',
            },
        };

        setMessages([...messages, newMessage, newIncomingMessage]);
    };
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
                        placeholder="Type message here"
                        onSend={handleSend}
                        attachButton={false}
                    />
                </ChatContainer>
            </MainContainer>
        </Container>
    );
};

export default ChatUI;
