import React, { useEffect, useRef, useState } from "react";

import styles from "@chatscope/chat-ui-kit-styles/dist/default/styles.min.css";

import {
  MainContainer,
  ChatContainer,
  MessageList,
  Message,
  MessageInput,
  Avatar,
  MessageGroup,
} from "@chatscope/chat-ui-kit-react";
import { Grid, Avatar as MuiAvatar } from "@mui/material";
import { Box, Container, Typography } from "@mui/material";
import { useParams } from "react-router-dom";
import ChatTitle from "components/ChatTitle";
import * as Stompjs from "@stomp/stompjs";
import * as SockJS from "sockjs-client";
import axios from "axios";
import dayjs from "dayjs";
import { useGetChatRoom } from "react-query/chat";

const AVATAR_IMAGE =
  "https://image.shutterstock.com/image-vector/ui-image-placeholder-wireframes-apps-260nw-1037719204.jpg";

function stringToColor(string) {
  let hash = 0;
  let i;

  /* eslint-disable no-bitwise */
  for (i = 0; i < string.length; i += 1) {
    hash = string.charCodeAt(i) + ((hash << 5) - hash);
  }

  let color = "#";

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
  console.log("grouplist", grouplist);

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

const TestingLocalChatUI = () => {
  const { id } = useParams();

  const { chatRoom } = useGetChatRoom(id);

  const client = useRef({});

  const sender = localStorage.getItem("memberId");

  // const [address, setAddress] = useState("wss://bidmarkit.shop/ws-stomp");
  const address = "ws://localhost:8088/ws-stomp";

  const subUrl = "/sub/chatRooms/" + id;
  const pubUrl = "/pub/chat/message";

  let isConnected = false;

  const connect = () => {
    if (!isConnected) {
      console.log(
        "localStorage.getItem('accessToken')",
        localStorage.getItem("accessToken")
      );
      client.current = new Stompjs.Client({
        brokerURL: address,
        onConnect: () => {
          console.log("connected to ", address);
          client.current.subscribe(subUrl, (body) => {
            console.log("SUBSUB");
            console.log("body", body);
            recvMessage(JSON.parse(body.body));
          });
        },
        connectHeaders: {
          Authorization: `${localStorage.getItem("accessToken")}`,
        },
      });
      console.log("client.current", client.current);
      client.current.activate();

      isConnected = true;
    }
  };

  const sendMessage = (input) => {
    client.current.publish({
      destination: pubUrl,

      body: JSON.stringify({
        chatRoomId: id,
        senderId: sender,
        content: input,
      }),
    });
  };

  const recvMessage = (message) => {
    let newMessage;

    console.log("message", message);

    message.senderId === sender
      ? (newMessage = {
          model: {
            message: message.content,
            direction: "outgoing",
            sentTime: dayjs(message.created_at).format("HH:mm"),
          },
        })
      : (newMessage = {
          model: {
            message: message.content,
            direction: "incoming",
            sentTime: dayjs(message.created_at).format("HH:mm"),
          },
          avatar: {
            src: AVATAR_IMAGE,
            name: message.senderId,
          },
        });

    setMessages((prev) => [...prev, newMessage]);

    console.log("messages", messages);
  };

  const [initiated, setInitiated] = useState(false);

  useEffect(() => {
    if (chatRoom && !initiated) {
      let logs = [];

      chatRoom?.log.reverse().forEach((message) => {
        let newMessage;

        console.log("message", message);

        message.senderId === sender
          ? (newMessage = {
              model: {
                message: message.content,
                direction: "outgoing",
                sentTime: dayjs(`${message.created_at}Z`).format("HH:mm"),
              },
            })
          : (newMessage = {
              model: {
                message: message.content,
                direction: "incoming",
                sentTime: dayjs(`${message.created_at}Z`).format("HH:mm"),
              },
              avatar: {
                src: AVATAR_IMAGE,
                name: message.senderId,
              },
            });

        logs.push(newMessage);
      });

      setMessages(logs);

      setInitiated(true);
    }
  }, [chatRoom]);

  useEffect(() => {
    connect();

    return () => {
      console.log("disconnect");
      client.current.deactivate();
    };
  }, [initiated]);

  const [messages, setMessages] = useState([]);

  return (
    <Container
      sx={{
        display: "flex",
        flexDirection: "column",
        height: "100vh",
      }}
    >
      <ChatTitle
        thumbnail={chatRoom?.thumbnail}
        name={chatRoom?.productName}
        price={chatRoom?.price}
      />

      <MainContainer>
        <ChatContainer>
          <MessageList>{getMessageGroupComponent(messages)}</MessageList>
          {/* <MessageList>{getMessageComponent(messages)}</MessageList> */}
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

export default TestingLocalChatUI;
