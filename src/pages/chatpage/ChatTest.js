import React, { useRef, useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import * as Stompjs from "@stomp/stompjs";
import * as SockJS from "sockjs-client";
import axios from "axios";
import instance from "api/instance";
import {
  Box,
  Button,
  Container,
  Divider,
  TextField,
  Typography,
} from "@mui/material";
import dayjs from "dayjs";
import { usePostFCMToken } from "react-query/auth";

export default function ChatTest() {
  const [chatList, setChatList] = useState([]);
  const [chat, setChat] = useState("");

  // const { apply_id } = useParams();
  const apply_id = 1;
  const client = useRef({});

  const connect = () => {
    client.current = new Stompjs.Client({
      // brokerURL: 'ws://localhost:8080/ws-stomp',
      brokerURL: "wss://bidmarkit.shop/ws-stomp",
      onConnect: () => {
        console.log("connected");
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
      brokerURL: "ws://localhost:8080/ws-stomp",
      onConnect: () => {
        console.log("connected to ws://localhost:8080/ws-stomp");
      },
    });
    client.current.activate();
  };

  const cb = () => {
    console.log(
      "localStorage.getItem('accessToken')",
      localStorage.getItem("accessToken")
    );
    client.current = new Stompjs.Client({
      brokerURL: "wss://bidmarkit.shop/ws-stomp",
      onConnect: () => {
        console.log("connected to wss://bidmarkit.shop/ws-stomp");
      },
      connectHeaders: {
        Authorization: `${localStorage.getItem("accessToken")}`,
      },
    });

    console.log("client.current", client.current);
    client.current.activate();
  };

  const cc = () => {
    client.current = new Stompjs.Client({
      brokerURL: "ws://localhost:8080/ws-stomp",
      onConnect: () => {
        console.log("connected");
      },
    });
    client.current.webSocketFactory = () => {
      return new SockJS("http://localhost:8080/ws-stomp");
    };
    client.current.activate();
  };

  const cd = () => {
    client.current = new Stompjs.Client({
      brokerURL: "wss://bidmarkit.shop/ws-stomp",
      connectHeaders: {
        Authorization: localStorage.getItem("accessToken"),
      },
      onConnect: () => {
        console.log("connected");
      },
    });
    client.current.webSocketFactory = () => {
      return new SockJS("https://bidmarkit.shop/ws-stomp");
    };
    client.current.activate();
  };

  const wsbid = () => {
    client.current = new Stompjs.Client({
      brokerURL: "wss://bidmarkit.shop:8080/ws-stomp",
      onConnect: () => {
        console.log("connected to ws://bidmarkit.shop/ws-stomp");
      },
    });
    client.current.activate();
  };

  const wsbidsock = () => {
    client.current = new Stompjs.Client({
      brokerURL: "wss://bidmarkit.shop:8080/ws-stomp",
      onConnect: () => {
        console.log("connected");
      },
    });
    client.current.webSocketFactory = () => {
      return new SockJS("https://bidmarkit.shop:8080/ws-stomp");
    };
    client.current.activate();
  };

  const ce = () => {
    const socket = new SockJS("http://localhost:8080/ws-stomp");
    client.current = Stompjs.Stomp.over(socket);
    client.current.connect(
      {
        Authorization: localStorage.getItem("accessToken"),
        "Content-Type": "application/json",
      },
      () => {
        console.log("connected");
      }
    );
  };

  const cf = () => {
    const socket = new SockJS("https://bidmarkit.shop/ws-stomp");
    client.current = Stompjs.Stomp.over(socket);
    client.current.connect(
      {
        Authorization: localStorage.getItem("accessToken"),
        // 'Content-Type': 'application/json',
      },
      () => {
        console.log("connected");
      }
    );

    console.log("client.current", client.current);
  };

  const websocket = () => {
    client.current = new WebSocket("wss://bidmarkit.shop/ws-stomp", null, {
      headers: { Authorization: localStorage.getItem("accessToken") },
    });
    client.current.onopen = () => {
      console.log("connected");
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

    console.log("chat", chat);
  };

  // useEffect(() => {
  //     connect();
  // }, []);

  // const getChatList = async () => {
  //   await axios
  //     .get("http://localhost:8080/chat/rooms")
  //     .then((response) => {
  //       console.log(response);
  //       setChatList(response.data);
  //     })
  //     .catch((error) => {
  //       console.error(error);
  //     });
  // };

  const getBidChatList = async () => {
    await instance
      .get("/chatRooms")
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
      .get("/chatRooms?pageNum=0&size=8")
      .then((response) => {
        console.log(response);
        // setChatList(response.data);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const [roomName, setRoomName] = useState("");

  // useEffect(() => {
  //   getChatList();
  // }, []);

  const createChatRoom = async () => {
    try {
      const formData = new FormData();
      formData.append("name", roomName);

      const response = await axios.post(
        "http://localhost:8080/chat/room",
        formData
      );
      console.log(response);
      // getChatList();
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
        type: "ENTER",
        roomId: roomId,
        sender: "test",
      })
    );
  };
  const time = "2024-05-25T12:19:27";

  console.log("시간 테스트 ", time);
  console.log("tlrks2", dayjs(time).format("YYYY-MM-DD HH:mm:ss"));
  console.log("시간223", dayjs(time).format("HH:mm"));

  const [messages, setMessages] = useState([]);

  const [roomId, setRoomId] = useState(0);

  const sendMessage = () => {
    client.current.send(
      `/pub/chat/message`,
      {},
      JSON.stringify({
        type: "TALK",
        roomId: roomId,
        sender: "test",
        message: chat,
      })
    );
    setChat("");
  };

  const recvMessage = (message) => {
    setMessages((prev) => [
      ...prev,
      {
        type: message.type,
        sender: message.type === "ENTER" ? "system" : message.sender,
        message: message.message,
      },
    ]);
  };

  const [address, setAddress] = useState("ws://localhost:8082/ws-stomp");

  const subscribe = () => {
    client.current.subscribe("/sub/chatRooms/" + id, (body) => {
      const json_body = JSON.parse(body.body);
      console.log("WPDLTMS", json_body);
      console.log("SUBSUB");
      recvMessage(JSON.parse(body.body));
    });
  };

  const testOne = () => {
    console.log(
      "localStorage.getItem('accessToken')",
      localStorage.getItem("accessToken")
    );
    client.current = new Stompjs.Client({
      brokerURL: address,
      onConnect: () => {
        console.log("connected to ", address);
        subscribe();

        client.current.publish({
          destination: "/pub/chat/message",

          body: JSON.stringify({
            chatRoomId: id,
            senderId: "test",
            content: "this is test메시지",
          }),
        });

        recvMessage({ message: "this is test메시지", sender: "test" });
      },
      connectHeaders: {
        Authorization: `${localStorage.getItem("accessToken")}`,
      },
    });
    console.log("client.current", client.current);
    client.current.activate();
  };

  const afterConnect = () => {
    console.log("connected");

    client.current.send(
      `/pub/chat/message`,
      {},
      JSON.stringify({
        type: "ENTER",
        roomId: id,
        sender: "test",
      })
    );
  };

  const [address2, setAddress2] = useState("http://localhost:8082/ws-stomp");

  const [id, setId] = useState(1);

  const testTwo = () => {
    const socket = new SockJS(address2);
    client.current = Stompjs.Stomp.over(socket);
    let headers = { Authorization: localStorage.getItem("accessToken") };
    client.current.connect(headers, () => {
      console.log("connected", address2);
      subscribe();
    });

    console.log("client.current", client.current);
  };

  const date = "2024-05-29T21:10:46";

  const date2 = dayjs(date).add(18, "hour").format("YYYY-MM-DD HH:mm");

  const { mutate: postFCMToken } = usePostFCMToken();

  const onClickFcm = () => {
    const id = localStorage.getItem("memberId");
    const token = localStorage.getItem("fcmToken");

    postFCMToken({
      memberId: id,
      FCMToken: token,
    });
  };

  return (
    <div>
      <Container>
        <Typography variant="h4">{date2}</Typography>

        <TextField
          fullWidth
          label="id"
          value={id}
          onChange={(e) => setId(e.target.value)}
        />

        <Box>
          <TextField
            fullWidth
            value={address}
            onChange={(e) => setAddress(e.target.value)}
          />
          <Button variant="contained" onClick={() => testOne()}>
            test One
          </Button>
        </Box>
        <Divider sx={{ m: 3 }} />
        <Box>
          <TextField
            fullWidth
            value={address2}
            onChange={(e) => setAddress2(e.target.value)}
          />
          <Button variant="contained" onClick={() => testTwo()}>
            test Two
          </Button>
        </Box>

        <Button onClick={onClickFcm}>fcm</Button>
      </Container>

      {/* <Button onClick={() => createChatRoom()}>createChatRoom</Button>
      <Button onClick={() => sendMessage()}>send</Button>
      <Button onClick={() => ca()}>local</Button>
      <Button onClick={() => cb()}>bid</Button>
      <Button onClick={() => cc()}>local sockjs</Button>
      <Button onClick={() => cd()}>bid sockjs</Button>
      <Button onClick={() => disconnect()}>disconnect</Button>
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
      ))} */}
    </div>
  );
}
